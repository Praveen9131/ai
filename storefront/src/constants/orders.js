export const ORDERS_STORAGE_KEY = "zaanvi_orders_v1";

export const ORDER_TRACKING_STEPS = [
  // Order is created immediately after demo checkout completes.
  { status: "Pending", offsetMs: 0 },
  { status: "Processing", offsetMs: 60_000 },
  { status: "Shipped", offsetMs: 3 * 60_000 },
  { status: "Delivered", offsetMs: 10 * 60_000 },
];

export function createDemoOrderId() {
  return `ZO-CUST_${Date.now().toString(36)}`;
}

