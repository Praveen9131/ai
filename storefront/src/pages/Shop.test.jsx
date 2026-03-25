import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext.jsx";
import { ToastProvider } from "../context/ToastContext.jsx";
import { OrdersProvider } from "../context/OrdersContext.jsx";
import Shop from "./Shop.jsx";

describe("Shop", () => {
  it("renders journey and wellness filter rows", () => {
    window.localStorage.clear();
    render(
      <MemoryRouter>
        <ToastProvider>
          <OrdersProvider>
            <CartProvider>
              <Shop />
            </CartProvider>
          </OrdersProvider>
        </ToastProvider>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: /^Filters$/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /^Clear filters$/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/search by name/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /^All stages$/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /^All focuses$/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /pregnancy & postpartum/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /diabetic-friendly/i }),
    ).toBeInTheDocument();
  });
});
