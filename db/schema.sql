-- Schema do banco de dados LUMIINE (Neon/Postgres)

-- Volta a depender da ordem; recria do zero se existir
DROP TABLE IF EXISTS stock_movements;
DROP TABLE IF EXISTS reseller_commissions;
DROP TABLE IF EXISTS resellers;
DROP TABLE IF EXISTS loyalty_transactions;
DROP TABLE IF EXISTS loyalty_rewards;
DROP TABLE IF EXISTS loyalty_accounts;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS users;

-- ============================================================
-- USUÁRIOS (autenticação real)
-- ============================================================
CREATE TABLE users (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'customer',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- PRODUTOS
-- ============================================================
CREATE TABLE products (
  id               TEXT PRIMARY KEY,
  slug             TEXT NOT NULL UNIQUE,
  name             TEXT NOT NULL,
  subtitle         TEXT NOT NULL DEFAULT '',
  description      TEXT NOT NULL DEFAULT '',
  price            DOUBLE PRECISION NOT NULL DEFAULT 0,
  promo_price      DOUBLE PRECISION,
  reseller_price   DOUBLE PRECISION NOT NULL DEFAULT 0,
  category         TEXT NOT NULL DEFAULT 'shakes',
  badge            TEXT,
  image            TEXT NOT NULL DEFAULT '',
  gallery          JSONB NOT NULL DEFAULT '[]',
  rating           DOUBLE PRECISION NOT NULL DEFAULT 5,
  reviews_count    INTEGER NOT NULL DEFAULT 0,
  weight           TEXT NOT NULL DEFAULT '',
  servings         INTEGER NOT NULL DEFAULT 1,
  flavors          JSONB NOT NULL DEFAULT '[]',
  ingredients      JSONB NOT NULL DEFAULT '[]',
  nutritional_info JSONB NOT NULL DEFAULT '{}',
  benefits         JSONB NOT NULL DEFAULT '[]',
  stock            INTEGER NOT NULL DEFAULT 0,
  is_featured      BOOLEAN NOT NULL DEFAULT false,
  show_in_showcase BOOLEAN NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- PEDIDOS
-- ============================================================
CREATE TABLE orders (
  id              TEXT PRIMARY KEY,
  code            TEXT NOT NULL,
  customer_name   TEXT NOT NULL,
  customer_email  TEXT NOT NULL,
  customer_phone  TEXT NOT NULL DEFAULT '',
  address         JSONB NOT NULL DEFAULT '{}',
  shipping_method TEXT NOT NULL DEFAULT 'entrega',
  shipping_cost   DOUBLE PRECISION NOT NULL DEFAULT 0,
  payment_method  TEXT NOT NULL DEFAULT 'pix',
  status          TEXT NOT NULL DEFAULT 'pendente',
  subtotal        DOUBLE PRECISION NOT NULL DEFAULT 0,
  discount        DOUBLE PRECISION NOT NULL DEFAULT 0,
  total           DOUBLE PRECISION NOT NULL DEFAULT 0,
  points_earned   INTEGER NOT NULL DEFAULT 0,
  reseller_code   TEXT,
  created_at_ts   TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at_str  TEXT NOT NULL DEFAULT ''
);

CREATE TABLE order_items (
  id            TEXT PRIMARY KEY,
  order_id      TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id    TEXT,
  product_name  TEXT NOT NULL,
  product_image TEXT NOT NULL DEFAULT '',
  price         DOUBLE PRECISION NOT NULL DEFAULT 0,
  promo_price   DOUBLE PRECISION,
  quantity      INTEGER NOT NULL DEFAULT 1,
  selected_flavor TEXT NOT NULL DEFAULT '',
  product_snapshot JSONB NOT NULL DEFAULT '{}',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- PROGRAMA DE FIDELIDADE
-- ============================================================
CREATE TABLE loyalty_accounts (
  id                     TEXT PRIMARY KEY,
  user_name              TEXT NOT NULL DEFAULT '',
  user_email             TEXT NOT NULL DEFAULT '',
  points                 INTEGER NOT NULL DEFAULT 0,
  tier                   TEXT NOT NULL DEFAULT 'Bronze',
  next_tier_points       INTEGER NOT NULL DEFAULT 500,
  total_saved            DOUBLE PRECISION NOT NULL DEFAULT 0,
  referral_code          TEXT NOT NULL DEFAULT '',
  referral_link          TEXT NOT NULL DEFAULT '',
  referral_count         INTEGER NOT NULL DEFAULT 0,
  referral_points_earned INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE loyalty_transactions (
  id         TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES loyalty_accounts(id) ON DELETE CASCADE,
  date       TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  points     INTEGER NOT NULL DEFAULT 0,
  type       TEXT NOT NULL DEFAULT 'credit'
);

CREATE TABLE loyalty_rewards (
  id              TEXT PRIMARY KEY,
  title           TEXT NOT NULL,
  points_required INTEGER NOT NULL,
  discount_value  DOUBLE PRECISION NOT NULL DEFAULT 0,
  description     TEXT NOT NULL DEFAULT '',
  type            TEXT NOT NULL DEFAULT 'discount',
  badge           TEXT
);

-- ============================================================
-- REVENDEDORES
-- ============================================================
CREATE TABLE resellers (
  id                  TEXT PRIMARY KEY,
  name                TEXT NOT NULL,
  document            TEXT NOT NULL DEFAULT '',
  email               TEXT NOT NULL,
  phone               TEXT NOT NULL DEFAULT '',
  city                TEXT NOT NULL DEFAULT '',
  state               TEXT NOT NULL DEFAULT '',
  instagram           TEXT NOT NULL DEFAULT '',
  activity_type       TEXT NOT NULL DEFAULT '',
  sales_experience    TEXT NOT NULL DEFAULT '',
  discovery_source    TEXT NOT NULL DEFAULT '',
  notes               TEXT,
  status              TEXT NOT NULL DEFAULT 'pendente',
  referral_code       TEXT NOT NULL DEFAULT '',
  total_sales         DOUBLE PRECISION NOT NULL DEFAULT 0,
  total_orders        INTEGER NOT NULL DEFAULT 0,
  total_commission    DOUBLE PRECISION NOT NULL DEFAULT 0,
  pending_commission  DOUBLE PRECISION NOT NULL DEFAULT 0,
  approved_commission DOUBLE PRECISION NOT NULL DEFAULT 0,
  paid_commission     DOUBLE PRECISION NOT NULL DEFAULT 0,
  registered_at       TEXT NOT NULL DEFAULT ''
);

CREATE TABLE reseller_commissions (
  id              TEXT PRIMARY KEY,
  order_id        TEXT NOT NULL DEFAULT '',
  order_code      TEXT NOT NULL DEFAULT '',
  date            TEXT NOT NULL DEFAULT '',
  customer_name   TEXT NOT NULL DEFAULT '',
  order_value     DOUBLE PRECISION NOT NULL DEFAULT 0,
  commission_rate DOUBLE PRECISION NOT NULL DEFAULT 0,
  commission_value DOUBLE PRECISION NOT NULL DEFAULT 0,
  status          TEXT NOT NULL DEFAULT 'pendente'
);

-- ============================================================
-- DESPESAS
-- ============================================================
CREATE TABLE expenses (
  id          TEXT PRIMARY KEY,
  description TEXT NOT NULL DEFAULT '',
  category    TEXT NOT NULL DEFAULT 'Operacional',
  amount      DOUBLE PRECISION NOT NULL DEFAULT 0,
  date        TEXT NOT NULL DEFAULT '',
  status      TEXT NOT NULL DEFAULT 'pago',
  notes       TEXT
);

-- ============================================================
-- MOVIMENTAÇÕES DE ESTOQUE
-- ============================================================
CREATE TABLE stock_movements (
  id           TEXT PRIMARY KEY,
  product_id   TEXT NOT NULL,
  product_name TEXT NOT NULL DEFAULT '',
  type         TEXT NOT NULL DEFAULT 'entrada',
  quantity     INTEGER NOT NULL DEFAULT 0,
  reason       TEXT NOT NULL DEFAULT '',
  date         TEXT NOT NULL DEFAULT '',
  responsible  TEXT NOT NULL DEFAULT ''
);
