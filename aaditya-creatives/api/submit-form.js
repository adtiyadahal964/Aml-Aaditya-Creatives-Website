const { createHash, randomUUID } = require('node:crypto');

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const MAX_BODY_BYTES = 64 * 1024;
const PROVIDER_TIMEOUT_MS = 8000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_BUCKET_MAX = 1000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s().-]{7,24}$/;
const SUBMISSION_ID_PATTERN = /^[a-zA-Z0-9-]{16,100}$/;
const rateBuckets = new Map();

class FormError extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

function clean(value, maximum = 500) {
  if (Array.isArray(value)) value = value[0];
  return typeof value === 'string' ? value.trim().slice(0, maximum) : '';
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[character]);
}

function sendJson(response, status, payload, additionalHeaders = {}) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  for (const [name, value] of Object.entries(additionalHeaders)) response.setHeader(name, value);
  response.end(JSON.stringify(payload));
}

function requestHost(request) {
  return clean(request.headers['x-forwarded-host'] || request.headers.host, 255).split(',')[0].trim();
}

function originIsAllowed(request) {
  const origin = clean(request.headers.origin, 500);
  if (!origin) return true;
  try {
    return new URL(origin).host === requestHost(request);
  } catch {
    return false;
  }
}

function requestIpKey(request) {
  const forwarded = clean(request.headers['x-forwarded-for'], 500).split(',')[0].trim();
  const source = forwarded || clean(request.socket?.remoteAddress, 100) || 'unknown';
  return createHash('sha256').update(source).digest('hex').slice(0, 24);
}

function cleanRateBuckets(now = Date.now()) {
  for (const [key, bucket] of rateBuckets) {
    if (bucket.resetAt <= now) rateBuckets.delete(key);
  }
  while (rateBuckets.size >= RATE_LIMIT_BUCKET_MAX) {
    const oldestKey = rateBuckets.keys().next().value;
    if (oldestKey === undefined) break;
    rateBuckets.delete(oldestKey);
  }
}

function checkRateLimit(request, submissionId) {
  const now = Date.now();
  cleanRateBuckets(now);
  const key = requestIpKey(request);
  const current = rateBuckets.get(key);
  if (!current || current.resetAt <= now) {
    rateBuckets.set(key, { submissionIds: new Set([submissionId]), resetAt: now + RATE_LIMIT_WINDOW_MS });
    return null;
  }
  if (current.submissionIds.has(submissionId)) return null;
  if (current.submissionIds.size >= RATE_LIMIT_MAX) return Math.max(1, Math.ceil((current.resetAt - now) / 1000));
  current.submissionIds.add(submissionId);
  return null;
}

async function readBody(request) {
  const declaredLength = Number.parseInt(request.headers['content-length'] || '0', 10);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    throw new FormError('The submitted information is too large.', 413, 'payload_too_large');
  }

  if (request.body && typeof request.body === 'object' && !Buffer.isBuffer(request.body)) {
    let serializedBody;
    try {
      serializedBody = JSON.stringify(request.body);
    } catch {
      throw new FormError('The request body could not be processed.', 400, 'invalid_request');
    }
    if (Buffer.byteLength(serializedBody, 'utf8') > MAX_BODY_BYTES) {
      throw new FormError('The submitted information is too large.', 413, 'payload_too_large');
    }
    return request.body;
  }
  let raw = Buffer.isBuffer(request.body) ? request.body.toString('utf8') : clean(request.body, MAX_BODY_BYTES + 1);

  if (!raw && typeof request[Symbol.asyncIterator] === 'function') {
    const chunks = [];
    let total = 0;
    for await (const chunk of request) {
      const buffer = Buffer.from(chunk);
      total += buffer.length;
      if (total > MAX_BODY_BYTES) throw new FormError('The submitted information is too large.', 413, 'payload_too_large');
      chunks.push(buffer);
    }
    raw = Buffer.concat(chunks).toString('utf8');
  }

  if (Buffer.byteLength(raw, 'utf8') > MAX_BODY_BYTES) {
    throw new FormError('The submitted information is too large.', 413, 'payload_too_large');
  }

  const contentType = clean(request.headers['content-type'], 200).toLowerCase();
  if (contentType.includes('application/json')) {
    try {
      return JSON.parse(raw || '{}');
    } catch {
      throw new FormError('The request contains invalid JSON.', 400, 'invalid_request');
    }
  }
  if (contentType.includes('application/x-www-form-urlencoded')) {
    return Object.fromEntries(new URLSearchParams(raw));
  }
  throw new FormError('Unsupported request format.', 415, 'unsupported_media_type');
}

function buildSubmission(raw) {
  const formType = clean(raw.form_type, 20);
  const fullName = clean(raw.full_name, 120);
  const email = clean(raw.email, 254).toLowerCase();
  const submissionId = clean(raw.submission_id, 100) || randomUUID();
  const sourcePage = clean(raw.source_page, 500);
  const submittedAt = clean(raw.submission_date_time, 80) || new Date().toISOString();

  if (!['contact', 'consultation'].includes(formType)) {
    throw new FormError('Unknown form type.', 400, 'validation_error');
  }
  if (fullName.length < 2 || !EMAIL_PATTERN.test(email)) {
    throw new FormError('Please provide a valid name and email address.', 400, 'validation_error');
  }
  if (!SUBMISSION_ID_PATTERN.test(submissionId)) {
    throw new FormError('Invalid submission identifier.', 400, 'validation_error');
  }

  if (formType === 'contact') {
    const enquiryType = clean(raw.enquiry_type, 120);
    const message = clean(raw.message, 4000);
    if (!enquiryType || message.length < 10) {
      throw new FormError('Please select an enquiry type and provide a message.', 400, 'validation_error');
    }
    return {
      formType,
      fullName,
      email,
      submissionId,
      subject: 'New Contact Message — Aaditya Creatives',
      fields: [
        ['Full Name', fullName],
        ['Email Address', email],
        ['Enquiry Type', enquiryType],
        ['Message', message],
        ['Source Page', sourcePage],
        ['Submission Date and Time', submittedAt],
        ['Submission ID', submissionId],
      ],
    };
  }

  const businessName = clean(raw.business_name, 160);
  const marketingChallenge = clean(raw.marketing_challenge, 200);
  const otherChallenge = clean(raw.other_challenge, 500);
  const preferredTime = clean(raw.preferred_time, 120);
  const phone = clean(raw.phone_with_country_code || raw.phone_number, 30);
  if (businessName && businessName.length < 2) {
    throw new FormError('Please provide a valid business name or leave it empty.', 400, 'validation_error');
  }
  if (!marketingChallenge || !preferredTime) {
    throw new FormError('Please select your marketing challenge and preferred consultation time.', 400, 'validation_error');
  }
  if (marketingChallenge === 'Other' && !otherChallenge) {
    throw new FormError('Please describe the marketing challenge you want to discuss.', 400, 'validation_error');
  }
  if (phone && !PHONE_PATTERN.test(phone)) {
    throw new FormError('Please enter a valid phone number or leave it empty.', 400, 'validation_error');
  }

  const challenge = marketingChallenge === 'Other' ? `Other — ${otherChallenge}` : marketingChallenge;
  return {
    formType,
    fullName,
    email,
    submissionId,
    subject: 'New Free Consultation Request — Aaditya Creatives',
    fields: [
      ['Full Name', fullName],
      ['Email Address', email],
      ['Business Name', businessName],
      ['Website or Social Media', clean(raw.website_social, 500)],
      ['Country Code', clean(raw.phone_country_code, 10)],
      ['Phone / WhatsApp Number', phone],
      ['Biggest Marketing Challenge', challenge],
      ['Main Business Goal', clean(raw.main_goal, 1000)],
      ['Preferred Consultation Date', clean(raw.preferred_date, 30)],
      ['Preferred Consultation Time', preferredTime],
      ['Timezone', clean(raw.timezone, 120)],
      ['Source Page', sourcePage],
      ['Submission Date and Time', submittedAt],
      ['Submission ID', submissionId],
    ],
  };
}

function emailContent(submission) {
  const title = submission.formType === 'consultation' ? 'New free consultation request' : 'New contact message';
  const visibleFields = submission.fields.filter(([, value]) => value);
  const rows = visibleFields.map(([label, value]) => `<tr><th style="padding:10px;border:1px solid #d1d5db;text-align:left;vertical-align:top">${escapeHtml(label)}</th><td style="padding:10px;border:1px solid #d1d5db;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join('');
  const text = visibleFields.map(([label, value]) => `${label}: ${value}`).join('\n\n');
  return {
    html: `<div style="font-family:Arial,sans-serif;color:#111827;line-height:1.5"><h1 style="font-size:22px">${escapeHtml(title)}</h1><table style="border-collapse:collapse;width:100%;max-width:720px">${rows}</table></div>`,
    text: `${title}\n\n${text}`,
  };
}

async function deliverEmail(submission) {
  const apiKey = clean(process.env.RESEND_API_KEY, 500);
  const sender = clean(process.env.FORM_FROM_EMAIL, 320);
  const recipient = clean(process.env.FORM_TO_EMAIL, 254);
  const senderMatch = sender.match(/^(?:[^<>\r\n]{1,200}\s*)?<([^<>\r\n]+)>$/);
  const senderAddress = senderMatch ? senderMatch[1].trim() : sender;
  const senderIsValid = !/[\r\n]/.test(sender) && EMAIL_PATTERN.test(senderAddress);
  if (!apiKey || !senderIsValid || !EMAIL_PATTERN.test(recipient)) {
    throw new FormError('Email delivery is not configured.', 503, 'configuration_error');
  }

  const content = emailContent(submission);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PROVIDER_TIMEOUT_MS);
  try {
    const providerResponse = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `aaditya-${submission.formType}-${submission.submissionId}`,
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: submission.email,
        subject: submission.subject,
        html: content.html,
        text: content.text,
      }),
      signal: controller.signal,
    });
    const providerPayload = await providerResponse.json().catch(() => ({}));
    if (!providerResponse.ok || typeof providerPayload.id !== 'string' || !providerPayload.id) {
      console.error('Resend rejected a form email.', {
        code: 'provider_error',
        formType: submission.formType,
        submissionId: submission.submissionId,
        providerStatus: providerResponse.status,
        providerRequestId: providerResponse.headers.get('x-request-id'),
      });
      throw new FormError('The email provider rejected the request.', providerResponse.status === 429 ? 503 : 502, 'provider_error');
    }
    return providerPayload.id;
  } catch (error) {
    if (error instanceof FormError) throw error;
    const timedOut = error?.name === 'AbortError';
    console.error('The Resend request failed.', {
      code: timedOut ? 'provider_timeout' : 'provider_error',
      formType: submission.formType,
      submissionId: submission.submissionId,
    });
    throw new FormError(
      timedOut ? 'The email provider timed out.' : 'The email provider could not be reached.',
      timedOut ? 504 : 502,
      timedOut ? 'provider_timeout' : 'provider_error',
    );
  } finally {
    clearTimeout(timeout);
  }
}

async function handler(request, response) {
  if (request.method === 'OPTIONS') {
    response.statusCode = 204;
    response.setHeader('Allow', 'POST, OPTIONS');
    response.setHeader('Cache-Control', 'no-store');
    response.end();
    return;
  }
  if (request.method !== 'POST') {
    sendJson(response, 405, { success: false, code: 'method_not_allowed', message: 'Use POST to submit this form.' }, { Allow: 'POST, OPTIONS' });
    return;
  }
  if (!originIsAllowed(request)) {
    sendJson(response, 403, { success: false, code: 'origin_not_allowed', message: 'This form must be submitted from the Aaditya Creatives website.' });
    return;
  }

  try {
    const raw = await readBody(request);
    if (clean(raw._honey, 200)) throw new FormError('The form could not be submitted.', 400, 'validation_error');
    const submission = buildSubmission(raw);
    const retryAfter = checkRateLimit(request, submission.submissionId);
    if (retryAfter) {
      sendJson(response, 429, { success: false, code: 'rate_limited', message: 'Please wait a few minutes before submitting another request.' }, { 'Retry-After': String(retryAfter) });
      return;
    }
    await deliverEmail(submission);

    const contentType = clean(request.headers['content-type'], 200).toLowerCase();
    const acceptsJson = clean(request.headers.accept, 200).includes('application/json') || contentType.includes('application/json');
    if (!acceptsJson) {
      response.statusCode = 303;
      response.setHeader('Location', `/thank-you/?type=${submission.formType}`);
      response.setHeader('Cache-Control', 'no-store');
      response.end();
      return;
    }
    sendJson(response, 200, { success: true, submissionId: submission.submissionId });
  } catch (error) {
    const status = Number(error?.status) || 500;
    const code = clean(error?.code, 80) || (status < 500 ? 'validation_error' : 'server_error');
    const message = status === 503 && code === 'configuration_error'
      ? 'Email delivery is not configured yet. Please email Aaditya directly.'
      : status >= 500
        ? 'Your request could not be delivered. Please try again shortly.'
        : clean(error?.message, 240) || 'Please review the submitted information.';
    sendJson(response, status, { success: false, code, message });
  }
}

module.exports = handler;
module.exports._resetRateLimits = () => rateBuckets.clear();
module.exports._testRateLimit = checkRateLimit;
module.exports._rateLimitSize = () => rateBuckets.size;
module.exports._constants = { RATE_LIMIT_MAX, RATE_LIMIT_BUCKET_MAX, RATE_LIMIT_WINDOW_MS, MAX_BODY_BYTES };
