import { ipAddress } from '@vercel/functions';
import type { NextRequest } from 'next/server';
import { getSql } from '@/lib/db';

export interface RateLimitConfig {
  limit: number;
  windowSeconds: number;
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfter: number;
  remaining: number;
}

const CLEANUP_PROBABILITY = 0.01;
const CLEANUP_OLDER_THAN_MS = 60 * 60 * 1000; // janelas com mais de 1h

export async function checkRateLimit(
  req: NextRequest | Request,
  scope: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const xff = req.headers.get('x-forwarded-for');
  const ip = ipAddress(req) ?? xff?.split(',')[0]?.trim() ?? 'unknown';
  const key = `${scope}:${ip}`;

  try {
    const windowMs = config.windowSeconds * 1000;
    const windowStart = Math.floor(Date.now() / windowMs) * windowMs;

    const rows = (await getSql()`
      INSERT INTO rate_limits (key, window_start, count)
      VALUES (${key}, ${windowStart}, 1)
      ON CONFLICT (key, window_start)
      DO UPDATE SET count = rate_limits.count + 1
      RETURNING count
    `) as unknown as { count: string | number }[];

    const count = Number(rows[0]?.count ?? 1);

    // Limpeza probabilística para a tabela não crescer sem limite
    if (Math.random() < CLEANUP_PROBABILITY) {
      getSql()`
        DELETE FROM rate_limits WHERE window_start < ${Date.now() - CLEANUP_OLDER_THAN_MS}
      `.catch(() => {});
    }

    if (count > config.limit) {
      const retryAfter = Math.max(
        1,
        Math.ceil((windowStart + windowMs - Date.now()) / 1000)
      );
      return { allowed: false, retryAfter, remaining: 0 };
    }

    return {
      allowed: true,
      retryAfter: 0,
      remaining: Math.max(0, config.limit - count)
    };
  } catch {
    // Fail-open: se a infraestrutura de rate limit falhar,
    // não bloqueia o usuário legítimo.
    return { allowed: true, retryAfter: 0, remaining: config.limit };
  }
}

export function rateLimitResponse(retryAfter: number): Response {
  return Response.json(
    { error: 'Muitas requisições. Tente novamente em instantes.' },
    { status: 429, headers: { 'Retry-After': String(retryAfter) } }
  );
}