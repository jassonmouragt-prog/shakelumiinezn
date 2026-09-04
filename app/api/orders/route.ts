import { getSql } from '@/lib/db';
import type { Order, OrderStatus, CartItem } from '@/types';

type CreateOrderInput = Omit<
  Order,
  'id' | 'code' | 'createdAt' | 'status' | 'pointsEarned'
>;

type ItemRow = {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  product_image: string;
  price: number;
  promo_price: number | null;
  quantity: number;
  selected_flavor: string;
  product_snapshot: unknown;
};

type OrderRow = {
  id: string;
  code: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: unknown;
  shipping_method: string;
  shipping_cost: number;
  payment_method: string;
  status: string;
  subtotal: number;
  discount: number;
  total: number;
  points_earned: number;
  reseller_code: string | null;
  created_at_str: string;
};

function itemFromRow(row: ItemRow): CartItem {
  const snapshot = (row.product_snapshot as any) ?? {};
  return {
    id: row.id,
    quantity: row.quantity,
    selectedFlavor: row.selected_flavor,
    product: {
      id: row.product_id || snapshot.id || '',
      slug: snapshot.slug || '',
      name: row.product_name,
      subtitle: snapshot.subtitle || '',
      description: snapshot.description || '',
      price: row.price,
      promoPrice: row.promo_price ?? undefined,
      resellerPrice: snapshot.reseller_price ?? row.price,
      category: snapshot.category ?? 'shakes',
      badge: snapshot.badge ?? null,
      image: row.product_image,
      gallery: snapshot.gallery ?? [],
      rating: snapshot.rating ?? 5,
      reviewsCount: snapshot.reviewsCount ?? 0,
      weight: snapshot.weight ?? '',
      servings: snapshot.servings ?? 1,
      flavors: snapshot.flavors ?? [],
      ingredients: snapshot.ingredients ?? [],
      nutritionalInfo: snapshot.nutritionalInfo ?? {},
      benefits: snapshot.benefits ?? [],
      stock: snapshot.stock ?? 0,
      isFeatured: snapshot.isFeatured ?? false,
      showInShowcase: snapshot.showInShowcase ?? true
    }
  };
}

function orderFromRow(row: OrderRow, items: CartItem[]): Order {
  return {
    id: row.id,
    code: row.code,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    address: (row.address as Order['address']) ?? {},
    shippingMethod: row.shipping_method as Order['shippingMethod'],
    shippingCost: row.shipping_cost,
    paymentMethod: row.payment_method as Order['paymentMethod'],
    status: row.status as OrderStatus,
    items,
    subtotal: row.subtotal,
    discount: row.discount,
    total: row.total,
    pointsEarned: row.points_earned,
    resellerCode: row.reseller_code ?? undefined,
    createdAt: row.created_at_str
  };
}

export async function GET() {
  try {
    const orderRows = (await getSql()`
      SELECT * FROM orders ORDER BY created_at_ts DESC
    `) as unknown as OrderRow[];
    const itemRows = (await getSql()`
      SELECT * FROM order_items
    `) as unknown as ItemRow[];

    const itemsByOrder = new Map<string, CartItem[]>();
    for (const it of itemRows) {
      if (!itemsByOrder.has(it.order_id)) itemsByOrder.set(it.order_id, []);
      itemsByOrder.get(it.order_id)!.push(itemFromRow(it));
    }

    const orders = orderRows.map((o) => orderFromRow(o, itemsByOrder.get(o.id) ?? []));
    return Response.json(orders);
  } catch (e) {
    console.error('GET /api/orders error:', e);
    return Response.json({ error: 'Erro ao buscar pedidos' }, { status: 500 });
  }
}

function formatNow(): string {
  const d = new Date();
  const date = d.toLocaleDateString('pt-BR');
  const time = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return `${date} ${time}`;
}

export async function POST(req: Request) {
  let body: CreateOrderInput;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Body inválido' }, { status: 400 });
  }

  try {
    const countRows = (await getSql()`
      SELECT COUNT(*)::int AS c FROM orders
    `) as unknown as { c: number }[];
    const nextNumber = 1026 + (countRows[0]?.c ?? 0);
    const id = `ord-${nextNumber}`;
    const code = `#${nextNumber}`;
    const pointsEarned = Math.floor(body.total);
    const createdAtStr = formatNow();

    await getSql()`
      INSERT INTO orders (
        id, code, customer_name, customer_email, customer_phone, address,
        shipping_method, shipping_cost, payment_method, status, subtotal,
        discount, total, points_earned, reseller_code, created_at_str
      ) VALUES (
        ${id}, ${code}, ${body.customerName}, ${body.customerEmail},
        ${body.customerPhone}, ${JSON.stringify(body.address)},
        ${body.shippingMethod}, ${body.shippingCost}, ${body.paymentMethod},
        'pendente', ${body.subtotal}, ${body.discount}, ${body.total},
        ${pointsEarned}, ${body.resellerCode ?? null}, ${createdAtStr}
      )
    `;

    for (const item of body.items ?? []) {
      const p = item.product;
      await getSql()`
        INSERT INTO order_items (
          id, order_id, product_id, product_name, product_image, price,
          promo_price, quantity, selected_flavor, product_snapshot
        ) VALUES (
          ${item.id}, ${id}, ${p.id}, ${p.name}, ${p.image}, ${p.price},
          ${p.promoPrice ?? null}, ${item.quantity}, ${item.selectedFlavor},
          ${JSON.stringify(p)}
        )
      `;
    }

    return Response.json(
      { id, code, pointsEarned, createdAt: createdAtStr },
      { status: 201 }
    );
  } catch (e) {
    console.error('POST /api/orders error:', e);
    return Response.json({ error: 'Erro ao criar pedido' }, { status: 500 });
  }
}
