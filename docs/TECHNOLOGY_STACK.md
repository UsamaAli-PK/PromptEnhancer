# Technology Stack

## Frontend
- React 18
- TypeScript 5
- Vite 5
- Tailwind CSS 3
- React Router DOM 7

## Services/Libraries
- Supabase JS client
- ESLint + TypeScript ESLint

## Config
- `vite.config.ts` with React plugin
- `tsconfig.app.json` with `resolveJsonModule`
- Tailwind `content` globs for src and index.html

## Data & Auth
- Supabase Auth (JWT)
- Postgres with RLS and policies

## Build & Deploy
- Production build via `npm run build` outputs `dist/`
- Environment via `.env` based Vite variables