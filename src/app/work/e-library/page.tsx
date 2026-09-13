import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { eLibraryProject } from "@/data/projects";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  generateScholarlyArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Award,
  Database,
  Lock,
  Bell,
  Navigation,
  FileCheck2,
  Server,
  Layers,
  CheckCircle2,
  Cpu,
  Share2,
  FileText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "E-Library Research Paper Case Study — IJRAR Publication",
  description:
    "Published research in IJRAR (Vol 12, Issue 2, Paper ID: IJRAR25B3067) on an interactive, engaging e-library platform with RBAC, dynamic recommendations, and modular Flask/MySQL architecture.",
  keywords: [
    "E-Library Platform",
    "IJRAR Research Paper",
    "IJRAR25B3067",
    "Flask Web Application",
    "MySQL Database Design",
    "Role-Based Access Control",
    "Jadagam Likhith Research",
  ],
  alternates: {
    canonical: "/work/e-library",
  },
  openGraph: {
    type: "article",
    title: "E-Library Research Paper Case Study — IJRAR Publication",
    description:
      "Published research in IJRAR (Vol 12, Issue 2, Paper ID: IJRAR25B3067) on an interactive, engaging e-library platform with RBAC, dynamic recommendations, and modular Flask/MySQL architecture.",
    url: "/work/e-library",
    images: [
      {
        url: "/images/logo.png",
        width: 300,
        height: 80,
        alt: "E-Library Research — Jadagam Likhith",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Library Research Paper Case Study — IJRAR Publication",
    description:
      "Published research in IJRAR (Vol 12, Issue 2, Paper ID: IJRAR25B3067) on an interactive, engaging e-library platform with RBAC, dynamic recommendations, and modular Flask/MySQL architecture.",
    creator: "@ZenMaestro",
    images: ["/images/logo.png"],
  },
};

export default function ELibraryCaseStudy() {
  const details = eLibraryProject.publicationDetails;
  const scholarlySchema = generateScholarlyArticleSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Overview", url: "/" },
    { name: "E-Library Research Case Study", url: "/work/e-library" },
  ]);

  return (
    <div className="min-h-screen bg-canvas text-content-primary flex flex-col justify-between selection:bg-brand-indigo/30 selection:text-white">
      <JsonLd data={scholarlySchema} />
      <JsonLd data={breadcrumbSchema} />
      <Navbar />

      <main className="flex-grow pt-32 sm:pt-40 pb-20 sm:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium text-content-muted hover:text-brand-violet transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </Link>
          </div>

          {/* 1. Publication Hero */}
          <header className="space-y-6 pb-12 border-b border-border-ghost">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="violet" size="md">
                <BookOpen className="w-3.5 h-3.5 mr-1" />
                {eLibraryProject.categoryTag}
              </Badge>
              <Badge variant="neutral" size="md">
                {details?.journal}
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-content-primary tracking-tight leading-[1.2]">
              {eLibraryProject.title}
            </h1>

            <p className="text-base sm:text-lg text-brand-violet font-display font-medium">
              {eLibraryProject.subtitle}
            </p>

            <p className="text-sm sm:text-base text-content-muted leading-relaxed">
              {eLibraryProject.summary}
            </p>

            {/* Formal Journal Citation Metadata Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-surface-1 border border-border-ghost space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-brand-violet font-bold text-sm font-display">
                <Award className="w-4 h-4" />
                <span>Official Publication Citation Details</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-content-muted pt-2 border-t border-border-ghost text-[11px]">
                <div>
                  <span className="text-content-subtle block">Journal</span>
                  <span className="font-semibold text-content-primary">IJRAR</span>
                </div>
                <div>
                  <span className="text-content-subtle block">Volume & Issue</span>
                  <span className="font-semibold text-content-primary">
                    {details?.volumeIssue} ({details?.date})
                  </span>
                </div>
                <div>
                  <span className="text-content-subtle block">Paper Identifier</span>
                  <span className="font-semibold text-brand-cyan">
                    {details?.paperId}
                  </span>
                </div>
                <div>
                  <span className="text-content-subtle block">Author</span>
                  <span className="font-semibold text-content-primary">
                    {details?.author}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* 2. Platform Overview & Research Context */}
          <section className="py-10 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-content-primary">
              Research Motivation & Problem Scope
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-content-muted leading-relaxed">
              <p>
                Traditional academic library management systems often suffer from rigid, outdated interfaces, fragmented user workflows, and a lack of intelligent navigation mechanisms. Students and faculty frequently experience friction when searching for curriculum-aligned literature or managing loan reservations.
              </p>
              <p>
                This research project investigated and implemented a modular digital library platform combining modern UI glassmorphism heuristics, automated loan alert pipelines, granular role-based security, and dynamic content recommendations to deliver an interactive and user-centric academic experience.
              </p>
            </div>
          </section>

          {/* 3. 3-Tier System Architecture */}
          <section className="py-10 space-y-6 border-t border-border-ghost">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-content-primary">
              3-Tier Modular System Architecture
            </h2>
            <p className="text-sm text-content-muted">
              The platform is structured into three clean decoupled layers ensuring maintainability, performance, and clear separation of concerns:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Presentation Layer */}
              <Card variant="tier1" padding="md" className="space-y-3">
                <div className="p-2 rounded-lg bg-surface-2 border border-border-ghost w-fit">
                  <Layers className="w-4 h-4 text-brand-cyan" />
                </div>
                <h3 className="text-sm font-display font-bold text-content-primary">
                  1. Presentation Tier
                </h3>
                <p className="text-xs text-content-muted leading-relaxed">
                  Responsive glassmorphic web interface built for mobile and desktop screens with smooth navigation heuristics and interactive search dialogues.
                </p>
              </Card>

              {/* Application Layer */}
              <Card variant="tier1" padding="md" className="space-y-3">
                <div className="p-2 rounded-lg bg-surface-2 border border-border-ghost w-fit">
                  <Server className="w-4 h-4 text-brand-indigo" />
                </div>
                <h3 className="text-sm font-display font-bold text-content-primary">
                  2. Application Tier (Flask)
                </h3>
                <p className="text-xs text-content-muted leading-relaxed">
                  Modular Python/Flask controllers managing business logic, session validation, RBAC enforcement, and notification dispatches.
                </p>
              </Card>

              {/* Persistence Layer */}
              <Card variant="tier1" padding="md" className="space-y-3">
                <div className="p-2 rounded-lg bg-surface-2 border border-border-ghost w-fit">
                  <Database className="w-4 h-4 text-brand-violet" />
                </div>
                <h3 className="text-sm font-display font-bold text-content-primary">
                  3. Persistence Tier (MySQL)
                </h3>
                <p className="text-xs text-content-muted leading-relaxed">
                  Relational MySQL database with normalized schemas for books, users, borrow logs, reservations, and feedback reviews.
                </p>
              </Card>
            </div>
          </section>

          {/* 4. Core System Features Breakdown */}
          <section className="py-10 space-y-6 border-t border-border-ghost">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-content-primary">
              Core Architectural Subsystems
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Feature 1: RBAC */}
              <div className="p-5 rounded-2xl bg-surface-1 border border-border-ghost space-y-2.5">
                <div className="flex items-center gap-2 text-brand-cyan">
                  <Lock className="w-4 h-4" />
                  <h3 className="text-sm font-bold font-display text-content-primary">
                    Role-Based Access Control (RBAC)
                  </h3>
                </div>
                <p className="text-xs text-content-muted leading-relaxed">
                  Implements strict security policies partitioning capabilities:
                </p>
                <ul className="text-xs text-content-muted space-y-1 pl-1">
                  <li>• <strong>Students:</strong> Catalog search, borrow requests, review submissions.</li>
                  <li>• <strong>Faculty:</strong> Extended borrowing windows, recommendation tagging.</li>
                  <li>• <strong>Admins:</strong> Inventory management, user authorization, circulation logs.</li>
                </ul>
              </div>

              {/* Feature 2: Automated Notifications */}
              <div className="p-5 rounded-2xl bg-surface-1 border border-border-ghost space-y-2.5">
                <div className="flex items-center gap-2 text-brand-indigo">
                  <Bell className="w-4 h-4" />
                  <h3 className="text-sm font-bold font-display text-content-primary">
                    Automated Notifications Engine
                  </h3>
                </div>
                <p className="text-xs text-content-muted leading-relaxed">
                  Background alert system tracking return dates, impending due dates, and reservation status changes to minimize library overdue cycles.
                </p>
              </div>

              {/* Feature 3: Smart Navigation & Recommendations */}
              <div className="p-5 rounded-2xl bg-surface-1 border border-border-ghost space-y-2.5">
                <div className="flex items-center gap-2 text-brand-violet">
                  <Navigation className="w-4 h-4" />
                  <h3 className="text-sm font-bold font-display text-content-primary">
                    Dynamic Navigation & Recommendations
                  </h3>
                </div>
                <p className="text-xs text-content-muted leading-relaxed">
                  Categorical discovery engine filtering books by academic discipline, course syllabus, popularity rating, and related subject tags.
                </p>
              </div>

              {/* Feature 4: Structured Feedback Loop */}
              <div className="p-5 rounded-2xl bg-surface-1 border border-border-ghost space-y-2.5">
                <div className="flex items-center gap-2 text-emerald-400">
                  <FileCheck2 className="w-4 h-4" />
                  <h3 className="text-sm font-bold font-display text-content-primary">
                    User Feedback Mechanism
                  </h3>
                </div>
                <p className="text-xs text-content-muted leading-relaxed">
                  Built-in rating and qualitative review subsystem allowing students and faculty to rate literature quality and provide operational feedback.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Technology Stack */}
          <section className="py-10 space-y-6 border-t border-border-ghost">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-content-primary">
              Technical Stack & Tools
            </h2>
            <div className="flex flex-wrap gap-2">
              {eLibraryProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1.5 rounded-lg bg-surface-2 text-content-primary border border-border-ghost font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* 6. Academic Conclusion */}
          <section className="py-10 space-y-6 border-t border-border-ghost">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-content-primary">
              Publication Summary & Research Value
            </h2>
            <div className="space-y-4 text-sm text-content-muted leading-relaxed">
              <p>
                The research demonstrated that modernizing digital library architectures with responsive glassmorphism heuristics, automated reminders, and role-based segregation significantly enhances navigation clarity and user engagement compared to legacy library software.
              </p>
              <p className="text-xs text-content-subtle italic">
                Published in the International Journal of Research and Analytical Reviews (IJRAR), May 2025, Volume 12, Issue 2, Paper ID: IJRAR25B3067.
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

            <Link href="/work/devbridge">
              <Button variant="primary" size="md" className="gap-2">
                <span>Next: DevBridge Mobile Platform</span>
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
