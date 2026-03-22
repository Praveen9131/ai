/**
 * Public marketing copy and contact details for the storefront footer (and reuse).
 * Override in production via Vite env — never commit secrets.
 */
const env = import.meta.env;

/** Split "A • B • C" into ["A","B","C"] */
function splitBullets(raw) {
  return raw
    .split("•")
    .map((s) => s.trim())
    .filter(Boolean);
}

const defaultEmail = "hello@zaanviorganics.com";
const email = env.VITE_PUBLIC_EMAIL ?? defaultEmail;

export const siteConfig = {
  brandName: env.VITE_SITE_BRAND_NAME ?? "Zaanvi Organics",
  /** Short kicker line, e.g. Organic • Trimester-wise • Hyderabad */
  footerBullets: splitBullets(
    env.VITE_SITE_FOOTER_BULLETS ?? "Organic • Trimester-wise • Made for Maa",
  ),
  footerDescription:
    env.VITE_SITE_FOOTER_DESCRIPTION ??
    "Your trusted source for trimester-wise millet nutrition — crafted with care in Hyderabad. Fresh ingredients, authentic whole grains, and transparent sourcing for every mother.",
  phoneDisplay: env.VITE_PUBLIC_PHONE_DISPLAY ?? "+91 90000 00000",
  phoneHref: env.VITE_PUBLIC_PHONE_HREF ?? "tel:+919000000000",
  email,
  emailHref: env.VITE_PUBLIC_EMAIL_HREF ?? `mailto:${email}`,
  address: env.VITE_PUBLIC_ADDRESS ?? "Hyderabad, Telangana, India",
  social: {
    facebook: env.VITE_PUBLIC_FACEBOOK_URL ?? "https://facebook.com",
    instagram: env.VITE_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com",
    twitter: env.VITE_PUBLIC_TWITTER_URL ?? "https://twitter.com",
  },
  /** Footer column heading above social links */
  socialColumnTitle: env.VITE_SITE_SOCIAL_COLUMN_TITLE ?? "Follow Us",
  /**
   * Footer hero line (reference layout). Defaults to full brand name.
   * Example SeaSide: same as brandName; split copyright below for © line emphasis.
   */
  footerDisplayTitle: env.VITE_SITE_FOOTER_TITLE ?? env.VITE_SITE_BRAND_NAME ?? "Zaanvi Organics",
  /**
   * © line: default is `© {year} {brandName}. All rights reserved.` (single grey line).
   * Set `VITE_SITE_COPYRIGHT_USE_SPLIT=true` for SeaSide-style bold first word.
   */
  copyrightUseSplit:
    String(env.VITE_SITE_COPYRIGHT_USE_SPLIT ?? "").toLowerCase() === "true",
  copyrightBoldSegment: env.VITE_SITE_COPYRIGHT_BOLD ?? "Zaanvi",
  copyrightAfterBold: env.VITE_SITE_COPYRIGHT_AFTER_BOLD ?? "Organics.",
  /** Set `VITE_FOOTER_LOGO_LIGHT=true` to invert the circular footer logo on the dark bar. */
  footerLogoLight:
    String(env.VITE_FOOTER_LOGO_LIGHT ?? "").toLowerCase() === "true",

  /** Full-width CTA strip above the footer (gradient banner). */
  ctaBanner: {
    title: env.VITE_CTA_TITLE ?? "Ready to Order?",
    subtitle:
      env.VITE_CTA_SUBTITLE ??
      "Join thousands of families who trust trimester-wise millet nutrition — experience organic blends crafted with care in Hyderabad.",
    buttonLabel: env.VITE_CTA_BUTTON_LABEL ?? "Order Now",
    buttonTo: env.VITE_CTA_BUTTON_PATH ?? "/shop",
  },
};
