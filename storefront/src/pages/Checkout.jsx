import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { useOrders } from "../context/OrdersContext.jsx";
import DemoRazorpayModal from "../components/DemoRazorpayModal.jsx";
import { getMerchantDisplayName } from "../config/merchant.js";
import { FREE_SHIPPING_MIN } from "../constants/checkout.js";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { showToast } = useToast();
  const { addDemoOrder } = useOrders();
  const [demoOpen, setDemoOpen] = useState(false);

  const shipping =
    cartTotal >= FREE_SHIPPING_MIN || cartTotal === 0 ? 0 : 60;
  const total = cartTotal + shipping;

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart", { replace: true });
    }
  }, [cartItems.length, navigate]);

  const handleDemoSuccess = () => {
    setDemoOpen(false);
    const paymentRef = `pay_demo_${Date.now().toString(36)}`;
    const orderId = addDemoOrder({
      items: cartItems.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        qty: i.qty,
        category: i.category,
      })),
      amountInr: total,
      paymentRef,
    });
    showToast(`Order placed successfully — ${orderId}`);
    clearCart();
    navigate(
      `/orders?orderId=${encodeURIComponent(orderId)}`,
      { replace: true },
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center md:px-6">
        <p className="text-brand-dark/80">Redirecting to cart…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <nav className="text-sm text-brand-dark/60">
        <Link to="/cart" className="font-semibold text-brand-green hover:underline">
          Cart
        </Link>
        <span className="mx-2">/</span>
        <span className="text-brand-dark">Checkout</span>
      </nav>

      <h1 className="mt-4 font-heading text-3xl font-bold text-brand-dark md:text-4xl">
        Checkout
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-brand-dark/75">
        Demo flow: the button below opens a <strong>sample Razorpay-style</strong>{" "}
        sheet only. No payment provider is called.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          <h2 className="font-heading text-lg font-bold text-brand-dark">
            Items
          </h2>
          <ul className="divide-y divide-brand-light rounded-2xl border border-brand-light bg-white shadow-sm">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
              >
                <span className="font-medium text-brand-dark">{item.name}</span>
                <span className="text-sm text-brand-dark/70">
                  ×{item.qty} · ₹{item.price * item.qty}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="h-fit rounded-2xl bg-white p-6 shadow-md">
          <h2 className="font-heading text-lg font-bold text-brand-dark">
            Pay with Razorpay (demo)
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
            <div className="flex justify-between border-t border-brand-light pt-2 text-base font-bold">
              <dt>Total</dt>
              <dd className="text-brand-green">₹{total}</dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={() => setDemoOpen(true)}
            className="mt-6 w-full rounded-full bg-[#3395ff] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#2b87ea]"
          >
            Open Razorpay demo
          </button>
          <p className="mt-3 text-center text-[11px] leading-relaxed text-brand-dark/55">
            Production: create orders on your server and load{" "}
            <code className="rounded bg-stone-100 px-1">checkout.js</code> with
            your key from env — never commit secrets.
          </p>
        </div>
      </div>

      <DemoRazorpayModal
        open={demoOpen}
        onClose={() => setDemoOpen(false)}
        amountInr={total}
        merchantName={getMerchantDisplayName()}
        onDemoSuccess={handleDemoSuccess}
      />
    </div>
  );
}
