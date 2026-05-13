-- Fix 1: Add missing INSERT policy so unauthenticated users can create invitations
CREATE POLICY "Anyone can create invitations" ON invitations FOR INSERT WITH CHECK (true);

-- Fix 2: Add missing columns to match what the app actually inserts
-- (the original migration used template_id UUID FK and TIMESTAMPTZ for event_date,
--  but the app stores template as text and splits date/time into separate fields)
ALTER TABLE invitations
  ADD COLUMN IF NOT EXISTS template TEXT,
  ADD COLUMN IF NOT EXISTS host_name TEXT,
  ADD COLUMN IF NOT EXISTS event_time TEXT;

-- Widen event_date to TEXT so the app's date string ("2025-06-01") stores cleanly
-- Only do this if the column is still TIMESTAMPTZ
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'invitations'
      AND column_name = 'event_date'
      AND data_type = 'timestamp with time zone'
  ) THEN
    ALTER TABLE invitations ALTER COLUMN event_date TYPE TEXT USING event_date::TEXT;
  END IF;
END $$;
