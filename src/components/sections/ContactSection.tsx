"use client";

import * as React from "react";
import { profileData } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import { contactFormSchema, ContactApiResponse } from "@/types/contact";
import {
  Mail,
  Github,
  Linkedin,
  Copy,
  Check,
  Send,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { editorialEase } from "@/lib/motion";

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion();
  const [copied, setCopied] = React.useState(false);
  const [formState, setFormState] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }>({});

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.socialLinks.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));

    // Clear field-specific error as user types
    if (fieldErrors[id as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Client-side Zod validation
    const clientValidation = contactFormSchema.safeParse(formState);
    if (!clientValidation.success) {
      const errors: Record<string, string> = {};
      for (const issue of clientValidation.error.issues) {
        const fieldName = issue.path[0];
        if (fieldName && typeof fieldName === "string") {
          errors[fieldName] = issue.message;
        }
      }
      setFieldErrors(errors);
      setStatus("error");
      setErrorMessage("Please check the form fields and correct the highlighted errors.");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject || "General Inquiry",
          message: formState.message,
          honeypot: formState.honeypot,
        }),
      });

      const data: ContactApiResponse = await response.json().catch(() => ({
        success: false,
        error: "Failed to parse server response.",
      }));

      if (response.ok && data.success) {
        setStatus("success");
        setFieldErrors({});
        // Clear form only on success
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
          honeypot: "",
        });
      } else {
        setStatus("error");
        if (response.status === 429) {
          setErrorMessage(
            "Rate limit reached. Please wait a few minutes before trying again, or reach out directly by email."
          );
        } else {
          setErrorMessage(
            data.error ||
              "Unable to send your message right now. Please try again or reach out directly by email."
          );
          if (data.details) {
            const serverFieldErrors: Record<string, string> = {};
            for (const issue of data.details) {
              const fieldName = issue.path[0];
              if (fieldName && typeof fieldName === "string") {
                serverFieldErrors[fieldName] = issue.message;
              }
            }
            setFieldErrors(serverFieldErrors);
          }
        }
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Network communication error. Please check your connection or send an email directly to " +
          profileData.socialLinks.email +
          "."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetStatus = () => {
    setStatus("idle");
    setErrorMessage(null);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 border-t border-border-ghost bg-surface-1/30 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: editorialEase }}
            className="flex items-center gap-2 text-xs font-display font-semibold text-brand-indigo tracking-wider uppercase mb-2"
          >
            <span>05</span>
            <span>/</span>
            <span>Direct Communication</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: editorialEase }}
            className="text-2xl sm:text-4xl font-display font-bold text-content-primary mb-4"
          >
            Let&apos;s build something exceptional.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: editorialEase }}
            className="text-sm sm:text-base text-content-muted leading-relaxed"
          >
            Whether you are looking to collaborate on a full-stack project, discuss product UI/UX opportunities, or explore research, my inbox is open.
          </motion.p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Direct Coordinates & Profile Links */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.1, ease: editorialEase }}
            className="lg:col-span-5 space-y-6"
          >
            <Card variant="tier1" padding="md" className="space-y-6 border border-border-ghost">
              <h3 className="text-base font-display font-bold text-content-primary">
                Direct Contact
              </h3>

              {/* Email Copy Card */}
              <div className="p-4 rounded-xl bg-surface-2 border border-border-ghost space-y-2">
                <span className="text-xs text-content-muted font-medium">
                  Primary Email
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${profileData.socialLinks.email}`}
                    className="text-sm font-medium text-brand-indigo hover:underline break-all"
                  >
                    {profileData.socialLinks.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-surface-3 hover:bg-brand-indigo/20 text-content-muted hover:text-brand-indigo transition-all shrink-0"
                    aria-label="Copy email address"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {copied && (
                  <p className="text-[11px] text-emerald-400 font-medium">
                    Email copied to clipboard!
                  </p>
                )}
              </div>

              {/* Location Card */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-2 border border-border-ghost">
                <MapPin className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-medium text-content-primary block">
                    Location
                  </span>
                  <span className="text-xs text-content-muted">
                    {profileData.location}
                  </span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-2">
                <span className="text-xs text-content-muted font-medium block">
                  Connect on Platforms
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={profileData.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-surface-2 border border-border-ghost flex items-center gap-2.5 text-xs text-content-primary hover:border-brand-indigo/40 hover:text-brand-indigo transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={profileData.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-surface-2 border border-border-ghost flex items-center gap-2.5 text-xs text-content-primary hover:border-brand-indigo/40 hover:text-brand-indigo transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right Column: Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.2, ease: editorialEase }}
            className="lg:col-span-7"
          >
            <Card variant="tier1" padding="lg" className="border border-border-ghost space-y-6">
              <div>
                <h3 className="text-lg font-display font-bold text-content-primary mb-1">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-content-muted">
                  Fill out the form below or reach out directly at {profileData.socialLinks.email}.
                </p>
              </div>

              {/* Success Notification Banner */}
              {status === "success" && (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-2 animate-in fade-in"
                >
                  <div className="flex items-center gap-2 font-display font-semibold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Message Transmitted Successfully</span>
                  </div>
                  <p className="text-xs text-emerald-200/80 leading-relaxed">
                    Thank you for reaching out. I have received your message and will review and respond as promptly as possible.
                  </p>
                  <div className="pt-2">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={handleResetStatus}
                      className="text-xs gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Send Another Message</span>
                    </Button>
                  </div>
                </div>
              )}

              {/* Error Notification Banner */}
              {status === "error" && errorMessage && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 space-y-1 animate-in fade-in text-xs"
                >
                  <div className="flex items-center gap-2 font-semibold text-rose-200 text-sm">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Submission Error</span>
                  </div>
                  <p className="text-rose-200/90 leading-relaxed">{errorMessage}</p>
                </div>
              )}

              {/* The Form */}
              <form
                onSubmit={handleFormSubmit}
                noValidate
                className="space-y-4"
                aria-label="Direct message inquiry form"
              >
                {/* Honeypot field for spam prevention (invisible to humans) */}
                <input
                  type="text"
                  id="honeypot"
                  name="honeypot"
                  value={formState.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden sr-only"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    id="name"
                    label="Your Name *"
                    placeholder="e.g. Alex Rivera"
                    value={formState.name}
                    onChange={handleChange}
                    error={fieldErrors.name}
                    disabled={isSubmitting}
                    aria-required="true"
                    aria-invalid={Boolean(fieldErrors.name)}
                  />
                  <Input
                    id="email"
                    type="email"
                    label="Your Email *"
                    placeholder="e.g. alex@example.com"
                    value={formState.email}
                    onChange={handleChange}
                    error={fieldErrors.email}
                    disabled={isSubmitting}
                    aria-required="true"
                    aria-invalid={Boolean(fieldErrors.email)}
                  />
                </div>

                <Input
                  id="subject"
                  label="Subject / Project Scope"
                  placeholder="e.g. Full Stack Engineering Opportunity"
                  value={formState.subject}
                  onChange={handleChange}
                  error={fieldErrors.subject}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(fieldErrors.subject)}
                />

                <Textarea
                  id="message"
                  label="Message *"
                  placeholder="Tell me about your project, team, or opportunity..."
                  rows={4}
                  value={formState.message}
                  onChange={handleChange}
                  error={fieldErrors.message}
                  disabled={isSubmitting}
                  aria-required="true"
                  aria-invalid={Boolean(fieldErrors.message)}
                />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto gap-2 text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Transmit Message</span>
                      </>
                    )}
                  </Button>

                  <span className="text-[11px] text-content-subtle">
                    * Required fields
                  </span>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
