import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "cyan" | "link";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-indigo focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50 select-none";

    const variants = {
      primary:
        "bg-brand-indigo text-white hover:bg-[#4F46E5] active:scale-[0.98] shadow-glow",
      secondary:
        "bg-surface-2 text-content-primary border border-border-ghost hover:bg-surface-3 hover:border-border-hover active:scale-[0.98]",
      ghost:
        "bg-transparent text-content-muted hover:text-content-primary hover:bg-surface-2 active:scale-[0.98]",
      cyan: "bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 hover:bg-brand-cyan/20 active:scale-[0.98]",
      link: "text-brand-indigo hover:underline underline-offset-4 p-0 h-auto",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5 rounded-lg gap-1.5",
      md: "text-sm px-4 py-2.5 rounded-lg gap-2",
      lg: "text-base px-6 py-3.5 rounded-xl gap-2.5 font-semibold",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
