"use client";

import * as React from "react";
import Link from "next/link";
import { eLibraryProject } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ArrowUpRight,
  BookOpen,
  Award,
  Database,
  Lock,
  Bell,
  Navigation,
  FileCheck2,
} from "lucide-react";

export function ELibraryShowcase() {
  const details = eLibraryProject.publicationDetails;

  return (
    <section id="research" className="py-20 sm:py-28 border-t border-border-ghost relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-display font-semibold text-brand-violet tracking-wider uppercase mb-2">
              <span>02</span>
              <span>/</span>
              <span>Peer-Reviewed Academic Publication</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-content-primary">
              Published Research & Monograph
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-content-muted max-w-md">
            Peer-reviewed study and modular system architecture published in the International Journal of Research and Analytical Reviews (IJRAR).
          </p>
        </div>

        {/* Monograph Presentation Container */}
        <Card variant="tier1" padding="lg" className="border border-border-ghost relative overflow-hidden">
          {/* Subtle Ambient Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-violet/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="space-y-8 relative z-10">
            {/* Journal Citation Metadata Box */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface-2/80 border border-border-ghost text-xs">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-violet" />
                <span className="font-medium text-content-primary">
                  {details?.journal}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-content-muted font-mono text-[11px]">
                <span>{details?.date}</span>
                <span>•</span>
                <span>{details?.volumeIssue}</span>
                <span>•</span>
                <span className="text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded border border-brand-cyan/20">
                  Paper ID: {details?.paperId}
                </span>
                <span>•</span>
                <span>Author: {details?.author}</span>
              </div>
            </div>

            {/* Paper Title & Abstract Description */}
            <div className="space-y-3">
              <Badge variant="violet" size="sm">
                <BookOpen className="w-3 h-3 mr-1" />
                {eLibraryProject.categoryTag}
              </Badge>
              <h3 className="text-xl sm:text-3xl font-display font-bold text-content-primary leading-snug">
                {eLibraryProject.title}
              </h3>
              <p className="text-sm sm:text-base text-content-muted leading-relaxed max-w-4xl">
                {eLibraryProject.summary}
              </p>
            </div>

            {/* 3-Tier Architecture & System Features Breakdown */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-content-primary uppercase tracking-wider font-display">
                Key Architectural Systems & Heuristics
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-surface-2 border border-border-ghost space-y-2">
                  <div className="flex items-center gap-2 text-brand-cyan">
                    <Lock className="w-4 h-4" />
                    <span className="text-xs font-bold text-content-primary font-display">
                      Role-Based Access
                    </span>
                  </div>
                  <p className="text-xs text-content-muted leading-relaxed">
                    Granular RBAC engine separating permissions for student readers, faculty researchers, and system administrators.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface-2 border border-border-ghost space-y-2">
                  <div className="flex items-center gap-2 text-brand-indigo">
                    <Bell className="w-4 h-4" />
                    <span className="text-xs font-bold text-content-primary font-display">
                      Automated Alerts
                    </span>
                  </div>
                  <p className="text-xs text-content-muted leading-relaxed">
                    Automated background notification queue for loan returns, reservations, and new academic submissions.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface-2 border border-border-ghost space-y-2">
                  <div className="flex items-center gap-2 text-brand-violet">
                    <Navigation className="w-4 h-4" />
                    <span className="text-xs font-bold text-content-primary font-display">
                      Smart Navigation
                    </span>
                  </div>
                  <p className="text-xs text-content-muted leading-relaxed">
                    Content-aware discovery taxonomy and recommendation loops designed for high-density academic repositories.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface-2 border border-border-ghost space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Database className="w-4 h-4" />
                    <span className="text-xs font-bold text-content-primary font-display">
                      Flask & MySQL Core
                    </span>
                  </div>
                  <p className="text-xs text-content-muted leading-relaxed">
                    Modular backend architecture coupled with normalized relational schema for fast catalog queries.
                  </p>
                </div>
              </div>
            </div>

            {/* Tech Stack & Monograph Case Study Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border-ghost">
              <div className="flex flex-wrap gap-2">
                {eLibraryProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 rounded-lg bg-surface-2 text-content-primary border border-border-ghost font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <Link href={eLibraryProject.route}>
                <Button variant="secondary" size="md" className="gap-2 text-xs">
                  <FileCheck2 className="w-4 h-4 text-brand-violet" />
                  <span>View Research Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
