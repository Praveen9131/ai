import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Bone, CircleDot, Dumbbell } from "lucide-react";
import { products } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

const highlights = [
  { icon: CircleDot, label: "Iron" },
  { icon: Bone, label: "Calcium" },
  { icon: Dumbbell, label: "Protein" },
];

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === String(id));
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const related = useMemo(() => {
    if (!product) return [];
    return products
      .filter(
        (p) =>
          p.id !== product.id && p.trimester === product.trimester
      )
      .slice(0, 3);
  }, [product]);

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center md:px-6">
        <h1 className="font-heading text-2xl font-bold">Product not found</h1>
        <Link
          to="/shop"
          className="mt-4 inline-block rounded-full bg-brand-green px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    for (let i = 0; i < qty; i += 1) addToCart(product);
    showToast("Added to cart! 🌿");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-brand-green to-brand-gold shadow-md">
          {product.image ? (
            <img
              src={product.image}
              alt=""
              className="h-full w-full object-cover"
              width="900"
              height="900"
            />
          ) : null}
        </div>
        <div>
          <span className="inline-block rounded-full bg-brand-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-dark">
            {product.tag}
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold text-brand-dark md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-sm font-bold uppercase tracking-wide text-brand-dark/65">
            {product.category}
          </p>
          <p className="mt-6 text-3xl font-bold text-brand-green">
            ₹{product.price}
          </p>
          <p className="mt-1 font-subheading text-sm font-medium text-brand-dark/75">
            Weight: {product.weight}
          </p>
          <p className="mt-6 font-normal leading-relaxed text-brand-dark">
            {product.description}
          </p>

          <p className="mt-8 font-heading text-xs font-bold uppercase tracking-wider text-brand-dark">
            Nutritional highlights
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {highlights.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-brand-light bg-white px-3 py-1.5 text-sm font-bold"
              >
                <Icon className="h-4 w-4 text-brand-green" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-brand-light bg-white">
              <button
                type="button"
                className="px-4 py-2 text-lg"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="min-w-[2rem] text-center font-bold">{qty}</span>
              <button
                type="button"
                className="px-4 py-2 text-lg"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="rounded-full bg-brand-green px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:opacity-90"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-brand-light pt-12">
          <h2 className="font-heading text-2xl font-bold text-brand-dark md:text-3xl">
            You may also like
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="rounded-2xl bg-white p-4 shadow-md transition hover:shadow-lg"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-brand-green to-brand-gold">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : null}
                </div>
                <h3 className="mt-3 font-heading font-bold text-brand-dark">
                  {p.name}
                </h3>
                <p className="text-sm font-bold text-brand-green">₹{p.price}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
