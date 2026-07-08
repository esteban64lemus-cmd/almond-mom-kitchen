import { createBrowserClient } from "@supabase/ssr";

// Placeholder fallbacks keep `next build` from crashing when env vars are
// absent (e.g. prerendering on a fresh Vercel project); real values must be
// set in the environment for auth to work at runtime.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "placeholder-anon-key";

export const createClient = () => createBrowserClient(supabaseUrl, supabaseKey);
