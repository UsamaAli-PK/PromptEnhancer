-- Full reset and upgraded schema for PromptEnhancer
-- Safe to run multiple times (idempotent)

-- Extensions (if needed)
create extension if not exists pgcrypto;

-- 1) USERS TABLE
create table if not exists users (
	id uuid primary key references auth.users(id) on delete cascade,
	email text unique not null,
	name text not null,
	created_at timestamptz default now(),
	updated_at timestamptz default now()
);

-- 2) SAVED_PROMPTS TABLE
create table if not exists saved_prompts (
	id uuid primary key default gen_random_uuid(),
	user_id uuid not null references users(id) on delete cascade,
	title text not null,
	input_text text not null,
	enhanced_text text not null,
	tool_type text not null,
	provider text not null,
	model text not null,
	tone text not null default 'professional',
	output_format text not null default 'text',
	file_attachments text[],
	tags text[] default '{}',
	created_at timestamptz default now(),
	updated_at timestamptz default now()
);

-- 3) USER_SETTINGS TABLE
create table if not exists user_settings (
	id uuid primary key default gen_random_uuid(),
	user_id uuid unique not null references users(id) on delete cascade,
	default_provider text default 'OpenAI',
	default_model text default 'GPT-4',
	default_tone text default 'professional',
	email_notifications boolean default true,
	theme text default 'light',
	-- Option B: user-provided API details (client-side encrypted before storage)
	api_key text,
	selected_model text default 'gpt-4',
	base_url text default 'https://api.aimlapi.com/v1',
	api_key_name text,
	created_at timestamptz default now(),
	updated_at timestamptz default now()
);

-- URL format constraint for base_url
do $$
begin
	if not exists (
		select 1 from information_schema.table_constraints
		where constraint_name = 'user_settings_base_url_format'
	) then
		alter table user_settings
		add constraint user_settings_base_url_format
		check (base_url ~ '^https?://[^\s/$.?#].[^\s]*$');
	end if;
end $$;

-- Indexes
create index if not exists idx_saved_prompts_user_id on saved_prompts(user_id);
create index if not exists idx_saved_prompts_created_at on saved_prompts(created_at desc);
create index if not exists idx_saved_prompts_tool_type on saved_prompts(tool_type);
create index if not exists idx_user_settings_user_id on user_settings(user_id);

-- Updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
	new.updated_at = now();
	return new;
end;
$$ language plpgsql;

-- Triggers
create trigger update_users_updated_at
	before update on users
	for each row
	execute function update_updated_at_column();

create trigger update_saved_prompts_updated_at
	before update on saved_prompts
	for each row
	execute function update_updated_at_column();

create trigger update_user_settings_updated_at
	before update on user_settings
	for each row
	execute function update_updated_at_column();

-- Enable RLS
alter table users enable row level security;
alter table saved_prompts enable row level security;
alter table user_settings enable row level security;

-- Policies: USERS
create policy "Users can read own profile" on users
	for select to authenticated using (auth.uid() = id);

create policy "Users can update own profile" on users
	for update to authenticated using (auth.uid() = id);

create policy "Users can insert own profile" on users
	for insert to authenticated with check (auth.uid() = id);

-- Policies: SAVED_PROMPTS
create policy "Users can read own prompts" on saved_prompts
	for select to authenticated using (auth.uid() = user_id);

create policy "Users can insert own prompts" on saved_prompts
	for insert to authenticated with check (auth.uid() = user_id);

create policy "Users can update own prompts" on saved_prompts
	for update to authenticated using (auth.uid() = user_id);

create policy "Users can delete own prompts" on saved_prompts
	for delete to authenticated using (auth.uid() = user_id);

-- Policies: USER_SETTINGS
create policy "Users can read own settings" on user_settings
	for select to authenticated using (auth.uid() = user_id);

create policy "Users can insert own settings" on user_settings
	for insert to authenticated with check (auth.uid() = user_id);

create policy "Users can update own settings" on user_settings
	for update to authenticated using (auth.uid() = user_id);

-- Seed defaults helper (optional, safe no-op if exists)
-- call this manually if needed:
-- insert into user_settings (user_id) 
-- select id from users u
-- where not exists (select 1 from user_settings s where s.user_id = u.id);