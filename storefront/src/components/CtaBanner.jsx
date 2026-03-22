import { Link } from "react-router-dom";
import { siteConfig } from "../config/site";

/**
 * Full-width CTA above the footer (sky → ocean blue).
 * Copy: `siteConfig.ctaBanner` / `VITE_CTA_*` env vars.
 */
export default function CtaBanner() {
  const { title, subtitle, buttonLabel, buttonTo } = siteConfig.ctaBanner;

  return (
    <section
      className="w-full bg-gradient-to-r from-sky-400 via-sky-500 to-blue-900 px-4 py-14 md:px-6 md:py-16"
      aria-labelledby="cta-banner-heading"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
        <h2
          id="cta-banner-heading"
          className="font-heading text-3xl font-bold leading-tight text-slate-900 md:text-4xl"
        >
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-base font-normal leading-relaxed text-blue-950/85 md:text-lg">
          {subtitle}
        </p>
        <Link
          to={buttonTo}
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-10 py-3.5 font-heading text-sm font-bold uppercase tracking-wide text-blue-900 shadow-md transition hover:bg-slate-50 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 md:text-base"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
