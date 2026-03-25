import { ORDER_TRACKING_STEPS } from "../constants/orders.js";

const STATUS_CHIP_CLASS = {
  Pending: "bg-red-100 text-red-800",
  Processing: "bg-yellow-100 text-yellow-800",
  Shipped: "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
};

export function getOrderStatus(createdAtMs, nowMs = Date.now()) {
  const ageMs = Math.max(0, nowMs - createdAtMs);

  // Steps are ordered by offsetMs, so we pick the last step whose offset has passed.
  let current = ORDER_TRACKING_STEPS[0]?.status ?? "Pending";
  for (const step of ORDER_TRACKING_STEPS) {
    if (ageMs >= step.offsetMs) current = step.status;
  }
  return current;
}

export function getOrderProgressIndex(createdAtMs, nowMs = Date.now()) {
  const ageMs = Math.max(0, nowMs - createdAtMs);
  let idx = 0;
  for (let i = 0; i < ORDER_TRACKING_STEPS.length; i += 1) {
    if (ageMs >= ORDER_TRACKING_STEPS[i].offsetMs) idx = i;
  }
  return idx;
}

export function getEstimatedDeliveryAtMs(createdAtMs) {
  const deliveredStep = ORDER_TRACKING_STEPS.find((s) => s.status === "Delivered");
  if (!deliveredStep) return null;
  return createdAtMs + deliveredStep.offsetMs;
}

export function getStatusChipClass(status) {
  return STATUS_CHIP_CLASS[status] ?? "bg-brand-light text-brand-dark";
}

