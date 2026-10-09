# Aaditya Creatives

A static, responsive portfolio and business website for Aaditya. The site includes Home, About, Services, six service detail pages, Blog, Contact, Free Consultation, and clearly marked Privacy Policy and Terms placeholders. Legacy project and service URLs redirect to the current service directory.

## Edit and preview

- Edit page copy and templates in `build.mjs`.
- Edit visual styles in `dist/style.css` and menu or inquiry behavior in `dist/site.js`.
- Service and consultation images are stored in `dist/images/services/`. Keep their descriptions accurate and use clean, licensed source images.
- Run `node build.mjs` after changing `build.mjs` to regenerate the HTML in `dist/`.
- On Windows, run `.\preview.ps1` to rebuild the site, start the preview server in the background, and verify it at `http://127.0.0.1:4173/`. The link remains available after the terminal command finishes, until the Node process is stopped or the computer restarts.
- Alternatively, run `node server.mjs` for a foreground preview session.
- Review the local preview before committing or pushing website changes to GitHub.

## Details needed before public launch

1. Deploy the site, submit the Contact and Free Consultation forms once, and approve FormSubmit's activation email for `adtiyadahal964@gmail.com`.
2. Submit a second test through each form after activation and confirm the named fields arrive correctly.
3. Replace the SEO placeholder with a clean image that Aaditya owns or is licensed to use. The supplied watermarked SEO image is intentionally excluded.
4. Review and approve the final Privacy Policy and Terms wording for FormSubmit and the business.
5. Keep the verified LinkedIn, Facebook, Instagram, and WhatsApp profile links current.

The Contact and Free Consultation forms use FormSubmit’s AJAX endpoint with its default reCAPTCHA and a honeypot field. After FormSubmit accepts a request, each form shows an inline confirmation and lets the visitor send another enquiry without leaving the page. FormSubmit requires one-time email activation before live forwarding works. There is no analytics or conversion tracking service configured.
