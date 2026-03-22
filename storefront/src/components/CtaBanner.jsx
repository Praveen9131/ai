import { Link } from "react-router-dom";
import { siteConfig } from "../config/site";

/**
 * Full-width gradient CTA above the footer (brand green → gold → forest).
 * Copy: `siteConfig.ctaBanner` / `VITE_CTA_*` env vars.
 */
export default function CtaBanner() {
  const { title, subtitle, buttonLabel, buttonTo } = siteConfig.ctaBanner;

  return (
    <section
      className="w-full bg-gradient-to-r from-brand-green via-brand-gold to-brand-green-dark px-4 py-14 md:px-6 md:py-16"
      aria-labelledby="cta-banner-heading"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
        <h2
          id="cta-banner-heading"
          className="font-heading text-3xl font-bold leading-tight text-brand-green-dark md:text-4xl"
        >
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-base font-normal leading-relaxed text-brand-green-dark/90 md:text-lg">
          {subtitle}
        </p>
        <Link
          to={buttonTo}
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-10 py-3.5 font-heading text-sm font-bold uppercase tracking-wide text-brand-green-dark shadow-md transition hover:bg-brand-cream hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green-dark md:text-base"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
