import { getSql } from '@/lib/db';
import type { Reseller } from '@/types';

type ResellerRow = {
  id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  instagram: string;
  activity_type: string;
  sales_experience: string;
  discovery_source: string;
  notes: string | null;
  status: string;
  referral_code: string;
  total_sales: number;
  total_orders: number;
  total_commission: number;
  pending_commission: number;
  approved_commission: number;
  paid_commission: number;
  registered_at: string;
};

function fromRow(r: ResellerRow): Reseller {
  return {
    id: r.id,
    name: r.name,
    document: r.document,
    email: r.email,
    phone: r.phone,
    city: r.city,
    state: r.state,
    instagram: r.instagram,
    activityType: r.activity_type,
    salesExperience: r.sales_experience,
    discoverySource: r.discovery_source,
    notes: r.notes ?? undefined,
    status: r.status as Reseller['status'],
    referralCode: r.referral_code,
    totalSales: r.total_sales,
    totalOrders: r.total_orders,
    totalCommission: r.total_commission,
    pendingCommission: r.pending_commission,
    approvedCommission: r.approved_commission,
    paidCommission: r.paid_commission,
    registeredAt: r.registered_at
  };
}

type SubmitInput = Omit<
  Reseller,
  'id' | 'status' | 'referralCode' | 'totalSales' | 'totalOrders' | 'totalCommission' |
  'pendingCommission' | 'approvedCommission' | 'paidCommission' | 'registeredAt'
>;

export async function GET() {
  try {
    const rows = (await getSql()`SELECT * FROM resellers ORDER BY id`) as unknown as ResellerRow[];
    return Response.json(rows.map(fromRow));
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
        'pendente', ${referralCode}, 0, 0, 0, 0, 0, 0, ${registeredAt}
      )
    `;
    return Response.json({ id, referralCode, registeredAt }, { status: 201 });
  } catch (e) {
    console.error('POST /api/resellers error:', e);
    return Response.json({ error: 'Erro ao cadastrar revendedor' }, { status: 500 });
  }
}
