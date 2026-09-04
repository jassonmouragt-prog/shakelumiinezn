import { NextRequest } from 'next/server';
import { getSql } from '@/lib/db';
import { productFromRow } from '@/lib/mappers';
import type { Product } from '@/types';

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  let body: Partial<Product>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Body inválido' }, { status: 400 });
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
        reseller_price = ${merged.resellerPrice},
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
  const { id } = await ctx.params;
  try {
    await getSql()`DELETE FROM products WHERE id = ${id}`;
    return Response.json({ ok: true });
  } catch (e) {
    console.error('DELETE /api/products error:', e);
    return Response.json({ error: 'Erro ao remover produto' }, { status: 500 });
  }
}
