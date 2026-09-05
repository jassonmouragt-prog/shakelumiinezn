import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { getSql } from '@/lib/db';

const SESSION_COOKIE = 'lumiine_session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 dias em segundos

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'SESSION_SECRET não configurado. Defina SESSION_SECRET nas variáveis de ambiente de produção.'
    );
  }
  console.warn(
    'AVISO DE SEGURANÇA: SESSION_SECRET não configurado. Usando segredo de desenvolvimento inseguro.'
  );
  return 'dev-secret-insecure';
}

function sign(value: string): string {
  return createHmac('sha256', getSecret()).update(value).digest('hex');
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
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  const token = `${userId}.${exp}.${sign(`${userId}.${exp}`)}`;
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

  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [userId, expRaw, sig] = parts;
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return null;
  if (!verify(`${userId}.${exp}`, sig)) return null;
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(userId)) return null;

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