import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Badge } from "@/components/ui/Badge";

describe("Badge UI Primitive", () => {
  it("renders with cyan variant and content", () => {
    render(<Badge variant="cyan">Available '27</Badge>);
    const badge = screen.getByText("Available '27");
    expect(badge).toBeInTheDocument();
    expect(badge.className).toContain("text-brand-cyan");
  });

  it("renders with indigo variant", () => {
    render(<Badge variant="indigo">Flagship</Badge>);
    const badge = screen.getByText("Flagship");
    expect(badge.className).toContain("text-brand-indigo");
  });
});
