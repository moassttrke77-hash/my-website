# Al-Subaie General Contracting website

Arabic, right-to-left (`<html lang="ar" dir="rtl">`) marketing site for a Riyadh steel/contracting business. No database, auth, or payments.

## Structure

- `src/data/site.ts` — business name (full SEO title + `shortName`), phone (`phone`, `phoneIntl`), WhatsApp link, benefits, form config. Root `<title>`/description come from here.
- `src/data/products.ts` — the six services (string `id` slugs used in URLs, Arabic copy, features, image path). Named "products" for historic template reasons; treat as services.
- `src/components/Layout.tsx` — shared header, footer, floating call/WhatsApp buttons, icons.
- `src/components/MarketingPage.tsx` — home page sections (`#services`, `#why`, `#areas`, `#enquiry`).
- `src/components/ProductPage.tsx` + `src/routes/services/$serviceId.tsx` — service detail pages; unknown ids → `notFound()`.
- `src/components/EnquiryForm.tsx` — quote-request form posting URL-encoded data to `/__forms.html`.
- `public/__forms.html` — static Netlify Forms registration for `quote-request`. Keep its fields in sync with the React form (form-name, subject, service-id, service-name, name, phone, district, message, bot-field).
- `src/lib/image.ts` — `cdn(src, width)` helper; always render images through it (Netlify Image CDN, WebP).
- `public/img/` — AI-generated photos (hero + one per service).

## Conventions

- All user-facing copy is Arabic. Wrap phone numbers in `dir="ltr"`.
- Theme colors (`steel-*`, `spark-*`) and the Cairo font are defined in `src/styles.css` `@theme`. Buttons use `.action` / `.action-ghost`.
- Don't invent business facts (years, project counts, prices) — confirm with the owner first.
- TypeScript stays on 6 (Netlify adapter build tooling needs it).
