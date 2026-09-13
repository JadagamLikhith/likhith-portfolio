import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "indigo" | "violet" | "cyan" | "emerald";
  size?: "sm" | "md";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "neutral", size = "sm", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center font-medium rounded-full border transition-colors select-none";

    const variants = {
      neutral: "bg-surface-2 text-content-muted border-border-ghost",
      indigo:
        "bg-brand-indigo/10 text-brand-indigo border-brand-indigo/20",
      violet:
        "bg-brand-violet/10 text-brand-violet border-brand-violet/20",
      cyan: "bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20",
      emerald:
        "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    };

    const sizes = {
      sm: "text-xs px-2.5 py-0.5 gap-1.5",
      md: "text-sm px-3.5 py-1 gap-2",
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
