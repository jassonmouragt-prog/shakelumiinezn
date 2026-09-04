import { getSql } from '@/lib/db';
import { hashPassword } from '@/lib/password';
import { resellerFromRow, ResellerRow } from '@/lib/resellers';
import type { Reseller } from '@/types';

type SubmitInput = Omit<
  Reseller,
  'id' | 'status' | 'referralCode' | 'totalSales' | 'totalOrders' | 'totalCommission' |
  'pendingCommission' | 'approvedCommission' | 'paidCommission' | 'registeredAt'
> & { password?: string };

export async function GET() {
  try {
    const rows = (await getSql()`SELECT * FROM resellers ORDER BY id`) as unknown as ResellerRow[];
    return Response.json(rows.map(resellerFromRow));
  } catch (e) {
    console.error('GET /api/resellers error:', e);
    return Response.json({ error: 'Erro ao buscar revendedores' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  let body: SubmitInput;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Body inválido' }, { status: 400 });
  }

  const id = `res-${Date.now()}`;
  const referralCode =
    body.name.split(' ')[0].toUpperCase() + Math.floor(Math.random() * 90 + 10);
  const registeredAt = new Date().toLocaleDateString('pt-BR');

  try {
    if (body.password) {
      if (body.password.length < 6) {
        return Response.json(
          { error: 'A senha deve ter pelo menos 6 caracteres' },
          { status: 400 }
        );
      }
      if (!body.email || !body.email.trim()) {
        return Response.json({ error: 'Email obrigatório' }, { status: 400 });
      }

      const userId = `usr-${Date.now()}`;
      const passwordHash = await hashPassword(body.password);

      try {
        await getSql()`
          INSERT INTO users (id, name, email, password_hash, role, reseller_id)
          VALUES (
            ${userId}, ${body.name}, ${body.email.trim().toLowerCase()},
            ${passwordHash}, 'revendedor', ${id}
          )
        `;
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        if (msg.includes('unique') || msg.includes('duplicate')) {
          return Response.json(
            { error: 'Já existe uma conta com este email' },
            { status: 409 }
          );
        }
        throw e;
      }
    }

    await getSql()`
      INSERT INTO resellers (
        id, name, document, email, phone, city, state, instagram, activity_type,
        sales_experience, discovery_source, notes, status, referral_code,
        total_sales, total_orders, total_commission, pending_commission,
        approved_commission, paid_commission, registered_at
      ) VALUES (
        ${id}, ${body.name}, ${body.document}, ${body.email}, ${body.phone},
        ${body.city}, ${body.state}, ${body.instagram}, ${body.activityType},
        ${body.salesExperience}, ${body.discoverySource}, ${body.notes ?? null},
        'aprovado', ${referralCode}, 0, 0, 0, 0, 0, 0, ${registeredAt}
      )
    `;
    return Response.json({ id, referralCode, registeredAt }, { status: 201 });
  } catch (e) {
    console.error('POST /api/resellers error:', e);
    return Response.json({ error: 'Erro ao cadastrar revendedor' }, { status: 500 });
  }
}
