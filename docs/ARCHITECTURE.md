# Architecture Overview

## System Components
- Frontend: React 18, TypeScript, Vite, Tailwind
- Data/Backend: Supabase (Auth + Postgres with RLS)
- Prompt Engine: Client-side templates + Option B API calls

## Data Flow
1. User authenticates via Supabase Auth
2. Dashboard lists tools from `src/config/tools.json`
3. HybridToolPage loads tool + `prompts.json` template
4. User input + files → compiled optimized template
5. API call using Option B (user API key/base URL)
6. Enhanced output displayed; optional save to DB

## Security
- Supabase RLS (per-user policies)
- Env-based Supabase credentials
- Client-side encryption for user API keys (Option B)

## Files of Interest
- `src/components/HybridToolPage.tsx`
- `src/config/tools.json`, `src/config/prompts.json`
- `src/lib/api.ts`, `src/lib/database.ts`, `src/lib/supabase.ts`
- `supabase/migrations/20250823000000_full_reset.sql`