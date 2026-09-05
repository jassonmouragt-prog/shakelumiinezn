#!/usr/bin/env node
// Migração incremental do banco LUMIINE (Neon/Postgres).
// Uso: node --env-file=.env.local db/migrate.mjs
// Executa apenas statements não destrutivos (CREATE TABLE IF NOT EXISTS etc.)
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL não configurado. Crie .env.local com a connection string do Neon.');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

const statements = [
  `CREATE TABLE IF NOT EXISTS rate_limits (
    key          TEXT NOT NULL,
    window_start BIGINT NOT NULL,
    count        INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY (key, window_start)
  )`,
  `CREATE INDEX IF NOT EXISTS idx_rate_limits_window ON rate_limits (window_start)`
];

async function main() {
  for (const stmt of statements) {
    try {
      await sql.query(stmt.replace(/\s+/g, ' ').trim());
      console.log('OK:', stmt.replace(/\s+/g, ' ').trim().slice(0, 90));
    } catch (e) {
      console.warn('SKIPPED:', e?.message?.slice(0, 120));
    }
  }
  console.log('Migração concluída.');
}

main().catch((e) => {
  console.error('Falha na migração:', e);
  process.exit(1);
});