import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  createDemoOrderId,
  ORDERS_STORAGE_KEY,
} from "../constants/orders.js";

function safeParseJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function loadOrders() {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(ORDERS_STORAGE_KEY);
  if (!raw) return [];
  const parsed = safeParseJson(raw);
  if (!Array.isArray(parsed)) return [];
  return parsed;
}

function sanitizeOrderItems(items) {
  if (!Array.isArray(items)) return [];
  return items
    .map((i) => ({
      id: i?.id,
      name: String(i?.name ?? ""),
      price: Number(i?.price ?? 0),
      qty: Number(i?.qty ?? 0),
      category: String(i?.category ?? ""),
    }))
    .filter((i) => i.id !== undefined && i.name.trim() && i.qty > 0);
}

const OrdersContext = createContext(null);

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(loadOrders);

  const addDemoOrder = useCallback(({ items, amountInr, paymentRef }) => {
    const orderId = createDemoOrderId();
    const createdAt = Date.now();
    const sanitizedItems = sanitizeOrderItems(items);

    const order = {
      id: orderId,
      createdAt,
      paymentRef: paymentRef ? String(paymentRef) : null,
      amount: Number(amountInr ?? 0),
      items: sanitizedItems,
    };

    setOrders((prev) => {
      const next = [order, ...prev].slice(0, 10);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    });

    return orderId;
  }, []);

  const value = useMemo(
    () => ({
      orders,
      addDemoOrder,
    }),
    [orders, addDemoOrder],
  );

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}

