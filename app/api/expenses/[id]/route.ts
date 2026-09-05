import { NextRequest } from 'next/server';
import { getSql } from '@/lib/db';
import { getAdmin, UNAUTHORIZED_RESPONSE } from '@/lib/auth';

type Ctx = { params: Promise<{ id: string }> };

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  if (!(await getAdmin())) return UNAUTHORIZED_RESPONSE;
  const { id } = await ctx.params;
  if (!id || id.length > 100) {
    return Response.json({ error: 'Despesa inválida' }, { status: 400 });
  }
  try {
    await getSql()`DELETE FROM expenses WHERE id = ${id}`;
    return Response.json({ ok: true });
  } catch (e) {
    console.error('DELETE /api/expenses error:', e);
    return Response.json({ error: 'Erro ao excluir despesa' }, { status: 500 });
  }
}
