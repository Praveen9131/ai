import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "../context/CartContext.jsx";
import { ToastProvider } from "../context/ToastContext.jsx";
import ProductDetail from "./ProductDetail.jsx";

function renderProduct(id) {
  return render(
    <MemoryRouter initialEntries={[`/product/${id}`]}>
      <ToastProvider>
        <CartProvider>
          <Routes>
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </CartProvider>
      </ToastProvider>
    </MemoryRouter>,
  );
}

describe("ProductDetail", () => {
  it("shows use cases and product guide control for a product", () => {
    renderProduct(1);

    expect(screen.getByText("Use cases")).toBeInTheDocument();
    expect(
      screen.getByText(/gentle breakfast during morning sickness/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /open zaanvi assistant for this product/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/ask anything about this product/i),
    ).toBeInTheDocument();
  });

  it("opens split assistant overlay with nutrition AI header", () => {
    renderProduct(1);
    fireEvent.click(
      screen.getByRole("button", {
        name: /open zaanvi assistant for this product/i,
      }),
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/Zaanvi — Nutrition AI/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /how to use/i }),
    ).toBeInTheDocument();
  });
});
