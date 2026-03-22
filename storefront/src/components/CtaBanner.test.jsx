import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CtaBanner from "./CtaBanner";

describe("CtaBanner", () => {
  it("renders heading, subtitle, and Order Now link to /shop", () => {
    render(
      <MemoryRouter>
        <CtaBanner />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /ready to order/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/trimester-wise millet nutrition/i)).toBeInTheDocument();
    const cta = screen.getByRole("link", { name: /order now/i });
    expect(cta).toHaveAttribute("href", "/shop");
  });
});
