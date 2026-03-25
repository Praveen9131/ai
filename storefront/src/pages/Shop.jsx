import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Filter, Search, X } from "lucide-react";
import { products } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

const STAGE_FILTERS = [
  { key: "all", label: "All stages" },
  { key: "1", label: "Trimester 1" },
  { key: "2", label: "Trimester 2" },
  { key: "3", label: "Trimester 3" },
  { key: "postpartum", label: "Postpartum" },
  { key: "kits", label: "Kits" },
];

const AUDIENCE_FILTERS = [
  { key: "all", label: "All focuses" },
  { key: "pregnancy", label: "Pregnancy & postpartum" },
  { key: "diabetic", label: "Diabetic-friendly" },
  { key: "wellness", label: "Everyday wellness" },
];

function matchesStage(product, key) {
  if (key === "all") return true;
  if (key === "kits") return product.category === "Kit";
  if (key === "postpartum") return product.category === "Postpartum";
  if (key === "1") return product.category === "Trimester 1";
  if (key === "2") return product.category === "Trimester 2";
  if (key === "3") return product.category === "Trimester 3";
  return true;
}

function matchesAudience(product, key) {
  if (key === "all") return true;
  return product.audiences?.includes(key) ?? false;
}

function shopHref(stage, audience) {
  const params = new URLSearchParams();
  if (stage !== "all") params.set("filter", stage);
  if (audience !== "all") params.set("audience", audience);
  const q = params.toString();
  return q ? `/shop?${q}` : "/shop";
}

function matchesSearch(product, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const parts = [
    product.name,
    product.description,
    product.tag,
    product.category,
    ...(product.useCases ?? []),
    ...(product.audiences ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return parts.includes(q);
}

function FilterSidebarContent({
  activeStage,
  activeAudience,
  onCloseMobile,
}) {
  const clearFiltersHref = "/shop";
  const linkClass = (isOn, variant) => {
    const base =
      "block w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition";
    if (variant === "stage") {
      return `${base} ${
        isOn
          ? "bg-brand-green text-white shadow-sm"
          : "text-brand-dark hover:bg-brand-light/80"
      }`;
    }
    return `${base} ${
      isOn
        ? "bg-brand-green-dark text-white shadow-sm"
        : "text-brand-dark ring-1 ring-brand-light/80 hover:bg-brand-cream/40"
    }`;
  };

  const handleNav = () => {
    onCloseMobile?.();
  };

  return (
    <nav className="space-y-8" aria-label="Shop filters">
      <div className="flex items-center justify-between gap-4">
        <p className="font-body text-[11px] font-bold uppercase tracking-wider text-brand-dark/50">
          Refine
        </p>
        <Link
          to={clearFiltersHref}
          className="shrink-0 text-xs font-bold text-brand-dark/55 transition hover:text-brand-dark"
          onClick={handleNav}
        >
          Clear filters
        </Link>
      </div>
      <div>
        <p className="font-body text-[11px] font-bold uppercase tracking-wider text-brand-dark/50">
          Journey stage
        </p>
        <ul className="mt-3 space-y-1">
          {STAGE_FILTERS.map(({ key, label }) => {
            const isOn = activeStage === key;
            return (
              <li key={key}>
                <Link
                  to={shopHref(key, activeAudience)}
                  className={linkClass(isOn, "stage")}
                  onClick={handleNav}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <p className="font-body text-[11px] font-bold uppercase tracking-wider text-brand-dark/50">
          Wellness focus
        </p>
        <ul className="mt-3 space-y-1">
          {AUDIENCE_FILTERS.map(({ key, label }) => {
            const isOn = activeAudience === key;
            return (
              <li key={key}>
                <Link
                  to={shopHref(activeStage, key)}
                  className={linkClass(isOn, "audience")}
                  onClick={handleNav}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default function Shop() {
  const [params] = useSearchParams();
  const filter = params.get("filter") || "all";
  const audience = params.get("audience") || "all";
  const [search, setSearch] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeStage = STAGE_FILTERS.some((f) => f.key === filter)
    ? filter
    : "all";
  const activeAudience = AUDIENCE_FILTERS.some((f) => f.key === audience)
    ? audience
    : "all";

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          matchesStage(p, activeStage) &&
          matchesAudience(p, activeAudience) &&
          matchesSearch(p, search),
      ),
    [activeStage, activeAudience, search],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
      <div className="lg:grid lg:grid-cols-[min(280px,30%)_1fr] lg:items-start lg:gap-10 xl:gap-12">
        {/* Desktop sidebar */}
        <aside className="mb-8 hidden lg:sticky lg:top-24 lg:mb-0 lg:block lg:self-start">
          <div className="rounded-2xl border border-brand-light bg-white p-5 shadow-sm">
            <h2 className="font-heading text-lg font-bold text-brand-dark">
              Filters
            </h2>
            <p className="mt-1 text-xs font-medium text-brand-dark/55">
              Narrow by stage and wellness goal.
            </p>
            <div className="mt-6">
              <FilterSidebarContent
                activeStage={activeStage}
                activeAudience={activeAudience}
              />
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="font-heading text-3xl font-bold text-brand-dark md:text-4xl xl:text-5xl">
                Shop
              </h1>
              <p className="mt-2 max-w-2xl text-sm font-medium text-brand-dark/75 md:text-base">
                Millet mixes and kits for every stage — search below or use
                filters on the left.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-brand-light bg-white px-4 py-2.5 text-sm font-bold text-brand-dark shadow-sm transition hover:bg-brand-cream/50 lg:hidden"
              aria-controls="shop-filters-drawer"
              aria-expanded={mobileFiltersOpen}
            >
              <Filter className="h-4 w-4" aria-hidden />
              Filters
            </button>

            <Link
              to="/orders"
              className="inline-flex shrink-0 items-center justify-center rounded-full border border-brand-light bg-white px-4 py-2.5 text-sm font-bold text-brand-dark shadow-sm transition hover:bg-brand-cream/50"
            >
              My Orders
            </Link>
          </div>

          {/* Results panel */}
          <div className="mt-8 rounded-3xl border border-brand-light bg-white/80 p-5 shadow-sm backdrop-blur md:p-7">
            {/* Search */}
            <div className="relative">
              <label htmlFor="shop-search" className="sr-only">
                Search products
              </label>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-dark/40"
                aria-hidden
              />
              <input
                id="shop-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, ingredient, or use case…"
                className="w-full rounded-full border border-brand-light bg-white py-3.5 pl-12 pr-12 text-sm font-medium text-brand-dark shadow-sm outline-none ring-brand-green/30 transition placeholder:text-brand-dark/45 focus:border-brand-green focus:ring-2 md:text-base"
                autoComplete="off"
              />
              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-brand-dark/45 hover:bg-brand-light hover:text-brand-dark"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            <p className="mt-3 text-xs font-medium text-brand-dark/50">
              Showing{" "}
              <span className="font-bold text-brand-dark">{filtered.length}</span>{" "}
              of {products.length} products
              {search.trim() ? ` matching “${search.trim()}”` : ""}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="mt-14 rounded-2xl border border-dashed border-brand-light bg-brand-cream/30 px-6 py-12 text-center text-brand-dark/70">
                No products match. Try clearing search or setting filters to
                &quot;All&quot;.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      {mobileFiltersOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div
            id="shop-filters-drawer"
            role="dialog"
            aria-modal="true"
            className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-brand-light bg-white p-6 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-brand-dark">
                Filters
              </h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-full p-2 text-brand-dark/60 hover:bg-brand-light"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterSidebarContent
              activeStage={activeStage}
              activeAudience={activeAudience}
              onCloseMobile={() => setMobileFiltersOpen(false)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
