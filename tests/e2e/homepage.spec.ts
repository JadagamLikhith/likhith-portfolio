import { test, expect } from "@playwright/test";

test.describe("Portfolio Homepage Verification", () => {
  test("renders navbar, brand identity, and resume link", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Jadagam Likhith").first()).toBeVisible();
    await expect(
      page.getByLabel("Download Jadagam Likhith's Resume (PDF)")
    ).toHaveAttribute("href", "/JADAGAM_LIKHITH_Resume.pdf");
  });

  test("renders human-first hero with verified positioning and CTAs", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByText("Hi, I'm Jadagam Likhith.")).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: /Full Stack Developer/i,
      })
    ).toBeVisible();
    await expect(page.getByText("Vijayawada, Andhra Pradesh").first()).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Explore Featured Work/i })
    ).toBeVisible();
    await expect(page.getByAltText("Portrait of Likhith")).toBeVisible();
  });

  test("renders DevBridge and E-Library showcases", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("DevBridge").first()).toBeVisible();
    await expect(
      page.getByText("Published Research & Monograph")
    ).toBeVisible();
    await expect(page.getByText("IJRAR25B3067")).toBeVisible();
  });

  test("renders 4-domain capabilities and verified experience", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByText("Core Programming")).toBeVisible();
    await expect(page.getByText("Full Stack & Databases")).toBeVisible();
    await expect(page.getByText("Product & UI/UX Design")).toBeVisible();
    await expect(page.getByText("Tools, Cloud & Analytics")).toBeVisible();
    await expect(
      page.getByText("Blackbucks Education Pvt. Ltd.")
    ).toBeVisible();
    await expect(
      page.getByText("Introduction to Generative AI")
    ).toBeVisible();
  });

  test("renders contact section with copy email and footer", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByText("Let's build something exceptional.")
    ).toBeVisible();
    await expect(page.getByRole("textbox", { name: /Your Name/i })).toBeVisible();
    await expect(page.getByRole("textbox", { name: /Your Email/i })).toBeVisible();
    await expect(
      page.getByText(/Jadagam Likhith. All rights reserved/i)
    ).toBeVisible();
  });

  test("renders custom 404 page on unresolved routes", async ({ page }) => {
    const res = await page.goto("/non-existent-portfolio-route");
    expect(res?.status()).toBe(404);
    await expect(page.getByText(/404 \/ Route Unresolved/i)).toBeVisible();
    await expect(page.getByText(/Page Not Found/i)).toBeVisible();
    const returnLink = page.getByRole("link", { name: /Return to Overview/i });
    await expect(returnLink).toHaveAttribute("href", "/");
    await returnLink.click();
    await expect(page).toHaveURL(/\//);
  });

  test("serves valid robots.txt, sitemap.xml, and manifest endpoints", async ({
    page,
  }) => {
    const robotsRes = await page.goto("/robots.txt");
    expect(robotsRes?.status()).toBe(200);
    const robotsText = await robotsRes?.text();
    expect(robotsText).toContain("Disallow: /api/");
    expect(robotsText).toContain("sitemap.xml");

    const sitemapRes = await page.goto("/sitemap.xml");
    expect(sitemapRes?.status()).toBe(200);
    const sitemapText = await sitemapRes?.text();
    expect(sitemapText).toContain("/work/devbridge");
    expect(sitemapText).toContain("/work/e-library");

    const manifestRes = await page.goto("/manifest.webmanifest");
    expect(manifestRes?.status()).toBe(200);
    const manifestJson = await manifestRes?.json();
    expect(manifestJson.name).toContain("Jadagam Likhith");
    expect(manifestJson.display).toBe("standalone");
  });

  test("injects valid JSON-LD structured data on homepage and case studies", async ({
    page,
  }) => {
    // 1. Homepage JSON-LD
    await page.goto("/");
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
    expect(jsonLdScripts.length).toBeGreaterThanOrEqual(2);

    const homepageJsonLdTexts = await Promise.all(
      jsonLdScripts.map((s) => s.textContent())
    );
    const combinedHomepageJsonLd = homepageJsonLdTexts.join(" ");
    expect(combinedHomepageJsonLd).toContain('"@type":"Person"');
    expect(combinedHomepageJsonLd).toContain('"@type":"WebSite"');
    expect(combinedHomepageJsonLd).toContain('"@type":"ProfilePage"');
    expect(combinedHomepageJsonLd).toContain("Jadagam Likhith");

    // 2. DevBridge Case Study JSON-LD
    await page.goto("/work/devbridge");
    const devbridgeJsonLdTexts = await Promise.all(
      (await page.locator('script[type="application/ld+json"]').all()).map((s) =>
        s.textContent()
      )
    );
    const combinedDevBridgeJsonLd = devbridgeJsonLdTexts.join(" ");
    expect(combinedDevBridgeJsonLd).toContain('"@type":"SoftwareApplication"');
    expect(combinedDevBridgeJsonLd).toContain('"@type":"BreadcrumbList"');
    expect(combinedDevBridgeJsonLd).toContain("DevBridge");

    // 3. E-Library Case Study JSON-LD
    await page.goto("/work/e-library");
    const eLibraryJsonLdTexts = await Promise.all(
      (await page.locator('script[type="application/ld+json"]').all()).map((s) =>
        s.textContent()
      )
    );
    const combinedELibraryJsonLd = eLibraryJsonLdTexts.join(" ");
    expect(combinedELibraryJsonLd).toContain('"@type":"ScholarlyArticle"');
    expect(combinedELibraryJsonLd).toContain('"@type":"BreadcrumbList"');
    expect(combinedELibraryJsonLd).toContain("IJRAR25B3067");
  });
});
