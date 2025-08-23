# Deployment Guide

## Prerequisites
- Node.js 18+
- Supabase project (URL + anon key)

## Environment
Copy `.env.example` to `.env` and set:
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Build
```
npm ci
npm run build
```
Artifacts are in `dist/`.

## Hosting
- Any static host (Netlify, Vercel, Cloudflare Pages, S3/CloudFront)
- Set proper cache headers and fallback to `index.html` for SPA routing.

## Supabase
- Run the SQL from `supabase/migrations/20250823000000_full_reset.sql` once.
- Verify RLS policies and indexes.

## Option B Notes
- Users add API key + base URL in Profile.
- Org keys in env are optional for development only.