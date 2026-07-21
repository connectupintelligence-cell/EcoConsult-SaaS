import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xjbvtfydakyvayikrxjq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqYnZ0ZnlkYWt5dmF5aWtyeGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2MTU0ODEsImV4cCI6MjEwMDE5MTQ4MX0.u7Qxq8L-PVC1g7Wn0bdg8B4y6WNKngDaKFi47FLpULY';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseAnonKey.includes('placeholder') && 
  supabaseAnonKey.length > 20
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const SUPABASE_PROJECT_URL = supabaseUrl;
