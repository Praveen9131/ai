import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { siteConfig } from "../config/site.js";
import BrandLogoMark from "./BrandLogoMark.jsx";

const navLinkClass = ({ isActive }) =>
  [
    "text-xs font-bold uppercase tracking-[0.12em] text-brand-dark/80 transition-colors hover:text-brand-dark",
    isActive ? "text-brand-dark underline decoration-2 decoration-brand-green underline-offset-4" : "",
  ].join(" ");

export default function Navbar() {
  const { cartCount } = useCart();
  const [open, setOpen] = useState(false);
  const { brandName } = siteConfig;

  const links = (
    <>
      <NavLink to="/" end className={navLinkClass} onClick={() => setOpen(false)}>
        Home
      </NavLink>
      <NavLink to="/shop" className={navLinkClass} onClick={() => setOpen(false)}>
        Shop
      </NavLink>
      <NavLink to="/about" className={navLinkClass} onClick={() => setOpen(false)}>
        About Us
      </NavLink>
      <NavLink to="/contact" className={navLinkClass} onClick={() => setOpen(false)}>
        Contact
      </NavLink>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-brand-light bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 md:gap-6 md:px-6 md:py-3">
        <Link
          to="/"
          className="flex min-w-0 shrink items-center gap-2.5 sm:gap-3"
          onClick={() => setOpen(false)}
        >
          <BrandLogoMark size="md" />
          <div className="min-w-0 leading-tight">
            <p className="font-heading text-base font-black tracking-tight text-black sm:text-lg md:text-xl">
              {brandName}
            </p>
            <p className="mt-0.5 font-body text-[10px] font-bold uppercase tracking-wide text-brand-dark/70 sm:text-[11px] md:text-xs">
              Born from Nature • Made for Maa
            </p>
          </div>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-8">
          {links}
        </nav>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <Link
            to="/cart"
            className="relative p-1.5 text-brand-dark/80 transition hover:text-brand-dark"
            aria-label={`Cart, ${cartCount} items`}
          >
            <ShoppingCart className="h-6 w-6" strokeWidth={1.75} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-gold-rich px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/contact"
            className="hidden rounded-md bg-brand-gold-rich px-3 py-2 text-center text-xs font-bold uppercase tracking-wide text-white shadow-sm transition hover:opacity-95 md:inline-block md:px-4 md:text-sm"
            onClick={() => setOpen(false)}
          >
            Sign Up
          </Link>

          <Link
            to="/shop"
            className="hidden rounded-full bg-brand-green-dark px-4 py-2 text-center text-xs font-bold uppercase tracking-wide text-white shadow-sm transition hover:opacity-95 md:inline-block md:px-5 md:text-sm"
            onClick={() => setOpen(false)}
          >
            Order Now
          </Link>

          <button
            type="button"
            className="rounded-lg p-2 text-brand-dark lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-brand-light bg-white px-4 py-4 shadow-inner lg:hidden">
          <nav className="flex flex-col gap-3">{links}</nav>
          <div className="mt-4 flex flex-col gap-2 border-t border-brand-light pt-4">
            <Link
              to="/contact"
              className="rounded-md bg-brand-gold-rich py-3 text-center text-sm font-bold uppercase tracking-wide text-white"
              onClick={() => setOpen(false)}
            >
              Sign Up
            </Link>
            <Link
              to="/shop"
              className="rounded-full bg-brand-green-dark py-3 text-center text-sm font-bold uppercase tracking-wide text-white"
              onClick={() => setOpen(false)}
            >
              Order Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
