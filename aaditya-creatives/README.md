# Aaditya Creatives

A static, responsive portfolio and business website for Aaditya. The site has nine English routes and matching Nepali routes under `/ne/`: Home, About, Services, Projects, Blog, Contact, Free Consultation, and clearly marked Privacy Policy and Terms placeholders.

## Edit and preview

- Edit English page copy and templates in `build.mjs`. Add the matching Nepali text in `ne-translations.mjs`.
- Edit visual styles in `dist/style.css` and menu or inquiry behavior in `dist/site.js`.
- The shared Home and About hero image is `dist/hero-workspace.jpg`. Replace it with a supplied portrait or brand photograph when one is available, keeping the image descriptions accurate.
- Run `node build.mjs` after changing `build.mjs` to regenerate the HTML in `dist/`.
- Run `CHECK_TRANSLATIONS=1 node build.mjs` in a Unix shell, or set `$env:CHECK_TRANSLATIONS='1'` before running the build in PowerShell, to list untranslated strings. Brand names and technical values may remain in English.
- Run `node server.mjs` to preview at `http://127.0.0.1:4173/`.

## Details needed before public launch

1. A real scheduling URL or inbox for the free consultation. The consultation form currently validates and prepares a local, copyable request; it does not send or reserve a time.
2. A real contact email or other preferred contact channel. The current inquiry form only prepares text locally; it does not transmit data.
3. Genuine project details and assets, with each entry identified as practice, personal, academic, demo, or verified client work.
4. Any approved testimonials, logos, credentials, and results that may be published.
5. Reviewed privacy and terms documents suitable for the tools and services actually used.
6. DNS access for `aadityadahal1.com.np` if the custom domain should be connected to this deployment.
7. Profile URLs for Facebook, Instagram, LinkedIn, YouTube, and WhatsApp. The footer lists the platforms as text until the real links are provided.

There is no analytics service, conversion tracking service, booking integration, or form backend configured. Consultation links have a `data-conversion` hook for future tracking. The English/Nepali switch links to real translated static pages and preserves the chosen language while navigating.
