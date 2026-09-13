import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { devbridgeProject } from "@/data/projects";
import { profileData } from "@/data/profile";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import {
  ArrowLeft,
  ArrowRight,
  Smartphone,
  Layers,
  Users,
  MessageSquareCode,
  DollarSign,
  Star,
  GitPullRequest,
  CheckCircle2,
  Code2,
  Cpu,
  Layout,
  Palette,
  Compass,
} from "lucide-react";

export const metadata: Metadata = {
  title: "DevBridge Case Study — Jadagam Likhith",
  description:
    "Developer Collaboration, Sponsorship & Feedback Platform: A native Android application built with Kotlin, Jetpack Compose, and Material Design 3.",
};

export default function DevBridgeCaseStudy() {
  return (
    <div className="min-h-screen bg-canvas text-content-primary flex flex-col justify-between selection:bg-brand-indigo/30 selection:text-white">
      <Navbar />

      <main className="flex-grow pt-32 sm:pt-40 pb-20 sm:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium text-content-muted hover:text-brand-indigo transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </Link>
          </div>

          {/* 1. Case Study Hero */}
          <header className="space-y-6 pb-12 border-b border-border-ghost">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="indigo" size="md">
                <Smartphone className="w-3.5 h-3.5 mr-1" />
                {devbridgeProject.categoryTag}
              </Badge>
              <Badge variant="neutral" size="md">
                {devbridgeProject.platform}
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-content-primary tracking-tight leading-[1.15]">
              {devbridgeProject.title}
            </h1>

            <p className="text-lg sm:text-xl text-brand-indigo font-display font-semibold">
              {devbridgeProject.subtitle}
            </p>

            <p className="text-base sm:text-lg text-content-muted leading-relaxed">
              {devbridgeProject.summary}
            </p>

            {/* Quick Metadata Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border-ghost text-xs">
              <div>
                <span className="text-content-subtle block mb-1">Role</span>
                <span className="font-semibold text-content-primary">
                  Product UI/UX & Mobile Developer
                </span>
              </div>
              <div>
                <span className="text-content-subtle block mb-1">Platform</span>
                <span className="font-semibold text-content-primary">
                  Android Native
                </span>
              </div>
              <div>
                <span className="text-content-subtle block mb-1">Primary Stack</span>
                <span className="font-semibold text-content-primary">
                  Kotlin • Jetpack Compose
                </span>
              </div>
              <div>
                <span className="text-content-subtle block mb-1">Design System</span>
                <span className="font-semibold text-content-primary">
                  Material Design 3
                </span>
              </div>
            </div>
          </header>

          {/* 2. Visual Device Composition */}
          <section className="py-12 sm:py-16">
            <div className="p-8 sm:p-12 rounded-3xl bg-surface-1 border border-border-ghost flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-md text-left">
                <Badge variant="cyan" size="sm">
                  Conceptual UI Composition
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-content-primary">
                  Designed for Developer Ergonomics
                </h2>
                <p className="text-sm text-content-muted leading-relaxed">
                  The mobile interface organizes high-density code discussions, review dialogs, and collaboration invites into comfortable touch zones tailored for one-handed mobile browsing.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs px-2.5 py-1 rounded bg-surface-2 text-brand-cyan border border-brand-cyan/20">
                    Dark-Theme Tokens
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded bg-surface-2 text-brand-indigo border border-brand-indigo/20">
                    Dynamic MD3 Surfaces
                  </span>
                </div>
              </div>

              {/* Mobile Frame Preview */}
              <div className="shrink-0 w-full max-w-[300px]">
                <DeviceFrame className="shadow-glow">
                  <div className="p-4 space-y-3 text-left h-full flex flex-col justify-between select-none">
                    <div className="pt-4 flex items-center justify-between border-b border-border-ghost pb-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-md bg-brand-indigo/20 flex items-center justify-center text-[9px] font-bold text-brand-indigo">
                          DB
                        </div>
                        <span className="text-xs font-display font-bold text-content-primary">
                          DevBridge
                        </span>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-surface-2 text-brand-cyan">
                        Explore
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-surface-2 border border-border-ghost space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-content-primary">
                          GraphQL Cache Engine
                        </span>
                        <span className="text-[10px] text-amber-400 flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5 fill-amber-400" />
                          5.0
                        </span>
                      </div>
                      <p className="text-[10px] text-content-muted line-clamp-2">
                        Type-safe caching layer with optimistic updates and normalized entity persistence.
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[8px] px-1.5 py-0.5 rounded bg-surface-3 text-content-muted">
                          Kotlin • Coroutines
                        </span>
                        <span className="text-[8px] text-brand-indigo font-medium flex items-center gap-1">
                          <GitPullRequest className="w-2 h-2" />
                          Collab Open
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-surface-2 border border-border-ghost space-y-1">
                      <span className="text-[9px] font-medium text-brand-violet block">
                        Review Discussion
                      </span>
                      <p className="text-[9px] text-content-muted italic">
                        &quot;Material 3 navigation drawer and modular state make code inspection effortless.&quot;
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border-ghost flex items-center justify-around text-[9px] text-content-muted">
                      <span className="text-brand-indigo font-medium">Showcase</span>
                      <span>Reviews</span>
                      <span>Collab</span>
                      <span>Sponsors</span>
                    </div>
                  </div>
                </DeviceFrame>
              </div>
            </div>
          </section>

          {/* 3. Product Context & Core Problem */}
          <section className="py-10 space-y-6 border-t border-border-ghost">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-content-primary">
              Product Context & Purpose
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-content-muted leading-relaxed">
              <p>
                Developers building ambitious open-source tools and experimental software often lack a focused ecosystem to present their projects for structured peer evaluation, discover aligned collaborators, and gain visibility with prospective sponsors.
              </p>
              <p>
                DevBridge was conceived to address this gap as a native mobile experience, allowing developers to review code builds, provide structured feedback, and form project teams directly on mobile devices without friction.
              </p>
            </div>
          </section>

          {/* 4. Core User Flows (Detailed Breakdown) */}
          <section className="py-10 space-y-6 border-t border-border-ghost">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-content-primary">
              Core UX Architecture & Flows
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {devbridgeProject.uxFlows?.map((flow) => (
                <Card key={flow.title} variant="tier1" padding="md" className="space-y-3">
                  <Badge variant="indigo" size="sm">
                    {flow.tag}
                  </Badge>
                  <h3 className="text-base font-display font-bold text-content-primary">
                    {flow.title}
                  </h3>
                  <p className="text-xs text-content-muted leading-relaxed">
                    {flow.description}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          {/* 5. UI/UX Approach & Material Design 3 */}
          <section className="py-10 space-y-6 border-t border-border-ghost">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-content-primary">
              UI/UX Approach & Design Heuristics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card variant="tier1" padding="md" className="space-y-2.5">
                <div className="p-2 rounded-lg bg-surface-2 border border-border-ghost w-fit">
                  <Palette className="w-4 h-4 text-brand-indigo" />
                </div>
                <h3 className="text-sm font-display font-bold text-content-primary">
                  Material Design 3 Tokens
                </h3>
                <p className="text-xs text-content-muted leading-relaxed">
                  Tonal color palette adhering to MD3 specifications, utilizing surface tiers for visual depth instead of rigid borders.
                </p>
              </Card>

              <Card variant="tier1" padding="md" className="space-y-2.5">
                <div className="p-2 rounded-lg bg-surface-2 border border-border-ghost w-fit">
                  <Layout className="w-4 h-4 text-brand-cyan" />
                </div>
                <h3 className="text-sm font-display font-bold text-content-primary">
                  Mobile Information Hierarchy
                </h3>
                <p className="text-xs text-content-muted leading-relaxed">
                  Organized high-density project cards with progressive disclosure to keep mobile screens scannable and clean.
                </p>
              </Card>

              <Card variant="tier1" padding="md" className="space-y-2.5">
                <div className="p-2 rounded-lg bg-surface-2 border border-border-ghost w-fit">
                  <Compass className="w-4 h-4 text-brand-violet" />
                </div>
                <h3 className="text-sm font-display font-bold text-content-primary">
                  Thumb-Zone Navigation
                </h3>
                <p className="text-xs text-content-muted leading-relaxed">
                  Key interaction touchpoints, modal review drawers, and primary CTAs positioned within comfortable natural thumb reach.
                </p>
              </Card>
            </div>
          </section>

          {/* 6. Technology & Architectural Highlights */}
          <section className="py-10 space-y-6 border-t border-border-ghost">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-content-primary">
              Technical Implementation
            </h2>
            <div className="p-6 rounded-2xl bg-surface-1 border border-border-ghost space-y-4">
              <div className="flex flex-wrap gap-2">
                {devbridgeProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 rounded-lg bg-surface-2 text-content-primary border border-border-ghost font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-2 space-y-2">
                <h3 className="text-xs font-semibold text-content-primary uppercase tracking-wider font-display">
                  Architectural Pillars
                </h3>
                <ul className="space-y-2 text-xs text-content-muted">
                  {devbridgeProject.architecturalHighlights?.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-indigo shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 7. Reflection & Learnings */}
          <section className="py-10 space-y-6 border-t border-border-ghost">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-content-primary">
              Key Reflections & Takeaways
            </h2>
            <div className="space-y-4 text-sm text-content-muted leading-relaxed">
              <p>
                Developing DevBridge provided deep practical experience in merging modern declarative Android development (Jetpack Compose) with rigorous user interface design principles (Material Design 3).
              </p>
              <p>
                The primary learning was balancing high-density technical information (code snippets, repo metadata, review threads) with clean mobile visual hierarchy, ensuring the user experience remains fast, readable, and intuitive.
              </p>
            </div>
          </section>

          {/* Next Project / Back Navigation Footer */}
          <nav className="pt-12 border-t border-border-ghost flex flex-col sm:flex-row items-center justify-between gap-4" aria-label="Project Navigation">
            <Link href="/">
              <Button variant="secondary" size="md" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Overview</span>
              </Button>
            </Link>

            <Link href="/work/e-library">
              <Button variant="primary" size="md" className="gap-2">
                <span>Next: IJRAR E-Library Publication</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </nav>
        </div>
      </main>

      <Footer />
    </div>
  );
}
