import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

describe("Capabilities, Experience, Contact & Footer Components", () => {
  it("renders 4-domain capabilities without percentage bars", () => {
    render(<CapabilitiesSection />);
    expect(screen.getByText("Core Programming")).toBeInTheDocument();
    expect(screen.getByText("Full Stack & Databases")).toBeInTheDocument();
    expect(screen.getByText("Product & UI/UX Design")).toBeInTheDocument();
    expect(screen.getByText("Tools, Cloud & Analytics")).toBeInTheDocument();
  });

  it("renders experience milestones and verified certifications", () => {
    render(<ExperienceSection />);
    expect(screen.getByText("Product UI/UX Designer")).toBeInTheDocument();
    expect(screen.getByText(/Blackbucks Education/i)).toBeInTheDocument();
    expect(screen.getByText(/Lingayas Institute/i)).toBeInTheDocument();
    expect(screen.getByText("Introduction to Generative AI")).toBeInTheDocument();
  });

  it("renders contact section with copy email button and form UI", () => {
    render(<ContactSection />);
    expect(
      screen.getByText(/Let's build something exceptional/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /transmit message/i })).toBeInTheDocument();
  });

  it("renders footer with copyright and location", () => {
    render(<Footer />);
    expect(screen.getByText(/Jadagam Likhith. All rights reserved/i)).toBeInTheDocument();
    expect(screen.getByText(/Location: Vijayawada, Andhra Pradesh/i)).toBeInTheDocument();
  });
});
