import { useToast } from "../context/ToastContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    showToast("Added to cart! 🌿");
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-lg">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-brand-green to-brand-gold">
          {product.image ? (
            <img
              src={product.image}
              alt=""
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <span className="mb-2 inline-block w-fit rounded-full bg-brand-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-dark">
            {product.category}
          </span>
          <h3 className="font-heading text-lg font-bold text-brand-dark group-hover:text-brand-green">
            {product.name}
          </h3>
          {product.useCases?.[0] ? (
            <p className="mt-2 line-clamp-2 text-xs font-medium leading-snug text-brand-dark/70">
              {product.useCases[0]}
            </p>
          ) : null}
          <p className="mt-1 text-base font-bold text-brand-green">₹{product.price}</p>
        </div>
      </Link>
      <div className="mt-auto px-4 pb-4">
        <button
          type="button"
          onClick={handleAdd}
          className="w-full rounded-full bg-brand-green px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:opacity-90 md:text-sm"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
