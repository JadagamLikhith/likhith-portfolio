# Design System & Visual Guidelines (DESIGN.md)

## 1. Design Concept: "Architectural Humanism & Dual Craft"
The visual language pairs **Warm Obsidian Editorial Minimalism** with **Architectural Software Precision**. It avoids both generic student templates and gimmicky AI sci-fi dashboards, delivering the impression of an ambitious, tasteful design-engineer who actually builds production software.

---

## 2. Color Palette & Surface Tokens

### Semantic Tokens
* **Root Canvas (`background` / `surface`):** `#090A0F` (Obsidian Base)
* **Surface Tier 1 (`surface-container-low`):** `#13151D` (Structural blocks, large background cards)
* **Surface Tier 2 (`surface-container-high`):** `#1B1E28` (Elevated focus panels, hover states)
* **Surface Tier 3 (`surface-container-highest`):** `#242836` (Inputs, active buttons, interactive chips)
* **Primary Brand Accent (`primary`):** `#6366F1` (Electric Indigo — Primary CTAs, active indicators)
* **Secondary Brand Accent (`secondary`):** `#8B5CF6` (Luminous Violet — Design badges, subtle gradients)
* **Technical Highlight Accent (`tertiary`):** `#38BDF8` (Sky Cyan — Reserved for research tags, live status)
* **Text Primary (`on-surface`):** `#F8FAFC` (High legibility, headers, key data)
* **Text Secondary (`on-surface-variant`):** `#94A3B8` (Gentle slate for comfortable body copy)
* **Tactile Hairline Stroke (`outline-variant`):** `rgba(255, 255, 255, 0.08)` (Ghost border)

---

## 3. Typography Hierarchy

| Role | Font Family | Size | Weight | Line Height | Tracking | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | Space Grotesk | `3.5rem` / `56px` | 700 Bold | `1.15` | `-0.03em` | Primary Hero Display |
| **Display Mobile** | Space Grotesk | `2.25rem` / `36px` | 700 Bold | `1.2` | `-0.02em` | Mobile Hero Display |
| **Headline XL** | Space Grotesk | `2.0rem` / `32px` | 600 SemiBold | `1.25` | `-0.02em` | Section Titles |
| **Headline SM** | Space Grotesk | `1.25rem` / `20px` | 600 SemiBold | `1.3` | `-0.01em` | Card & Subsection Headers |
| **Body Lead** | Inter | `1.125rem` / `18px` | 400 Regular | `1.6` | `normal` | Hero bio & lead paragraphs |
| **Body Regular** | Inter | `0.9375rem` / `15px` | 400 Regular | `1.6` | `normal` | Descriptions & case studies |
| **Label / Tag** | Inter | `0.75rem` / `12px` | 500 Medium | `1.4` | `+0.04em` | Category badges, metadata |
| **Code / Citation** | JetBrains Mono / Inter Mono | `0.8125rem` / `13px` | 500 Medium | `1.5` | `normal` | Paper ID, tech chips |

---

## 4. Layout, Spacing & Elevation
* **Spacing Scale:** 4px / 8px base rhythm (`0.25rem`, `0.5rem`, `0.75rem`, `1.0rem`, `1.5rem`, `2.0rem`, `3.0rem`, `4.0rem`, `6.0rem`).
* **Grid Architecture:** 12-column fluid grid on desktop (`1280px` max container width) with `1.5rem` outer gutters. Single fluid column on mobile with `1.0rem` padding.
* **Corner Roundness:**
  * Base Controls (Buttons, Inputs): `0.5rem` (`rounded-lg`)
  * Container Cards & Showcases: `1.0rem` (`rounded-2xl`)
  * Badges & Status Chips: `9999px` (`rounded-full`)
* **Elevation & Depth:**
  * Background shifts (`#090A0F` $\rightarrow$ `#13151D` $\rightarrow$ `#1B1E28`).
  * Diffuse ambient glows (30–40px blur, 6–10% opacity tinted with `#6366F1`).
  * Restrained glassmorphism on fixed header and floating cards (`backdrop-blur-md` with `rgba(19, 21, 29, 0.7)`).

---

## 5. Visual Styling Rules & Anti-Patterns
* **No 1px Harsh White Borders:** Use subtle ghost borders `border-white/[0.08]`.
* **No Arbitrary Skill Percentage Bars:** Categorize skills cleanly by concrete technical domain.
* **No Exaggerated Sci-Fi Jargon:** No "Cyber-neural", "Quantum simulation", or "Terminal override" copy.
* **Responsive Fluidity:** Every desktop section has a dedicated mobile-optimized touch composition.
