import { getSql } from '@/lib/db';
import { getAdmin, UNAUTHORIZED_RESPONSE } from '@/lib/auth';
import { checkRateLimit, rateLimitResponse } from '@/lib/rate-limit';
import { isRecord, str, num, integer, email, phone, oneOf, jsonString } from '@/lib/validate';
import type { NextRequest } from 'next/server';
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
    createdAt: row.created_at_str
  };
}

export async function GET() {
  if (!(await getAdmin())) return UNAUTHORIZED_RESPONSE;
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

export async function POST(req: NextRequest) {
  const rl = await checkRateLimit(req, 'order', { limit: 15, windowSeconds: 600 });
  if (!rl.allowed) return rateLimitResponse(rl.retryAfter);

  let body: CreateOrderInput;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Body inválido' }, { status: 400 });
  }

  const customerName = str(body.customerName, 120, { min: 2 });
  // E-mail e telefone são opcionais no checkout (confirmação via WhatsApp)
  const customerEmail =
    body.customerEmail && String(body.customerEmail).trim()
      ? email(body.customerEmail)
      : '';
  const customerPhone =
    body.customerPhone && String(body.customerPhone).trim()
      ? phone(body.customerPhone)
      : '';
  const shippingMethod = oneOf(body.shippingMethod, ['entrega', 'retirada']);
  const paymentMethod = oneOf(body.paymentMethod, ['pix', 'cartao']);
  const shippingCost = num(body.shippingCost, 0, 1000);
  const subtotal = num(body.subtotal, 0, 1_000_000);
  const discount = num(body.discount, 0, 1_000_000);
  const total = num(body.total, 0, 1_000_000);
  const address = isRecord(body.address)
    ? jsonString(body.address, 4000)
    : null;

  if (
    !customerName || customerEmail === null || customerPhone === null ||
    !shippingMethod || !paymentMethod ||
    shippingCost === null || subtotal === null || discount === null ||
    total === null || !address
  ) {
    return Response.json({ error: 'Dados do pedido inválidos' }, { status: 400 });
  }

  if (!Array.isArray(body.items) || body.items.length === 0 || body.items.length > 50) {
    return Response.json({ error: 'Pedido sem itens válidos' }, { status: 400 });
  }
  for (const item of body.items) {
    const qty = integer(item.quantity, 1, 999);
    const itemId = str(item.id, 100, { min: 1 });
    const flavor = str(item.selectedFlavor, 100);
    const product = isRecord(item.product) ? item.product : null;
    if (!product) {
      return Response.json({ error: 'Item com produto inválido' }, { status: 400 });
    }
    const price = num(product.price, 0, 1_000_000);
    const promoPrice =
      product.promoPrice == null ? null : num(product.promoPrice, 0, 1_000_000);
    const pName = str(product.name, 200, { min: 1 });
    const pImage = str(product.image, 500);
    if (
      !qty || !itemId || flavor === null ||
      !pName || pImage === null || price === null ||
      (product.promoPrice != null && promoPrice === null) ||
      (product.slug != null && typeof product.slug !== 'string') ||
      jsonString(product, 100_000) === null
    ) {
      return Response.json({ error: 'Item do pedido inválido' }, { status: 400 });
    }
  }

  try {
    const countRows = (await getSql()`
      SELECT COUNT(*)::int AS c FROM orders
    `) as unknown as { c: number }[];
    const nextNumber = 1026 + (countRows[0]?.c ?? 0);
    const id = `ord-${nextNumber}`;
    const code = `#${nextNumber}`;
    const pointsEarned = Math.floor(total!);
    const createdAtStr = formatNow();

    await getSql()`
      INSERT INTO orders (
        id, code, customer_name, customer_email, customer_phone, address,
        shipping_method, shipping_cost, payment_method, status, subtotal,
        discount, total, points_earned, created_at_str
      ) VALUES (
        ${id}, ${code}, ${customerName}, ${customerEmail},
        ${customerPhone}, ${address},
        ${shippingMethod}, ${shippingCost}, ${paymentMethod},
        'pendente', ${subtotal}, ${discount}, ${total},
        ${pointsEarned}, ${createdAtStr}
      )
    `;

    for (const item of body.items) {
      const p = item.product;
      const promo = p.promoPrice ?? null;
      await getSql()`
        INSERT INTO order_items (
          id, order_id, product_id, product_name, product_image, price,
          promo_price, quantity, selected_flavor, product_snapshot
        ) VALUES (
          ${item.id}, ${id}, ${p.id}, ${p.name}, ${p.image}, ${p.price},
          ${promo}, ${item.quantity}, ${item.selectedFlavor},
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
