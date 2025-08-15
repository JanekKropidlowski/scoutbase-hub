-- Create user_profiles table
create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  phone text,
  organization text,
  role text default 'user' check (role in ('user', 'admin', 'moderator')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create reviews table
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  base_id uuid not null references public.bases(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create reservations table
create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  base_id uuid not null references public.bases(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  start_date date not null,
  end_date date not null,
  guests_count integer not null check (guests_count > 0),
  status text default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  total_price numeric(10,2) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  special_requests text
);

-- Update bases table with new fields
alter table public.bases 
add column if not exists owner_id uuid references auth.users(id),
add column if not exists contact_email text,
add column if not exists contact_phone text,
add column if not exists amenities text[],
add column if not exists coordinates jsonb;

-- Enable Row Level Security on all tables
alter table public.user_profiles enable row level security;
alter table public.reviews enable row level security;
alter table public.reservations enable row level security;

-- User profiles policies
create policy "Users can view their own profile" on public.user_profiles
  for select using (auth.uid() = id);

create policy "Users can update their own profile" on public.user_profiles
  for update using (auth.uid() = id);

create policy "Admins can view all profiles" on public.user_profiles
  for select using (
    exists (
      select 1 from public.user_profiles 
      where id = auth.uid() and role in ('admin', 'moderator')
    )
  );

-- Reviews policies
create policy "Anyone can view reviews" on public.reviews
  for select using (true);

create policy "Authenticated users can create reviews" on public.reviews
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own reviews" on public.reviews
  for update using (auth.uid() = user_id);

create policy "Users can delete their own reviews" on public.reviews
  for delete using (auth.uid() = user_id);

-- Reservations policies
create policy "Users can view their own reservations" on public.reservations
  for select using (auth.uid() = user_id);

create policy "Users can create reservations" on public.reservations
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own reservations" on public.reservations
  for update using (auth.uid() = user_id);

create policy "Admins can view all reservations" on public.reservations
  for select using (
    exists (
      select 1 from public.user_profiles 
      where id = auth.uid() and role in ('admin', 'moderator')
    )
  );

-- Update bases policies
drop policy if exists "Allow read access for anon" on public.bases;
create policy "Anyone can view bases" on public.bases
  for select using (true);

create policy "Authenticated users can create bases" on public.bases
  for insert with check (auth.uid() is not null);

create policy "Users can update their own bases" on public.bases
  for update using (auth.uid() = owner_id);

create policy "Admins can update any base" on public.bases
  for update using (
    exists (
      select 1 from public.user_profiles 
      where id = auth.uid() and role in ('admin', 'moderator')
    )
  );

-- Create indexes for better performance
create index if not exists idx_reviews_base_id on public.reviews(base_id);
create index if not exists idx_reviews_user_id on public.reviews(user_id);
create index if not exists idx_reservations_base_id on public.reservations(base_id);
create index if not exists idx_reservations_user_id on public.reservations(user_id);
create index if not exists idx_reservations_dates on public.reservations(start_date, end_date);
create index if not exists idx_bases_owner_id on public.bases(owner_id);
create index if not exists idx_bases_featured on public.bases(featured);

-- Create function to handle user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user creation
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();