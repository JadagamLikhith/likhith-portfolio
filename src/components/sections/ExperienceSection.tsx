"use client";

import * as React from "react";
import {
  internshipExperience,
  educationMilestone,
  certificationsData,
} from "@/data/experience";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { editorialEase } from "@/lib/motion";

export function ExperienceSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="experience" className="py-20 sm:py-28 border-t border-border-ghost relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: editorialEase }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-display font-semibold text-brand-indigo tracking-wider uppercase mb-2">
              <span>04</span>
              <span>/</span>
              <span>Experience &amp; Academic Foundation</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-content-primary">
              Experience, Education &amp; Certifications
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-content-muted max-w-md">
            Verified industrial training in Product UI/UX, ongoing Computer Science engineering degree, and recognized certifications.
          </p>
        </motion.div>

        {/* 3-Column / Staggered Progressive Timeline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
          {/* Card 1: Internship Experience */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.05, ease: editorialEase }}
            className="h-full"
          >
            <Card variant="tier1" padding="md" className="border border-border-ghost flex flex-col justify-between h-full hover:border-brand-indigo/30 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-surface-2 border border-border-ghost">
                    <Briefcase className="w-5 h-5 text-brand-indigo" />
                  </div>
                  <Badge variant="indigo" size="sm">
                    {internshipExperience.duration}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-lg font-display font-bold text-content-primary">
                    {internshipExperience.role}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-brand-indigo font-medium mt-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{internshipExperience.company}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-content-muted mt-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{internshipExperience.timeline}</span>
                  </div>
                </div>

                <p className="text-xs text-content-muted leading-relaxed">
                  {internshipExperience.description}
                </p>

                <div className="space-y-2 pt-2">
                  <h4 className="text-[11px] font-semibold text-content-primary uppercase tracking-wider font-display">
                    Core Highlights
                  </h4>
                  <ul className="space-y-1.5 text-xs text-content-muted">
                    {internshipExperience.keyLearnings.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-indigo shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Card 2: Academic Milestone */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.15, ease: editorialEase }}
            className="h-full"
          >
            <Card variant="tier1" padding="md" className="border border-border-ghost flex flex-col justify-between h-full hover:border-brand-cyan/30 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-surface-2 border border-border-ghost">
                    <GraduationCap className="w-5 h-5 text-brand-cyan" />
                  </div>
                  <Badge variant="cyan" size="sm">
                    CGPA {educationMilestone.cgpa}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-lg font-display font-bold text-content-primary">
                    {educationMilestone.degree}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-brand-cyan font-medium mt-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{educationMilestone.institution}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-content-muted mt-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{educationMilestone.timeline} • {educationMilestone.location}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="text-[11px] font-semibold text-content-primary uppercase tracking-wider font-display">
                    Core Curriculum Focus
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {educationMilestone.focusAreas.map((area) => (
                      <span
                        key={area}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-surface-2 text-content-muted border border-border-ghost"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Card 3: Verified Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.25, ease: editorialEase }}
            className="h-full"
          >
            <Card variant="tier1" padding="md" className="border border-border-ghost flex flex-col justify-between h-full hover:border-brand-violet/30 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-surface-2 border border-border-ghost">
                    <Award className="w-5 h-5 text-brand-violet" />
                  </div>
                  <Badge variant="violet" size="sm">
                    Verified
                  </Badge>
                </div>

                <div>
                  <h3 className="text-lg font-display font-bold text-content-primary">
                    Technical Certifications
                  </h3>
                  <p className="text-xs text-content-muted mt-1">
                    Recognized credentials from national skilling and academic portals.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {certificationsData.map((cert) => (
                    <div
                      key={cert.title}
                      className="p-3 rounded-xl bg-surface-2 border border-border-ghost space-y-1 hover:border-border-hover transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-content-primary">
                          {cert.title}
                        </h4>
                      </div>
                      <p className="text-[10px] text-content-muted">
                        {cert.issuingBody}
                      </p>
                      <div className="pt-1">
                        <span className="text-[10px] font-medium text-brand-violet bg-brand-violet/10 px-2 py-0.5 rounded border border-brand-violet/20 inline-block">
                          {cert.categoryOrScore}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
