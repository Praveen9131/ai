import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Truck } from "lucide-react";
import { useOrders } from "../context/OrdersContext.jsx";
import { ORDER_TRACKING_STEPS } from "../constants/orders.js";
import {
  getEstimatedDeliveryAtMs,
  getOrderProgressIndex,
  getOrderStatus,
  getStatusChipClass,
} from "../utils/orderTracking.js";

function formatDateTime(ms) {
  if (!ms) return "";
  return new Date(ms).toLocaleString();
}

function formatRemainingMs(ms) {
  if (!Number.isFinite(ms) || ms <= 0) return "now";
  const mins = Math.ceil(ms / 60_000);
  if (mins < 60) return `${mins} min`;
  const hours = Math.ceil(mins / 60);
  return `${hours} hr`;
}

export default function Orders() {
  const [params, setSearchParams] = useSearchParams();
  const orderIdParam = params.get("orderId");

  const { orders } = useOrders();
  const [nowTick, setNowTick] = useState(() => Date.now());

  useEffect(() => {
    const t = window.setInterval(() => setNowTick(Date.now()), 30_000);
    return () => window.clearInterval(t);
  }, []);

  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => b.createdAt - a.createdAt);
  }, [orders]);

  const selectedOrderResolved = useMemo(() => {
    if (orderIdParam) {
      const fromParam = sortedOrders.find((o) => o.id === orderIdParam);
      if (fromParam) return fromParam;
    }
    return sortedOrders[0] ?? null;
  }, [orderIdParam, sortedOrders]);

  const selectedOrderId = selectedOrderResolved?.id ?? null;
  const selectedOrder = selectedOrderResolved;

  useEffect(() => {
    if (!selectedOrderId) return;
    if (orderIdParam === selectedOrderId) return;
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("orderId", selectedOrderId);
      return next;
    });
  }, [orderIdParam, selectedOrderId, setSearchParams]);

  const estimatedMs = selectedOrder
    ? getEstimatedDeliveryAtMs(selectedOrder.createdAt)
    : null;
  const status = selectedOrder
    ? getOrderStatus(selectedOrder.createdAt, nowTick)
    : null;
  const progressIdx = selectedOrder
    ? getOrderProgressIndex(selectedOrder.createdAt, nowTick)
    : null;

  const estimatedText =
    estimatedMs && status !== "Delivered"
      ? `Estimated delivery ${formatRemainingMs(estimatedMs - nowTick)} from now`
      : status === "Delivered"
        ? "Delivery completed"
        : "Tracking in progress";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-brand-dark md:text-4xl xl:text-5xl">
            Your Orders
          </h1>
          <p className="mt-2 max-w-2xl text-sm font-medium text-brand-dark/75 md:text-base">
            Track ordered products and shipment progress.
          </p>
        </div>

        <Link
          to="/shop"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition hover:opacity-90"
        >
          Back to shop
        </Link>
      </div>

      {sortedOrders.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-brand-light bg-white/60 p-8 text-center shadow-sm">
          <p className="font-heading text-xl font-bold text-brand-dark">
            No orders yet
          </p>
          <p className="mt-2 text-sm font-medium text-brand-dark/70">
            Place an order to see your products and tracking status here.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              to="/shop"
              className="rounded-full bg-brand-green px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition hover:opacity-90"
            >
              Shop now
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[360px_1fr] lg:items-start">
          {/* Order list */}
          <section className="rounded-3xl border border-brand-light bg-white/80 p-4 shadow-sm backdrop-blur md:p-5">
            <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-brand-dark">
              <Truck className="h-5 w-5 text-brand-green" aria-hidden />
              Orders
            </h2>
            <p className="mt-1 text-xs font-medium text-brand-dark/70">
              Select an order to view tracking.
            </p>

            <ul className="mt-4 space-y-3">
              {sortedOrders.map((o) => {
                const oStatus = getOrderStatus(o.createdAt, nowTick);
                const active = o.id === selectedOrderId;
                const ringClass = active ? "ring-2 ring-brand-green/40" : "";
                return (
                  <li key={o.id}>
                    <button
                      type="button"
                      onClick={() =>
                        setSearchParams((prev) => {
                          const next = new URLSearchParams(prev);
                          next.set("orderId", o.id);
                          return next;
                        })
                      }
                      className={`w-full rounded-2xl border border-brand-light bg-white p-4 text-left shadow-sm transition hover:bg-brand-cream/40 ${ringClass}`}
                      aria-current={active ? "page" : undefined}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold uppercase tracking-wider text-brand-dark/55">
                            Order #{o.id}
                          </p>
                          <p className="mt-1 truncate text-sm font-semibold text-brand-dark/70">
                            {formatDateTime(o.createdAt)}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${getStatusChipClass(
                            oStatus,
                          )}`}
                        >
                          {oStatus}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-xs font-bold text-brand-dark/60">
                          {o.items.reduce((sum, i) => sum + i.qty, 0)} items
                        </p>
                        <p className="text-sm font-bold text-brand-green">₹{o.amount}</p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Tracking panel */}
          <section className="rounded-3xl border border-brand-light bg-white/80 p-5 shadow-sm backdrop-blur md:p-7">
            {selectedOrder ? (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-dark/55">
                      Tracking
                    </p>
                    <h2 className="mt-1 font-heading text-2xl font-bold text-brand-dark">
                      Order #{selectedOrder.id}
                    </h2>
                    <p className="mt-1 text-sm font-semibold text-brand-dark/70">
                      {formatDateTime(selectedOrder.createdAt)}
                    </p>
                  </div>
                  {status ? (
                    <span
                      className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold ${getStatusChipClass(
                        status,
                      )}`}
                    >
                      {status}
                    </span>
                  ) : null}
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-[1fr_360px]">
                  <div>
                    <div className="rounded-2xl border border-brand-light bg-white p-4">
                      <h3 className="font-heading text-lg font-bold text-brand-dark">
                        Products
                      </h3>
                      <ul className="mt-3 space-y-3">
                        {selectedOrder.items.map((item) => (
                          <li
                            key={`${selectedOrder.id}_${item.id}`}
                            className="flex items-start justify-between gap-3"
                          >
                            <div className="min-w-0">
                              <p className="truncate text-sm font-bold text-brand-dark">
                                {item.name}
                              </p>
                              {item.category ? (
                                <p className="mt-0.5 truncate text-xs font-semibold text-brand-dark/55">
                                  {item.category}
                                </p>
                              ) : null}
                            </div>
                            <div className="shrink-0 text-right">
                              <p className="text-xs font-bold text-brand-dark/60">
                                Qty {item.qty}
                              </p>
                              <p className="text-sm font-bold text-brand-green">
                                ₹{item.price * item.qty}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 flex items-center justify-between border-t border-brand-light pt-4">
                        <p className="text-sm font-semibold text-brand-dark/70">
                          Total
                        </p>
                        <p className="text-sm font-bold text-brand-green">
                          ₹{selectedOrder.amount}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="rounded-2xl border border-brand-light bg-brand-cream/35 p-4">
                      <h3 className="font-heading text-lg font-bold text-brand-dark">
                        Estimated delivery
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-brand-dark/70">
                        {estimatedText}
                      </p>

                      <ol className="mt-5 space-y-3">
                        {ORDER_TRACKING_STEPS.map((step, idx) => {
                          const isDone = typeof progressIdx === "number" ? idx <= progressIdx : false;
                          const dotClass = isDone
                            ? "bg-brand-green text-white"
                            : "bg-white text-brand-dark/40 ring-1 ring-brand-light";
                          const isCurrent = idx === progressIdx;
                          return (
                            <li key={step.status} className="flex gap-3">
                              <span
                                className={`mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${dotClass}`}
                              >
                                {idx + 1}
                              </span>
                              <div className="min-w-0">
                                <p
                                  className={`truncate text-sm font-bold ${
                                    isDone ? "text-brand-dark" : "text-brand-dark/60"
                                  }`}
                                >
                                  {step.status}
                                </p>
                                {isCurrent && status !== "Delivered" ? (
                                  <p className="mt-0.5 text-xs font-semibold text-brand-dark/55">
                                    In progress
                                  </p>
                                ) : null}
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </section>
        </div>
      )}
    </div>
  );
}

