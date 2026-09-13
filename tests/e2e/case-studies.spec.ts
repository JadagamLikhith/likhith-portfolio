import { test, expect } from "@playwright/test";

test.describe("Dedicated Case Studies & Routing Verification", () => {
  test("loads DevBridge case study page with full narrative and metadata", async ({
    page,
  }) => {
    await page.goto("/work/devbridge");
    await expect(
      page.getByRole("heading", { name: "DevBridge", level: 1 })
    ).toBeVisible();
    await expect(
      page.getByText("Developer Collaboration, Sponsorship & Feedback Platform")
    ).toBeVisible();
    await expect(page.getByText("Kotlin • Jetpack Compose")).toBeVisible();
    await expect(page.getByText("Material Design 3 Tokens")).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Back to Overview/i }).first()
    ).toHaveAttribute("href", "/");
    await expect(
      page.getByRole("link", { name: /Next: IJRAR E-Library Publication/i })
    ).toHaveAttribute("href", "/work/e-library");
  });

  test("loads E-Library research case study with official citation details", async ({
    page,
  }) => {
    await page.goto("/work/e-library");
    await expect(
      page.getByRole("heading", {
        name: /An Interactive and Engaging User-Friendly E-Library Platform/i,
        level: 1,
      })
    ).toBeVisible();
    await expect(page.getByText("IJRAR25B3067", { exact: true })).toBeVisible();
    await expect(page.getByText("Role-Based Access Control (RBAC)")).toBeVisible();
    await expect(page.getByText("3-Tier Modular System Architecture")).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Back to Overview/i }).first()
    ).toHaveAttribute("href", "/");
    await expect(
      page.getByRole("link", { name: /Next: DevBridge Mobile Platform/i })
    ).toHaveAttribute("href", "/work/devbridge");
  });

  test("navigates from homepage to DevBridge and back", async ({ page }) => {
    await page.goto("/");
    const devbridgeLink = page.getByRole("link", {
      name: /Explore DevBridge Case Study/i,
    });
    await expect(devbridgeLink).toBeVisible();
    await devbridgeLink.click();
    await expect(page).toHaveURL(/\/work\/devbridge/);

    const backLink = page.getByRole("link", { name: /Back to Overview/i }).first();
    await backLink.click();
    await expect(page).toHaveURL(/\//);
  });

  test("navigates from homepage to E-Library and back", async ({ page }) => {
    await page.goto("/");
    const eLibraryLink = page.getByRole("link", {
      name: /View Research Case Study/i,
    });
    await expect(eLibraryLink).toBeVisible();
    await eLibraryLink.click();
    await expect(page).toHaveURL(/\/work\/e-library/);

    const backLink = page.getByRole("link", { name: /Back to Overview/i }).first();
    await backLink.click();
    await expect(page).toHaveURL(/\//);
  });

  test("verifies resume link is accessible from case study pages", async ({
    page,
  }) => {
    await page.goto("/work/devbridge");
    await expect(
      page.getByLabel("Download Jadagam Likhith's Resume (PDF)")
    ).toHaveAttribute("href", "/JADAGAM_LIKHITH_Resume.pdf");

    await page.goto("/work/e-library");
    await expect(
      page.getByLabel("Download Jadagam Likhith's Resume (PDF)")
    ).toHaveAttribute("href", "/JADAGAM_LIKHITH_Resume.pdf");
  });
});
