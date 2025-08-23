# Security Policy

## Reporting
Please report vulnerabilities privately via email (see project README).

## Scope
- Client: React app, Option B key handling
- Backend: Supabase schema, RLS policies

## Guidelines
- Do not commit secrets; use `.env`
- User API keys (Option B) are client-encrypted and deletable
- RLS must remain enabled on all tables
- Use HTTPS for all deployments