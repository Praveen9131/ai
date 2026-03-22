# Zaanvi Organics — React storefront (Vite)

## Typography

Google Fonts are loaded in `src/index.css`. Tailwind families in `tailwind.config.js`:

| Role        | Font    | Weight | Tailwind                          |
|------------|---------|--------|-----------------------------------|
| Heading    | Poppins | 700    | `font-heading` + `font-bold`    |
| Subheading | Poppins | 500    | `font-subheading` + `font-medium` |
| Body       | Inter   | 400    | `font-body` + `font-normal` (default on `body`) |

Base styles: `h1`/`h2` use heading + bold; `h3`/`h4` use subheading + medium (components often override with explicit utilities).

## Brand colors (`tailwind.config.js`)

| Token | Hex | RGB |
|-------|-----|-----|
| `brand-green-dark` | `#237227` | `rgb(35, 114, 39)` |
| `brand-green` | `#519A66` | `rgb(81, 154, 102)` |
| `brand-gold` / `brand-gold-rich` | `#FFAA00` | `rgb(255, 170, 0)` |
| `brand-cream` | `#FFD786` | `rgb(255, 215, 134)` |

Supporting: `brand-dark` (same as `green-dark` for text ink), `brand-light` (soft mint `#E6F0EA` for borders/hover).

## Run locally

```bash
npm install
npm run dev
```

## Product & hero images

Product photos use **remote URLs** from [Unsplash](https://unsplash.com/license) (not Google Image search — hotlinking random results breaks and often violates copyright).

- **Per-product URLs:** `src/data/products.js` (`image` on each product).
- **Hero, About, & “Why choose us” images:** `src/config/stockImages.js` (`whyChooseUsImage` for the home split section).
- **Home hero video:** `public/hero-video.mp4` (replace this file to change the clip; source can be `Video_Generation_Request.mp4` in the repo root — copy into `public/` after edits).

For production, replace these with your own assets (e.g. files in `public/` or your CDN) and update the URLs.

### Hero video notes

- The hero `<video>` is **muted** + **loop** + **`playsInline`** so mobile browsers allow autoplay.
- If the user enables **prefers-reduced-motion**, the video is hidden and the static hero image from `stockImages.js` is shown instead.

## CTA banner (above footer)

A full-width **brand gradient** (green → gold → forest) with **Ready to Order?** / subtitle / **Order Now** sits above the footer (`src/components/CtaBanner.jsx`). Copy and path: `siteConfig.ctaBanner` / `VITE_CTA_*` in `.env.example`.

## Footer & public contact

Footer layout (dark `#111827`, **thin sky-500** top border, **round cropped logo**, **four columns** on `lg` — brand, Quick Links, Contact Us, **Follow Us** (social), purple accent icons, copyright `© {year} {brandName}.`) is in `src/components/Footer.jsx`. Config: `src/config/site.js` + **`VITE_*`** (see `.env.example`). `VITE_SITE_SOCIAL_COLUMN_TITLE` sets the social column heading; `VITE_FOOTER_LOGO_LIGHT=true` inverts the circular logo.

## Tests

```bash
npm test
```
