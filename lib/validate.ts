export function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

export function str(v: unknown, max = 500, opts?: { min?: number }): string | null {
  if (typeof v !== 'string') return null;
  const s = v.trim();
  if (max > 0 && s.length > max) return null;
  if (opts?.min && s.length < opts.min) return null;
  return s;
}

export function num(v: unknown, min = -Infinity, max = Infinity): number | null {
  if (typeof v !== 'number') return null;
  if (!Number.isFinite(v)) return null;
  if (v < min || v > max) return null;
  return v;
}

export function integer(v: unknown, min = 1, max = 100_000): number | null {
  if (typeof v !== 'number') return null;
  if (!Number.isInteger(v)) return null;
  if (v < min || v > max) return null;
  return v;
}

export function bool(v: unknown): boolean | null {
  return typeof v === 'boolean' ? v : null;
}

export function email(v: unknown): string | null {
  const s = str(v, 254, { min: 3 });
  if (!s) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s)) return null;
  return s.toLowerCase();
}

export function phone(v: unknown): string | null {
  const s = str(v, 30, { min: 8 });
  if (!s) return null;
  if (!/^[+()\-.\s\d]{8,30}$/.test(s)) return null;
  return s;
}

export function oneOf<T extends readonly string[]>(v: unknown, allowed: T): T[number] | null {
  return typeof v === 'string' && (allowed as readonly string[]).includes(v) ? (v as T[number]) : null;
}

export function jsonString(v: unknown, maxBytes = 100_000): string | null {
  try {
    const s = JSON.stringify(v);
    if (!s || s.length > maxBytes) return null;
    return s;
  } catch {
    return null;
  }
}