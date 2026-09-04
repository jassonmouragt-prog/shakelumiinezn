import { neon } from '@neondatabase/serverless';

const globalForDb = globalThis as unknown as {
  sql?: ReturnType<typeof neon>;
};

export function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      'DATABASE_URL não configurado. Adicione a connection string do Neon em .env.local'
    );
  }
  if (!globalForDb.sql) {
    globalForDb.sql = neon(process.env.DATABASE_URL);
  }
  return globalForDb.sql;
}
