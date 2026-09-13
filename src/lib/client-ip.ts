import { NextRequest } from "next/server";

/**
 * Resolves client identity from trusted proxy / edge headers for rate limiting.
 * Prioritizes platform-authenticated headers (Vercel, Cloudflare, standard reverse proxies).
 */
export function getClientIp(req: NextRequest): string {
  // 1. Edge-authenticated proxy headers
  const vercelIp = req.headers.get("x-vercel-ip");
  if (vercelIp && vercelIp.trim().length > 0) {
    return vercelIp.trim();
  }

  const cfIp = req.headers.get("cf-connecting-ip");
  if (cfIp && cfIp.trim().length > 0) {
    return cfIp.trim();
  }

  const realIp = req.headers.get("x-real-ip");
  if (realIp && realIp.trim().length > 0) {
    return realIp.trim();
  }

  // 2. Fallback to leftmost IP in x-forwarded-for
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded && forwarded.trim().length > 0) {
    const firstIp = forwarded.split(",")[0].trim();
    if (firstIp.length > 0) {
      return firstIp;
    }
  }

  return "127.0.0.1";
}
