import { NextRequest } from 'next/server';
import { getSql } from '@/lib/db';
import { verifyPassword } from '@/lib/password';
import { createSession } from '@/lib/session';
import { checkRateLimit, rateLimitResponse } from '@/lib/rate-limit';
import { email as validEmail, str } from '@/lib/validate';

// Hash dummy no formato salt:hash para equalizar o tempo de resposta quando
// o email não existe (evita enumeração de usuários via timing/response).
const DUMMY_HASH = `${'0'.repeat(32)}:${'0'.repeat(128)}`;

export async function POST(req: NextRequest) {
  const rl = await checkRateLimit(req, 'login', { limit: 10, windowSeconds: 300 });
  if (!rl.allowed) return rateLimitResponse(rl.retryAfter);

  let body: { email?: string; password?: string } = {};
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Body inválido' }, { status: 400 });
  }

  const email = validEmail(body.email);
  const password = str(body.password, 1024, { min: 1 });

  if (!email || !password) {
    return Response.json({ error: 'Credenciais inválidas' }, { status: 401 });
  }

  try {
    const rows = (await getSql()`
      SELECT id, name, email, password_hash, role FROM users WHERE email = ${email}
    `) as unknown as any[];
    const user = rows[0] as any;
    const ok = user
      ? await verifyPassword(password, user.password_hash)
      : await verifyPassword(password, DUMMY_HASH);
    if (!ok) {
      return Response.json({ error: 'Credenciais inválidas' }, { status: 401 });
    }

    await createSession(user.id);
    return Response.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (e) {
    console.error('Auth login error:', e);
    return Response.json({ error: 'Erro interno' }, { status: 500 });
  }
}
