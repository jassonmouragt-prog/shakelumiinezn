import { destroySession, getSessionUser } from '@/lib/session';

export async function POST() {
  await destroySession();
  return Response.json({ ok: true });
}

export async function GET() {
  const user = await getSessionUser();
  return Response.json({ user });
}
