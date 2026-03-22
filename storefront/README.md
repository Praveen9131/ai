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

## Shop filters & product data

- **Layout:** **Filters** live in a **left sidebar** on large screens; on small screens use the **Filters** button (bottom sheet). A **search** field above the grid filters by name, description, tag, category, use cases, and audiences.
- **Journey stage** links in the sidebar map to `?filter=` (trimesters, postpartum, kits).
- **Wellness focus** links use `?audience=` (`pregnancy`, `diabetic`, `wellness`). Params combine (e.g. `/shop?filter=2&audience=diabetic`).
- Each product in `src/data/products.js` is merged with **`audiences`** and **`useCases`** from `PRODUCT_ENRICH`.

## Product guide (demo chat)

On **product detail** pages: a short **tick chime** and an **invite**; **Ask Zaanvi** opens a **full-height overlay** with a **50/50 split**: **left** = product summary (cream panel, stat cards, use-case checklist); **right** = **Zaanvi — Nutrition AI** chat with quick-reply chips and orange-accent input (`ProductAssistantChat.jsx`). On small screens the product block stacks above the assistant. Replace demo replies with a real API when ready.

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

## Deploy on Vercel

- **Root directory:** If the repo root is *above* this app (e.g. `shopify/` containing `ai/storefront/`), set the Vercel project **Root Directory** to **`ai/storefront`** and **Install Command** / **Build Command** / **Output Directory** accordingly (`npm install`, `npm run build`, `dist`).
- **Why `/admin` was 404:** Vite is an SPA — opening `https://yoursite.vercel.app/admin` asks the CDN for a file named `admin`, which does not exist. **`vercel.json`** adds a rewrite so unknown paths serve **`index.html`** and React Router can render `/admin`.
- After adding or changing `vercel.json`, trigger a **new deployment**.
- **Admin gate:** Optional env **`VITE_ADMIN_PASSWORD`** (see `.env.example`). If unset, the default in `PasswordGate` applies. This is still checked in the browser only — not a substitute for server-side auth.

## Tests

```bash
npm test
```
