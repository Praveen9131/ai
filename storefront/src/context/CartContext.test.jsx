import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext.jsx";

function Probe() {
  const { cartItems, cartCount, cartTotal, addToCart, updateQty, clearCart } =
    useCart();
  return (
    <div>
      <span data-testid="count">{cartCount}</span>
      <span data-testid="total">{cartTotal}</span>
      <span data-testid="items">{cartItems.map((i) => `${i.id}:${i.qty}`).join(",")}</span>
      <button
        type="button"
        onClick={() =>
          addToCart({
            id: 1,
            name: "Test",
            price: 100,
            category: "Kit",
            weight: "1",
            trimester: 1,
            tag: "T",
            description: "d",
          })
        }
      >
        add
      </button>
      <button type="button" onClick={() => updateQty(1, 3)}>
        set3
      </button>
      <button type="button" onClick={clearCart}>
        clear
      </button>
    </div>
  );
}

describe("CartProvider", () => {
  it("adds and merges quantities", () => {
    render(
      <CartProvider>
        <Probe />
      </CartProvider>
    );
    fireEvent.click(screen.getByText("add"));
    expect(screen.getByTestId("count").textContent).toBe("1");
    expect(screen.getByTestId("total").textContent).toBe("100");
    fireEvent.click(screen.getByText("add"));
    expect(screen.getByTestId("count").textContent).toBe("2");
    expect(screen.getByTestId("total").textContent).toBe("200");
    fireEvent.click(screen.getByText("set3"));
    expect(screen.getByTestId("count").textContent).toBe("3");
    expect(screen.getByTestId("total").textContent).toBe("300");
    fireEvent.click(screen.getByText("clear"));
    expect(screen.getByTestId("count").textContent).toBe("0");
    expect(screen.getByTestId("total").textContent).toBe("0");
  });
});
