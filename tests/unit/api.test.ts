import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/contact/route";
import { getClientIp } from "@/lib/client-ip";
import { rateLimiter, InMemoryRateLimiter } from "@/lib/rate-limit";
import { emailService, ProductionSafeEmailService } from "@/lib/email";

describe("Contact API Route Handler & Email Service", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    rateLimiter.reset?.();
    vi.restoreAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  function createMockRequest(body: unknown, headers: Record<string, string> = {}) {
    const rawBody = typeof body === "string" ? body : JSON.stringify(body);
    return new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: rawBody,
    });
  }

  it("returns 200 and success for valid payload in development", async () => {
    delete process.env.RESEND_API_KEY;
    (process.env as Record<string, string>).NODE_ENV = "development";

    const req = createMockRequest({
      name: "Alex Rivera",
      email: "alex@example.com",
      subject: "Full Stack Opportunity",
      message: "Hi Likhith, we would like to interview you for a developer role.",
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.message).toBe("Message sent successfully.");
  });

  it("returns 503 in production when email provider is unconfigured", async () => {
    delete process.env.RESEND_API_KEY;
    (process.env as Record<string, string>).NODE_ENV = "production";

    const req = createMockRequest({
      name: "Alex Rivera",
      email: "alex@example.com",
      message: "This is a legitimate inquiry.",
    });

    const res = await POST(req);
    expect(res.status).toBe(503);

    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toBe(
      "Unable to send your message right now. Please try again or reach out directly by email."
    );
  });

  it("returns 200 in production when email provider is configured", async () => {
    process.env.RESEND_API_KEY = "re_test_key_123";
    (process.env as Record<string, string>).NODE_ENV = "production";

    const req = createMockRequest({
      name: "Alex Rivera",
      email: "alex@example.com",
      message: "This is a legitimate inquiry with valid credentials.",
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
  });

  it("returns 400 for missing required fields", async () => {
    const req = createMockRequest({
      name: "Alex",
      // missing email
      message: "This is a test message.",
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toBe("Please check the form fields.");
  });

  it("returns 400 for invalid email format", async () => {
    const req = createMockRequest({
      name: "Alex Rivera",
      email: "invalid-email-string",
      message: "This is a valid length test message.",
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toBe("Please check the form fields.");
  });

  it("returns 400 for malformed JSON body", async () => {
    const req = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "invalid-json{}}",
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toBe("Please check the form fields.");
  });

  it("returns 429 when rate limit is exceeded", async () => {
    const clientIp = "192.168.1.100";

    for (let i = 0; i < 5; i++) {
      const req = createMockRequest(
        {
          name: "Alex Rivera",
          email: "alex@example.com",
          message: "Valid test message for rate limit test.",
        },
        { "x-forwarded-for": clientIp }
      );
      const res = await POST(req);
      expect(res.status).toBe(200);
    }

    // 6th request from same IP should be blocked
    const blockedReq = createMockRequest(
      {
        name: "Alex Rivera",
        email: "alex@example.com",
        message: "Valid test message for rate limit test.",
      },
      { "x-forwarded-for": clientIp }
    );

    const blockedRes = await POST(blockedReq);
    expect(blockedRes.status).toBe(429);
    expect(blockedRes.headers.get("Retry-After")).toBeTruthy();

    const json = await blockedRes.json();
    expect(json.success).toBe(false);
    expect(json.error).toBe(
      "Unable to send your message right now. Please try again."
    );
  });

  it("silently discards spam when honeypot field is filled", async () => {
    const emailSpy = vi.spyOn(emailService, "sendContactNotification");

    const req = createMockRequest({
      name: "Bot Sender",
      email: "bot@spam.com",
      message: "Spam message promoting services.",
      honeypot: "automated-bot-content",
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);

    // Email service should NOT be called for bots
    expect(emailSpy).not.toHaveBeenCalled();
  });

  it("returns 503 controlled error when email delivery fails", async () => {
    vi.spyOn(emailService, "sendContactNotification").mockResolvedValueOnce({
      success: false,
      error: "SMTP connection refused",
    });

    const req = createMockRequest({
      name: "Alex Rivera",
      email: "alex@example.com",
      message: "Valid test message for error test.",
    });

    const res = await POST(req);
    expect(res.status).toBe(503);

    const json = await res.json();
    expect(json.success).toBe(false);
    // Ensure no sensitive SMTP error leaked to client
    expect(json.error).toBe(
      "Unable to send your message right now. Please try again or reach out directly by email."
    );
    expect(JSON.stringify(json)).not.toContain("SMTP connection refused");
  });

  describe("Rate Limiting Client Identity Resolution", () => {
    it("prioritizes x-vercel-ip", () => {
      const req = new NextRequest("http://localhost:3000/api/contact", {
        headers: {
          "x-vercel-ip": "203.0.113.195",
          "x-real-ip": "198.51.100.1",
          "x-forwarded-for": "192.0.2.1, 198.51.100.1",
        },
      });
      expect(getClientIp(req)).toBe("203.0.113.195");
    });

    it("prioritizes cf-connecting-ip when x-vercel-ip is missing", () => {
      const req = new NextRequest("http://localhost:3000/api/contact", {
        headers: {
          "cf-connecting-ip": "203.0.113.50",
          "x-real-ip": "198.51.100.1",
          "x-forwarded-for": "192.0.2.1",
        },
      });
      expect(getClientIp(req)).toBe("203.0.113.50");
    });

    it("prioritizes x-real-ip when edge platform headers are missing", () => {
      const req = new NextRequest("http://localhost:3000/api/contact", {
        headers: {
          "x-real-ip": "198.51.100.1",
          "x-forwarded-for": "192.0.2.1, 10.0.0.1",
        },
      });
      expect(getClientIp(req)).toBe("198.51.100.1");
    });

    it("falls back to first IP in x-forwarded-for", () => {
      const req = new NextRequest("http://localhost:3000/api/contact", {
        headers: {
          "x-forwarded-for": "192.0.2.88, 10.0.0.1",
        },
      });
      expect(getClientIp(req)).toBe("192.0.2.88");
    });

    it("falls back to localhost when no proxy headers exist", () => {
      const req = new NextRequest("http://localhost:3000/api/contact");
      expect(getClientIp(req)).toBe("127.0.0.1");
    });
  });

  describe("Email Service Abstraction Safety Guards", () => {
    it("handles development mode without API key by falling back safely", async () => {
      delete process.env.RESEND_API_KEY;
      (process.env as Record<string, string>).NODE_ENV = "development";

      const service = new ProductionSafeEmailService();
      const result = await service.sendContactNotification({
        name: "Alex Rivera",
        email: "alex@example.com",
        subject: "General Inquiry",
        message: "Hello Likhith!",
      });

      expect(result.success).toBe(true);
      expect(result.messageId).toContain("dev_fallback");
    });

    it("blocks production mode without API key and returns failure", async () => {
      delete process.env.RESEND_API_KEY;
      (process.env as Record<string, string>).NODE_ENV = "production";

      const service = new ProductionSafeEmailService();
      const result = await service.sendContactNotification({
        name: "Alex Rivera",
        email: "alex@example.com",
        subject: "General Inquiry",
        message: "Hello Likhith!",
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain("unconfigured in production");
    });

    it("succeeds in production when API key is provided", async () => {
      process.env.RESEND_API_KEY = "re_prod_key_valid";
      (process.env as Record<string, string>).NODE_ENV = "production";

      const service = new ProductionSafeEmailService();
      const result = await service.sendContactNotification({
        name: "Alex Rivera",
        email: "alex@example.com",
        subject: "General Inquiry",
        message: "Hello Likhith!",
      });

      expect(result.success).toBe(true);
      expect(result.messageId).toBeTruthy();
    });
  });

  describe("Rate Limiter Abstraction", () => {
    it("manages isolated windows correctly", () => {
      const limiter = new InMemoryRateLimiter(60000, 2);
      const res1 = limiter.check("ip-1");
      const res2 = limiter.check("ip-1");
      const res3 = limiter.check("ip-1");

      expect(res1.success).toBe(true);
      expect(res2.success).toBe(true);
      expect(res3.success).toBe(false);
      expect(res3.remaining).toBe(0);

      // Different IP is unaffected
      const resOther = limiter.check("ip-2");
      expect(resOther.success).toBe(true);
    });
  });
});
