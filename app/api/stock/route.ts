import { getSql } from '@/lib/db';
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

export async function POST(req: Request) {
  let body: CreateInput;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Body inválido' }, { status: 400 });
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
      VALUES (${id}, ${body.productId}, ${body.productName}, ${body.type},
        ${body.quantity}, ${body.reason}, ${date}, ${body.responsible})
    `;

    // Atualiza o estoque do produto automaticamente
    await getSql()`
      UPDATE products
      SET stock = GREATEST(0, stock + ${body.type === 'entrada' ? body.quantity : -body.quantity})
      WHERE id = ${body.productId}
    `;

    return Response.json({ id, date }, { status: 201 });
  } catch (e) {
    console.error('POST /api/stock error:', e);
    return Response.json({ error: 'Erro ao registrar movimentação' }, { status: 500 });
  }
}
