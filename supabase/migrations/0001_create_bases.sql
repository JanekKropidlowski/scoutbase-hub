-- Create table for scout bases (bazy harcerskie)
create table if not exists public.bases (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null,
  image text,
  rating numeric(2,1) default 0 not null,
  price text,
  capacity integer,
  description text,
  featured boolean default false not null,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.bases enable row level security;

-- Read-only access for anonymous users
create policy if not exists "Allow read access for anon" on public.bases
  for select
  to anon
  using (true);

-- Optional: allow authenticated users to insert/update their own entries later
-- For now, keep writes restricted.

-- Basic sample seed (commented - run manually in SQL editor if needed)
-- insert into public.bases (name, location, image, rating, price, capacity, description, featured)
-- values
-- ('Stanica Harcerska Biały Las', 'Warmińsko-mazurskie, Mazury', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4', 4.8, '25 zł/os', 120, 'Stanica nad jeziorem z pomostem i zapleczem kuchennym.', true),
-- ('Baza Obozowa Leśny Zakątek', 'Pomorskie, Kaszuby', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470', 4.5, '30 zł/os', 80, 'Leśna baza z polaną namiotową i sanitariatami.', false),
-- ('Centrum Szkoleniowe Harcerska Dolina', 'Dolnośląskie, Sudety', 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d', 4.9, '35 zł/os', 150, 'Centrum szkoleniowe z zapleczem sal i noclegami.', true);

