import { NextRequest } from 'next/server';
import { getSql } from '@/lib/db';
import { getAdmin, UNAUTHORIZED_RESPONSE } from '@/lib/auth';
import { productFromRow } from '@/lib/mappers';
import { str, num, integer, bool, oneOf, jsonString, isRecord } from '@/lib/validate';
import type { Product } from '@/types';

type Ctx = { params: Promise<{ id: string }> };

const VALID_CATEGORIES = [
  'shakes', 'bebidas', 'salgados', 'novidades', 'mais-vendidos', 'todos', 'combos', 'kits'
] as const;

function cleanBody(body: Record<string, unknown>): Partial<Product> | null {
  const out: Partial<Product> = {};

  if (body.name !== undefined) {
    const v = str(body.name, 120, { min: 1 });
    if (!v) return null;
    out.name = v;
  }
  if (body.subtitle !== undefined) out.subtitle = str(body.subtitle, 240) ?? '';
  if (body.description !== undefined) out.description = str(body.description, 2000) ?? '';
  if (body.price !== undefined) {
    const v = num(body.price, 0, 1_000_000);
    if (v === null) return null;
    out.price = v;
  }
  if (body.promoPrice !== undefined) {
    if (body.promoPrice === null) out.promoPrice = undefined;
    else {
      const v = num(body.promoPrice, 0, 1_000_000);
      if (v === null) return null;
      out.promoPrice = v;
    }
  }
  if (body.category !== undefined) {
    const v = oneOf(body.category, VALID_CATEGORIES);
    if (!v) return null;
    out.category = v;
  }
  if (body.badge !== undefined) out.badge = (body.badge === null ? null : str(body.badge, 30)) as Product['badge'] | null;
  if (body.image !== undefined) out.image = str(body.image, 500) ?? '';
  if (body.rating !== undefined) {
    const v = num(body.rating, 0, 5);
    if (v === null) return null;
    out.rating = v;
  }
  if (body.reviewsCount !== undefined) {
    const v = integer(body.reviewsCount, 0, 10_000_000);
    if (v === null) return null;
    out.reviewsCount = v;
  }
  if (body.weight !== undefined) out.weight = str(body.weight, 50) ?? '';
  if (body.servings !== undefined) {
    const v = integer(body.servings, 1, 1000);
    if (v === null) return null;
    out.servings = v;
  }
  if (body.stock !== undefined) {
    const v = integer(body.stock, 0, 10_000_000);
    if (v === null) return null;
    out.stock = v;
  }
  if (body.isFeatured !== undefined) {
    const v = bool(body.isFeatured);
    if (v === null) return null;
    out.isFeatured = v;
  }
  if (body.showInShowcase !== undefined) {
    const v = bool(body.showInShowcase);
    if (v === null) return null;
    out.showInShowcase = v;
  }

  for (const field of ['gallery', 'flavors', 'ingredients', 'benefits', 'addons'] as const) {
    if (body[field] !== undefined) {
      if (jsonString(body[field], 200_000) === null) return null;
      (out as any)[field] = body[field];
    }
  }
  if (body.nutritionalInfo !== undefined) {
    if (jsonString(body.nutritionalInfo, 50_000) === null) return null;
    out.nutritionalInfo = body.nutritionalInfo as Product['nutritionalInfo'];
  }

  return out;
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  if (!(await getAdmin())) return UNAUTHORIZED_RESPONSE;
  const { id } = await ctx.params;
  if (!id || id.length > 100) {
    return Response.json({ error: 'Produto inválido' }, { status: 400 });
  }
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return Response.json({ error: 'Body inválido' }, { status: 400 });
  }
  if (!isRecord(raw)) {
    return Response.json({ error: 'Body inválido' }, { status: 400 });
  }
  const body = cleanBody(raw);
  if (!body) {
    return Response.json({ error: 'Dados do produto inválidos' }, { status: 400 });
  }

  const currentRows = (await getSql()`
    SELECT * FROM products WHERE id = ${id}
  `) as unknown as any[];
  if (currentRows.length === 0) {
    return Response.json({ error: 'Produto não encontrado' }, { status: 404 });
  }
  const current = productFromRow(currentRows[0] as any);
  const merged: Product = { ...current, ...body };

  try {
    await getSql()`
      UPDATE products SET
        name = ${merged.name},
        subtitle = ${merged.subtitle},
        description = ${merged.description},
        price = ${merged.price},
        promo_price = ${merged.promoPrice ?? null},
        category = ${merged.category},
        badge = ${merged.badge ?? null},
        image = ${merged.image},
        gallery = ${JSON.stringify(merged.gallery ?? [])},
        rating = ${merged.rating},
        reviews_count = ${merged.reviewsCount},
        weight = ${merged.weight},
        servings = ${merged.servings},
        flavors = ${JSON.stringify(merged.flavors ?? [])},
        ingredients = ${JSON.stringify(merged.ingredients ?? [])},
        nutritional_info = ${JSON.stringify(merged.nutritionalInfo ?? {})},
        benefits = ${JSON.stringify(merged.benefits ?? [])},
        addons = ${JSON.stringify(merged.addons ?? [])},
        stock = ${merged.stock},
        is_featured = ${merged.isFeatured ?? false},
        show_in_showcase = ${merged.showInShowcase ?? true}
      WHERE id = ${id}
    `;
    return Response.json({ ok: true });
  } catch (e) {
    console.error('PATCH /api/products error:', e);
    return Response.json({ error: 'Erro ao atualizar produto' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  if (!(await getAdmin())) return UNAUTHORIZED_RESPONSE;
  const { id } = await ctx.params;
  if (!id || id.length > 100) {
    return Response.json({ error: 'Produto inválido' }, { status: 400 });
  }
  try {
    await getSql()`DELETE FROM products WHERE id = ${id}`;
    return Response.json({ ok: true });
  } catch (e) {
    console.error('DELETE /api/products error:', e);
    return Response.json({ error: 'Erro ao remover produto' }, { status: 500 });
  }
}