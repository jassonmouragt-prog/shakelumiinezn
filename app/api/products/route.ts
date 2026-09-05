import { getSql } from '@/lib/db';
import { productFromRow } from '@/lib/mappers';
import type { Product } from '@/types';

export async function GET() {
  try {
    const rows = await getSql()`SELECT * FROM products ORDER BY created_at ASC`;
    return Response.json((rows as any[]).map(productFromRow));
  } catch (e) {
    console.error('GET /api/products error:', e);
    return Response.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  let body: Omit<Product, 'id' | 'slug'>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Body inválido' }, { status: 400 });
  }

  const slug = body.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  const id = `prod-${Date.now()}`;

  try {
    await getSql()`
      INSERT INTO products (
        id, slug, name, subtitle, description, price, promo_price,
        category, badge, image, gallery, rating, reviews_count, weight, servings,
        flavors, ingredients, nutritional_info, benefits, stock, is_featured, show_in_showcase,
        addons
      ) VALUES (
        ${id}, ${slug}, ${body.name}, ${body.subtitle}, ${body.description},
        ${body.price}, ${body.promoPrice ?? null},
        ${body.category}, ${body.badge ?? null}, ${body.image},
        ${JSON.stringify(body.gallery ?? [])}, ${body.rating}, ${body.reviewsCount},
        ${body.weight}, ${body.servings}, ${JSON.stringify(body.flavors ?? [])},
        ${JSON.stringify(body.ingredients ?? [])}, ${JSON.stringify(body.nutritionalInfo ?? {})},
        ${JSON.stringify(body.benefits ?? [])}, ${body.stock},
        ${body.isFeatured ?? false}, ${body.showInShowcase ?? true},
        ${JSON.stringify(body.addons ?? [])}
      )
    `;
    return Response.json({ id, slug }, { status: 201 });
  } catch (e) {
    console.error('POST /api/products error:', e);
    return Response.json({ error: 'Erro ao criar produto' }, { status: 500 });
  }
}
