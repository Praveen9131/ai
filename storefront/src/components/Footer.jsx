import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { siteConfig } from "../config/site";
import BrandLogoMark from "./BrandLogoMark.jsx";

/**
 * Dark four-column footer (brand, quick links, contact, social) with gold top accent.
 * Copy and URLs from `siteConfig` / `VITE_*` env vars.
 */
export default function Footer() {
  const {
    brandName,
    footerBullets,
    footerDescription,
    phoneDisplay,
    phoneHref,
    email,
    emailHref,
    address,
    social,
    socialColumnTitle,
    quickLinksTitle,
    contactColumnTitle,
    footerQuickLinks,
  } = siteConfig;

  const tagline = footerBullets.join(" • ");

  return (
    <footer className="mt-auto border-t-4 border-amber-400 bg-slate-900 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="inline-flex max-w-full flex-col rounded-3xl bg-white p-5 shadow-md ring-1 ring-slate-200/90 md:rounded-[1.75rem] md:p-6">
              <Link
                to="/"
                className="group flex flex-col items-start gap-4 focus-visible:outline focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white md:gap-5"
                aria-label={`${brandName} home`}
              >
                <BrandLogoMark size="lg" />
                <span className="font-heading text-2xl font-black leading-tight tracking-tight text-black md:text-3xl">
                  {brandName}
                </span>
              </Link>
            </div>
            <p className="mt-5 text-sm font-medium text-slate-300">{tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              {footerDescription}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-wider text-white">
              {quickLinksTitle}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm font-medium text-slate-200">
              {footerQuickLinks.map(({ label, to }) => (
                <li key={to + label}>
                  <Link
                    to={to}
                    className="transition hover:text-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-wider text-white">
              {contactColumnTitle}
            </p>
            <ul className="mt-4 flex flex-col gap-4 text-sm text-slate-200">
              <li>
                <a
                  href={phoneHref}
                  className="flex items-start gap-3 transition hover:text-white"
                >
                  <Phone
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
                    aria-hidden
                  />
                  <span>{phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={emailHref}
                  className="flex items-start gap-3 break-all transition hover:text-white"
                >
                  <Mail
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
                    aria-hidden
                  />
                  <span>{email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400"
                  aria-hidden
                />
                <span>{address}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-wider text-white">
              {socialColumnTitle}
            </p>
            <ul className="mt-4 flex flex-col gap-3 text-sm font-medium text-slate-200">
              <li>
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <Facebook
                    className="h-5 w-5 shrink-0 text-emerald-400"
                    aria-hidden
                  />
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <Instagram
                    className="h-5 w-5 shrink-0 text-emerald-400"
                    aria-hidden
                  />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <Twitter
                    className="h-5 w-5 shrink-0 text-emerald-400"
                    aria-hidden
                  />
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-700/80 pt-8">
          <p className="text-center text-xs text-slate-500">
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
