# AquaOps

Water Factory Management App — helps water factory owners track production, sales, expenses, debts, and profit in one operational dashboard.

## Run & Operate

- Workflow: `artifacts/aquaops: web` — starts the Vite dev server
- `pnpm --filter @workspace/aquaops run dev` — run the frontend manually
- Required secrets: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` — Supabase project credentials

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite (artifacts/aquaops)
- Auth & DB: Supabase (external)
- UI: Tailwind CSS v4 + shadcn/ui components
- Routing: wouter
- State: Zustand (store.ts)

## Where things live

- `artifacts/aquaops/src/components/` — all UI components
  - `aquaops-entry.tsx` — landing/auth entry screen
  - `water-factory-app.tsx` — main app shell with tab routing
  - `screens/` — dashboard, production, sales, expenses, debts, reports, etc.
- `artifacts/aquaops/src/lib/` — Supabase client, auth helpers, subscription logic
- `artifacts/aquaops/src/contexts/AuthContext.tsx` — global auth state
- `artifacts/aquaops/src/index.css` — Tailwind v4 theme tokens

## Architecture decisions

- **Supabase for auth and data**: All user data, factories, subscriptions live in Supabase. No local DB is used.
- **Client-side only**: Fully client-rendered Vite app — no SSR. Auth state via Supabase `onAuthStateChange`.
- **Tab-based navigation**: The main app uses a `activeTab` state (not URL routing) for screen switching within the authenticated shell.
- **Null-safe supabase client**: The supabase client returns `null` if env vars are missing — all callers must null-check before use.

## Product

AquaOps is a Water Factory Management App for small-to-medium water bottling/sachet businesses. Key features:
- Dashboard with daily profit/sales/expense summary
- Production tracking (sachets, bottles produced)
- Sales logging and customer management
- Expense and debt tracking
- Bank account management
- Reports with export
- Admin panel for subscription management
- Trial/subscription system (60-day trial, then paid plans)

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` must be set in Replit secrets for auth to work
- The original app used `NEXT_PUBLIC_SUPABASE_*` — these have been renamed to `VITE_SUPABASE_*`
- Supabase client is `null` when env vars are missing — all lib files null-check before use

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
