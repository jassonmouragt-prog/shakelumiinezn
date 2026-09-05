import { getSql } from '@/lib/db';
import { getAdmin, UNAUTHORIZED_RESPONSE } from '@/lib/auth';
import { str, integer, oneOf } from '@/lib/validate';
import type { NextRequest } from 'next/server';
import type { StockMovement } from '@/types';

type Row = {
  id: string;
  product_id: string;
  product_name: string;
  type: string;
  quantity: number;
  reason: string;
  date: string;
  responsible: string;
};

type CreateInput = Omit<StockMovement, 'id' | 'date'>;

export async function GET() {
  if (!(await getAdmin())) return UNAUTHORIZED_RESPONSE;
  try {
    const rows = (await getSql()`
      SELECT * FROM stock_movements ORDER BY id DESC
    `) as unknown as Row[];
    return Response.json(
      rows.map((r) => ({
        id: r.id,
        productId: r.product_id,
        productName: r.product_name,
        type: r.type as StockMovement['type'],
        quantity: r.quantity,
        reason: r.reason as StockMovement['reason'],
        date: r.date,
        responsible: r.responsible
      }))
    );
  } catch (e) {
    console.error('GET /api/stock error:', e);
    return Response.json({ error: 'Erro ao buscar movimentações' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await getAdmin())) return UNAUTHORIZED_RESPONSE;
  let body: CreateInput;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Body inválido' }, { status: 400 });
  }

  const type = oneOf(body.type, ['entrada', 'saida']);
  const quantity = integer(body.quantity, 1, 100_000);
  const productId = str(body.productId, 100, { min: 1 });
  const productName = str(body.productName, 200, { min: 1 });
  const reason = str(body.reason, 200, { min: 1 });
  const responsible = str(body.responsible, 120) ?? '';
  if (!type || !quantity || !productId || !productName || !reason) {
    return Response.json({ error: 'Dados de movimentação inválidos' }, { status: 400 });
  }

  const id = `mov-${Date.now()}`;
  const d = new Date();
  const date =
    d.toLocaleDateString('pt-BR') +
    ' ' +
    d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  try {
    await getSql()`
      INSERT INTO stock_movements (id, product_id, product_name, type, quantity, reason, date, responsible)
      VALUES (${id}, ${productId}, ${productName}, ${type},
        ${quantity}, ${reason}, ${date}, ${responsible})
    `;

    // Atualiza o estoque do produto automaticamente
    await getSql()`
      UPDATE products
      SET stock = GREATEST(0, stock + ${type === 'entrada' ? quantity : -quantity})
      WHERE id = ${productId}
    `;

    return Response.json({ id, date }, { status: 201 });
  } catch (e) {
    console.error('POST /api/stock error:', e);
    return Response.json({ error: 'Erro ao registrar movimentação' }, { status: 500 });
  }
}
