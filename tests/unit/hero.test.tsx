import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { HeroSection } from "@/components/sections/HeroSection";

describe("HeroSection Component", () => {
  it("renders human-first greeting and display positioning", () => {
    render(<HeroSection />);
    expect(screen.getByText("Hi, I'm Jadagam Likhith.")).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === "h1" &&
          content.includes("Full Stack Developer")
        );
      })
    ).toBeInTheDocument();
  });

  it("renders verified metadata baseline chips", () => {
    render(<HeroSection />);
    expect(screen.getByText(/Vijayawada, Andhra Pradesh/i)).toBeInTheDocument();
    expect(screen.getByText(/B.Tech Computer Science/i)).toBeInTheDocument();
    expect(screen.getByText(/Published Researcher \(IJRAR\)/i)).toBeInTheDocument();
  });

  it("renders primary action buttons and resume link", () => {
    render(<HeroSection />);
    const exploreBtn = screen.getByRole("button", {
      name: /explore featured work/i,
    });
    expect(exploreBtn).toBeInTheDocument();

    const resumeLink = screen.getByLabelText(/View Resume \(PDF\)/i);
    expect(resumeLink).toHaveAttribute("href", "/JADAGAM_LIKHITH_Resume.pdf");
  });
});
