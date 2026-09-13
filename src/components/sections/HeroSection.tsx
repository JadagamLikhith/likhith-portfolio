"use client";

import * as React from "react";
import { profileData } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  FileText,
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  MapPin,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden">
      {/* Ambient background glow cones */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[300px] sm:h-[400px] bg-brand-indigo/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[250px] bg-brand-violet/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          {/* Greeting & Identity Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="text-sm sm:text-base font-display font-medium text-brand-indigo">
              Hi, I&apos;m Jadagam Likhith.
            </span>
            <span className="w-8 h-[1px] bg-border-ghost" />
            <span className="text-xs text-content-muted font-normal">
              Computer Science & Engineering
            </span>
          </motion.div>

          {/* Architectural Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-content-primary tracking-tight leading-[1.15] mb-6"
          >
            Full Stack Developer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-cyan">
              × Product UI/UX Designer
            </span>
          </motion.h1>

          {/* Narrative Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-content-muted leading-relaxed mb-8 max-w-2xl"
          >
            {profileData.bioParagraph}
          </motion.p>

          {/* Metadata Baseline Chips */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-10 text-xs text-content-muted"
          >
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-1 border border-border-ghost">
              <MapPin className="w-3.5 h-3.5 text-brand-cyan" />
              <span>{profileData.location}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-1 border border-border-ghost">
              <GraduationCap className="w-3.5 h-3.5 text-brand-indigo" />
              <span>
                {profileData.educationSummary.degree} {profileData.educationSummary.field} (CGPA {profileData.educationSummary.cgpa})
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-1 border border-border-ghost">
              <BookOpen className="w-3.5 h-3.5 text-brand-violet" />
              <span>Published Researcher (IJRAR)</span>
            </div>
          </motion.div>

          {/* Action Row & Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a href="#work">
              <Button variant="primary" size="lg" className="gap-2 text-sm sm:text-base font-semibold">
                Explore Featured Work
                <ArrowDown className="w-4 h-4" />
              </Button>
            </a>

            <a
              href={profileData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Resume (PDF)"
            >
              <Button variant="secondary" size="lg" className="gap-2 text-sm sm:text-base">
                <FileText className="w-4 h-4 text-content-muted" />
                View Resume (PDF)
              </Button>
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 ml-0 sm:ml-2 pt-2 sm:pt-0">
              <a
                href={profileData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-surface-2 border border-border-ghost text-content-muted hover:text-content-primary hover:border-brand-indigo/40 transition-all hover:scale-105"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profileData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-surface-2 border border-border-ghost text-content-muted hover:text-content-primary hover:border-brand-indigo/40 transition-all hover:scale-105"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profileData.socialLinks.email}`}
                className="p-3 rounded-xl bg-surface-2 border border-border-ghost text-content-muted hover:text-content-primary hover:border-brand-indigo/40 transition-all hover:scale-105"
                aria-label="Send Direct Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
