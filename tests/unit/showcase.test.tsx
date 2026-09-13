import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { DevBridgeShowcase } from "@/components/sections/DevBridgeShowcase";
import { ELibraryShowcase } from "@/components/sections/ELibraryShowcase";

describe("Showcase Components", () => {
  it("renders DevBridge flagship project with verified flows", () => {
    render(<DevBridgeShowcase />);
    expect(screen.getByText("DevBridge")).toBeInTheDocument();
    expect(screen.getByText(/Project Upload & Media Cards/i)).toBeInTheDocument();
    expect(screen.getByText(/Constructive Peer Review Loop/i)).toBeInTheDocument();
    expect(screen.getByText(/Explore DevBridge Case Study/i)).toBeInTheDocument();
  });

  it("renders E-Library academic publication with citation details", () => {
    render(<ELibraryShowcase />);
    expect(screen.getByText(/IJRAR25B3067/i)).toBeInTheDocument();
    expect(screen.getByText(/Volume 12, Issue 2/i)).toBeInTheDocument();
    expect(screen.getByText(/View Research Case Study/i)).toBeInTheDocument();
  });
});
