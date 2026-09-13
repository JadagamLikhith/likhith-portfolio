import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/contact/route";
import { getClientIp } from "@/lib/client-ip";
import { rateLimiter, InMemoryRateLimiter } from "@/lib/rate-limit";
import { emailService, ResendEmailService, escapeHtml } from "@/lib/email";

// Mock Resend SDK
const mockSend = vi.fn();

vi.mock("resend", () => {
  return {
    Resend: class MockResend {
      emails = {
        send: mockSend,
      };
    },
  };
});

describe("Contact API Route Handler & Resend Email Service", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    rateLimiter.reset?.();
    vi.clearAllMocks();
    mockSend.mockReset();
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

  it("returns 200 and success for valid payload in development fallback mode", async () => {
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

  it("returns 200 in production when email provider is configured and Resend succeeds", async () => {
    process.env.RESEND_API_KEY = "re_test_key_123";
    process.env.CONTACT_NOTIFICATION_EMAIL = "likhithjadagam7@gmail.com";
    process.env.CONTACT_FROM_EMAIL = "onboarding@resend.dev";
    (process.env as Record<string, string>).NODE_ENV = "production";

    mockSend.mockResolvedValueOnce({
      data: { id: "msg_prod_resend_999" },
      error: null,
    });

    const req = createMockRequest({
      name: "Alex Rivera",
      email: "alex@example.com",
      message: "This is a legitimate inquiry with valid credentials.",
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(mockSend).toHaveBeenCalledTimes(1);
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

  describe("Resend Email Service Unit Tests & Safety Guards", () => {
    it("escapes unsafe HTML characters to prevent XSS/injection in emails", () => {
      const unsafe = `<script>alert("xss")</script> & 'hello' "world"`;
      const safe = escapeHtml(unsafe);
      expect(safe).toBe(
        `&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt; &amp; &#039;hello&#039; &quot;world&quot;`
      );
    });

    it("handles development mode without API key by falling back safely", async () => {
      delete process.env.RESEND_API_KEY;
      (process.env as Record<string, string>).NODE_ENV = "development";

      const service = new ResendEmailService();
      const result = await service.sendContactNotification({
        name: "Alex Rivera",
        email: "alex@example.com",
        subject: "General Inquiry",
        message: "Hello Likhith!",
      });

      expect(result.success).toBe(true);
      expect(result.messageId).toContain("dev_fallback");
      expect(mockSend).not.toHaveBeenCalled();
    });

    it("blocks production mode without RESEND_API_KEY and returns failure", async () => {
      delete process.env.RESEND_API_KEY;
      process.env.CONTACT_NOTIFICATION_EMAIL = "likhithjadagam7@gmail.com";
      process.env.CONTACT_FROM_EMAIL = "onboarding@resend.dev";
      (process.env as Record<string, string>).NODE_ENV = "production";

      const service = new ResendEmailService();
      const result = await service.sendContactNotification({
        name: "Alex Rivera",
        email: "alex@example.com",
        subject: "General Inquiry",
        message: "Hello Likhith!",
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain("missing API key");
      expect(mockSend).not.toHaveBeenCalled();
    });

    it("blocks production mode without CONTACT_NOTIFICATION_EMAIL and returns failure", async () => {
      process.env.RESEND_API_KEY = "re_prod_valid_123";
      delete process.env.CONTACT_NOTIFICATION_EMAIL;
      process.env.CONTACT_FROM_EMAIL = "onboarding@resend.dev";
      (process.env as Record<string, string>).NODE_ENV = "production";

      const service = new ResendEmailService();
      const result = await service.sendContactNotification({
        name: "Alex Rivera",
        email: "alex@example.com",
        subject: "General Inquiry",
        message: "Hello Likhith!",
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain("missing recipient");
      expect(mockSend).not.toHaveBeenCalled();
    });

    it("blocks production mode without CONTACT_FROM_EMAIL and returns failure", async () => {
      process.env.RESEND_API_KEY = "re_prod_valid_123";
      process.env.CONTACT_NOTIFICATION_EMAIL = "likhithjadagam7@gmail.com";
      delete process.env.CONTACT_FROM_EMAIL;
      (process.env as Record<string, string>).NODE_ENV = "production";

      const service = new ResendEmailService();
      const result = await service.sendContactNotification({
        name: "Alex Rivera",
        email: "alex@example.com",
        subject: "General Inquiry",
        message: "Hello Likhith!",
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain("missing sender");
      expect(mockSend).not.toHaveBeenCalled();
    });

    it("sends email successfully via Resend when all credentials are provided", async () => {
      process.env.RESEND_API_KEY = "re_prod_valid_123";
      process.env.CONTACT_NOTIFICATION_EMAIL = "likhithjadagam7@gmail.com";
      process.env.CONTACT_FROM_EMAIL = "onboarding@resend.dev";
      (process.env as Record<string, string>).NODE_ENV = "production";

      mockSend.mockResolvedValueOnce({
        data: { id: "resend_msg_test_success_777" },
        error: null,
      });

      const service = new ResendEmailService();
      const result = await service.sendContactNotification({
        name: "Alex Rivera",
        email: "alex@example.com",
        subject: "Partnership Inquiry",
        message: "We would like to collaborate on a design system.",
      });

      expect(result.success).toBe(true);
      expect(result.messageId).toBe("resend_msg_test_success_777");
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          from: "onboarding@resend.dev",
          to: "likhithjadagam7@gmail.com",
          replyTo: "alex@example.com",
          subject: "[Portfolio Inquiry] Partnership Inquiry - from Alex Rivera",
        })
      );
    });

    it("handles Resend API rejection error gracefully", async () => {
      process.env.RESEND_API_KEY = "re_prod_valid_123";
      process.env.CONTACT_NOTIFICATION_EMAIL = "likhithjadagam7@gmail.com";
      process.env.CONTACT_FROM_EMAIL = "onboarding@resend.dev";
      (process.env as Record<string, string>).NODE_ENV = "production";

      mockSend.mockResolvedValueOnce({
        data: null,
        error: {
          name: "validation_error",
          message: "Domain not verified in Resend.",
        },
      });

      const service = new ResendEmailService();
      const result = await service.sendContactNotification({
        name: "Alex Rivera",
        email: "alex@example.com",
        subject: "General Inquiry",
        message: "Hello!",
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe("Domain not verified in Resend.");
    });

    it("handles unexpected Resend exception gracefully", async () => {
      process.env.RESEND_API_KEY = "re_prod_valid_123";
      process.env.CONTACT_NOTIFICATION_EMAIL = "likhithjadagam7@gmail.com";
      process.env.CONTACT_FROM_EMAIL = "onboarding@resend.dev";
      (process.env as Record<string, string>).NODE_ENV = "production";

      mockSend.mockRejectedValueOnce(new Error("Network timeout contacting Resend API"));

      const service = new ResendEmailService();
      const result = await service.sendContactNotification({
        name: "Alex Rivera",
        email: "alex@example.com",
        subject: "General Inquiry",
        message: "Hello!",
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe("Network timeout contacting Resend API");
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

