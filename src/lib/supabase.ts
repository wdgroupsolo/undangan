import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase Environment Variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

// Fallback to dummy values if empty so the app doesn't crash on load
// Note: Database calls will fail until real keys are provided
export const supabase = createClient<any>(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
