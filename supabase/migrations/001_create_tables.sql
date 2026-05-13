-- Create templates table
CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create invitations table
CREATE TABLE IF NOT EXISTS invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID REFERENCES templates(id),
  title TEXT NOT NULL,
  event_date TIMESTAMPTZ,
  location TEXT,
  message TEXT,
  guest_name TEXT,
  guest_email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

-- Create public access policies
CREATE POLICY "Templates are viewable by everyone" ON templates FOR SELECT USING (true);
CREATE POLICY "Invitations are viewable by everyone" ON invitations FOR SELECT USING (true);

-- Insert sample templates
INSERT INTO templates (name, category, image_url) VALUES
  ('Birthday Party', 'birthday', 'https://images.unsplash.com/photo-1530103862676-de3c9a59af38?w=400'),
  ('Wedding', 'wedding', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400'),
  ('Baby Shower', 'baby', 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400'),
  ('Graduation', 'graduation', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400'),
  ('Corporate Event', 'corporate', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400');