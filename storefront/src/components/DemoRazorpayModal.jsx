import { X } from "lucide-react";

/**
 * Sample-only UI inspired by a hosted checkout sheet (no SDK, no charges).
 *
 * @param {{
 *   open: boolean;
 *   onClose: () => void;
 *   amountInr: number;
 *   currency?: string;
 *   merchantName: string;
 *   onDemoSuccess: () => void;
 * }} props
 */
export default function DemoRazorpayModal({
  open,
  onClose,
  amountInr,
  currency = "INR",
  merchantName,
  onDemoSuccess,
}) {
  if (!open) return null;

  const amount = Number(amountInr) || 0;
  const paise = Math.round(amount * 100);

  return (
    <div
      className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-rzp-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-[2px]"
        aria-label="Close payment demo"
        onClick={onClose}
      />
      <div
        className="relative z-10 w-full max-w-md rounded-t-2xl border border-stone-200 bg-white shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Razorpay uses blue accents; this is a non-official demo strip */}
        <div className="flex items-center justify-between rounded-t-2xl bg-[#0c2451] px-4 py-3 text-white sm:rounded-t-2xl">
          <div className="min-w-0">
            <p id="demo-rzp-title" className="text-sm font-semibold">
              Razorpay Checkout — demo sample
            </p>
            <p className="truncate text-xs text-white/75">
              {merchantName} · No real charge
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-white/90 transition hover:bg-white/10"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 px-4 py-5">
          <p className="text-xs leading-relaxed text-stone-600">
            This is a <strong>frontend sample only</strong>. It does not load the
            Razorpay SDK or call Razorpay APIs. Use it to preview the post–“Proceed
            to checkout” step in local and demo environments.
          </p>

          <div className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
              Amount payable
            </p>
            <p className="mt-1 font-heading text-2xl font-bold text-stone-900">
              ₹{amount.toFixed(2)}
            </p>
            <p className="mt-0.5 text-[11px] text-stone-500">
              {currency} · {paise} paise (sample breakdown)
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="order-2 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 transition hover:bg-stone-50 sm:order-1"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onDemoSuccess}
              className="order-1 rounded-xl bg-[#3395ff] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#2b87ea] sm:order-2"
            >
              Complete demo payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
