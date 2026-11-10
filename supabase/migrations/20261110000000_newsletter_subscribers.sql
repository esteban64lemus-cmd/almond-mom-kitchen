-- Soft revenue email capture for mission / journal / welcome.
create table if not exists public.newsletter_subscribers (
  email text primary key,
  source text,
  subscribed_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

-- Public signup path uses the anon key via the Next.js API route.
-- Inserts are allowed; reads remain locked down for service/admin use.
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'newsletter_subscribers'
      and policyname = 'Allow anon newsletter upsert'
  ) then
    create policy "Allow anon newsletter upsert"
      on public.newsletter_subscribers
      for insert
      to anon, authenticated
      with check (true);
  end if;
end $$;
