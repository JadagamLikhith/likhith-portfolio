import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Navbar } from "@/components/layout/Navbar";

describe("Navbar Component", () => {
  it("renders brand name and positioning", () => {
    render(<Navbar />);
    expect(screen.getByText("Jadagam Likhith")).toBeInTheDocument();
  });

  it("renders all desktop navigation anchor links", () => {
    render(<Navbar />);
    expect(screen.getByText("Selected Work")).toHaveAttribute("href", "#work");
    expect(screen.getByText("Research")).toHaveAttribute("href", "#research");
    expect(screen.getByText("Capabilities")).toHaveAttribute("href", "#skills");
    expect(screen.getByText("Experience")).toHaveAttribute("href", "#experience");
    expect(screen.getByText("Contact")).toHaveAttribute("href", "#contact");
  });

  it("renders resume button pointing to authentic PDF", () => {
    render(<Navbar />);
    const resumeLink = screen.getByLabelText(/Download Jadagam Likhith's Resume/i);
    expect(resumeLink).toHaveAttribute("href", "/JADAGAM_LIKHITH_Resume.pdf");
  });
});
