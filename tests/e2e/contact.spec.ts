import { test, expect } from "@playwright/test";

test.describe("Contact Form Interactive Workflow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Scroll to contact section
    await page.locator("#contact").scrollIntoViewIfNeeded();
  });

  test("renders all contact inputs, labels, and direct email copy action", async ({
    page,
  }) => {
    await expect(page.getByRole("textbox", { name: /Your Name/i })).toBeVisible();
    await expect(page.getByRole("textbox", { name: /Your Email/i })).toBeVisible();
    await expect(page.getByRole("textbox", { name: /Subject/i })).toBeVisible();
    await expect(page.getByRole("textbox", { name: /Message/i })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Transmit Message/i })
    ).toBeVisible();

    // Verify copy email button
    const copyButton = page.getByRole("button", {
      name: /Copy email address/i,
    });
    await expect(copyButton).toBeVisible();
  });

  test("performs client-side validation and highlights missing/invalid fields", async ({
    page,
  }) => {
    const submitButton = page.getByRole("button", {
      name: /Transmit Message/i,
    });

    // 1. Submit empty form
    await submitButton.click();
    await expect(
      page.getByText(/Please check the form fields/i)
    ).toBeVisible();

    // 2. Fill name only
    await page.getByRole("textbox", { name: /Your Name/i }).fill("Alex Rivera");
    await submitButton.click();
    await expect(
      page.getByText(/Please check the form fields/i)
    ).toBeVisible();

    // 3. Fill invalid email
    await page.getByRole("textbox", { name: /Your Email/i }).fill("not-a-valid-email");
    await page.getByRole("textbox", { name: /Message/i }).fill("Hi Likhith, this is a valid test message.");
    await submitButton.click();
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  test("submits form successfully and displays confirmation state", async ({
    page,
  }) => {
    // Mock API response
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          message: "Message sent successfully.",
        }),
      });
    });

    // Fill valid form fields
    await page.getByRole("textbox", { name: /Your Name/i }).fill("Alex Rivera");
    await page.getByRole("textbox", { name: /Your Email/i }).fill("alex@example.com");
    await page.getByRole("textbox", { name: /Subject/i }).fill("Full Stack Opportunity");
    await page.getByRole("textbox", { name: /Message/i }).fill("Hi Likhith, we would like to collaborate on an open source project.");

    const submitButton = page.getByRole("button", {
      name: /Transmit Message/i,
    });
    await submitButton.click();

    // Expect success announcement banner
    await expect(
      page.getByText(/Message Transmitted Successfully/i)
    ).toBeVisible();

    // Ensure form is cleared
    await expect(page.getByRole("textbox", { name: /Your Name/i })).toHaveValue("");
    await expect(page.getByRole("textbox", { name: /Your Email/i })).toHaveValue("");
    await expect(page.getByRole("textbox", { name: /Message/i })).toHaveValue("");

    // Test "Send Another Message" reset button
    const resetButton = page.getByRole("button", {
      name: /Send Another Message/i,
    });
    await expect(resetButton).toBeVisible();
    await resetButton.click();
    await expect(
      page.getByText(/Message Transmitted Successfully/i)
    ).not.toBeVisible();
  });

  test("handles server error and preserves user-entered data", async ({
    page,
  }) => {
    // Mock 500 error response
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          error: "Unable to send your message right now. Please try again.",
        }),
      });
    });

    const testMessage = "Hi Likhith, this entered text should not be lost if the server fails.";
    await page.getByRole("textbox", { name: /Your Name/i }).fill("Alex Rivera");
    await page.getByRole("textbox", { name: /Your Email/i }).fill("alex@example.com");
    await page.getByRole("textbox", { name: /Message/i }).fill(testMessage);

    const submitButton = page.getByRole("button", {
      name: /Transmit Message/i,
    });
    await submitButton.click();

    // Expect error announcement
    await expect(page.getByText(/Submission Error/i)).toBeVisible();
    await expect(
      page.getByText(/Unable to send your message right now/i)
    ).toBeVisible();

    // Assert that entered field content was preserved
    await expect(page.getByRole("textbox", { name: /Your Name/i })).toHaveValue("Alex Rivera");
    await expect(page.getByRole("textbox", { name: /Your Email/i })).toHaveValue("alex@example.com");
    await expect(page.getByRole("textbox", { name: /Message/i })).toHaveValue(testMessage);
  });

  test("handles rate limit 429 response gracefully", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 429,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          error: "Unable to send your message right now. Please try again.",
        }),
      });
    });

    await page.getByRole("textbox", { name: /Your Name/i }).fill("Alex Rivera");
    await page.getByRole("textbox", { name: /Your Email/i }).fill("alex@example.com");
    await page.getByRole("textbox", { name: /Message/i }).fill("Test message exceeding rate limit.");

    const submitButton = page.getByRole("button", {
      name: /Transmit Message/i,
    });
    await submitButton.click();

    await expect(page.getByText(/Submission Error/i)).toBeVisible();
    await expect(
      page.getByText(/Rate limit reached/i)
    ).toBeVisible();
  });
});
