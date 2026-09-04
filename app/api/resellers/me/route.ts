import { getSessionUser } from '@/lib/session';
import { getSql } from '@/lib/db';
import { resellerFromRow } from '@/lib/resellers';

export async function GET() {
  const user = await getSessionUser();
  if (!user || user.role !== 'revendedor') {
    return Response.json({ reseller: null }, { status: 401 });
  }

  try {
    const rows = (await getSql()`
      SELECT * FROM resellers WHERE email = ${user.email} LIMIT 1
    `) as unknown as any[];
    if (rows.length === 0) {
      return Response.json({ reseller: null, user }, { status: 404 });
    }
    return Response.json({ reseller: resellerFromRow(rows[0]), user });
  } catch (e) {
    console.error('GET /api/resellers/me error:', e);
    return Response.json({ error: 'Erro ao buscar perfil' }, { status: 500 });
  }
}