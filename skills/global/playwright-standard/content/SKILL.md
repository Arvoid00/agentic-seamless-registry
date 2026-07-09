---
name: playwright-standard
description: Fleet standard for end-to-end testing with Playwright — setup against local Supabase, synthetic seed data only, spec layout, and specialized security/evidence lanes. Use when adding or running e2e tests, preparing the e2e environment, or deciding whether a change needs e2e coverage.
---

# Playwright Standard

## Use When
- adding or running e2e tests in any Seamless repo
- preparing or debugging the local e2e environment (Supabase + seeds + app server)
- deciding whether a change needs e2e coverage or a specialized security/evidence lane run

## Workflow
1. Decide if e2e is required. Changes to core user flows — auth, catalog, order and return checkout, planner, templates in h2ohub-next; equivalent critical paths elsewhere — need an e2e spec; internal refactors covered by the Vitest lane do not. Done when the change is mapped to a named flow or explicitly exempted.
2. Prepare the environment. E2E always runs against a local Supabase with synthetic fixtures — never production data or restored production backups. h2ohub-next: `supabase start`, then `pnpm test:e2e:setup` (db reset + post-seed RBAC + `pnpm db:seed:verify`). Done when `pnpm db:seed:verify` (or the repo's seed preflight) exits 0.
3. Author or update specs following `global.e2e-create-run` (locators, web-first assertions, smallest proving journey — do not restate it here). Specs are `*.spec.ts` under `tests/e2e/`, grouped per flow; authenticated specs reuse the session bootstrap (h2ohub `auth.setup.ts` project + saved `storageState`, `AuthPageObject.setupSession("<role>")`) instead of logging in per spec. Done when the new spec runs against a pre-seeded role user without an inline login.
4. Keep data synthetic. Reference only seeded fixtures (e.g. `e2e-admin@h2ohub-test.dev`, reserved SAP range 900000–901149) defined in `tests/e2e/utils/seed-helpers.ts`; never hardcode production identifiers. Done when every fixture in the spec traces to a seed file or seed-helpers constant.
5. Run the right lane. Default: `pnpm test:e2e` (h2ohub chromium project; local run auto-starts `pnpm dev`). CI parity: `pnpm test:e2e:ci`. Specialized Playwright projects in PWN-NBS-Community `apps/web`: `pnpm test:security` (security.spec.ts) and `pnpm test:evidence` (evidence.spec.ts, artifacts to `evidence/<date>/`), after `pnpm setup:playwright`. Done when the chosen command exits 0.
6. On failure, use the built-in evidence: screenshot on failure, trace on first retry, HTML report. Done when the failure is diagnosed from the report/trace or reproduced with `pnpm test:e2e:debug`.

## Tools And Sources
- Skills: `global.e2e-create-run` (spec authoring checklist), `global.vitest-standard` (the non-browser lane).
- Reference configs: `h2ohub-next/playwright.config.ts` (setup→chromium projects, `testIdAttribute: "data-test"`, retries 2 in CI), `PWN-NBS-Community/apps/web/playwright.config.ts` (security/evidence/godaddy projects).
- Reference docs: `h2ohub-next/docs/testing/testing-walkthrough.md`, `h2ohub-next/docs/testing/testing-data-strategy.md`, `h2ohub-next/tests/e2e/README.md`.

## Validation
- `pnpm db:seed:verify` (h2ohub) or the repo's seed preflight exits 0 before specs run.
- `grep -rEo "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+" tests/e2e --include='*.spec.ts' | grep -v "@h2ohub-test.dev"` returns nothing — every email in a spec is a synthetic seed fixture (adapt the allowed domain per repo).
- `pnpm test:e2e` (or `test:security`/`test:evidence`) exits 0; on CI, `forbidOnly` rejects stray `test.only`.
- New specs live under `tests/e2e/` and match `*.spec.ts`.
- Setup only ever targets local: `supabase db reset` is never pointed at a production or staging remote, and remote seed applies require `SEED_APPLY_CONFIRM=yes` on a non-production connection string.

## Reference Anchors
- Playwright best practices: https://playwright.dev/docs/best-practices
- Fleet data-safety rules: `h2ohub-next/docs/testing/testing-data-strategy.md` (safety rules 1–6)

## Output
- Specs and config changes written, the exact commands run, and their exit status plus report location.
- Ratification decision: h2ohub-next's session-bootstrap pattern (setup project + storageState) is the standard for authenticated e2e; PWN-NBS-Community's globalSetup-based security/evidence lanes remain as project-scoped lanes, not the default flow pattern.
- Ratification decision: test-id locators use `data-test` (h2ohub-next `testIdAttribute`); repos on Playwright's default `data-testid` align when they first add test-id locators.
