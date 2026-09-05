import { NextRequest } from 'next/server';
import { getSql } from '@/lib/db';
import { getAdmin, UNAUTHORIZED_RESPONSE } from '@/lib/auth';
import { oneOf } from '@/lib/validate';
import type { OrderStatus } from '@/types';

type Ctx = { params: Promise<{ id: string }> };

const VALID_STATUSES = ['pendente', 'confirmado', 'cancelado'] as const;

export async function PATCH(req: NextRequest, ctx: Ctx) {
  if (!(await getAdmin())) return UNAUTHORIZED_RESPONSE;
  const { id } = await ctx.params;
  if (!id || id.length > 100) {
    return Response.json({ error: 'Pedido inválido' }, { status: 400 });
  }
  let body: { status?: OrderStatus };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Body inválido' }, { status: 400 });
  }
  const status = oneOf(body.status, VALID_STATUSES);
  if (!status) {
    return Response.json({ error: 'Status inválido' }, { status: 400 });
  }

  try {
    await getSql()`UPDATE orders SET status = ${status} WHERE id = ${id}`;
    return Response.json({ ok: true });
  } catch (e) {
    console.error('PATCH /api/orders error:', e);
    return Response.json({ error: 'Erro ao atualizar pedido' }, { status: 500 });
  }
}
