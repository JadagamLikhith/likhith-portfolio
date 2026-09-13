"use client";

import * as React from "react";
import { skillsData } from "@/data/skills";
import { Card } from "@/components/ui/Card";
import {
  Code2,
  Database,
  Layout,
  Cpu,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { editorialEase } from "@/lib/motion";

export function CapabilitiesSection() {
  const shouldReduceMotion = useReducedMotion();

  const domainIcons: Record<string, React.ReactNode> = {
    languages: <Code2 className="w-5 h-5 text-brand-cyan" />,
    fullstack: <Database className="w-5 h-5 text-brand-indigo" />,
    uiux: <Layout className="w-5 h-5 text-brand-violet" />,
    "tools-analytics": <Cpu className="w-5 h-5 text-emerald-400" />,
  };

  // 4-Card Varied Starting Vertical Offsets (Card 1: 40px, Card 2: 55px, Card 3: 70px, Card 4: 85px)
  const initialYOffsets = [40, 55, 70, 85];

  return (
    <section id="skills" className="py-20 sm:py-28 border-t border-border-ghost bg-surface-1/20 relative overflow-hidden">
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
            <div className="flex items-center gap-2 text-xs font-display font-semibold text-brand-cyan tracking-wider uppercase mb-2">
              <span>03</span>
              <span>/</span>
              <span>Capabilities &amp; Technical Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-content-primary">
              Engineering &amp; Design Domains
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-content-muted max-w-md">
            Structured concrete capabilities spanning core software engineering, modern client/server stacks, and product UI/UX design.
          </p>
        </motion.div>

        {/* 4-Domain Grid with Staggered Depth Entry */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {skillsData.map((domain, index) => {
            const startY = shouldReduceMotion ? 0 : initialYOffsets[index % initialYOffsets.length];
            return (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: startY, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.65,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease: editorialEase,
                }}
                className="h-full"
              >
                <Card
                  variant="tier1"
                  padding="md"
                  className="border border-border-ghost hover:border-brand-indigo/30 transition-all flex flex-col justify-between h-full"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-surface-2 border border-border-ghost">
                        {domainIcons[domain.id]}
                      </div>
                      <span className="text-[10px] font-mono text-content-subtle uppercase">
                        {domain.id}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-display font-bold text-content-primary mb-1.5">
                        {domain.title}
                      </h3>
                      <p className="text-xs text-content-muted leading-relaxed">
                        {domain.description}
                      </p>
                    </div>
                  </div>

                  {/* Skill Pill Array */}
                  <div className="pt-6 border-t border-border-ghost/60 mt-6 flex flex-wrap gap-1.5">
                    {domain.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2.5 py-1 rounded-md bg-surface-2 text-content-primary border border-border-ghost font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
