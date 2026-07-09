# Standards Taxonomy

Ratified mapping of the skill-assets whiteboard onto registry objects, plus the standards lane added 2026-07-03. Object kinds and their lifecycles:

- **Standard** — enforceable company rules; every rule checkable by a command or file test. Global scope. The future `standards-audit` runs these Validation sections per repo.
- **Playbook** — a procedure (how to do a thing). Global or app-specific scope.
- **Vendored best-practice** — pinned import (`imported.*`), never edited locally; updated by re-ingest.

## Keywords & Guidelines (whiteboard, left column)

| Card | Object |
|---|---|
| Dynamic, modular, proper separation of concerns | `global.architecture-standard` (new) |
| Seamless, fancy, modern, minimal, SV-startup, fluid, highest-level UI/UX | `global.design-system-standard` (new) — encoded as the design register |

## Standards lane (new, 2026-07-03)

| Standard | Covers |
|---|---|
| `global.architecture-standard` | deep modules / shallow interfaces, feature folders, monorepo layout, package boundaries |
| `global.data-access-standard` | DAL in `features/<domain>/`, no inline DB calls, client tiers, generated types |
| `global.lint-format-standard` | strict TS, flat ESLint, shared config packages, prettier, pnpm-only, required scripts |
| `global.git-ai-hooks` | pre-commit gates, commit conventions, Claude Code hooks |
| `global.vitest-standard` | unit/integration testing rules |
| `global.playwright-standard` | e2e rules, synthetic seeds only, setup lanes |
| `global.design-system-standard` | shadcn/ui + Tailwind v4 baseline, shared `packages/ui`, review gates |
| `global.docs-standard` | required repo docs (AGENTS.md, README, ADRs, glossary), drift checks |
| `global.cloud-env-standard` | Vercel + Supabase cloud provisioning, env/secrets hygiene, deploy gates |
| `global.seamless-skill-standard` | how skills themselves are authored and placed |

Standards reference playbooks and vendored skills via `requires.skills`; they do not restate them.

## CLI (whiteboard → `cli-tools/`)

All present: `supabase`, `turbo`, `shadcn`, `sanity`, `github`; plus `databricks`, `fallow`, `resend`, `stripe` beyond the whiteboard.

## MCP (whiteboard → `mcp/servers/`)

All present as draft entries: `figma`, `context7`, `21st-dev`, `supabase`. Draft entries require review before export (per `registry.config.yaml` security gates).

## Global Skills (whiteboard → `skills/global/` and `skills/imported/`)

| Card | Object |
|---|---|
| Start project | `global.start-project` |
| Copy writer | `global.copy-writer` |
| react-next best practice | `imported.vercel-react-best-practices`, `imported.next-best-practices` |
| Documentation updates / drift | `global.documentation-updates-drift` |
| Code guidelines / Makerkit | `global.code-guidelines` |
| Renovate / Aikido checks | `global.renovate-aikido-checks` |
| monorepo style - app / package creation | `global.monorepo-style-app-package-creation` |
| react-email-creation | `global.react-email-creation` |
| Supabase auth template update | `global.supabase-auth-template-update` |
| create deployment checklist | `global.create-deployment-checklist` |
| Feature builder | `global.feature-builder` |
| Pixel-perfect UI | `global.pixel-perfect-ui` |
| create-commit | `global.create-commit` |
| Front-end design | `global.front-end-design` |
| create-translations | `global.create-translations` |
| Setup - auth + OAuth (google) | `global.setup-auth-oauth-google` |
| user-facing changelog | `global.user-facing-changelog` |
| Supabase | `imported.supabase` |
| Shadcn Skill | `imported.shadcn-ui` |
| E2E create/run | `global.e2e-create-run` |
| Research prompts | `global.research-prompts` |
| Migration handling | `global.migration-handling` |
| Sanity | `global.sanity` |
| Meta-data-favicons | `global.metadata-favicons` |
| UI/UX review | `global.ui-ux-review` |
| Stripe | `global.stripe` |
| supabase init / start | `global.supabase-init-start` |
| Resend | `global.resend` |

## App-specific Skills (whiteboard → `skills/app-specific/`)

| Card | Object |
|---|---|
| Create-practitioner-profile | `app-specific.create-practitioner-profile` |
| innersights / mpp partner onboarding | `app-specific.partner-onboarding` |
| Databricks | `app-specific.databricks` — Databricks repos follow this lane; `cloud-env-standard` is scoped to Vercel+Supabase apps |
| Create sanity cms manuals | `app-specific.create-sanity-cms-manuals` |

Added beyond the whiteboard (2026-07-02): `app-specific.registry-development`, `app-specific.h2ohub-{feature-modules,auth-rls,react-compiler}`, `app-specific.nbs-{publish-approval,supabase-patterns,dutch-content}`. Repo-local (registry ingests as `imported.*`): `seamless-agent-os/.agents/skills/seamless-{run-execution-model,workflow-authoring,local-dev}`.
