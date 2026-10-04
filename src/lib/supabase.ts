import { createClient, SupabaseClient } from '@supabase/supabase-js';

// URL e chave vêm EXCLUSIVAMENTE do .env (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).
// A chave "anon" é pública por design; a segurança real fica nas políticas RLS do banco.
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined) || '';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl.startsWith('https://') &&
  supabaseAnonKey.length > 20 &&
  !supabaseAnonKey.includes('placeholder')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true }
    })
  : null;

export const SUPABASE_PROJECT_URL = supabaseUrl;
