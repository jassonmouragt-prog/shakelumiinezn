import { NextRequest } from 'next/server';
import { getSql } from '@/lib/db';
import { verifyPassword } from '@/lib/password';
import { createSession } from '@/lib/session';

export async function POST(req: NextRequest) {
  let body: { email?: string; password?: string } = {};
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Body inválido' }, { status: 400 });
  }

  const email = (body.email || '').trim().toLowerCase();
  const password = body.password || '';

  if (!email || !password) {
    return Response.json({ error: 'Email e senha são obrigatórios' }, { status: 400 });
  }

  try {
    const rows = (await getSql()`
      SELECT id, name, email, password_hash, role FROM users
      WHERE email = ${email} AND role = 'revendedor'
    `) as unknown as any[];
    if (rows.length === 0) {
      return Response.json({ error: 'Credenciais inválidas' }, { status: 401 });
    }
    const user = rows[0] as any;
    const ok = await verifyPassword(password, user.password_hash);
    if (!ok) {
      return Response.json({ error: 'Credenciais inválidas' }, { status: 401 });
    }

    await createSession(user.id);
    return Response.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (e) {
    console.error('Reseller login error:', e);
    return Response.json({ error: 'Erro interno' }, { status: 500 });
  }
}