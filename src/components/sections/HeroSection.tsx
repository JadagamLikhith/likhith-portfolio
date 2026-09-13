"use client";

import * as React from "react";
import Image from "next/image";
import { profileData } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import {
  FileText,
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  MapPin,
  GraduationCap,
  BookOpen,
  Crosshair,
} from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export function HeroSection() {
  const containerRef = React.useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track scroll position relative to the hero section (0 when top enters, 1 when hero leaves viewport)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Desktop Mouse Parallax State (Fine pointers only, disabled on touch & reduced motion)
  const [isFinePointer, setIsFinePointer] = React.useState(false);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(pointer: fine)");
      setIsFinePointer(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setIsFinePointer(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!isFinePointer || shouldReduceMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const relativeY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      setMousePos({
        x: Math.max(-1, Math.min(1, relativeX)),
        y: Math.max(-1, Math.min(1, relativeY)),
      });
    },
    [isFinePointer, shouldReduceMotion]
  );

  const handleMouseLeave = React.useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  // =========================================================================
  // 5-LAYER SCROLL TIMELINE & PARALLAX HANDOFF SYSTEM
  // [0% -> 25% -> 50% -> 75% -> 100%]
  // =========================================================================

  // LAYER 1: Dark Obsidian Background (Very Slow)
  const bgY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, shouldReduceMotion ? 0 : -5, shouldReduceMotion ? 0 : -15, shouldReduceMotion ? 0 : -25, shouldReduceMotion ? 0 : -40]
  );
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.8, 1],
    [1, 1, 0.75, 0.35]
  );

  // LAYER 2: Atmospheric Glow / Subtle Grid
  const atmosphereScrollY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, shouldReduceMotion ? 0 : -10, shouldReduceMotion ? 0 : -30, shouldReduceMotion ? 0 : -55, shouldReduceMotion ? 0 : -85]
  );
  const atmosphereRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : 15]
  );
  const atmosphereOpacity = useTransform(
    scrollYProgress,
    [0, 0.6, 0.9, 1],
    [1, 0.95, 0.6, 0.2]
  );

  // LAYER 3: Real Portrait (Noticeably Faster, Precision Timeline Scale/Y)
  const portraitScrollY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, shouldReduceMotion ? 0 : -20, shouldReduceMotion ? 0 : -50, shouldReduceMotion ? 0 : -80, shouldReduceMotion ? 0 : -120]
  );
  const portraitScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [1.0, shouldReduceMotion ? 1.0 : 1.01, shouldReduceMotion ? 1.0 : 1.02, shouldReduceMotion ? 1.0 : 1.025, shouldReduceMotion ? 1.0 : 1.03]
  );
  const portraitOpacity = useTransform(
    scrollYProgress,
    [0, 0.75, 1],
    [1.0, 0.9, 0.4]
  );

  // LAYER 4: Small Editorial Labels (Slightly Faster than Portrait)
  const foregroundScrollY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, shouldReduceMotion ? 0 : -25, shouldReduceMotion ? 0 : -65, shouldReduceMotion ? 0 : -105, shouldReduceMotion ? 0 : -155]
  );
  const foregroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [1.0, 0.85, 0.25]
  );

  // LAYER 5: Main Typography (Almost Stable, Reading Plane)
  const textScrollY = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, shouldReduceMotion ? 0 : -5, shouldReduceMotion ? 0 : -12, shouldReduceMotion ? 0 : -22, shouldReduceMotion ? 0 : -35]
  );
  const heroContentOpacity = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [1, 0.92, 0.45]
  );

  // Pointer tilt offsets (max +-4px portrait, +-8px atmosphere, +-10px foreground)
  const mousePortraitX = !shouldReduceMotion && isFinePointer ? mousePos.x * 4 : 0;
  const mousePortraitY = !shouldReduceMotion && isFinePointer ? mousePos.y * 4 : 0;
  const mouseAtmosphereX = !shouldReduceMotion && isFinePointer ? mousePos.x * 8 : 0;
  const mouseAtmosphereY = !shouldReduceMotion && isFinePointer ? mousePos.y * 8 : 0;
  const mouseForegroundX = !shouldReduceMotion && isFinePointer ? mousePos.x * 10 : 0;
  const mouseForegroundY = !shouldReduceMotion && isFinePointer ? mousePos.y * 10 : 0;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[90vh] lg:min-h-screen pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-28 lg:pb-32 overflow-hidden flex items-center"
    >
      {/* =====================================================================
          LAYER 1: BACKGROUND ATMOSPHERE (Moves slowest: timeline y = 0 -> -40px)
          ===================================================================== */}
      <motion.div
        style={{ y: bgY, opacity: bgOpacity }}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      >
        {/* Soft Radial Ambient Cones */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] lg:w-[900px] h-[350px] sm:h-[450px] bg-brand-indigo/10 blur-[140px] rounded-full" />
        <div className="absolute top-1/3 right-10 lg:right-1/4 w-[380px] lg:w-[480px] h-[300px] bg-brand-violet/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-20 left-10 w-[300px] h-[220px] bg-brand-cyan/5 blur-[100px] rounded-full" />

        {/* Subtle Architectural Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#171C2B15_1px,transparent_1px),linear-gradient(to_bottom,#171C2B15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-40" />
      </motion.div>

      <motion.div
        style={{ opacity: heroContentOpacity }}
        className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          {/* =================================================================
              LAYER 5: PRIMARY TEXT COLUMN (Anchored, Stable reading plane)
              ================================================================= */}
          <motion.div
            style={{ y: textScrollY }}
            className="lg:col-span-7 xl:col-span-7 z-10 space-y-6 sm:space-y-8"
          >
            {/* Greeting & Identity Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span className="text-sm sm:text-base font-display font-medium text-brand-indigo">
                Hi, I&apos;m Jadagam Likhith.
              </span>
              <span className="w-8 h-[1px] bg-border-ghost" />
              <span className="text-xs text-content-muted font-normal">
                Computer Science &amp; Engineering
              </span>
            </motion.div>

            {/* Architectural Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-display font-bold text-content-primary tracking-tight leading-[1.12]"
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
              className="text-base sm:text-lg text-content-muted leading-relaxed max-w-2xl"
            >
              {profileData.bioParagraph}
            </motion.p>

            {/* Metadata Baseline Chips */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs text-content-muted"
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-1 border border-border-ghost">
                <MapPin className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                <span>{profileData.location}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-1 border border-border-ghost">
                <GraduationCap className="w-3.5 h-3.5 text-brand-indigo shrink-0" />
                <span>
                  {profileData.educationSummary.degree} {profileData.educationSummary.field} (CGPA {profileData.educationSummary.cgpa})
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-1 border border-border-ghost">
                <BookOpen className="w-3.5 h-3.5 text-brand-violet shrink-0" />
                <span>Published Researcher (IJRAR)</span>
              </div>
            </motion.div>

            {/* Action Row & Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2"
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
          </motion.div>

          {/* =================================================================
              RIGHT COLUMN: LAYERED CINEMATIC PARALLAX PORTRAIT COMPOSITION
              ================================================================= */}
          <div className="lg:col-span-5 xl:col-span-5 relative mt-6 lg:mt-0 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[480px]">
              {/* =============================================================
                  LAYER 2: ATMOSPHERIC ELEMENTS (Behind Portrait)
                  ============================================================= */}
              <motion.div
                style={{
                  y: atmosphereScrollY,
                  rotate: atmosphereRotate,
                  opacity: atmosphereOpacity,
                  x: mouseAtmosphereX,
                }}
                aria-hidden="true"
                className="absolute -top-12 -left-12 -right-12 -bottom-12 pointer-events-none select-none z-0 transition-transform duration-300 ease-out"
              >
                {/* Geometric Orbital Halo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] lg:w-[460px] h-[340px] sm:h-[420px] lg:h-[460px] rounded-full border border-dashed border-brand-indigo/20 animate-[spin_60s_linear_infinite]" />

                {/* Soft Backlight Aura Behind Portrait */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-gradient-to-tr from-brand-indigo/20 via-brand-violet/15 to-transparent blur-[80px] rounded-full" />

                {/* Subtle Technical Corner Brackets */}
                <div className="hidden sm:block absolute top-4 -left-4 text-brand-indigo/40">
                  <Crosshair className="w-5 h-5 opacity-40" />
                </div>
                <div className="hidden sm:block absolute -bottom-4 right-4 text-brand-violet/40">
                  <Crosshair className="w-5 h-5 opacity-40" />
                </div>
              </motion.div>

              {/* =============================================================
                  LAYER 3: REAL PORTRAIT ANCHOR (Timeline: Scale 1.0->1.025, y: 0->-120px)
                  ============================================================= */}
              <motion.div
                style={{
                  y: portraitScrollY,
                  scale: portraitScale,
                  opacity: portraitOpacity,
                  x: mousePortraitX,
                }}
                className="relative z-10 transition-transform duration-200 ease-out"
              >
                {/* Architectural Frame & Obsidian Surface */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border-ghost bg-surface-1 shadow-2xl shadow-black/90">
                  {/* Portrait Image Container */}
                  <div className="relative w-full h-[410px] sm:h-[480px] lg:h-[520px] xl:h-[560px] overflow-hidden">
                    <Image
                      src="/images/likhith-portrait.jpg"
                      alt="Portrait of Likhith"
                      fill
                      priority
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
                      className="object-cover object-top sm:object-[center_15%] select-none transition-transform duration-700 hover:scale-[1.02]"
                    />

                    {/* Restrained Cinematic Edge Vignettes */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-bg-obsidian/95 via-bg-obsidian/25 to-transparent pointer-events-none"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-r from-bg-obsidian/35 via-transparent to-transparent pointer-events-none hidden lg:block"
                    />
                  </div>
                </div>
              </motion.div>

              {/* =============================================================
                  LAYER 4: FOREGROUND EDITORIAL BADGES (Moves faster: y: 0->-155px)
                  ============================================================= */}
              <motion.div
                style={{
                  y: foregroundScrollY,
                  opacity: foregroundOpacity,
                  x: mouseForegroundX,
                }}
                className="relative z-20 pointer-events-none transition-transform duration-200 ease-out"
              >
                {/* Floating Bottom Status Pill */}
                <div className="absolute -bottom-5 sm:-bottom-6 left-4 right-4 sm:left-6 sm:right-6 p-3 sm:p-3.5 rounded-xl bg-surface-1/95 backdrop-blur-xl border border-border-ghost shadow-xl shadow-black/80 flex items-center justify-between pointer-events-auto">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-brand-indigo font-semibold block">
                      Full-Stack &amp; Design
                    </span>
                    <span className="text-xs font-display font-medium text-content-primary">
                      {profileData.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-content-muted bg-surface-2 px-2.5 py-1 rounded-full border border-border-ghost">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{profileData.availabilityStatus}</span>
                  </div>
                </div>

                {/* Vertical Editorial Watermark on Wide Displays */}
                <div
                  aria-hidden="true"
                  className="hidden xl:flex absolute -right-7 -top-[480px] flex-col items-center gap-2 select-none text-[10px] font-mono tracking-[0.25em] text-content-subtle uppercase [writing-mode:vertical-lr]"
                >
                  <span className="text-content-muted">BUILD</span>
                  <span className="w-1 h-1 rounded-full bg-border-ghost" />
                  <span className="text-brand-indigo">DESIGN</span>
                  <span className="w-1 h-1 rounded-full bg-border-ghost" />
                  <span className="text-content-muted">EXPLORE</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}


