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

/** Dark footer — navy panel, brand gold top accent */
const FOOTER_BG = "bg-[#111827]";
const ACCENT_TOP = "border-t-2 border-brand-gold";
/** Accent icons — brand green on dark footer */
const ICON_ACCENT = "text-brand-green";

/** Poppins Bold 700 — section headers (same line-height across columns) */
const sectionTitleClass =
  "font-heading text-xs font-bold uppercase leading-snug tracking-[0.12em] text-white md:text-sm";

/** Space from section title to first list item — unified */
const SECTION_BODY_TOP = "mt-5";

/** Inter Regular 400 */
const linkClass =
  "font-body text-sm font-normal text-white/95 transition-colors hover:text-white";

const socialLinkClass =
  "inline-flex items-center gap-2.5 font-body text-sm font-normal text-white/95 transition-colors hover:text-white";

export default function Footer() {
  const {
    brandName,
    footerDisplayTitle,
    footerBullets,
    footerDescription,
    social,
    socialColumnTitle,
    copyrightUseSplit,
    copyrightBoldSegment,
    copyrightAfterBold,
    footerLogoLight,
  } = siteConfig;

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Menu" },
    { to: "/about", label: "About" },
    { to: "/shop", label: "Gallery" },
    { to: "/contact", label: "Contact Us" },
    { to: "/cart", label: "My Orders" },
  ];

  const year = new Date().getFullYear();

  return (
    <footer
      className={`mt-auto ${ACCENT_TOP} ${FOOTER_BG} font-body text-slate-300`}
    >
      {/* Full width, symmetric horizontal padding — no max-width centering */}
      <div className="w-full px-4 py-12 sm:px-5 md:py-14 md:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 justify-items-stretch gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:grid-cols-4 lg:items-start lg:gap-x-8 xl:gap-x-12">
          {/* Brand */}
          <div className="w-full min-w-0 max-w-md text-left md:max-w-none lg:max-w-md">
            {/* Circular mark only — transparent outside; object-contain avoids “white disc” crop */}
            <Link
              to="/"
              className="group inline-flex rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
            >
              <span className="flex h-[5.25rem] w-[5.25rem] shrink-0 items-center justify-center overflow-hidden rounded-full bg-transparent md:h-24 md:w-24">
                <img
                  src="/logo.png"
                  alt={brandName}
                  width="96"
                  height="96"
                  className={`max-h-full max-w-full object-contain object-center transition-transform duration-200 group-hover:scale-[1.04] ${
                    footerLogoLight
                      ? "brightness-0 invert opacity-95 group-hover:opacity-100"
                      : ""
                  }`}
                />
              </span>
            </Link>
            <p
              className={`font-heading text-lg font-bold leading-snug text-white md:text-xl ${SECTION_BODY_TOP}`}
            >
              {footerDisplayTitle}
            </p>
            <p className="mt-2 font-subheading text-sm font-medium text-slate-400">
              {footerBullets.join(" • ")}
            </p>
            <p className="mt-3 text-sm font-normal leading-relaxed text-slate-300 md:mt-4">
              {footerDescription}
            </p>
          </div>

          {/* Quick links */}
          <div className="w-full min-w-0 text-left">
            <p className={sectionTitleClass}>Quick Links</p>
            <ul className={`${SECTION_BODY_TOP} flex flex-col gap-3.5`}>
              {quickLinks.map(({ to, label }) => (
                <li key={`${to}-${label}`}>
                  <Link to={to} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="w-full min-w-0 text-left">
            <p className={sectionTitleClass}>Contact Us</p>
            <ul className={`${SECTION_BODY_TOP} flex flex-col gap-4 text-sm font-normal`}>
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center gap-3 font-body text-white/95 transition-colors hover:text-white"
                >
                  <Phone
                    className={`h-4 w-4 shrink-0 ${ICON_ACCENT}`}
                    aria-hidden
                    strokeWidth={2}
                  />
                  <span>{siteConfig.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.emailHref}
                  className="flex items-center gap-3 break-words font-body text-white/95 transition-colors hover:text-white"
                >
                  <Mail
                    className="h-4 w-4 shrink-0 text-white"
                    aria-hidden
                    strokeWidth={2}
                  />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 font-body text-white/95">
                <MapPin
                  className={`mt-0.5 h-4 w-4 shrink-0 ${ICON_ACCENT}`}
                  aria-hidden
                  strokeWidth={2}
                />
                <span>{siteConfig.address}</span>
              </li>
            </ul>
          </div>

          {/* Social — vertical stack so rows align evenly (no 2+1 wrap) */}
          <div className="w-full min-w-0 text-left">
            <p className={sectionTitleClass}>{socialColumnTitle}</p>
            <ul className={`${SECTION_BODY_TOP} flex flex-col gap-3.5`}>
              <li>
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className={socialLinkClass}
                >
                  <Facebook className={`h-4 w-4 shrink-0 ${ICON_ACCENT}`} aria-hidden />
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className={socialLinkClass}
                >
                  <Instagram className={`h-4 w-4 shrink-0 ${ICON_ACCENT}`} aria-hidden />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className={socialLinkClass}
                >
                  <Twitter className={`h-4 w-4 shrink-0 ${ICON_ACCENT}`} aria-hidden />
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-600/80 pt-8 md:mt-14">
          <p className="text-center text-sm font-normal text-slate-400">
            {copyrightUseSplit ? (
              <>
                © {year}{" "}
                <span className="font-bold text-slate-300">
                  {copyrightBoldSegment}
                </span>{" "}
                {copyrightAfterBold} All rights reserved.
              </>
            ) : (
              <>
                © {year} {brandName}. All rights reserved.
              </>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
