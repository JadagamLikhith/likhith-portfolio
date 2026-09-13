"use client";

import * as React from "react";
import Link from "next/link";
import { devbridgeProject } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DeviceFrame } from "@/components/ui/DeviceFrame";
import {
  ArrowUpRight,
  Smartphone,
  Layers,
  Users,
  MessageSquareCode,
  DollarSign,
  Star,
  GitPullRequest,
} from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { editorialEase } from "@/lib/motion";

export function DevBridgeShowcase() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Device Mockup Parallax Depth (Slightly slower than surrounding content, max +-1.5deg rotation)
  const deviceParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [shouldReduceMotion ? 0 : 35, shouldReduceMotion ? 0 : -35]
  );
  const deviceRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [shouldReduceMotion ? 0 : -1.2, shouldReduceMotion ? 0 : 1.2]
  );

  const flowIcons = [
    <Layers key="upload" className="w-4 h-4 text-brand-indigo" />,
    <MessageSquareCode key="review" className="w-4 h-4 text-brand-cyan" />,
    <Users key="collab" className="w-4 h-4 text-brand-violet" />,
    <DollarSign key="sponsor" className="w-4 h-4 text-emerald-400" />,
  ];

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-20 sm:py-28 border-t border-border-ghost bg-surface-1/30 relative overflow-hidden"
    >
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
              <span>01</span>
              <span>/</span>
              <span>Flagship Mobile Application</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-content-primary">
              DevBridge
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-content-muted max-w-md">
            Developer Collaboration, Sponsorship & Feedback Platform engineered with Kotlin, Jetpack Compose, and Material Design 3.
          </p>
        </motion.div>

        {/* 2-Column Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Narrative, UX Flows & Stack */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: editorialEase }}
            className="lg:col-span-7 space-y-8"
          >
            <div>
              <Badge variant="indigo" size="sm" className="mb-3">
                <Smartphone className="w-3 h-3 mr-1" />
                {devbridgeProject.platform}
              </Badge>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-content-primary mb-3">
                {devbridgeProject.subtitle}
              </h3>
              <p className="text-sm sm:text-base text-content-muted leading-relaxed">
                {devbridgeProject.summary}
              </p>
            </div>

            {/* Core UX Flows Breakdown with Stagger */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-content-primary uppercase tracking-wider font-display">
                Core UX Architecture & Flows
              </h4>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: shouldReduceMotion ? 0 : 0.09,
                      delayChildren: 0.05,
                    },
                  },
                }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {devbridgeProject.uxFlows?.map((flow, index) => (
                  <motion.div
                    key={flow.title}
                    variants={{
                      hidden: { opacity: 0, y: 25, scale: 0.98 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          duration: 0.5,
                          ease: editorialEase,
                        },
                      },
                    }}
                    className="p-3.5 rounded-xl bg-surface-2/80 border border-border-ghost hover:border-brand-indigo/30 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="p-1 rounded-md bg-surface-3">
                        {flowIcons[index % flowIcons.length]}
                      </div>
                      <span className="text-xs font-medium text-content-primary">
                        {flow.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-content-muted leading-relaxed">
                      {flow.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Technology Stack Tags */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-semibold text-content-primary uppercase tracking-wider font-display">
                Engineered With
              </h4>
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
            </div>

            {/* Case Study CTA */}
            <div className="pt-2">
              <Link href={devbridgeProject.route}>
                <Button variant="primary" size="md" className="gap-2">
                  <span>Explore DevBridge Case Study</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: High-Fidelity Mobile Device Mockup with Parallax Depth */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              style={{ y: deviceParallaxY, rotate: deviceRotate }}
              initial={{ opacity: 0, scale: 0.96, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: editorialEase }}
              className="w-full will-change-transform"
            >
              <DeviceFrame className="shadow-glow">
                <div className="p-4 space-y-3.5 text-left h-full flex flex-col justify-between select-none">
                  {/* Simulated Android App Header */}
                  <div className="pt-4 flex items-center justify-between border-b border-border-ghost pb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-brand-indigo/20 flex items-center justify-center text-[10px] font-bold text-brand-indigo">
                        DB
                      </div>
                      <span className="text-xs font-display font-bold text-content-primary">
                        DevBridge Feed
                      </span>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20">
                      Jetpack Compose
                    </span>
                  </div>

                  {/* Simulated Project Card 1 */}
                  <div className="p-3 rounded-xl bg-surface-2 border border-border-ghost space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-content-primary">
                        Distributed Cache Engine
                      </span>
                      <span className="text-[10px] text-content-muted flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        4.9
                      </span>
                    </div>
                    <p className="text-[10px] text-content-muted line-clamp-2 leading-relaxed">
                      Lightweight in-memory LRU cache engine supporting concurrent reads and tiered eviction policies.
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-surface-3 text-content-muted">
                        Kotlin • MD3
                      </span>
                      <span className="text-[9px] text-brand-indigo font-medium flex items-center gap-1">
                        <GitPullRequest className="w-2.5 h-2.5" />
                        2 Collab Requests
                      </span>
                    </div>
                  </div>

                  {/* Simulated Peer Review Dialogue */}
                  <div className="p-3 rounded-xl bg-surface-2 border border-border-ghost space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-brand-violet/20 flex items-center justify-center text-[9px] font-bold text-brand-violet">
                        R
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-medium text-content-primary">
                          Reviewer Feedback
                        </span>
                        <span className="text-[8px] text-content-muted">
                          Thread on Memory Management
                        </span>
                      </div>
                    </div>
                    <p className="text-[10px] text-content-muted italic bg-surface-1/50 p-2 rounded-lg border border-border-ghost">
                      &quot;Clean separation of repository layers. Material 3 bottom sheet makes reviewing seamless.&quot;
                    </p>
                  </div>

                  {/* Simulated Bottom Navigation */}
                  <div className="pt-2 border-t border-border-ghost flex items-center justify-around text-[10px] text-content-muted">
                    <span className="text-brand-indigo font-medium flex flex-col items-center gap-0.5">
                      <Layers className="w-3.5 h-3.5" />
                      Feed
                    </span>
                    <span className="flex flex-col items-center gap-0.5">
                      <MessageSquareCode className="w-3.5 h-3.5" />
                      Reviews
                    </span>
                    <span className="flex flex-col items-center gap-0.5">
                      <Users className="w-3.5 h-3.5" />
                      Collab
                    </span>
                  </div>
                </div>
              </DeviceFrame>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
