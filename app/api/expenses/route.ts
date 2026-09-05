import { getSql } from '@/lib/db';
import { getAdmin, UNAUTHORIZED_RESPONSE } from '@/lib/auth';
import { str, num, oneOf } from '@/lib/validate';
import type { NextRequest } from 'next/server';
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

const VALID_STATUS = ['pago', 'pendente'] as const;

export async function GET() {
  if (!(await getAdmin())) return UNAUTHORIZED_RESPONSE;
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

export async function POST(req: NextRequest) {
  if (!(await getAdmin())) return UNAUTHORIZED_RESPONSE;
  let body: CreateInput;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Body inválido' }, { status: 400 });
  }
  const description = str(body.description, 240, { min: 1 });
  const category = oneOf(body.category, [
    'Insumos & Matérias-Primas',
    'Embalagens & Frascos',
    'Marketing & Campanhas',
    'Logística & Frete',
    'Impostos & Taxas',
    'Operacional'
  ] as const);
  const amount = num(body.amount, 0, 100_000_000);
  const date = str(body.date, 40, { min: 1 });
  const status = oneOf(body.status, VALID_STATUS);
  const notes = body.notes == null ? null : str(body.notes, 500);
  if (!description || !category || amount === null || !date || !status || notes === null) {
    return Response.json({ error: 'Dados da despesa inválidos' }, { status: 400 });
  }
  const id = `exp-${Date.now()}`;
  try {
    await getSql()`
      INSERT INTO expenses (id, description, category, amount, date, status, notes)
      VALUES (${id}, ${description}, ${category}, ${amount},
        ${date}, ${status}, ${notes})
    `;
    return Response.json({ id }, { status: 201 });
  } catch (e) {
    console.error('POST /api/expenses error:', e);
    return Response.json({ error: 'Erro ao registrar despesa' }, { status: 500 });
  }
}
