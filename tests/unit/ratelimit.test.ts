import { describe, it, expect } from "vitest";
import { rateLimiter } from "@/lib/rate-limit";

describe("Rate Limiter Abstraction", () => {
  it("allows initial requests within limit", async () => {
    const testIp = `test-ip-${Date.now()}`;
    const res1 = await rateLimiter.check(testIp);
    expect(res1.success).toBe(true);
    expect(res1.remaining).toBe(4);
  });

  it("blocks requests after exceeding 5 requests in window", async () => {
    const testIp = `test-ip-blocked-${Date.now()}`;
    for (let i = 0; i < 5; i++) {
      await rateLimiter.check(testIp);
    }
    const blockedRes = await rateLimiter.check(testIp);
    expect(blockedRes.success).toBe(false);
    expect(blockedRes.remaining).toBe(0);
  });
});
