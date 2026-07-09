---
name: h2ohub-auth-rls
description: Apply h2ohub-next's authorization model — one layout auth gate, RLS as the boundary, explicit checks only around the admin client. Use when touching protected routes, permission checks, RLS policies, tenant views, or any service-role/admin client code.
---

# H2OHub Auth And RLS

## Use When
- adding or reviewing pages/actions under `app/(protected)/`
- reading the current user or checking permissions in server or client code
- writing RLS policies, migrations, or views over tenant tables
- writing or auditing code that uses the service-role/admin client (`createAdminClient`)

## Workflow
1. Respect the single auth gate: `app/(protected)/layout.tsx` calls `await handleIsAuthenticated()` (from `@/utils/auth/auth`; redirects to `/login`) once for all nested routes. Never add that call to a page under `(protected)/`. Done when the diff contains no `handleIsAuthenticated()` outside the layout.
2. Fetch identity and permissions through the sanctioned entry points. Server: `getUser()` from `@/features/auth/queries`; `getPermissionContext()` / `requirePermissionContext()` from `@/lib/permissions/server`; `hasPermission()` from `@/lib/permissions/abac`; permission constants in `lib/permissions/permissions.ts` (`PERMISSIONS`). Client: `useUser()` / `usePermissions()` from `features/auth/hooks` (hydrated by the layout). Done when the diff adds no direct `supabase.auth.getUser()` call outside `features/auth/` and `lib/permissions/` (legacy direct calls exist; do not add more).
3. Let RLS authorize user-scoped data access (ADR-0002). Feature queries/mutations run on `getSupabaseInstance()` (user-scoped), so do NOT duplicate TypeScript permission checks on them — to judge a mutation's authorization, read which client it uses, not whether an inline check exists. Done when user-scoped mutations carry no redundant TS check and admin-scoped code is handled by step 4.
4. Gate every admin-client use. Any call site of `createAdminClient()` (from `@/utils/supabase/server`) MUST have an explicit server-side permission check before the client is created — pattern: `app/(protected)/projecten/madaster/actions.tsx` checks `getPermissionContext()` + a permission helper and returns an error result on failure. This also applies after SSO login: a valid session is not an authorization grant. Done when every `createAdminClient` call site in the diff has an upstream check in the same action.
5. Keep RLS coverage complete on schema changes. Every new table gets RLS enabled and four separate policies (never `FOR ALL`) named `"{action} on {table} for {role}"`, each with a `TO` clause and auth functions wrapped as `(select auth.uid())`; SELECT/DELETE use `USING`, INSERT uses `WITH CHECK`, UPDATE uses both. No unintended `USING (true)` on tenant data. Done when each new table has all four policies and the migration applies via `pnpm db:reset`.
6. Treat views as an RLS escape hatch. A view over tenant tables MUST be created `WITH (security_invoker = true)` in a hand-written migration — never regenerate it via `supabase db diff` (it drops the option and grants) — and guard it with a pgTAP test like `supabase/tests/rides_view_security.test.sql`. Done when the migration sets `security_invoker` and a pgTAP test covers the view.

## Tools And Sources
- ADR: `docs/adr/0002-rls-is-the-authorization-boundary.md` (the boundary decision and its consequences)
- Enforced editor rules: `.cursor/rules/06-protected-auth.mdc` (layout gate), `.cursor/rules/08-rls-policies.mdc` (policy structure, performance, naming)
- Code: `app/(protected)/layout.tsx`, `utils/auth/auth.tsx`, `features/auth/queries.ts`, `lib/permissions/{server,abac,permissions,types}.ts`, `app/(protected)/projecten/madaster/actions.tsx` (admin-client gate example)
- Commands: `pnpm lint`, `pnpm db:reset` (apply migrations), `pnpm generate-types` (after schema changes)

## Validation
- `grep -rn "handleIsAuthenticated" "app/(protected)/"` matches only `layout.tsx` (auth pages outside `(protected)/` may call it too).
- Every `createAdminClient` hit from `grep -rn "createAdminClient" app/ features/` shows a permission check earlier in the same function.
- New tables: four policies each, all with `TO` and `(select auth.uid())`; migration applies cleanly with `pnpm db:reset`.
- `pnpm lint` passes; pgTAP view tests still pass where views changed.

## Reference Anchors
- `AGENTS.md` — "Auth is enforced once" rule
- `docs/adr/0002-rls-is-the-authorization-boundary.md`
- `.cursor/rules/05-auth-permissions.mdc` (auth mechanisms and the role-based permission model)

## Output
- Auth/permission code routed through the entry points above; admin-client sites gated; RLS policies/views per the rules.
- A one-line authorization statement per changed mutation: which client it runs on and, for admin-client code, which check gates it.
