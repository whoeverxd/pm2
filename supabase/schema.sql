create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  message text not null,
  source text not null default 'whatsapp_drawer',
  status text not null default 'new',
  whatsapp_opened boolean not null default false,
  user_agent text,
  ip text,
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_phone_idx on public.leads (phone);