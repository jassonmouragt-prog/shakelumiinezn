import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { getSql } from '@/lib/db';

const SESSION_COOKIE = 'lumiine_session';
const SECRET = process.env.SESSION_SECRET || process.env.DATABASE_URL || 'dev-secret';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 dias em segundos

function sign(value: string): string {
  return createHmac('sha256', SECRET).update(value).digest('hex');
}

function verify(value: string, sig: string): boolean {
  const expected = sign(value);
  const a = Buffer.from(expected);
  const b = Buffer.from(sig);
  return a.length === b.length && timingSafeEqual(a, b);
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export async function createSession(userId: string): Promise<void> {
  const store = await cookies();
  const token = `${userId}.${sign(userId)}`;
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const dot = token.indexOf('.');
  if (dot === -1) return null;
  const userId = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!verify(userId, sig)) return null;

  try {
    const rows = (await getSql()`
      SELECT id, name, email, role FROM users WHERE id = ${userId}
    `) as unknown as any[];
    if (rows.length === 0) return null;
    const u = rows[0] as any;
    return { id: u.id, name: u.name, email: u.email, role: u.role };
  } catch {
    return null;
  }
}
