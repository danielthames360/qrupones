import { NextRequest } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting
// Note: For serverless (Vercel), consider using Upstash Redis for persistence across instances
const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries periodically
const CLEANUP_INTERVAL = 60 * 1000; // 1 minute
let lastCleanup = Date.now();

function cleanupExpiredEntries() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;

  lastCleanup = now;
  rateLimitStore.forEach((entry, key) => {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  });
}

interface RateLimitOptions {
  maxAttempts: number;
  windowMs: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetInMs: number;
}

/**
 * Simple rate limiter based on IP address
 */
export function rateLimit(
  request: NextRequest,
  options: RateLimitOptions
): RateLimitResult {
  cleanupExpiredEntries();

  const { maxAttempts, windowMs } = options;
  const now = Date.now();

  // Get client IP from headers (works with proxies/Vercel)
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() ||
             request.headers.get('x-real-ip') ||
             'unknown';

  const key = `rate-limit:${ip}`;
  const entry = rateLimitStore.get(key);

  // If no entry or window expired, create new entry
  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      success: true,
      remaining: maxAttempts - 1,
      resetInMs: windowMs,
    };
  }

  // Check if limit exceeded
  if (entry.count >= maxAttempts) {
    return {
      success: false,
      remaining: 0,
      resetInMs: entry.resetTime - now,
    };
  }

  // Increment count
  entry.count++;
  rateLimitStore.set(key, entry);

  return {
    success: true,
    remaining: maxAttempts - entry.count,
    resetInMs: entry.resetTime - now,
  };
}

/**
 * Format milliseconds to human readable string
 */
export function formatTimeRemaining(ms: number): string {
  const minutes = Math.ceil(ms / 60000);
  if (minutes === 1) return '1 minuto';
  return `${minutes} minutos`;
}
