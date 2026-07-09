---
name: data-access-standard
description: Enforce the fleet data access rules - feature modules own all queries/mutations/hooks, no inline DB calls in components or routes, tiered Supabase clients, Drizzle only in sessionless services, generated DB types. Use when writing or reviewing any code that reads or writes the database.
---

# Data Access Standard

## Use When
- adding or changing any database read or write in a Seamless app
- reviewing a diff that touches Supabase, Drizzle, or TanStack Query code
- a DB call is about to land inline in a component or `app/` route - banned; move it

## Workflow
1. Locate or create the owning feature module `features/<domain>/` with `types.ts`, `queries.ts` (reads), `mutations.ts` (writes), `query-options.ts`, `hooks.ts`. One module owns each entity; flat `lib/data/*.ts` files are legacy, not the standard. Done when the module folder exists and no other module owns the entity.
2. Pick the client tier. Default: the user-scoped supabase-js server client (cookie/session based, RLS enforced) - `getSupabaseInstance()` in h2ohub-next, `createSupabaseServerClient()` in PWN-NBS-Community. Service-role admin client (`createSupabaseAdminClient()` / `createAdminClient()`) only in trusted server contexts (API routes, cron, workers), never importable by client components, and every admin-client call path runs an explicit permission check first (`authorizeApiRoles` shape in `PWN-NBS-Community/apps/web/lib/api-auth.ts`) because RLS is bypassed. Done when the chosen tier and, for admin, the guarding check are named in the diff.
3. Apply the Drizzle rule. Request-scoped user-facing code uses supabase-js so RLS applies - Drizzle is not permitted there. Sessionless backend services in a monorepo (workers, migrations, control-plane logic) use Drizzle from the dedicated `packages/db` workspace over `DATABASE_URL` (shape: `seamless-agent-os/packages/db/src/client.ts`), never ad-hoc `postgres()` connections in app code. Done when every new DB client in the diff matches its context per this rule.
4. Write server functions. `queries.ts` and `mutations.ts` open with `"use server"` and `import "server-only"`; every exported function returns a result object (`OperationResult<T>`-style, `{ data, error }`) with errors caught inside; mutations call `revalidatePath()` for affected routes. Done when no exported function can throw to the caller and both directives are present.
5. Wire TanStack Query. `query-options.ts` holds a hierarchical key factory (`all`/`lists()`/`list(filters)`/`details()`/`detail(id)`) and exported `queryOptions` that throw on `result.error`; `hooks.ts` is `"use client"`, mutations invalidate `detail(id)` + `lists()` (plus cross-feature keys) in `onSuccess`; server pages prefetch via `queryClient.prefetchQuery` inside `HydrationBoundary`; client components consume hooks only. Full recipe: `app-specific.h2ohub-feature-modules`. Done when keys collide with no existing factory (grep the literal root key) and every mutation hook invalidates its keys.
6. Use generated DB types. Row types come from the repo's `supabase gen types typescript` output (`pnpm generate-types` in h2ohub-next, `pnpm supabase:typegen` run inside `apps/web` in PWN-NBS-Community — the script lives there, not at the repo root); regenerate after every schema change; no hand-written row shapes. Done when all row types in the diff trace to the generated file.
7. Audit the diff. Run the Validation greps; any new hit under `app/` or `components/` outside a feature module is a violation to move, not annotate. Done when all greps add no new hits versus the base ref.

## Tools And Sources
- Skills: `app-specific.h2ohub-feature-modules` (reference implementation of this standard), `imported.seamless-feature-architecture` (module shape, Next.js placement), `imported.supabase` (client/auth APIs), `global.architecture-standard` (structural rules).
- Client factories: `h2ohub-next/utils/supabase/server.ts`, `PWN-NBS-Community/apps/web/lib/supabase/server.ts`, `seamless-agent-os/packages/supabase/src` (browser/server/admin), `seamless-agent-os/packages/db` (Drizzle).
- Pattern doc: `h2ohub-next/docs/architecture/feature-module-pattern.md` (hydration, staleTime tiers, invalidation).

## Validation
- `git diff <base> -- 'app/**' 'components/**' | grep -nE "supabase/(server|client)|createSupabaseAdminClient|createAdminClient|from ['\"]drizzle"` returns nothing new (no inline DB access outside feature modules). Diff-relative on purpose: h2ohub-next has a grandfathered baseline of 17 pre-existing hits under `app/` and `components/`; the diff must add none.
- Every `queries.ts`/`mutations.ts` in the diff contains both `"use server"` and `import "server-only"` (`grep -L` across changed files is empty).
- Every changed file importing an admin client also references an explicit permission check (`authorizeApiRoles`, `isAdminBearerToken`, or repo equivalent).
- Type generation script run after schema changes; generated types file is current in the diff.

## Reference Anchors
- `h2ohub-next/docs/architecture/feature-module-pattern.md`
- `h2ohub-next/docs/adr/0002-rls-is-the-authorization-boundary.md`
- `seamless-agent-os/CLAUDE.md` "Supabase clients" convention (browser/server/admin factories)

## Output
- Pass/fail per Validation check with command output, plus files moved into feature modules.
- Known drift to flag: `h2ohub-next/features/cart/queries.ts` and `features/cart/mutations.ts` open with `"use server"` but lack `import "server-only"` — a verified step-4 exception; add the directive when next touching those files.
- Ratification decision: h2ohub-next feature-module file split (`queries.ts`/`mutations.ts`/`query-options.ts`/`hooks.ts` + result objects + TanStack Query) adopted over PWN-NBS-Community's flat `lib/data/` modules and seamless-feature-architecture's single `data.ts`; RLS-first user client adopted as the default authorization boundary (h2ohub ADR-0002), with NBS's explicit-check-before-admin-client pattern required wherever the service-role tier is used; Drizzle confined to sessionless `packages/db` services (seamless-agent-os) rather than allowed generally.
