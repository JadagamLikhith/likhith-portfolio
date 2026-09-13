import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#090A0F",
        surface: {
          1: "#13151D",
          2: "#1B1E28",
          3: "#242836",
        },
        brand: {
          indigo: "#6366F1",
          violet: "#8B5CF6",
          cyan: "#38BDF8",
        },
        content: {
          primary: "#F8FAFC",
          muted: "#94A3B8",
          subtle: "#64748B",
        },
        border: {
          ghost: "rgba(255, 255, 255, 0.08)",
          hover: "rgba(255, 255, 255, 0.16)",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      borderRadius: {
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(99, 102, 241, 0.15)",
        "glow-violet": "0 0 40px -10px rgba(139, 92, 246, 0.15)",
        "glow-cyan": "0 0 40px -10px rgba(56, 189, 248, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
