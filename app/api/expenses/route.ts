import { getSql } from '@/lib/db';
import type { Expense } from '@/types';

type Row = {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  status: string;
  notes: string | null;
};

type CreateInput = Omit<Expense, 'id'>;

export async function GET() {
  try {
    const rows = (await getSql()`
      SELECT * FROM expenses ORDER BY id DESC
    `) as unknown as Row[];
    return Response.json(
      rows.map((r) => ({
        id: r.id,
        description: r.description,
        category: r.category as Expense['category'],
        amount: r.amount,
        date: r.date,
        status: r.status as Expense['status'],
        notes: r.notes ?? undefined
      }))
    );
  } catch (e) {
    console.error('GET /api/expenses error:', e);
    return Response.json({ error: 'Erro ao buscar despesas' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  let body: CreateInput;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Body inválido' }, { status: 400 });
  }
  const id = `exp-${Date.now()}`;
  try {
    await getSql()`
      INSERT INTO expenses (id, description, category, amount, date, status, notes)
      VALUES (${id}, ${body.description}, ${body.category}, ${body.amount},
        ${body.date}, ${body.status}, ${body.notes ?? null})
    `;
    return Response.json({ id }, { status: 201 });
  } catch (e) {
    console.error('POST /api/expenses error:', e);
    return Response.json({ error: 'Erro ao registrar despesa' }, { status: 500 });
  }
}
