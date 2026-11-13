# مؤسسة السبيعي للمقاولات العامة

Arabic (RTL) business website for **حداد مظلات سواتر سندويش بنل 0530635308 | مؤسسة السبيعي للمقاولات العامة** — laser-cut steel doors, shades, privacy screens, warehouses, hangars and sandwich panel work across Riyadh.

## Features

- Landing page with hero, six service cards, "why us", Riyadh coverage areas and a quote-request form
- A detail page for each service at `/services/<id>`
- Click-to-call and WhatsApp buttons (header, hero, floating buttons)
- Quote requests are collected with Netlify Forms (form name `quote-request`)
- Images served through the Netlify Image CDN as resized WebP

## Tech

TanStack Start (React 19), Tailwind CSS v4, Netlify Forms, Netlify Image CDN, Cairo font.

## Run locally

```bash
pnpm install
netlify dev
```

Form submissions are only processed on a deployed Netlify site. View them in the Netlify dashboard under **Forms**.

## Editing content

- Business name, phone, WhatsApp, benefits: `src/data/site.ts`
- Services (text, features, images): `src/data/products.ts`
- Images: `public/img/`
