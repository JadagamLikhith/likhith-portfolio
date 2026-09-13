"use client";

import * as React from "react";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FileText, Menu, X, ArrowUpRight } from "lucide-react";
import { MobileNav } from "./MobileNav";

export const navLinks = [
  { label: "Selected Work", href: "#work" },
  { label: "Research", href: "#research" },
  { label: "Capabilities", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("");

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["work", "research", "skills", "experience", "contact"];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#090A0F]/85 backdrop-blur-md border-b border-border-ghost py-3.5 shadow-lg shadow-black/20"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Identity */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo rounded-lg"
          >
            <div className="w-9 h-9 rounded-xl bg-surface-2 border border-border-ghost flex items-center justify-center font-display font-bold text-sm text-brand-indigo group-hover:border-brand-indigo/40 group-hover:scale-105 transition-all shadow-glow">
              JL
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-sm sm:text-base text-content-primary tracking-tight group-hover:text-brand-indigo transition-colors">
                {profileData.name}
              </span>
              <span className="hidden sm:inline-block text-[11px] text-content-muted font-normal">
                Full Stack × Product Design
              </span>
            </div>
          </Link>

          {/* Availability Status Badge (Desktop) */}
          <div className="hidden lg:flex items-center">
            <Badge variant="cyan" size="sm" className="bg-brand-cyan/5 text-brand-cyan border-brand-cyan/20">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse mr-1" />
              {profileData.availabilityStatus}
            </Badge>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-surface-1/60 border border-border-ghost rounded-full px-3 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all ${
                    isActive
                      ? "text-white bg-surface-3 shadow-sm"
                      : "text-content-muted hover:text-content-primary hover:bg-surface-2/60"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Quick Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href={profileData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Jadagam Likhith's Resume (PDF)"
            >
              <Button variant="secondary" size="sm" className="gap-1.5 text-xs">
                <FileText className="w-3.5 h-3.5 text-content-muted" />
                Resume
              </Button>
            </a>
            <a href="#contact">
              <Button variant="primary" size="sm" className="gap-1 text-xs font-medium">
                Get in Touch
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-surface-2 border border-border-ghost text-content-muted hover:text-content-primary focus:outline-none focus:ring-2 focus:ring-brand-indigo"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
        resumeUrl={profileData.resumeUrl}
      />
    </>
  );
}
