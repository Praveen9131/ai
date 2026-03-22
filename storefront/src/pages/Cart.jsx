import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import CartItem from "../components/CartItem.jsx";
import { FREE_SHIPPING_MIN } from "../constants/checkout.js";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, cartTotal } = useCart();
  const shipping = cartTotal >= FREE_SHIPPING_MIN || cartTotal === 0 ? 0 : 60;
  const total = cartTotal + shipping;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <h1 className="font-heading text-3xl font-bold text-brand-dark md:text-5xl">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="mt-10 rounded-2xl bg-white p-10 text-center shadow-md">
          <p className="font-normal text-brand-dark/80">Your cart is empty.</p>
          <Link
            to="/shop"
            className="mt-6 inline-block rounded-full bg-brand-green px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:opacity-90"
          >
            Browse shop
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="h-fit rounded-2xl bg-white p-6 shadow-md">
            <h2 className="font-heading text-lg font-bold text-brand-dark">
              Order summary
            </h2>
            <dl className="mt-4 space-y-2 text-sm font-normal">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>₹{cartTotal}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd>
                  {shipping === 0 ? (
                    <span className="text-brand-green">Free</span>
                  ) : (
                    `₹${shipping}`
                  )}
                </dd>
              </div>
              {cartTotal > 0 && cartTotal < FREE_SHIPPING_MIN && (
                <p className="text-xs text-brand-dark/60">
                  Add ₹{FREE_SHIPPING_MIN - cartTotal} more for free shipping.
                </p>
              )}
              <div className="flex justify-between border-t border-brand-light pt-2 text-base font-bold">
                <dt>Total</dt>
                <dd className="text-brand-green">₹{total}</dd>
              </div>
            </dl>
            <button
              type="button"
              onClick={() => navigate("/checkout")}
              className="mt-6 w-full rounded-full bg-brand-green px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:opacity-90"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
