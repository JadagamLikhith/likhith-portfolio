# Application Routes & Navigation Structure (ROUTES.md)

## 1. Route Map

| Route URL | Page Type | Layout & Components | Primary Focus & Intent | Data Source |
| :--- | :--- | :--- | :--- | :--- |
| `/` | Homepage | `Navbar`, `HeroSection`, `DevBridgeShowcase`, `ELibraryShowcase`, `CapabilitiesSection`, `ExperienceSection`, `ContactSection`, `Footer` | High-impact 6-section overview of Likhith's dual capability, flagship projects, experience, skills, and contact. | `src/data/profile.ts`, `src/data/projects.ts`, `src/data/skills.ts`, `src/data/experience.ts` |
| `/work/devbridge` | Case Study | `Navbar`, `DevBridgeHeader`, `ProblemOverview`, `UXFlowBreakdown`, `ArchitectureDeepDive`, `MD3DesignSystem`, `LearningsFooter`, `Footer` | Comprehensive deep-dive on the DevBridge native Android application (Kotlin, Jetpack Compose, MD3). | `src/data/projects.ts` (`devbridge`) |
| `/work/e-library` | Research Case Study | `Navbar`, `PaperHeader`, `CitationMetadata`, `SystemArchitecture`, `DatabaseSchema`, `RBACImplementation`, `IJRARVerification`, `Footer` | Formal academic presentation of the peer-reviewed IJRAR published platform (Paper ID: `IJRAR25B3067`). | `src/data/projects.ts` (`e-library`) |
| `/api/contact` | API Endpoint (POST) | Next.js App Router Route Handler (`src/app/api/contact/route.ts`) | Serverless contact form transmission endpoint with Zod validation, rate limiting, honeypot spam protection, and safe error handling. | `src/types/contact.ts` |
| `/JADAGAM_LIKHITH_Resume.pdf` | Static Asset | Static PDF served from `/public/` | Direct access to Jadagam Likhith's authentic, unaltered technical resume. | `public/JADAGAM_LIKHITH_Resume.pdf` |

---

## 2. In-Page Smooth Scroll Anchors (Homepage)
* `#work`: Scrolls to DevBridge Flagship Project & Selected Work
* `#research`: Scrolls to IJRAR Published Research monograph
* `#skills`: Scrolls to the 4-Domain Technical Capabilities matrix
* `#experience`: Scrolls to Experience, Academics & Verified Credentials
* `#contact`: Scrolls to Direct Contact & Inquiry Form

---

## 3. SEO & OpenGraph Meta Strategy
* **Root `/`:**
  * `title`: "Jadagam Likhith — Full Stack Developer × Product UI/UX Designer"
  * `description`: "Portfolio of Jadagam Likhith: Computer Science Engineer & Product Designer building resilient backend systems and refined Material Design 3 interfaces."
* **`/work/devbridge`:**
  * `title`: "DevBridge Case Study — Jadagam Likhith"
  * `description`: "Native Android developer collaboration & sponsorship platform built with Kotlin, Jetpack Compose, and Material Design 3."
* **`/work/e-library`:**
  * `title`: "E-Library Platform Research Paper — Jadagam Likhith"
  * `description`: "Peer-reviewed research published in IJRAR (Vol 12, Issue 2) on modular e-library architecture with RBAC and dynamic feedback."
