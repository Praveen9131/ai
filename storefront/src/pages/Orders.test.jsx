import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { OrdersProvider } from "../context/OrdersContext.jsx";
import Orders from "./Orders.jsx";
import { ORDERS_STORAGE_KEY } from "../constants/orders.js";

describe("Orders page", () => {
  it("shows empty state when there are no orders", () => {
    window.localStorage.clear();

    render(
      <MemoryRouter initialEntries={["/orders"]}>
        <OrdersProvider>
          <Routes>
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </OrdersProvider>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /your orders/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/no orders yet/i),
    ).toBeInTheDocument();
  });

  it("renders products and tracking status when an order exists", () => {
    window.localStorage.clear();

    const createdAt = Date.now() - 200_000; // ~3m20s => Shipped step
    const order = {
      id: "ZO-CUST_TEST",
      createdAt,
      paymentRef: null,
      amount: 500,
      items: [
        {
          id: 10,
          name: "Sample Millet",
          price: 100,
          qty: 2,
          category: "Trimester 1",
        },
      ],
    };

    window.localStorage.setItem(
      ORDERS_STORAGE_KEY,
      JSON.stringify([order]),
    );

    render(
      <MemoryRouter initialEntries={["/orders?orderId=ZO-CUST_TEST"]}>
        <OrdersProvider>
          <Routes>
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </OrdersProvider>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /order #zo-cust_test/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/sample millet/i)).toBeInTheDocument();
    expect(screen.getAllByText(/shipped/i).length).toBeGreaterThan(0);
  });
});

