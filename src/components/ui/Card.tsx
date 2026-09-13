import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "tier1" | "tier2" | "tier3" | "interactive";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "tier1", padding = "md", children, ...props }, ref) => {
    const baseStyles =
      "rounded-2xl border transition-all duration-200";

    const variants = {
      tier1: "bg-surface-1 border-border-ghost",
      tier2: "bg-surface-2 border-border-ghost",
      tier3: "bg-surface-3 border-border-ghost",
      interactive:
        "bg-surface-1 border-border-ghost hover:bg-surface-2 hover:border-border-hover hover:shadow-glow cursor-pointer",
    };

    const paddings = {
      none: "p-0",
      sm: "p-4",
      md: "p-6 sm:p-8",
      lg: "p-8 sm:p-10",
      xl: "p-10 sm:p-12",
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], paddings[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
