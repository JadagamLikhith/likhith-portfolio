# Quality Assurance & Testing Standards (QA.md)

## 1. Quality Gates & Objectives
The portfolio must adhere to the highest engineering and visual standards before passing verification:
1. **Zero TypeScript / Lint Errors:** `npm run build` and `npm run lint` must pass with zero warnings or errors.
2. **Lighthouse Performance Score:** $\ge 95$ across Performance, Accessibility, Best Practices, and SEO.
3. **Comprehensive Test Suite:**
   * **Unit Tests (`tests/unit`):** Validating all centralized data structures, types, and Zod schemas with Vitest.
   * **Integration Tests (`tests/integration`):** Testing the Next.js API Route (`/api/contact`), rate-limiting algorithms, and honeypot defenses.
   * **End-to-End Tests (`tests/e2e`):** Playwright automated testing across Desktop Chrome, Firefox, WebKit, and Mobile Chrome/Safari viewports.
4. **Responsive Verification:**
   * Mobile Portrait: 390px (iPhone 14 / modern Android)
   * Mobile Landscape: 480px – 640px
   * Tablet: 768px – 1024px (iPad portrait/landscape)
   * Desktop: 1280px, 1440px, 1920px+
5. **Factual Verification:** 100% of personal names, credentials, paper IDs, scores, and dates match `PROJECT.md` exactly.

---

## 2. Test Specifications & Suite Matrix

### A. Unit Tests (`tests/unit/`)
* **`data.test.ts`:**
  * Asserts `profileData`, `devbridgeProject`, `eLibraryProject`, `skillsData`, and `experienceData` are defined, non-empty, and conform strictly to TypeScript interfaces.
  * Validates email, GitHub, and LinkedIn URLs for proper format.
  * Verifies paper ID `IJRAR25B3067` and CGPA `8.0`.
* **`schema.test.ts`:**
  * Tests Zod validation for contact submission:
    * Valid payload passes.
    * Invalid emails, short messages (< 10 chars), or oversized messages (> 2000 chars) fail with clear error messages.
    * Honeypot field detection.

### B. Integration Tests (`tests/integration/`)
* **`api-contact.test.ts`:**
  * Tests `POST /api/contact` with valid payload $\rightarrow$ returns `200 OK` with JSON success envelope.
  * Tests `POST /api/contact` with invalid payload $\rightarrow$ returns `400 Bad Request` with structured error array.
  * Tests rate-limiter: Triggering > 5 requests within 10 minutes from the same IP $\rightarrow$ returns `429 Too Many Requests`.
  * Tests honeypot: Populating honeypot field $\rightarrow$ returns `200 OK` without triggering notification dispatch.

### C. End-to-End Playwright Tests (`tests/e2e/`)
* **`navigation.spec.ts`:**
  * Desktop viewport: Header anchors (`#work`, `#research`, `#skills`, `#experience`, `#contact`) scroll to visible target sections.
  * Mobile viewport (390px): Hamburger menu opens drawer, clicking anchor closes drawer and navigates to section.
  * Resume download button: Directs to authentic static file `/JADAGAM_LIKHITH_Resume.pdf`.
* **`case-studies.spec.ts`:**
  * Navigates to `/work/devbridge`: Asserts headline, Jetpack Compose tech tags, UX flow breakdown, and back-to-home navigation link.
  * Navigates to `/work/e-library`: Asserts formal IJRAR citation block, Paper ID `IJRAR25B3067`, 3-tier architecture diagram, and back-to-home navigation link.
* **`contact-form.spec.ts`:**
  * Tests interactive "Copy Email" button: Asserts clipboard interaction and visual toast feedback.
  * Tests contact form validation: Submitting empty form shows required field states.
  * Submits valid message: Displays success confirmation card and resets form inputs.

---

## 3. Automated Verification Commands
```bash
# Type check TypeScript codebase
npx tsc --noEmit

# Run ESLint validation
npm run lint

# Run Unit & Integration test suite with Vitest
npm run test

# Run End-to-End browser suite with Playwright
npx playwright test

# Build production application
npm run build
```
