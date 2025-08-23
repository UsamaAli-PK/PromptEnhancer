# Supabase Integration Implementation

## Overview
This document describes the Supabase integration and schema for PromptEnhancer, including environment setup, authentication, schema, RLS policies, and reset instructions.

## Environment
- Configure env vars in `.env`:
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```
- The client is initialized from env in `src/lib/supabase.ts`.

## Authentication
- Supabase Auth with session handling in `AuthContext`.
- Profiles are created on first sign-in.
- Protected routes enforce auth.

## Database Schema
Tables (see migration file):
1. `users` (id, email, name, timestamps)
2. `saved_prompts` (prompt content, metadata, timestamps)
3. `user_settings` (preferences, Option B fields: api_key, selected_model, base_url, api_key_name)

Indexes and triggers included for performance and updated_at maintenance.

## Row Level Security
- RLS enabled on all tables.
- Policies ensure each user can only access their own records (select/insert/update/delete scoped by `auth.uid()`).

## Option B (User API Keys)
- User-provided keys are stored (client-side encrypted) in `user_settings.api_key`.
- `base_url` and `selected_model` stored for custom providers.

## Reset / Migrations
- Consolidated migration (idempotent): `supabase/migrations/20250823000000_full_reset.sql`.
- Apply via Supabase SQL editor or CLI.

## Files
- `src/lib/supabase.ts` (env-based client)
- `src/lib/database.ts` (CRUD services)
- `src/contexts/AuthContext.tsx` (auth integration)
- `src/components/HybridToolPage.tsx` (Option B calls, templates)

## Troubleshooting
- Verify env vars are set.
- Ensure RLS is enabled and policies present.
- Run the reset migration if tables/policies are missing.

## Status
- Ready for production with Option B, env-based creds, RLS, and consolidated migration.
