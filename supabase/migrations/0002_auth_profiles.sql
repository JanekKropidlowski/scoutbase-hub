-- profiles table linked to auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  role text default 'user' not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS
alter table public.profiles enable row level security;

-- Anyone can read profiles (public info)
create policy if not exists "profiles_read_all" on public.profiles
  for select using (true);

-- Users can view and update own profile
create policy if not exists "profiles_update_own" on public.profiles
  for update
  using (auth.uid() = id);

create policy if not exists "profiles_insert_self" on public.profiles
  for insert with check (auth.uid() = id);

-- Optional admin role via email list handled on client for now.

-- trigger to update updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();