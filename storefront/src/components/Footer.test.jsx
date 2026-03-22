import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders Quick Links, Contact Us, social labels, and copyright", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    expect(screen.getByText("Quick Links")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^Home$/ })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: /^Menu$/ })).toHaveAttribute(
      "href",
      "/shop",
    );
    expect(screen.getAllByText("Contact Us").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("Follow Us")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Facebook/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Instagram/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Twitter/i })).toBeInTheDocument();
    expect(
      screen.getByText(/©\s*\d{4}\s*Zaanvi Organics\.\s*All rights reserved\./i),
    ).toBeInTheDocument();
  });
});
