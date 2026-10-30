# Aaditya Creatives

A static, responsive portfolio and business website for Aaditya. The site includes Home, About, Services, six service detail pages, Blog, Contact, Free Consultation, and clearly marked Privacy Policy and Terms placeholders. Legacy project and service URLs redirect to the current service directory.

## Edit and preview

- Edit page copy and templates in `build.mjs`.
- Edit visual styles in `dist/style.css` and menu or inquiry behavior in `dist/site.js`.
- Service and consultation images are stored in `dist/images/services/`. Keep their descriptions accurate and use clean, licensed source images.
- Run `node build.mjs` after changing `build.mjs` to regenerate the HTML in `dist/`.
- Run `npm test` to test the server-side form validation and email-delivery behavior without sending real email.
- On Windows, run `.\preview.ps1` to rebuild the site, start the preview server in the background, and verify it at `http://127.0.0.1:4173/`. The link remains available after the terminal command finishes, until the Node process is stopped or the computer restarts.
- Alternatively, run `node server.mjs` for a foreground preview session.
- Review the local preview before committing or pushing website changes to GitHub.

## Form delivery

The Contact and Free Consultation forms post to the same-origin Vercel Function at `/api/submit-form`. The function validates the request and sends email through Resend. The browser displays success only after Resend returns an accepted email ID.

Configure these variables in the Aaditya Creatives Vercel project for Production and any Preview environment used for form testing:

- `RESEND_API_KEY` — store as a secret.
- `FORM_FROM_EMAIL` — a sender address on a domain verified in Resend.
- `FORM_TO_EMAIL` — the inbox that receives form submissions.

Never place the API key in browser code, generated HTML, Git, or a public environment variable. Environment changes require a new Vercel deployment. The endpoint includes server-side validation, a honeypot, a 64 KB body limit, an eight-second provider timeout, a best-effort per-instance rate limit, and a Resend idempotency key. Configure a Vercel Firewall rate-limit rule for `/api/submit-form` if durable rate limiting is required across serverless instances.

## Details needed before public launch

1. Configure the three form environment variables and redeploy the production site.
2. Submit one Contact request and one Free Consultation request, then confirm both appear in Vercel logs, Resend, and the configured inbox.
3. Replace the SEO placeholder with a clean image that Aaditya owns or is licensed to use. The supplied watermarked SEO image is intentionally excluded.
4. Review and approve the final Privacy Policy and Terms wording for the business.
5. Keep the verified LinkedIn, Facebook, Instagram, and WhatsApp profile links current.
