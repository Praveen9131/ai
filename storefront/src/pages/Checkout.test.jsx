import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "../context/CartContext.jsx";
import { ToastProvider } from "../context/ToastContext.jsx";
import Checkout from "./Checkout.jsx";

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
        <CartProvider initialCartItems={[sampleItem]}>
          <Routes>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cart" element={<div>Cart page</div>} />
            <Route
              path="/shop"
              element={<div data-testid="shop-ok">Shop</div>}
            />
          </Routes>
        </CartProvider>
      </ToastProvider>
    </MemoryRouter>,
  );
}

describe("Checkout", () => {
  it("opens demo Razorpay sample modal and completes demo payment", () => {
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
    expect(screen.getByTestId("shop-ok")).toBeInTheDocument();
  });
});
