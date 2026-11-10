-- Soft revenue email capture for mission / journal / welcome.
-- Writes go through the Next.js API route only. No anon PostgREST INSERT policy:
-- that would let the public publishable key bypass email/source validation.

create table if not exists public.newsletter_subscribers (
  email text primary key,
  source text check (source is null or char_length(source) <= 80),
  subscribed_at timestamptz not null default now(),
  constraint newsletter_subscribers_email_format
    check (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$')
);

alter table public.newsletter_subscribers enable row level security;

-- Intentionally no anon/authenticated insert policies.
-- Use the service role from the server API (or run inserts as a privileged role).
