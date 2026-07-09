---
name: nbs-publish-approval
description: Work on the Mee(r)Makers content publish approval workflow — publish requests, reviewer RPCs, database-trigger enforcement. Use when changing how blog posts, events, press releases, milestones, or resources become public, when adding a new publishable content type, or when debugging a 42501 "Publiceren vereist..." error or a scheduled post that never went live.
---

# NbS Publish Approval

## Use When
- changing publish/unpublish behaviour for `blog_posts`, `events`, `press_releases`, `milestones`, or `resources`
- adding a new content type to the approval queue
- debugging 42501 publish errors, stuck `pending` requests, or scheduled blog posts that never publish

## Workflow
1. Map each content type to its canonical visibility column: `blog_posts.status = 'published'`, `events.is_published`, `press_releases.is_published`, `milestones.is_published` (approval also sets `status = 'achieved'`), `resources.is_public`. Done when you can name the column and its `prevent_unapproved_*_publish` trigger for every type you touch (trigger names shorten the type: `prevent_unapproved_blog_publish`, `prevent_unapproved_press_publish`).
2. Route every visibility change through the RPCs — `request_content_publish(_content_type, _content_id, _request_note)`, `approve_content_publish_request(_request_id, _review_note)`, `reject_content_publish_request(_request_id, _review_note)`, `unpublish_content(_content_type, _content_id)` — already wrapped in `apps/web/hooks/useContentApproval.ts`. Never write a visibility column from client code: RLS scopes rows but cannot restrict columns, so the BEFORE trigger `prevent_unapproved_publish_transition()` raises 42501 unless the caller is `service_role` or the RPC set the transaction-local flag `app.approving_content_publish_request` / `app.unpublishing_content`. Done when no changed code updates a visibility column directly.
3. Respect the request lifecycle on `content_publish_requests`: `pending` → `approved` | `rejected` | `cancelled`; one pending row per item (partial unique index `idx_content_publish_requests_one_pending` — a repeat request refreshes the existing pending row); reviewers are `community_manager` or `admin` via `user_can_review_content_publish_requests()`, requesters need at least `contributor` via `user_can_request_content_publish()`. Done when any new state or action still satisfies the `content_publish_requests_review_consistency` CHECK constraint.
4. To add a content type, write one migration in `apps/web/supabase/migrations/` that: (a) adds the value to enum `content_publish_content_type`; (b) adds a CASE branch in `content_is_already_published`, `approve_content_publish_request`, `unpublish_content`, and `prevent_unapproved_publish_transition`; (c) attaches the `BEFORE INSERT OR UPDATE OF <visibility column>` trigger on the new table; (d) copies the reviewer SELECT policy (pattern: `20260513130000_add_community_manager_review_select.sql`) and the pending-scoped reviewer UPDATE policy (pattern: `20260513131045_reviewer_update_pending_content.sql`). Done when a non-reviewer direct publish UPDATE on the new table raises 42501 against local Supabase.
5. Wire the client: add the Dutch label to `CONTENT_PUBLISH_TYPE_LABELS` in `apps/web/lib/content/publication.ts`, reuse `apps/web/components/content/PublishRequestReviewPanel.tsx` (shared by the `/redactie` and `/admin` dashboards), and give reviewers a preview via `getPreviewHref()` in `apps/web/lib/utils/content-preview.ts` (appends `preview=1`; resources preview the uploaded file instead). Done when `pnpm supabase:typegen` (run in `apps/web`) regenerates the enum and `pnpm --filter web typecheck` passes.
6. Scheduled blog publishing: approving a post with a future `scheduled_publish_at` keeps it `draft`; service-role code in `apps/web/lib/newsletter.ts` publishes only scheduled drafts whose latest approval `reviewed_at` is at or after the post's `updated_at`, triggered by the root `vercel.json` cron entry (`GET /api/cron/newsletter`, every 15 minutes — check `vercel.json` for the current schedule). Done when any edit-after-approval scenario is accounted for: content edits after approval block auto-publish until re-approved.

## Tools And Sources
- Migrations: `apps/web/supabase/migrations/20260513121400_content_publish_approval.sql` (queue table, RLS, RPCs, triggers) and `20260513152300_unified_approval_publication_contract.sql` (current trigger body, approve with scheduling, `unpublish_content`).
- App layer: `apps/web/hooks/useContentApproval.ts`, `apps/web/lib/content/publication.ts`, `apps/web/components/content/PublishRequestReviewPanel.tsx`.
- Narrative and contracts: `docs/context.md` — "Approval Scope", "Implemented Direction", "Contracts" (under the "Review Finding Verification Context" heading).

## Validation
- Against local Supabase (`pnpm supabase:start` in `apps/web`): a `contributor` direct UPDATE of a visibility column fails with 42501; the same transition through `approve_content_publish_request` succeeds and stamps `reviewed_by`/`reviewed_at`.
- A second `request_content_publish` for the same item returns the refreshed pending row, not a duplicate.
- `pnpm --filter web typecheck` passes after `pnpm supabase:typegen`.

## Reference Anchors
- `docs/context.md` "# Review Finding Verification Context" (approval subsections live here)
- `apps/web/supabase/migrations/20260513152200_require_approval_rpc_for_publish.sql` (why reviewer role alone stopped being enough to bypass the publish trigger)

## Output
- A migration plus client wiring in which every publish/unpublish transition flows through the approval RPCs, with the 42501 denial and RPC success both demonstrated against local Supabase.
