-- Run this in Supabase → SQL Editor → New query → Run

create table if not exists public.snippets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  language text default 'text',
  code text not null,
  slug text not null unique,
  is_public boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists snippets_public_idx on public.snippets (is_public, created_at desc);
create index if not exists snippets_user_idx on public.snippets (user_id);

-- Enable Row Level Security
alter table public.snippets enable row level security;

-- Anyone (even logged out) can read PUBLIC snippets
create policy "public snippets are readable"
  on public.snippets for select
  using (is_public = true);

-- Owners can read all their own snippets
create policy "owners read own"
  on public.snippets for select
  using (auth.uid() = user_id);

-- Owners can insert their own snippets
create policy "owners insert own"
  on public.snippets for insert
  with check (auth.uid() = user_id);

-- Owners can update their own snippets
create policy "owners update own"
  on public.snippets for update
  using (auth.uid() = user_id);

-- Owners can delete their own snippets
create policy "owners delete own"
  on public.snippets for delete
  using (auth.uid() = user_id);
