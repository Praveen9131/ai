import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const navLinkClass = ({ isActive }) =>
  [
    "font-subheading text-xs font-medium uppercase tracking-[0.12em] text-brand-dark/80 transition-colors hover:text-brand-dark",
    isActive ? "text-brand-dark underline decoration-2 decoration-brand-green underline-offset-4" : "",
  ].join(" ");

export default function Navbar() {
  const { cartCount } = useCart();
  const [open, setOpen] = useState(false);

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
        {/* Brand: compact logo (height-capped — avoids huge 500px box) + text */}
        <Link
          to="/"
          className="flex min-w-0 shrink items-center gap-2.5 sm:gap-3"
          onClick={() => setOpen(false)}
        >
          <img
            src="/logo.png"
            alt=""
            className="h-11 w-auto max-h-12 max-w-[100px] shrink-0 object-contain object-center sm:h-12 sm:max-h-14 sm:max-w-[120px] md:h-14 md:max-h-16 md:max-w-[140px]"
            width="140"
            height="64"
            decoding="async"
          />
          <div className="min-w-0 leading-tight">
            <p className="font-heading text-sm font-bold tracking-tight text-brand-gold-rich sm:text-base md:text-lg">
              Zaanvi Organics
            </p>
            <p className="mt-0.5 font-subheading text-[10px] font-medium uppercase tracking-wide text-brand-gold-rich/90 sm:text-[11px] md:text-xs">
              Born from Nature • Made for Maa
            </p>
          </div>
        </Link>

        {/* Center nav — desktop */}
        <nav className="hidden flex-1 items-center justify-center gap-6 xl:gap-8 lg:flex">
          {links}
        </nav>

        {/* Right actions — same row as logo */}
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

      {/* Mobile drawer */}
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
