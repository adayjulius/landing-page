import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Allowed specific emails — add any email that should have access
const ALLOWED_EMAILS = [
  "stlaf.itdep@gmail.com"
];

export const isAllowedEmail = (email) => {
  if (!email) return false;
  const lower = email.toLowerCase().trim();

  // Check exact whitelist first
  if (ALLOWED_EMAILS.includes(lower)) return true;

  // Check if "stlaf" appears anywhere in the local part (before @)
  const localPart = lower.split('@')[0];
  return localPart.includes('stlaf');
};