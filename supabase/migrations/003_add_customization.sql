-- Add customization column to store user design preferences
ALTER TABLE invitations ADD COLUMN IF NOT EXISTS customization JSONB;
