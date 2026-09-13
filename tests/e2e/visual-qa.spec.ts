import { test, expect } from "@playwright/test";

const viewports = [
  { name: "Mobile (390px)", width: 390, height: 844 },
  { name: "Tablet Portrait (768px)", width: 768, height: 1024 },
  { name: "Tablet Landscape / Small Laptop (1024px)", width: 1024, height: 768 },
  { name: "Desktop (1280px)", width: 1280, height: 800 },
  { name: "Large Desktop (1440px)", width: 1440, height: 900 },
];

const routes = ["/", "/work/devbridge", "/work/e-library"];

test.describe("Final Visual & Responsive QA Suite", () => {
  for (const vp of viewports) {
    test.describe(`Viewport: ${vp.name}`, () => {
      for (const route of routes) {
        test(`Route ${route} has no horizontal overflow at ${vp.width}px`, async ({
          page,
        }) => {
          await page.setViewportSize({ width: vp.width, height: vp.height });
          await page.goto(route);
          await page.waitForLoadState("domcontentloaded");

          // Check for horizontal overflow
          const isOverflowing = await page.evaluate(() => {
            return (
              document.documentElement.scrollWidth > window.innerWidth ||
              document.body.scrollWidth > window.innerWidth
            );
          });

          expect(
            isOverflowing,
            `Horizontal overflow detected on ${route} at ${vp.width}px`
          ).toBe(false);

          // Verify main landmarks are present
          await expect(page.getByRole("banner")).toBeVisible();
          await expect(page.getByRole("main")).toBeVisible();
          await expect(page.getByRole("contentinfo")).toBeVisible();
        });
      }
    });
  }

  test("Content Credibility: Zero invented metrics and authentic labels", async ({
    page,
  }) => {
    await page.goto("/");
    const bodyText = await page.innerText("body");

    // Ensure no unsupported claims
    expect(bodyText).not.toContain("10k+ users");
    expect(bodyText).not.toContain("100k downloads");
    expect(bodyText).not.toContain("5-star reviews (1,200)");
    expect(bodyText).not.toContain("Award-winning founder");
    expect(bodyText).not.toContain("Fortune 500");

    // Ensure verified IJRAR publication details are present
    expect(bodyText).toContain("IJRAR25B3067");
    expect(bodyText).toContain("International Journal of Research and Analytical Reviews");
    expect(bodyText).toContain("May 2025");
    expect(bodyText).toContain("Volume 12, Issue 2");

    // Ensure DevBridge shows conceptual disclaimer / label
    await page.goto("/work/devbridge");
    await expect(page.getByText("Conceptual UI Composition")).toBeVisible();
  });

  test("Accessibility: Semantic headings and focusable interactive elements", async ({
    page,
  }) => {
    for (const route of routes) {
      await page.goto(route);

      // Exactly one H1 tag per page
      const h1Count = await page.locator("h1").count();
      expect(h1Count, `Page ${route} should have exactly 1 h1 tag`).toBe(1);

      // Verify all links have href
      const links = await page.locator("a").all();
      for (const link of links) {
        const href = await link.getAttribute("href");
        expect(href, `Link has valid href in ${route}`).toBeTruthy();
      }

      // Verify all buttons have accessible names
      const buttons = await page.locator("button").all();
      for (const button of buttons) {
        const ariaLabel = await button.getAttribute("aria-label");
        const text = await button.innerText();
        const title = await button.getAttribute("title");
        const hasAccessibleName = Boolean(
          (ariaLabel && ariaLabel.trim().length > 0) ||
            (text && text.trim().length > 0) ||
            (title && title.trim().length > 0)
        );
        expect(
          hasAccessibleName,
          `Button on ${route} must have accessible name`
        ).toBe(true);
      }
    }
  });

  test("Navigation & routing flows across all devices", async ({ page }) => {
    // 1. Start at homepage
    await page.goto("/");

    // 2. Click to DevBridge
    await page.getByRole("link", { name: /Explore DevBridge Case Study/i }).click();
    await expect(page).toHaveURL(/\/work\/devbridge/);

    // 3. Click Next to E-Library
    await page.getByRole("link", { name: /Next: IJRAR E-Library Publication/i }).click();
    await expect(page).toHaveURL(/\/work\/e-library/);

    // 4. Click Next to DevBridge
    await page.getByRole("link", { name: /Next: DevBridge Mobile Platform/i }).click();
    await expect(page).toHaveURL(/\/work\/devbridge/);

    // 5. Back to Overview
    await page.getByRole("link", { name: /Back to Overview/i }).first().click();
    await expect(page).toHaveURL(/\//);
  });
});
