import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xjbvtfydakyvayikrxjq.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqYnZ0ZnlkYWt5dmF5aWtyeGpxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDYxNTQ4MSwiZXhwIjoyMTAwMTkxNDgxfQ.AVElcYIaYOGJTye572ZAQbA7qhz8nKkAL_zGZLe4CrM';

const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_KEY);

async function checkRLS() {
  const { data, error } = await supabaseAdmin.rpc('exec_sql', { query: "select tablename, rowsecurity from pg_tables where schemaname = 'public';" });
  if (error) {
    console.log("Não é possível rodar SQL direto por RPC sem a função criada. Vou usar fetch na API rest.");
  }
}
checkRLS();
