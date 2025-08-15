-- Enhanced Authentication and CMS System Migration

-- Create custom user profiles table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  role text default 'user' check (role in ('user', 'admin', 'moderator')),
  scout_group text,
  phone text,
  bio text,
  is_verified boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create user preferences table
create table if not exists public.user_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  theme text default 'light' check (theme in ('light', 'dark', 'system')),
  language text default 'pl' check (language in ('pl', 'en')),
  email_notifications boolean default true,
  push_notifications boolean default true,
  marketing_emails boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enhanced bases table with more CMS features
alter table public.bases add column if not exists amenities text[];
alter table public.bases add column if not exists contact_email text;
alter table public.bases add column if not exists contact_phone text;
alter table public.bases add column if not exists website text;
alter table public.bases add column if not exists status text default 'active' check (status in ('active', 'inactive', 'pending'));
alter table public.bases add column if not exists owner_id uuid references public.profiles(id);
alter table public.bases add column if not exists updated_at timestamptz not null default now();

-- Create reviews table
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  base_id uuid references public.bases(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  rating integer check (rating >= 1 and rating <= 5) not null,
  title text,
  content text not null,
  images text[],
  status text default 'published' check (status in ('draft', 'published', 'hidden')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create content management tables
create table if not exists public.cms_pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  content jsonb not null,
  meta_title text,
  meta_description text,
  status text default 'draft' check (status in ('draft', 'published', 'archived')),
  author_id uuid references public.profiles(id) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create media library table
create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  filename text not null,
  original_name text not null,
  mime_type text not null,
  size_bytes bigint not null,
  url text not null,
  alt_text text,
  uploaded_by uuid references public.profiles(id) not null,
  created_at timestamptz not null default now()
);

-- Create notifications table
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  message text not null,
  type text default 'info' check (type in ('info', 'success', 'warning', 'error')),
  read boolean default false,
  action_url text,
  created_at timestamptz not null default now()
);

-- Create audit log table
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id),
  action text not null,
  table_name text not null,
  record_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security on all tables
alter table public.profiles enable row level security;
alter table public.user_preferences enable row level security;
alter table public.reviews enable row level security;
alter table public.cms_pages enable row level security;
alter table public.media enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_logs enable row level security;

-- Create RLS policies for profiles
create policy "Users can view all profiles" on public.profiles
  for select to authenticated using (true);

create policy "Users can update own profile" on public.profiles
  for update to authenticated using (auth.uid() = id);

create policy "Enable insert for authenticated users only" on public.profiles
  for insert to authenticated with check (auth.uid() = id);

-- Create RLS policies for user preferences
create policy "Users can manage own preferences" on public.user_preferences
  for all to authenticated using (user_id = auth.uid());

-- Create RLS policies for reviews
create policy "Anyone can view published reviews" on public.reviews
  for select using (status = 'published');

create policy "Users can manage own reviews" on public.reviews
  for all to authenticated using (user_id = auth.uid());

create policy "Admins can manage all reviews" on public.reviews
  for all to authenticated using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role in ('admin', 'moderator')
    )
  );

-- Create RLS policies for CMS pages
create policy "Anyone can view published pages" on public.cms_pages
  for select using (status = 'published');

create policy "Authors can manage own pages" on public.cms_pages
  for all to authenticated using (author_id = auth.uid());

create policy "Admins can manage all pages" on public.cms_pages
  for all to authenticated using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

-- Create RLS policies for media
create policy "Anyone can view media" on public.media
  for select using (true);

create policy "Authenticated users can upload media" on public.media
  for insert to authenticated with check (uploaded_by = auth.uid());

create policy "Users can manage own media" on public.media
  for all to authenticated using (uploaded_by = auth.uid());

-- Create RLS policies for notifications
create policy "Users can view own notifications" on public.notifications
  for select to authenticated using (user_id = auth.uid());

create policy "Users can update own notifications" on public.notifications
  for update to authenticated using (user_id = auth.uid());

-- Create RLS policies for audit logs
create policy "Admins can view audit logs" on public.audit_logs
  for select to authenticated using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

-- Update bases policies for enhanced features
drop policy if exists "Allow read access for anon" on public.bases;

create policy "Anyone can view active bases" on public.bases
  for select using (status = 'active');

create policy "Owners can manage own bases" on public.bases
  for all to authenticated using (owner_id = auth.uid());

create policy "Admins can manage all bases" on public.bases
  for all to authenticated using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role in ('admin', 'moderator')
    )
  );

-- Create functions for automatic profile creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  
  insert into public.user_preferences (user_id)
  values (new.id);
  
  return new;
end;
$$;

-- Create trigger for new user registration
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create function for updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Create triggers for updated_at timestamps
create trigger handle_updated_at before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.user_preferences
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.bases
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.reviews
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.cms_pages
  for each row execute procedure public.handle_updated_at();

-- Create indexes for better performance
create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists profiles_email_idx on public.profiles(email);
create index if not exists bases_status_idx on public.bases(status);
create index if not exists bases_owner_idx on public.bases(owner_id);
create index if not exists reviews_base_idx on public.reviews(base_id);
create index if not exists reviews_user_idx on public.reviews(user_id);
create index if not exists reviews_status_idx on public.reviews(status);
create index if not exists cms_pages_slug_idx on public.cms_pages(slug);
create index if not exists cms_pages_status_idx on public.cms_pages(status);
create index if not exists notifications_user_idx on public.notifications(user_id);
create index if not exists notifications_read_idx on public.notifications(read);