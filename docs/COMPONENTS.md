# Reusable Component Specifications (COMPONENTS.md)

This document establishes the interface contracts and design rules for all shared components across the portfolio application. All components consume centralized, strongly typed data from `src/data/` rather than hardcoding personal information.

---

## 1. Layout Components

### `Navbar` (`/src/components/layout/Navbar.tsx`)
* **Data Sources:** Consumes `profileData` from `@/data/profile`.
* **Behavior:** Fixed floating top navigation with `backdrop-blur-md` and `bg-[#090A0F]/80` with a subtle hairline border (`border-white/[0.08]`).
* **Sub-components:**
  * Brand Monogram `JL` with hover glow.
  * Live status pill: `CSE '27 • Vijayawada, AP` with green status ping.
  * Desktop Navigation links with active anchor highlighting (`#work`, `#research`, `#skills`, `#experience`, `#contact`).
  * Quick Actions: `Resume` outline button (linking to `/JADAGAM_LIKHITH_Resume.pdf`) and `Get in Touch` solid indigo button.
  * Mobile hamburger trigger.

### `MobileNav` (`/src/components/layout/MobileNav.tsx`)
* **Behavior:** Slide-down drawer overlay for mobile viewports (< 768px).
* **Features:** Touch-friendly tap targets, direct case study links, and bottom docked quick navigation bar (`Overview`, `Work`, `Skills`, `Contact`).

### `Footer` (`/src/components/layout/Footer.tsx`)
* **Data Sources:** Consumes `profileData` from `@/data/profile`.
* **Behavior:** Minimal editorial closing block with copyright metadata, location/status, social profile links, and quick back-to-top button.

---

## 2. Section Components

### `HeroSection` (`/src/components/sections/HeroSection.tsx`)
* **Data Sources:** Consumes `profileData` from `@/data/profile`.
* **Features:**
  * Confident personal greeting: *"Hi, I'm Jadagam Likhith."*
  * Space Grotesk display headline: *"Full Stack Developer × Product UI/UX Designer"*.
  * Human-first narrative paragraph connecting software engineering with interface craft.
  * Location, CGPA, and IJRAR publication metadata badges.
  * Interactive dual-craft pill switcher (*Code Architecture* vs *Product UI/UX*).
  * Direct action buttons with smooth scroll / routing triggers.

### `DevBridgeShowcase` (`/src/components/sections/DevBridgeShowcase.tsx`)
* **Data Sources:** Consumes `devbridgeProject` from `@/data/projects`.
* **Features:**
  * 2-column asymmetrical layout.
  * Left: Project summary, UX flow taxonomy chips (*Showcase, Peer Review, Collab, Sponsorship*), tech stack tags (Kotlin, Jetpack Compose, MD3), and case study link (`/work/devbridge`).
  * Right: `DeviceFrame` showing realistic dark-mode Android interface mockup.

### `ELibraryShowcase` (`/src/components/sections/ELibraryShowcase.tsx`)
* **Data Sources:** Consumes `eLibraryProject` from `@/data/projects`.
* **Features:**
  * Monograph-style layout with formal peer-review journal citation badge (IJRAR Vol 12, Issue 2, Paper ID: `IJRAR25B3067`).
  * Micro-architecture diagram breakdown (Frontend Glassmorphism $\leftrightarrow$ Flask RBAC $\leftrightarrow$ MySQL DB).
  * Direct link to research case study (`/work/e-library`).

### `CapabilitiesSection` (`/src/components/sections/CapabilitiesSection.tsx`)
* **Data Sources:** Consumes `skillsData` from `@/data/skills`.
* **Features:**
  * 4-column responsive grid (collapses to 2×2 on tablet and single-column on mobile).
  * Grouped into: *Languages*, *Full Stack & Databases*, *Product & UI/UX*, and *Tools, Cloud & Analytics*.
  * Clean, interactive pills with subtle hover lift and zero fake percentage bars.

### `ExperienceSection` (`/src/components/sections/ExperienceSection.tsx`)
* **Data Sources:** Consumes `experienceData`, `educationData`, and `certificationsData` from `@/data/experience`.
* **Features:**
  * Milestone cards for **Blackbucks Education** Product UI/UX internship (12 weeks).
  * Academic milestone: B.Tech CSE at **Lingayas Institute** (8.0 CGPA).
  * Verified credentials array: NASSCOM GenAI Gold (91%), NASSCOM EDA Bronze, SWAYAM C.

### `ContactSection` (`/src/components/sections/ContactSection.tsx`)
* **Data Sources:** Consumes `profileData` from `@/data/profile`.
* **Features:**
  * Editorial headline: *"Let's build something thoughtful together."*
  * One-click copy email button with instant visual feedback.
  * Direct links to GitHub and LinkedIn.
  * Contact inquiry form connected to `/api/contact` with Zod client validation, honeypot field, loading spinner, and success/error toasts.

---

## 3. Atomic UI Primitives

### `Button` (`/src/components/ui/Button.tsx`)
* **Variants:**
  * `primary`: Solid `#6366F1` background, `#FFFFFF` text, `hover:bg-[#4F46E5]`, `shadow-indigo-500/20`.
  * `secondary`: Translucent `#1B1E28` background, 1px `border-white/10`, `hover:bg-[#242836]`.
  * `ghost`: Transparent with hover background shift and text accent.
  * `link`: Inline text with underline hover transition.

### `Badge` (`/src/components/ui/Badge.tsx`)
* **Variants:**
  * `neutral`: `bg-[#1B1E28]`, `text-[#94A3B8]`, `border-white/5`.
  * `accent`: `bg-[#6366F1]/10`, `text-[#818CF8]`, `border-[#6366F1]/20`.
  * `cyan`: `bg-[#38BDF8]/10`, `text-[#38BDF8]`, `border-[#38BDF8]/20`.
  * `success`: `bg-emerald-500/10`, `text-emerald-400`, `border-emerald-500/20`.

### `DeviceFrame` (`/src/components/ui/DeviceFrame.tsx`)
* **Purpose:** Custom CSS/SVG mobile device mockup shell presenting responsive UI components with authentic rounded corners, camera notch, and dark obsidian bezel.

### `Input` / `Textarea` (`/src/components/ui/Input.tsx`, `/src/components/ui/Textarea.tsx`)
* **Purpose:** Accessible form controls with `#13151D` background, `border-white/[0.08]` ghost borders, focused electric indigo `#6366F1` outline, and contextual validation error labels.
