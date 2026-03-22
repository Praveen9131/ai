# Zaanvi Organics — React storefront (Vite)

## Typography

Google Fonts are loaded in `src/index.css`. Tailwind families in `tailwind.config.js`:

| Role        | Font              | Typical use                          | Tailwind                          |
|------------|-------------------|--------------------------------------|-----------------------------------|
| Heading    | Playfair Display  | `h1`–`h4`, display titles            | `font-heading` + `font-bold`      |
| Body / UI  | Lato              | paragraphs, nav, labels, buttons     | `font-body` (default on `body`)   |
| Subheading | Lato              | same stack as body for utilities     | `font-subheading`                 |

Base styles: all `h1`–`h4` use **Playfair** + bold unless a component overrides with utilities.

## Brand colors (`tailwind.config.js`)

| Token | Hex | Notes |
|-------|-----|--------|
| `brand-green` | `#5C8A5C` | Primary green |
| `brand-green-dark` | `#3F6B3F` | Darker green — primary CTA (e.g. Order Now) |
| `brand-gold` | `#D4A96A` | Warm gold accents |
| `brand-gold-rich` | `#C4833A` | Rich gold — nav wordmark / accents |
| `brand-cream` | `#FDF8F2` | Soft cream backgrounds |
| `brand-dark` | `#2C2C2C` | Body text |
| `brand-light` | `#EAF2EA` | Borders / soft fills |

## Run locally

From this directory (`ai/storefront/`):

```bash
npm install
npm run dev
```

`node_modules` is not committed. If you see `vite: not found`, run **`npm install`** again (include **devDependencies** — do not use `npm install --omit=dev` for local dev).

See **`../../README.md`** (workspace root) for where this project lives. The storefront is **only** in this folder—not duplicated at the repo root.

## Product & hero images

Product photos use **remote URLs** from [Unsplash](https://unsplash.com/license) (not Google Image search — hotlinking random results breaks and often violates copyright).

- **Per-product URLs:** `src/data/products.js` (`image` on each product).
- **Hero, About, & “Why Zaanvi” images:** `src/config/stockImages.js` (hero poster, about story, and a default Unsplash bowl photo for the split section — override with `VITE_WHY_CHOOSE_IMAGE_URL`).
- **Logo:** Served as `public/logo.png`. The **navbar** and **footer** use a **round crop** of the **center** of that file (`BrandLogoMark.jsx`: `object-cover` + zoom). After editing `logo.png` at the project root, copy it into `public/` (or edit `public/logo.png` directly).
- **Home hero video:** `public/hero-video.mp4` (replace this file to change the clip; you can keep a source `.mp4` next to `package.json` and copy into `public/` when updating).

For production, replace these with your own assets (e.g. files in `public/` or your CDN) and update the URLs.

### Hero video notes

- The hero `<video>` is **muted** + **loop** + **`playsInline`** so mobile browsers allow autoplay.
- If the user enables **prefers-reduced-motion**, the video is hidden and the static hero image from `stockImages.js` is shown instead.

## CTA banner (above footer)

Full-width **sky → blue** gradient with title, subtitle, and CTA button (`src/components/CtaBanner.jsx`). Copy and path: `siteConfig.ctaBanner` / `VITE_CTA_*` in `.env.example`.

## Footer & public contact

Footer is **light** (`bg-white`, top border `brand-light`): logo + tagline, **Explore** (Shop / About / Contact), **Follow** (Instagram / Facebook from env), centered copyright. `src/components/Footer.jsx`. Social URLs: `src/config/site.js` + **`VITE_SITE_*`** (see `.env.example`).

## Tests

```bash
npm test
```
