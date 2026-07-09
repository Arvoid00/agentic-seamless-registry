---
name: vitest-standard
description: Fleet standard for unit/integration testing with Vitest — runner, test layout, naming, required coverage, and the no-services rule. Use when adding or reviewing unit/integration tests, wiring a test script into a Seamless repo, or deciding whether a test needs Supabase.
---

# Vitest Standard

## Use When
- adding or reviewing unit/integration tests in any Seamless repo
- wiring `test` scripts or `vitest.config.ts` into a repo that lacks them (e.g. PWN-NBS-Community has no Vitest lane yet)
- deciding whether a test belongs in the Vitest lane or the Playwright e2e lane

## Workflow
1. Confirm the lane. Vitest covers unit and integration tests of functions, hooks, and modules; anything asserting real browser behavior goes to the Playwright lane instead. Done when the test under discussion is assigned to exactly one lane.
2. Wire the runner. `package.json` scripts: `"test": "vitest run"` (non-watch, CI-safe) and `"test:watch": "vitest"`. `vitest.config.ts` sets `environment: "node"`, includes only Vitest globs, and excludes `**/tests/e2e/**`. Done when `pnpm test` runs `vitest run` and picks up zero Playwright specs.
3. Place and name the test. Files are `<subject>.test.ts` under `tests/` at the package root (feature-level like `tests/orders-hooks.test.ts` or grouped like `tests/unit/<domain>/`); co-location next to source is allowed only where the config already includes it (h2ohub `lib/**/*.test.ts`). Done when the new file matches the repo's `vitest.config.ts` include glob and ends in `.test.ts`.
4. Cover changed code: one test per behavior for the happy path plus the primary error path (invalid input, denied permission, or failed dependency). Assert behavior, not implementation; name each test with scenario and expected outcome. Exhaustive edge-case matrices are deferred to dedicated testing passes unless business-critical. Done when both paths of every changed function/hook have a failing-capable assertion.
5. Keep the lane service-free. Mock Supabase, email, Maps, and other external dependencies; unit/integration tests must pass with no Supabase or app server running and complete in milliseconds per test. Done when `pnpm test` exits 0 with `supabase stop` in effect.
6. Run and report. Execute `pnpm test` (plus `pnpm lint` where it includes typechecking) and report failures honestly. Done when `pnpm test` exits 0 on the branch.

## Tools And Sources
- Skills: `global.playwright-standard` (the e2e lane this standard hands off to).
- Reference configs: `h2ohub-next/vitest.config.ts` (include `lib/**/*.test.ts`, `tests/**/*.test.ts`; exclude `tests/e2e`), `seamless-agent-os/vitest.config.ts` (include `tests/**/*.spec.ts`, alias-mocks `server-only`).
- Reference docs: `h2ohub-next/docs/standards/testing.md`, `h2ohub-next/docs/testing/testing-walkthrough.md` section 1.
- Reference suites: `h2ohub-next/tests/orders-hooks.test.ts`, `seamless-agent-os/tests/dynamic-loop.spec.ts`.

## Validation
- `node -e "const s=require('./package.json').scripts; if(s.test!=='vitest run') process.exit(1)"` passes in the target package — applies to new setups and other repos; seamless-agent-os's watch-mode `test` script is grandfathered until migrated and exempt from this check.
- `pnpm test` exits 0 without Supabase running.
- New test filenames match the repo's `vitest.config.ts` include globs.
- Changed exported functions/hooks each have a happy-path and an error-path test that fail when the behavior is broken.
- No coverage-threshold flags are added: no fleet repo enforces numeric coverage, so do not invent one.

## Reference Anchors
- Vitest config reference: https://vitest.dev/config/
- Fleet testing standard: `h2ohub-next/docs/standards/testing.md`

## Output
- The test files and any `package.json`/`vitest.config.ts` changes, with the `pnpm test` result.
- Ratification decision: Vitest files are named `*.test.ts` and the `test` script is non-watch `vitest run` (h2ohub-next practice, backed by written standards); seamless-agent-os `tests/**/*.spec.ts` with watch-mode `pnpm test` is grandfathered via its own config, and `*.spec.ts` is reserved for Playwright in new work.
- Ratification decision: changed code requires happy path plus primary error path (fleet working agreement); h2ohub's "defer edge-case/error-path tests" is read as deferring exhaustive edge-case matrices, not the primary error path.
