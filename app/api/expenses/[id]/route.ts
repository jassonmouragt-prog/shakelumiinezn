import { NextRequest } from 'next/server';
import { getSql } from '@/lib/db';

type Ctx = { params: Promise<{ id: string }> };

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    await getSql()`DELETE FROM expenses WHERE id = ${id}`;
    return Response.json({ ok: true });
  } catch (e) {
    console.error('DELETE /api/expenses error:', e);
    return Response.json({ error: 'Erro ao excluir despesa' }, { status: 500 });
  }
}
