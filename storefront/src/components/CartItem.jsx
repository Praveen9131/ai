import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function CartItem({ item }) {
  const { updateQty, removeFromCart } = useCart();
  const { showToast } = useToast();

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-md sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        {item.image ? (
          <img
            src={item.image}
            alt=""
            className="h-16 w-16 shrink-0 rounded-xl object-cover"
            width="64"
            height="64"
          />
        ) : null}
        <div>
        <h3 className="font-heading font-bold text-brand-dark">
          {item.name}
        </h3>
        <p className="text-sm font-normal text-brand-dark/70">
          ₹{item.price} × {item.qty}
        </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-full border border-brand-light">
          <button
            type="button"
            className="p-2"
            aria-label="Decrease quantity"
            onClick={() => updateQty(item.id, item.qty - 1)}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-[2rem] text-center text-sm font-medium">
            {item.qty}
          </span>
          <button
            type="button"
            className="p-2"
            aria-label="Increase quantity"
            onClick={() => updateQty(item.id, item.qty + 1)}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <p className="font-bold text-brand-green">
          ₹{item.price * item.qty}
        </p>
        <button
          type="button"
          className="rounded-full p-2 text-red-600 hover:bg-red-50"
          aria-label="Remove item"
          onClick={() => {
            removeFromCart(item.id);
            showToast("Item removed.");
          }}
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
