---
name: h2ohub-feature-modules
description: Add or extend data access in h2ohub-next via feature modules under features/<domain>/. Use when creating a feature module, adding a query/mutation/hook, wiring TanStack Query prefetching, or when a Supabase call is about to land inline in a component or route.
---

# H2OHub Feature Modules

## Use When
- adding read or write data access for any domain in h2ohub-next
- creating a new `features/<domain>/` module
- wiring TanStack Query: query keys, `queryOptions`, hooks, prefetch/hydration
- reviewing code that calls Supabase directly from a component or `app/` route — banned; move it into a feature module

## Workflow
1. Locate or create the module folder `features/<domain>/`. Existing domains: audit-logs, auth, cart, catalog, contacts, dashboard, exports, notifications, orders, organizations, planner, projects, rides, shared, support, templates. Use `features/orders/` as the reference implementation. Done when the folder exists and no other module already owns the entity.
2. `types.ts` — alias the shared result type (`export type <X>OperationResult<T> = OperationResult<T>` from `@/features/shared/types`), define filter interfaces, re-export database row types from `@/lib/supabase`. Done when no `any` and all row types come from generated Supabase types (`pnpm generate-types` after schema changes).
3. `utils.ts` — a thin wrapper exporting the feature transaction helper: `export const with<X>Transaction = createFeatureTransaction("<X>")` from `@/features/shared/utils`; add domain type guards here if needed. Done when the wrapper exists.
4. `queries.ts` (reads) and `mutations.ts` (writes) — both start with `"use server"` and `import "server-only"`. Get the client via `getSupabaseInstance()` from `@/utils/supabase/server`, wrap every function body in the transaction wrapper with a Dutch operation name (`"reserveringen ophalen"`), return `OperationResult<T>`; mutations call `revalidatePath()` for affected routes. Done when every exported function returns the result object and no error escapes unwrapped.
5. `query-options.ts` — hierarchical key factory (`<x>Keys.all` / `lists()` / `list(filters)` / `details()` / `detail(id)`) plus `queryOptions` helpers that throw `new Error(result.error)` when the server action errored. staleTime: 30s volatile (orders, planner), 5m for templates (`features/templates/query-options.ts`) and reference data (contacts, users) — note: the staleTime table in `docs/architecture/feature-module-pattern.md` still says 1 minute for templates and has drifted from code; the code value wins. Done when keys are unique across features and every options helper unwraps the result object.
6. `hooks.ts` — starts with `"use client"`. Queries: `useQuery(<x>QueryOptions(...))`. Mutations: `useMutation` whose `onSuccess` invalidates `detail(id)` and `lists()`. Done when every mutation hook invalidates its affected keys.
7. Consume. Server pages prefetch page-specific data via `getQueryClient()` + `queryClient.prefetchQuery(...)` inside a `HydrationBoundary` (`app/(protected)/bestellingen/page.tsx` shape); shared user/org/permission data is already prefetched in `app/(protected)/layout.tsx` — do not re-prefetch it. Client components call hooks only. Done when no component or route imports a Supabase client directly.
8. Test and verify: add `tests/<domain>-hooks.test.ts` (see `tests/orders-hooks.test.ts`), then run `pnpm test` and `pnpm lint`. Done when both pass.

## Tools And Sources
- Pattern doc: `docs/architecture/feature-module-pattern.md` (full file responsibilities, hydration, staleTime table)
- Shared plumbing: `features/shared/types.ts` (`OperationResult`, `isSuccess`, `isError`), `features/shared/utils.ts` (`createFeatureTransaction`)
- Reference module: `features/orders/` (queries, mutations, query-options, hooks, utils)
- Commands: `pnpm lint` (eslint + `tsc --noemit`), `pnpm test` (Vitest), `pnpm generate-types` (regenerates `lib/supabase.db.types.ts`)

## Validation
- `pnpm lint` and `pnpm test` pass.
- Every `queries.ts`/`mutations.ts` in the diff carries both `"use server"` and `import "server-only"`.
- `git diff` introduces no new `@/utils/supabase/server` import under `app/` or `components/` — existing baseline hits are grandfathered (auth routes and `(authentication)` pages, `app/page.tsx`, `app/api/` exports, the madaster action, and one legacy component); the diff adds none.
- New query keys collide with no existing factory (grep the literal root key, e.g. `["reservations"]`).

## Reference Anchors
- `AGENTS.md` — "Feature modules own data access" rule
- `docs/architecture/feature-module-pattern.md`
- `docs/adr/0002-rls-is-the-authorization-boundary.md` (why no per-mutation permission checks)

## Output
- Files under `features/<domain>/`: `types.ts`, `utils.ts`, `queries.ts`, `mutations.ts`, `query-options.ts`, `hooks.ts`, plus `tests/<domain>-hooks.test.ts`.
- Consuming page/components use hooks + prefetch only; `pnpm lint` and `pnpm test` output reported.
