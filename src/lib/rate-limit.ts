export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export interface RateLimiter {
  check(identifier: string): Promise<RateLimitResult> | RateLimitResult;
  reset?(identifier?: string): void;
}

/**
 * In-memory sliding window rate limiter implementation.
 * Replaceable with Redis / Upstash / Cloudflare KV provider without modifying consumer API.
 */
export class InMemoryRateLimiter implements RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs = 10 * 60 * 1000, maxRequests = 5) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  check(identifier: string): RateLimitResult {
    const now = Date.now();
    const timestamps = this.requests.get(identifier) || [];

    // Filter timestamps within the sliding window
    const recent = timestamps.filter((time) => now - time < this.windowMs);

    if (recent.length >= this.maxRequests) {
      const oldest = recent[0];
      const reset = oldest + this.windowMs;
      return {
        success: false,
        limit: this.maxRequests,
        remaining: 0,
        reset,
      };
    }

    recent.push(now);
    this.requests.set(identifier, recent);

    return {
      success: true,
      limit: this.maxRequests,
      remaining: this.maxRequests - recent.length,
      reset: now + this.windowMs,
    };
  }

  reset(identifier?: string): void {
    if (identifier) {
      this.requests.delete(identifier);
    } else {
      this.requests.clear();
    }
  }
}

// Global rate limiter instance behind standard RateLimiter interface
export const rateLimiter: RateLimiter = new InMemoryRateLimiter(
  10 * 60 * 1000, // 10 minutes window
  5 // 5 requests max
);
