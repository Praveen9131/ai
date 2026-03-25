import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "../context/CartContext.jsx";
import { ToastProvider } from "../context/ToastContext.jsx";
import { OrdersProvider } from "../context/OrdersContext.jsx";
import Checkout from "./Checkout.jsx";
import { ORDERS_STORAGE_KEY } from "../constants/orders.js";

const sampleItem = {
  id: 99,
  name: "Test Millet",
  price: 100,
  qty: 2,
  category: "T1",
  weight: "250g",
  trimester: 1,
  tag: "Iron",
  description: "Test",
};

function renderCheckout() {
  return render(
    <MemoryRouter initialEntries={["/checkout"]}>
      <ToastProvider>
        <OrdersProvider>
          <CartProvider initialCartItems={[sampleItem]}>
            <Routes>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/cart" element={<div>Cart page</div>} />
              <Route
                path="/orders"
                element={<div data-testid="orders-ok">Orders</div>}
              />
            </Routes>
          </CartProvider>
        </OrdersProvider>
      </ToastProvider>
    </MemoryRouter>,
  );
}

describe("Checkout", () => {
  it("opens demo Razorpay sample modal and completes demo payment", () => {
    window.localStorage.clear();
    renderCheckout();
    expect(
      screen.getByRole("heading", { name: /^checkout$/i }),
    ).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: /open razorpay demo/i }),
    );
    expect(
      screen.getByText(/razorpay checkout — demo sample/i),
    ).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: /complete demo payment/i }),
    );
    expect(screen.getByTestId("orders-ok")).toBeInTheDocument();

    const raw = window.localStorage.getItem(ORDERS_STORAGE_KEY);
    const orders = raw ? JSON.parse(raw) : [];
    expect(Array.isArray(orders)).toBe(true);
    expect(orders.length).toBe(1);
    expect(orders[0].items.length).toBe(1);
    expect(orders[0].items[0].name).toBe("Test Millet");
    expect(orders[0].items[0].qty).toBe(2);
  });
});
