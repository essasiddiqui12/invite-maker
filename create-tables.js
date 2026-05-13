const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bhnipkxvgzpehdixahwk.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJobmlwa3h2Z3pwZWhkaXhhaHdrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODU5MTYwMywiZXhwIjoyMDk0MTY3NjAzfQ.kx0fSXYGAOo0HTVOkZO63oolS1QB6U9D0utVWLw9x_c';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function createTables() {
  // Create templates table
  const { error: templatesError } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS templates (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        category TEXT,
        image_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `
  });

  if (templatesError) {
    console.log('Creating templates table via direct API...');
  }

  // Try alternative - use rest API to create table
  const response = await fetch(`${supabaseUrl}/rest/v1/`, {
    method: 'POST',
    headers: {
      'apikey': serviceRoleKey,
      'Authorization': `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({
      id: '00000000-0000-0000-0000-000000000001',
      name: 'test',
      category: 'test'
    })
  });

  console.log('Response:', response.status, response.statusText);
}

createTables().catch(console.error);