"use client";

import * as React from "react";
import { profileData } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FileText, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
  resumeUrl: string;
}

export function MobileNav({
  isOpen,
  onClose,
  links,
  resumeUrl,
}: MobileNavProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="fixed top-[65px] left-0 right-0 bottom-0 bg-[#0A0C12] border-t border-border-ghost p-6 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-6">
          {/* Status Tag */}
          <div className="flex items-center justify-between pb-4 border-b border-border-ghost">
            <Badge variant="cyan" size="sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse mr-1" />
              {profileData.availabilityStatus}
            </Badge>
            <span className="text-xs text-content-muted">Vijayawada, India</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="text-lg font-display font-medium text-content-primary hover:text-brand-indigo py-2 px-3 rounded-lg hover:bg-surface-2 transition-all flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-content-muted">→</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Actions & Socials */}
        <div className="pt-6 border-t border-border-ghost space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
              onClick={onClose}
            >
              <Button variant="secondary" size="md" className="w-full gap-2">
                <FileText className="w-4 h-4" />
                Resume
              </Button>
            </a>
            <a href="#contact" className="w-full" onClick={onClose}>
              <Button variant="primary" size="md" className="w-full gap-1.5">
                Contact
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </a>
          </div>

          <div className="flex items-center justify-center gap-4 pt-2">
            <a
              href={profileData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-surface-2 border border-border-ghost text-content-muted hover:text-content-primary hover:border-border-hover transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={profileData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-surface-2 border border-border-ghost text-content-muted hover:text-content-primary hover:border-border-hover transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profileData.socialLinks.email}`}
              className="p-2.5 rounded-lg bg-surface-2 border border-border-ghost text-content-muted hover:text-content-primary hover:border-border-hover transition-colors"
              aria-label="Email Jadagam Likhith"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
