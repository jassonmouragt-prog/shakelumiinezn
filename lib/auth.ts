import { getSessionUser, type SessionUser } from '@/lib/session';

export async function getAdmin(): Promise<SessionUser | null> {
  const user = await getSessionUser();
  return user && user.role === 'admin' ? user : null;
}

export const UNAUTHORIZED_RESPONSE = Response.json(
  { error: 'Não autorizado' },
  { status: 401 }
);