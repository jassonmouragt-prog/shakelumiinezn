import { NextRequest } from 'next/server';
import { getSql } from '@/lib/db';
import type { Reseller } from '@/types';

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  let body: { status?: Reseller['status'] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Body inválido' }, { status: 400 });
  }
  if (!body.status) {
    return Response.json({ error: 'Status obrigatório' }, { status: 400 });
  }
  try {
    await getSql()`UPDATE resellers SET status = ${body.status} WHERE id = ${id}`;
    return Response.json({ ok: true });
  } catch (e) {
    console.error('PATCH /api/resellers error:', e);
    return Response.json({ error: 'Erro ao atualizar revendedor' }, { status: 500 });
  }
}
