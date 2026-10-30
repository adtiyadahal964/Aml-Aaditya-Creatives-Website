const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const handler = require('../api/submit-form.js');

const originalFetch = global.fetch;
const originalEnv = {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  FORM_FROM_EMAIL: process.env.FORM_FROM_EMAIL,
  FORM_TO_EMAIL: process.env.FORM_TO_EMAIL,
};
let ipCounter = 10;

function configureEmail() {
  process.env.RESEND_API_KEY = 're_test_key_not_a_real_secret';
  process.env.FORM_FROM_EMAIL = 'Aaditya Creatives <forms@mail.aadityadahal1.com.np>';
  process.env.FORM_TO_EMAIL = 'adtiyadahal964@gmail.com';
}

function request(body, overrides = {}) {
  ipCounter += 1;
  return {
    method: overrides.method || 'POST',
    headers: {
      host: 'www.aadityadahal1.com.np',
      origin: 'https://www.aadityadahal1.com.np',
      accept: 'application/json',
      'content-type': 'application/json',
      'x-forwarded-for': `192.0.2.${ipCounter}`,
      ...(overrides.headers || {}),
    },
    body,
    socket: {},
  };
}

function response() {
  const headers = new Map();
  return {
    statusCode: 200,
    body: '',
    setHeader(name, value) { headers.set(name.toLowerCase(), String(value)); },
    getHeader(name) { return headers.get(name.toLowerCase()); },
    end(value = '') { this.body += value; },
    json() { return this.body ? JSON.parse(this.body) : null; },
  };
}

function baseFields(formType, id = `123e4567-e89b-42d3-a456-426614174${ipCounter}`) {
  return {
    form_type: formType,
    submission_id: id,
    full_name: 'Test Visitor',
    email: 'visitor@example.com',
    source_page: `https://www.aadityadahal1.com.np/${formType}/`,
    submission_date_time: '2026-10-30T10:00:00.000Z',
  };
}

test.beforeEach(() => {
  configureEmail();
  handler._resetRateLimits();
});

test.afterEach(() => {
  global.fetch = originalFetch;
  for (const [name, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
});

test('sends a valid contact form and confirms Resend acceptance', async () => {
  let providerRequest;
  global.fetch = async (url, options) => {
    providerRequest = { url, options };
    return Response.json({ id: 'email_contact_123' });
  };
  const res = response();
  await handler(request({
    ...baseFields('contact'),
    enquiry_type: 'Service enquiry',
    message: 'I would like to discuss a marketing project.',
  }), res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.json().success, true);
  assert.equal(providerRequest.url, 'https://api.resend.com/emails');
  const email = JSON.parse(providerRequest.options.body);
  assert.equal(email.reply_to, 'visitor@example.com');
  assert.equal(email.subject, 'New Contact Message — Aaditya Creatives');
  assert.deepEqual(email.to, ['adtiyadahal964@gmail.com']);
});

test('sends all useful consultation metadata', async () => {
  let email;
  let idempotencyKey;
  global.fetch = async (_url, options) => {
    email = JSON.parse(options.body);
    idempotencyKey = options.headers['Idempotency-Key'];
    return Response.json({ id: 'email_consultation_123' });
  };
  const fields = {
    ...baseFields('consultation', '123e4567-e89b-42d3-a456-426614174000'),
    business_name: 'Example Business',
    website_social: 'https://example.com',
    phone_country_code: '977',
    phone_with_country_code: '+977 9840000000',
    marketing_challenge: 'Generating leads',
    main_goal: 'Build a clearer enquiry process',
    preferred_date: '2026-11-05',
    preferred_time: "I'm flexible",
    timezone: 'Asia/Kathmandu',
  };
  const res = response();
  await handler(request(fields), res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.json().success, true);
  assert.equal(idempotencyKey, 'aaditya-consultation-123e4567-e89b-42d3-a456-426614174000');
  assert.match(email.text, /Example Business/);
  assert.match(email.text, /\+977 9840000000/);
  assert.match(email.text, /Asia\/Kathmandu/);
});

test('rejects invalid submissions before calling Resend', async () => {
  global.fetch = async () => assert.fail('Invalid input must not reach Resend.');
  const res = response();
  await handler(request({ ...baseFields('contact'), enquiry_type: '', message: 'short' }), res);
  assert.equal(res.statusCode, 400);
  assert.equal(res.json().code, 'validation_error');
});

test('rejects requests from a different origin', async () => {
  global.fetch = async () => assert.fail('Cross-origin input must not reach Resend.');
  const res = response();
  await handler(request({ ...baseFields('contact'), enquiry_type: 'Other', message: 'A long enough message.' }, {
    headers: { origin: 'https://example.net' },
  }), res);
  assert.equal(res.statusCode, 403);
  assert.equal(res.json().code, 'origin_not_allowed');
});

test('rejects unsupported request methods', async () => {
  global.fetch = async () => assert.fail('GET requests must not reach Resend.');
  const res = response();
  await handler(request({}, { method: 'GET' }), res);
  assert.equal(res.statusCode, 405);
  assert.equal(res.getHeader('allow'), 'POST, OPTIONS');
});

test('rejects a completed honeypot without sending email', async () => {
  global.fetch = async () => assert.fail('Honeypot submissions must not reach Resend.');
  const res = response();
  await handler(request({ ...baseFields('contact'), _honey: 'bot value', enquiry_type: 'Other', message: 'A long enough message.' }), res);
  assert.equal(res.statusCode, 400);
  assert.equal(res.json().success, false);
});

test('rejects oversized requests', async () => {
  global.fetch = async () => assert.fail('Oversized input must not reach Resend.');
  const res = response();
  await handler(request({}, { headers: { 'content-length': String(70 * 1024) } }), res);
  assert.equal(res.statusCode, 413);
  assert.equal(res.json().code, 'payload_too_large');
});

test('rejects an oversized pre-parsed request body', async () => {
  global.fetch = async () => assert.fail('Oversized parsed input must not reach Resend.');
  const res = response();
  await handler(request({ oversized: 'x'.repeat(handler._constants.MAX_BODY_BYTES) }), res);
  assert.equal(res.statusCode, 413);
  assert.equal(res.json().code, 'payload_too_large');
});

test('reports missing environment configuration', async () => {
  delete process.env.RESEND_API_KEY;
  delete process.env.FORM_FROM_EMAIL;
  delete process.env.FORM_TO_EMAIL;
  global.fetch = async () => assert.fail('Resend must not be called without configuration.');
  const res = response();
  await handler(request({ ...baseFields('contact'), enquiry_type: 'General question', message: 'This is a valid contact message.' }), res);
  assert.equal(res.statusCode, 503);
  assert.equal(res.json().code, 'configuration_error');
});

test('rejects an invalid sender before calling Resend', async () => {
  process.env.FORM_FROM_EMAIL = 'not-an-email-address';
  global.fetch = async () => assert.fail('Resend must not be called with an invalid sender.');
  const res = response();
  await handler(request({ ...baseFields('contact'), enquiry_type: 'General question', message: 'This is a valid contact message.' }), res);
  assert.equal(res.statusCode, 503);
  assert.equal(res.json().code, 'configuration_error');
});

test('reports provider rejection without claiming success', async () => {
  global.fetch = async () => Response.json({ name: 'validation_error' }, { status: 403, headers: { 'x-request-id': 'provider-request-1' } });
  const res = response();
  await handler(request({ ...baseFields('contact'), enquiry_type: 'General question', message: 'This is a valid contact message.' }), res);
  assert.equal(res.statusCode, 502);
  assert.equal(res.json().success, false);
  assert.equal(res.json().code, 'provider_error');
});

test('reports provider timeout without claiming success', async () => {
  global.fetch = async () => { const error = new Error('aborted'); error.name = 'AbortError'; throw error; };
  const res = response();
  await handler(request({ ...baseFields('contact'), enquiry_type: 'General question', message: 'This is a valid contact message.' }), res);
  assert.equal(res.statusCode, 504);
  assert.equal(res.json().code, 'provider_timeout');
});

test('supports native URL-encoded submissions and redirects only after acceptance', async () => {
  global.fetch = async () => Response.json({ id: 'email_native_123' });
  const body = new URLSearchParams({
    ...baseFields('contact', '123e4567-e89b-42d3-a456-426614174555'),
    enquiry_type: 'General question',
    message: 'This is a valid native form message.',
  }).toString();
  const res = response();
  await handler(request(body, {
    headers: {
      accept: 'text/html',
      'content-type': 'application/x-www-form-urlencoded',
    },
  }), res);
  assert.equal(res.statusCode, 303);
  assert.equal(res.getHeader('location'), '/thank-you/?type=contact');
});

test('requires details when the consultation challenge is Other', async () => {
  global.fetch = async () => assert.fail('Incomplete Other details must not reach Resend.');
  const res = response();
  await handler(request({
    ...baseFields('consultation'),
    marketing_challenge: 'Other',
    other_challenge: '',
    preferred_time: "I'm flexible",
  }), res);
  assert.equal(res.statusCode, 400);
  assert.equal(res.json().code, 'validation_error');
});

test('rate limits repeated requests from the same source', async () => {
  global.fetch = async () => Response.json({ id: 'email_rate_test' });
  const sharedHeaders = { 'x-forwarded-for': '198.51.100.24' };
  for (let index = 0; index < handler._constants.RATE_LIMIT_MAX; index += 1) {
    const res = response();
    await handler(request({
      ...baseFields('contact', `123e4567-e89b-42d3-a456-4266141740${index}0`),
      enquiry_type: 'General question',
      message: 'This is a valid contact message.',
    }, { headers: sharedHeaders }), res);
    assert.equal(res.statusCode, 200);
  }
  const blocked = response();
  await handler(request({
    ...baseFields('contact', '123e4567-e89b-42d3-a456-426614174099'),
    enquiry_type: 'General question',
    message: 'This is a valid contact message.',
  }, { headers: sharedHeaders }), blocked);
  assert.equal(blocked.statusCode, 429);
  assert.equal(blocked.json().code, 'rate_limited');
  assert.ok(Number(blocked.getHeader('retry-after')) > 0);
});

test('uses the same idempotency key when a submission is retried', async () => {
  const keys = [];
  global.fetch = async (_url, options) => {
    keys.push(options.headers['Idempotency-Key']);
    return Response.json({ id: 'email_same_request' });
  };
  const fields = { ...baseFields('contact', '123e4567-e89b-42d3-a456-426614174777'), enquiry_type: 'Other', message: 'This is a valid repeated message.' };
  const sameSource = { headers: { 'x-forwarded-for': '203.0.113.77' } };
  await handler(request(fields, sameSource), response());
  await handler(request(fields, sameSource), response());
  assert.equal(keys.length, 2);
  assert.equal(keys[0], keys[1]);
});

test('cleans expired rate-limit entries during a later request', () => {
  const originalNow = Date.now;
  try {
    Date.now = () => 1_000;
    handler._testRateLimit(request({}, { headers: { 'x-forwarded-for': '198.51.100.1' } }), '123e4567-e89b-42d3-a456-426614174001');
    assert.equal(handler._rateLimitSize(), 1);

    Date.now = () => 1_000 + handler._constants.RATE_LIMIT_WINDOW_MS + 1;
    handler._testRateLimit(request({}, { headers: { 'x-forwarded-for': '198.51.100.2' } }), '123e4567-e89b-42d3-a456-426614174002');
    assert.equal(handler._rateLimitSize(), 1);
  } finally {
    Date.now = originalNow;
  }
});

test('caps the number of in-memory rate-limit buckets', () => {
  for (let index = 0; index < handler._constants.RATE_LIMIT_BUCKET_MAX + 25; index += 1) {
    handler._testRateLimit(request({}, { headers: { 'x-forwarded-for': `198.51.${Math.floor(index / 256)}.${index % 256}` } }), `123e4567-e89b-42d3-a456-${String(index).padStart(12, '0')}`);
  }
  assert.ok(handler._rateLimitSize() <= handler._constants.RATE_LIMIT_BUCKET_MAX);
});

test('client keeps one ID for automatic retry and clears it after a failed submission is edited', () => {
  const client = readFileSync(join(__dirname, '..', 'dist', 'site.js'), 'utf8');
  const idCreation = client.indexOf("if (submissionIdField && !submissionIdField.value)");
  const requestCreation = client.indexOf('const submitRequest = async () =>');
  const firstRequest = client.indexOf('let response = await submitRequest()', requestCreation);
  const automaticRetry = client.indexOf('response = await submitRequest()', firstRequest + 1);
  assert.ok(idCreation > -1 && idCreation < requestCreation);
  assert.ok(firstRequest > requestCreation && automaticRetry > firstRequest);
  assert.doesNotMatch(client.slice(requestCreation, automaticRetry), /submissionIdField\.value\s*=/);
  assert.match(client, /form\.dataset\.submissionFailed === 'true'[\s\S]*submissionIdField\.value = ''/);
  assert.match(client, /form\.dataset\.submissionFailed = 'true'/);
  assert.doesNotMatch(client, /response\.status === 429 \|\| response\.status >= 500/);
});
