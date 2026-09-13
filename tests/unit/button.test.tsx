import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Button } from "@/components/ui/Button";

describe("Button UI Primitive", () => {
  it("renders with default primary variant and text", () => {
    render(<Button>Click Me</Button>);
    const btn = screen.getByRole("button", { name: /click me/i });
    expect(btn).toBeInTheDocument();
    expect(btn.className).toContain("bg-brand-indigo");
  });

  it("renders with secondary variant styles", () => {
    render(<Button variant="secondary">Outline Action</Button>);
    const btn = screen.getByRole("button", { name: /outline action/i });
    expect(btn.className).toContain("bg-surface-2");
    expect(btn.className).toContain("border-border-ghost");
  });

  it("handles disabled state properly", () => {
    render(<Button disabled>Disabled Action</Button>);
    const btn = screen.getByRole("button", { name: /disabled action/i });
    expect(btn).toBeDisabled();
    expect(btn.className).toContain("disabled:opacity-50");
  });
});
