-- ============================================================
-- AquaOps: CustomerOps Module — Phase 1 Migration
-- Run in: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Factory code prefix
ALTER TABLE factories
  ADD COLUMN IF NOT EXISTS customer_code_prefix TEXT DEFAULT 'AQF';

-- 2. Customer code sequence counter
CREATE TABLE IF NOT EXISTS customer_code_sequences (
  factory_id  UUID PRIMARY KEY REFERENCES factories(id) ON DELETE CASCADE,
  next_seq    INTEGER NOT NULL DEFAULT 1
);

-- 3. Core customers table
CREATE TABLE IF NOT EXISTS customers (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  factory_id          UUID        NOT NULL REFERENCES factories(id) ON DELETE CASCADE,
  factory_code        TEXT        NOT NULL,
  universal_id        TEXT,
  name                TEXT        NOT NULL,
  phone               TEXT,
  area                TEXT,
  address             TEXT,
  gps_lat             DECIMAL(10,7),
  gps_lng             DECIMAL(10,7),
  location_source     TEXT,
  location_updated_at TIMESTAMPTZ,
  customer_source     TEXT        NOT NULL DEFAULT 'walk_in',
  customer_type       TEXT        NOT NULL DEFAULT 'household',
  notes               TEXT,
  is_active           BOOLEAN     NOT NULL DEFAULT true,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_customers_factory_id   ON customers(factory_id);
CREATE INDEX IF NOT EXISTS idx_customers_phone        ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_customers_factory_code ON customers(factory_code);
CREATE INDEX IF NOT EXISTS idx_customers_universal_id ON customers(universal_id);

-- 4. RLS on customers
ALTER TABLE customers               ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_code_sequences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "factory_users_select_customers" ON customers;
DROP POLICY IF EXISTS "factory_users_insert_customers" ON customers;
DROP POLICY IF EXISTS "factory_users_update_customers" ON customers;
DROP POLICY IF EXISTS "factory_users_delete_customers" ON customers;
DROP POLICY IF EXISTS "factory_users_seq"              ON customer_code_sequences;

-- All active factory_users can read
CREATE POLICY "factory_users_select_customers" ON customers
  FOR SELECT USING (
    factory_id IN (
      SELECT factory_id FROM factory_users
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

-- Only owners can write
CREATE POLICY "factory_users_insert_customers" ON customers
  FOR INSERT WITH CHECK (
    factory_id IN (
      SELECT factory_id FROM factory_users
      WHERE user_id = auth.uid() AND is_active = true AND role = 'owner'
    )
  );

CREATE POLICY "factory_users_update_customers" ON customers
  FOR UPDATE USING (
    factory_id IN (
      SELECT factory_id FROM factory_users
      WHERE user_id = auth.uid() AND is_active = true AND role = 'owner'
    )
  );

CREATE POLICY "factory_users_delete_customers" ON customers
  FOR DELETE USING (
    factory_id IN (
      SELECT factory_id FROM factory_users
      WHERE user_id = auth.uid() AND is_active = true AND role = 'owner'
    )
  );

-- Sequence table: all active users can read/update (needed for code gen)
CREATE POLICY "factory_users_seq" ON customer_code_sequences
  USING (
    factory_id IN (
      SELECT factory_id FROM factory_users
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

-- 5. Atomic sequence increment function
DROP FUNCTION IF EXISTS increment_customer_sequence(UUID);
CREATE FUNCTION increment_customer_sequence(p_factory_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_seq INTEGER;
BEGIN
  INSERT INTO customer_code_sequences (factory_id, next_seq)
  VALUES (p_factory_id, 1)
  ON CONFLICT (factory_id) DO NOTHING;

  UPDATE customer_code_sequences
  SET next_seq = next_seq + 1
  WHERE factory_id = p_factory_id
  RETURNING next_seq - 1 INTO v_seq;

  RETURN v_seq;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Link sales to customers (nullable, no data migration)
ALTER TABLE sales
  ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES customers(id);

CREATE INDEX IF NOT EXISTS idx_sales_customer_id ON sales(customer_id);

-- 7. Customer events table (created now, populated in Phase 2)
CREATE TABLE IF NOT EXISTS customer_events (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  factory_id  UUID        NOT NULL REFERENCES factories(id) ON DELETE CASCADE,
  customer_id UUID        NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  event_type  TEXT        NOT NULL,
  actor_id    UUID        REFERENCES auth.users(id),
  event_date  DATE        NOT NULL DEFAULT CURRENT_DATE,
  notes       TEXT,
  metadata    JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_customer_events_customer ON customer_events(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_events_factory  ON customer_events(factory_id);

ALTER TABLE customer_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "factory_users_customer_events" ON customer_events;
CREATE POLICY "factory_users_customer_events" ON customer_events
  USING (
    factory_id IN (
      SELECT factory_id FROM factory_users
      WHERE user_id = auth.uid() AND is_active = true
    )
  );

-- ============================================================
-- DONE — verify with:
-- SELECT table_name FROM information_schema.tables
-- WHERE table_schema = 'public'
-- AND table_name IN ('customers','customer_events','customer_code_sequences');
-- ============================================================
