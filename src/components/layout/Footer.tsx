"use client";

import * as React from "react";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border-ghost bg-surface-1/40 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-border-ghost">
          {/* Brand & Positioning */}
          <div className="space-y-2 max-w-md">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-display font-bold text-lg text-content-primary hover:text-brand-indigo transition-colors"
            >
              <span className="w-7 h-7 rounded-lg bg-surface-2 border border-border-ghost flex items-center justify-center text-xs text-brand-indigo">
                JL
              </span>
              {profileData.name}
            </Link>
            <p className="text-sm text-content-muted leading-relaxed">
              {profileData.primaryPositioning} based in {profileData.location}. Crafting scalable backend systems and high-fidelity Material Design 3 interfaces.
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={profileData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-surface-2 border border-border-ghost text-content-muted hover:text-content-primary hover:border-brand-indigo/30 transition-all hover:scale-105"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profileData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-surface-2 border border-border-ghost text-content-muted hover:text-content-primary hover:border-brand-indigo/30 transition-all hover:scale-105"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profileData.socialLinks.email}`}
              className="p-2.5 rounded-xl bg-surface-2 border border-border-ghost text-content-muted hover:text-content-primary hover:border-brand-indigo/30 transition-all hover:scale-105"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-surface-2 border border-border-ghost text-content-muted hover:text-content-primary hover:border-brand-indigo/30 transition-all hover:scale-105 ml-2"
              aria-label="Scroll back to top of page"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Legal & Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-content-subtle">
          <p>© {new Date().getFullYear()} Jadagam Likhith. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Location: Vijayawada, Andhra Pradesh</span>
            <span>•</span>
            <span>B.Tech CSE (2027)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
