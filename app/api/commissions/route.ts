import { getSql } from '@/lib/db';
import type { ResellerCommission } from '@/types';

type Row = {
  id: string;
  order_id: string;
  order_code: string;
  date: string;
  customer_name: string;
  order_value: number;
  commission_rate: number;
  commission_value: number;
  status: string;
};

export async function GET() {
  try {
    const rows = (await getSql()`
      SELECT * FROM reseller_commissions ORDER BY id
    `) as unknown as Row[];
    return Response.json(
      rows.map((r) => ({
        id: r.id,
        orderId: r.order_id,
        orderCode: r.order_code,
        date: r.date,
        customerName: r.customer_name,
        orderValue: r.order_value,
        commissionRate: r.commission_rate,
        commissionValue: r.commission_value,
        status: r.status as ResellerCommission['status']
      }))
    );
  } catch (e) {
    console.error('GET /api/commissions error:', e);
    return Response.json({ error: 'Erro ao buscar comissões' }, { status: 500 });
  }
}
