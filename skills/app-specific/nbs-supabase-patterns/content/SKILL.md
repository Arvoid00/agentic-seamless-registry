---
name: nbs-supabase-patterns
description: Apply this repo's Supabase conventions — migrations, RLS policy shapes, trigger enforcement, RPC style, local stack, typegen. Use when writing a migration or RLS policy in PWN-NBS-Community, adding a Postgres function/RPC, starting local Supabase, regenerating database types, or debugging a PGRST116 "Cannot coerce" error.
---

# NbS Supabase Patterns

## Use When
- writing a migration, RLS policy, trigger, or Postgres RPC in PWN-NBS-Community
- starting the local Supabase stack or regenerating TypeScript database types
- debugging PGRST116 (`.single()` on an RLS-blocked update) or permission errors

## Workflow
1. Run the local stack from `apps/web`: `pnpm supabase:start` (API 54351, DB 54352, Studio 54353, Inbucket 54354 — offsets chosen in `apps/web/supabase/config.toml` so this project runs beside other local Supabase projects; `project_id = "pwn-nbs-community"`), `pnpm supabase:stop` when done. Done when `supabase status` in `apps/web` reports the API on 54351.
2. Create migrations only in `apps/web/supabase/migrations/` named `YYYYMMDDHHMMSS_snake_case_description.sql` (older UUID-named files are legacy imports — leave them). The root-level `supabase/migrations/` folder is a stray partial copy: never add migrations there. Write idempotent SQL: `DROP POLICY IF EXISTS` / `DROP TRIGGER IF EXISTS` before CREATE, `CREATE OR REPLACE FUNCTION`, and enum creation wrapped in `DO $$ ... EXCEPTION WHEN duplicate_object THEN NULL; END $$`. Done when `supabase db reset` in `apps/web` applies the full chain cleanly.
3. RLS: `ENABLE ROW LEVEL SECURITY` on every new table; policies target `TO authenticated`; role checks go through `public.has_role(auth.uid(), '<role>'::app_role)` or a named capability helper such as `user_can_review_content_publish_requests()` — never inline `user_roles` joins. Scope conditional edit rights with an `EXISTS` subquery against the state table (pattern: `apps/web/supabase/migrations/20260513131045_reviewer_update_pending_content.sql`, which allows reviewer updates only while a pending publish request exists). Know the failure shape: an RLS-blocked UPDATE returns 0 rows, and `.single()` surfaces that as PGRST116 — client code must format it with `getUserFacingErrorMessage` from `apps/web/lib/user-facing-errors.ts`. Done when every new table has RLS enabled and every policy uses a role helper.
4. Column-level and shape rules need triggers, not RLS (RLS cannot restrict which columns an UPDATE touches). Follow the existing BEFORE-trigger patterns: `prevent_non_admin_blog_author_change` keeps `blog_posts.author_id` admin-only (`20260608104500_allow_reviewer_blog_post_updates.sql`); `prevent_unapproved_publish_transition` blocks direct publish transitions on all five publishable tables (`20260513152300_unified_approval_publication_contract.sql`); `prevent_multiple_press_page` / `prevent_delete_press_page` make `press_page_content` a singleton (`20260309110000_create_press_and_milestones.sql`); `touch_*_updated_at` triggers maintain `updated_at`. Done when every "only role X may change column Y" rule in your change is enforced by a trigger.
5. RPCs: plpgsql with `SET search_path = public`; `SECURITY DEFINER` only when the function must bypass RLS (`approve_content_publish_request`, `unpublish_content`, `accept_contributor_invitation` in `20260518142537_accept_contributor_invitation_rpc.sql`); raise Dutch user-facing messages with explicit `ERRCODE` (42501 permission, P0002 not found, 23505 duplicate); authorize protected triggers via transaction-local `set_config('app.<flag>', 'true', TRUE)`; end the migration with explicit `GRANT EXECUTE` — `TO authenticated` for user flows, service-role-only like `acquire_cron_lock` / `release_cron_lock` (`20260309150000_add_cron_locks.sql`) for cron paths. Done when the RPC succeeds for its intended role and is denied for others against local Supabase.
6. Regenerate types after any schema change: `pnpm supabase:typegen` in `apps/web` writes both `lib/supabase/types.ts` and `lib/supabase.db.types.ts` from the local schema. Done when both files changed together and `pnpm --filter web typecheck` passes.

## Tools And Sources
- Skills: `nbs-publish-approval` (the publish trigger/RPC contract in depth).
- Config: `apps/web/supabase/config.toml` (ports, auth, buckets); scripts in `apps/web/package.json` (`supabase:start`, `supabase:stop`, `supabase:typegen`).
- Reference migrations: `20260513121400_content_publish_approval.sql` (full RLS + RPC + trigger example), `20251215153442_*.sql` (defines `has_role` and `app_role`).

## Validation
- `supabase db reset` in `apps/web` applies all migrations without error.
- New policies/triggers behave as intended when exercised with an authenticated non-privileged user against the local API on 54351 (allowed path succeeds, denied path errors — not 0-row silence unless intended).
- `pnpm --filter web typecheck` passes after typegen.

## Reference Anchors
- `docs/context.md` "Nieuwsbericht Save PGRST116 Context" (why RLS-blocked updates surface as PGRST116 and why column rules became triggers)
- `docs/security-baseline-pwn-nbs-community.md`

## Output
- Migration file(s) in `apps/web/supabase/migrations/`, regenerated types, and evidence that `db reset`, the role-based allow/deny checks, and typecheck all pass.
