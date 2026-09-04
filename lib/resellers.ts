import type { Reseller } from '@/types';

export type ResellerRow = {
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

export function resellerFromRow(r: ResellerRow): Reseller {
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