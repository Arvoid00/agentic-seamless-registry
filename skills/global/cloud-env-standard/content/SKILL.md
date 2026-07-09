---
name: cloud-env-standard
description: Enforceable standard for provisioning Vercel + Supabase cloud environments for a Seamless project. Use when provisioning cloud infrastructure for a new project, separating dev/staging/prod environments, wiring environment variables, or auditing a repo's env and secrets hygiene.
---

# Cloud Env Standard

## Use When
- provisioning Vercel and Supabase cloud resources for a Seamless project
- separating dev/staging/prod environments or configuring preview deployments
- auditing a repo's environment variables and secrets hygiene against the standard

Databricks-based repos follow `app-specific.databricks` instead; this standard covers Vercel+Supabase apps only.

## Workflow
1. Link Vercel. Run `vercel link --repo --scope <team-slug>` (plain `vercel link` when no git remote); follow `imported.deploy-to-vercel` for the full state-detection and deploy decision flow. Done when `.vercel/project.json` or `.vercel/repo.json` exists and `git check-ignore .vercel` exits 0.
2. Link Supabase per environment. One Supabase cloud project per remote environment (staging, prod); dev runs the local Docker stack per `global.supabase-init-start`. Run `supabase link --project-ref <ref>` in the repo. Done when `supabase migration list` runs against the linked project without auth or ref errors.
3. Apply migrations to remote. Schema is source-controlled in `supabase/migrations/`; review per `global.migration-handling`, then `supabase db push` to the linked project. For app data, follow seamless-agent-os/docs/deployment/supabase-remote-migrate-and-data.md: data-only `pg_dump --schema=public --no-owner --no-privileges` and `psql -v ON_ERROR_STOP=1`; never dump/restore `auth` or Supabase-managed schemas across projects. Done when `supabase migration list` shows every local migration applied on remote.
4. Wire env vars. Commit `.env.example` naming every variable with a placeholder; real values live only in the untracked local env file and in Vercel scopes (Development/Preview/Production) via `vercel env add <NAME> <environment>`. `NEXT_PUBLIC_` prefix only on browser-safe values; `SUPABASE_SERVICE_ROLE_KEY` and other server secrets never carry it. Production `DATABASE_URL` is passed one-off per invocation (`DATABASE_URL='...' <cmd>`), never written to disk. Done when `test -f .env.example` passes and `git ls-files | grep -E '^\.env'` returns only `.env.example`.
5. Configure previews. Non-production branches auto-deploy as Vercel previews; production deploys only from the production branch or an explicit `--prod`. Gate preview-only behavior on `VERCEL_ENV === "preview"` (e.g. `withVercelToolbar` in the Nosecone CSP wrap), never on hostname. Derive canonical URLs from `NEXT_PUBLIC_SITE_URL` set per environment; never hardcode a `*.vercel.app` hostname in source. Done when a pushed branch shows a preview deployment in the `vercel ls` output (there is no `--format json` flag) and `grep -rn 'vercel.app' app/ src/ --include='*.ts' --include='*.tsx'` returns nothing.
6. Gate promotion. Before promoting to staging or production, produce a release checklist per `global.create-deployment-checklist` and clear dependency/security findings per `global.renovate-aikido-checks`. Staging is seeded with synthetic data only, never production data. Done when `gh pr checks` is green and the checklist exists on the PR.

## Tools And Sources
- CLI: `vercel` (link, env add/ls, deploy, ls, inspect), `supabase` (link, db push, migration list), `gh` (pr checks), `git` (check-ignore, ls-files).
- Skills: `imported.deploy-to-vercel` (deploy flow), `global.supabase-init-start` (local stack), `global.migration-handling` (migration review), `global.create-deployment-checklist` (release gates), `global.renovate-aikido-checks` (dependency/security triage).
- Docs: seamless-agent-os/docs/deployment/supabase-remote-migrate-and-data.md and local-development.md; h2ohub-next/README.md (reference Vercel+Supabase setup, staging data rules).

## Validation
- `git ls-files | grep -E '^\.env'` returns only `.env.example`.
- `for p in .vercel .env .env.local; do git check-ignore -q "$p" || echo "NOT IGNORED: $p"; done` prints nothing (multi-path `git check-ignore` exits 0 when any one path is ignored, so check per path).
- `supabase migration list` shows no local migration missing on the linked remote.
- `vercel env ls` lists every `.env.example` variable in the scopes that need it; report variable names only — the registry blocks secret values (`block_secret_values: true`), so no value ever appears in skill output, checklists, or committed files.
- `gh pr checks <pr>` is green before a production promote.

## Reference Anchors
- Vercel environments and env vars: https://vercel.com/docs/deployments/environments
- Supabase remote migrations: https://supabase.com/docs/guides/deployment/database-migrations
- Registry security posture: agentic-seamless-registry/registry.config.yaml (`block_secret_values: true`)

## Output
- The environment matrix (dev/staging/prod x Vercel/Supabase) with linked project refs, plus the Validation evidence actually run. Variable names only, never values.
- Ratification decision: remote schema changes go through `supabase/migrations/` + `supabase db push` (h2ohub-next practice, README deployment section); a bespoke Node migrator (seamless-agent-os `pnpm db:migrate`) stays repo-local and is not the fleet standard.
- Ratification decision: production credentials are passed as one-off env vars per invocation and never persisted to `.env` on disk (adopted from seamless-agent-os deployment docs).
