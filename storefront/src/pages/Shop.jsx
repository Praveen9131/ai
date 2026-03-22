import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { products } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "1", label: "Trimester 1" },
  { key: "2", label: "Trimester 2" },
  { key: "3", label: "Trimester 3" },
  { key: "postpartum", label: "Postpartum" },
  { key: "kits", label: "Kits" },
];

function matchesFilter(product, key) {
  if (key === "all") return true;
  if (key === "kits") return product.category === "Kit";
  if (key === "postpartum") return product.category === "Postpartum";
  if (key === "1") return product.category === "Trimester 1";
  if (key === "2") return product.category === "Trimester 2";
  if (key === "3") return product.category === "Trimester 3";
  return true;
}

export default function Shop() {
  const [params] = useSearchParams();
  const filter = params.get("filter") || "all";
  const active = FILTERS.some((f) => f.key === filter) ? filter : "all";

  const filtered = useMemo(
    () => products.filter((p) => matchesFilter(p, active)),
    [active]
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="font-heading text-3xl font-bold text-brand-dark md:text-5xl">
        Shop
      </h1>
      <p className="mt-3 max-w-2xl font-subheading text-sm font-medium text-brand-dark/80 md:text-base">
        Millet mixes and kits for every stage — from early pregnancy to
        postpartum recovery.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map(({ key, label }) => {
          const isOn = active === key;
          return (
            <Link
              key={key}
              to={key === "all" ? "/shop" : `/shop?filter=${key}`}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition md:text-sm ${
                isOn
                  ? "bg-brand-green text-white"
                  : "bg-white text-brand-dark shadow-sm hover:bg-brand-light"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-brand-dark/60">
          No products in this filter.
        </p>
      )}
    </div>
  );
}
