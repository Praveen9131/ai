import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext.jsx";
import { ToastProvider } from "../context/ToastContext.jsx";
import Home from "./Home";

describe("Home", () => {
  it("renders Why Choose section with heading, image, and USP cards", () => {
    render(
      <MemoryRouter>
        <ToastProvider>
          <CartProvider>
            <Home />
          </CartProvider>
        </ToastProvider>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /why choose.*zaanvi organics/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("100% Organic")).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: /wholesome organic salad bowl/i,
      }),
    ).toBeInTheDocument();
  });
});
