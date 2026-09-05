import { getSql } from '@/lib/db';
import { getAdmin, UNAUTHORIZED_RESPONSE } from '@/lib/auth';
import { productFromRow } from '@/lib/mappers';
import { str, num, integer, bool, oneOf, jsonString } from '@/lib/validate';
import type { NextRequest } from 'next/server';
import type { Product } from '@/types';

const VALID_CATEGORIES = [
  'shakes', 'bebidas', 'salgados', 'novidades', 'mais-vendidos', 'todos', 'combos', 'kits'
] as const;

export async function GET() {
  try {
    const rows = await getSql()`SELECT * FROM products ORDER BY created_at ASC`;
    return Response.json((rows as any[]).map(productFromRow));
  } catch (e) {
    console.error('GET /api/products error:', e);
    return Response.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await getAdmin())) return UNAUTHORIZED_RESPONSE;
  let body: any;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Body inválido' }, { status: 400 });
  }

  const name = str(body?.name, 120, { min: 1 });
  const subtitle = str(body?.subtitle, 240) ?? '';
  const description = str(body?.description, 2000) ?? '';
  const category = oneOf(body?.category, VALID_CATEGORIES) ?? 'shakes';
  const badge =
    body?.badge == null ? null : str(body?.badge, 30);
  const image = str(body?.image, 500) ?? '';
  const price = num(body?.price, 0, 1_000_000);
  const promoPrice =
    body?.promoPrice == null ? null : num(body?.promoPrice, 0, 1_000_000);
  const rating = num(body?.rating, 0, 5) ?? 5;
  const reviewsCount = integer(body?.reviewsCount, 0, 10_000_000) ?? 0;
  const weight = str(body?.weight, 50) ?? '';
  const servings = integer(body?.servings, 1, 1000) ?? 1;
  const stock = integer(body?.stock, 0, 10_000_000) ?? 0;

  const gallery = jsonString(body?.gallery ?? [], 200_000) ?? '[]';
  const flavors = jsonString(body?.flavors ?? [], 100_000) ?? '[]';
  const ingredients = jsonString(body?.ingredients ?? [], 100_000) ?? '[]';
  const nutritionalInfo = jsonString(body?.nutritionalInfo ?? {}, 50_000) ?? '{}';
  const benefits = jsonString(body?.benefits ?? [], 100_000) ?? '[]';
  const addons = jsonString(body?.addons ?? [], 100_000) ?? '[]';

  if (!name || price === null || (body?.promoPrice != null && promoPrice === null)) {
    return Response.json({ error: 'Dados do produto inválidos' }, { status: 400 });
  }

  const isFeatured = bool(body?.isFeatured) ?? false;
  const showInShowcase = bool(body?.showInShowcase) ?? true;
  const slug = name
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
        ${id}, ${slug}, ${name}, ${subtitle}, ${description},
        ${price}, ${promoPrice},
        ${category}, ${badge}, ${image},
        ${gallery}, ${rating}, ${reviewsCount},
        ${weight}, ${servings}, ${flavors},
        ${ingredients}, ${nutritionalInfo},
        ${benefits}, ${stock},
        ${isFeatured}, ${showInShowcase},
        ${addons}
      )
    `;
    return Response.json({ id, slug }, { status: 201 });
  } catch (e) {
    console.error('POST /api/products error:', e);
    return Response.json({ error: 'Erro ao criar produto' }, { status: 500 });
  }
}
