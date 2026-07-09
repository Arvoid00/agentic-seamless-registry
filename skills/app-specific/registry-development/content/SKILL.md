---
name: registry-development
description: Operate and extend the agentic-seamless-registry pipeline (source, ingest, normalize, materialize, index, install). Use when ingesting or adding a source, adding a canonical skill or registry object, materializing imported skills, resolving an ingest conflict, installing registry skills into a target repo, or reviewing MCP/executable security gates.
---

# Registry Development

## Use When
- running or debugging the pipeline: source → `pnpm registry:ingest` → normalize → `pnpm registry:materialize` → `pnpm registry:index` → `pnpm registry:skills:add`
- adding a canonical skill under `skills/global/` or `skills/app-specific/`, or a new source in `registry.config.yaml`
- resolving a conflict review in `dist/reviews/conflicts/`, or clearing MCP/executable security review flags

## Workflow
1. Route the task: new canonical object → step 2; external content → step 3; ship skills to a repo → step 6. Done when exactly one path is picked and the others are skipped.
2. Add a canonical skill as `skills/<scope>/<slug>/skill.yaml` + `content/SKILL.md` per `skills/global/seamless-skill-standard/content/SKILL.md`. Check `dist/skills.index.json` first — an existing `imported.*` skill must be reused, never recreated locally. Run `pnpm registry:validate` then `pnpm registry:index`. Done when both pass and the new id appears in `dist/skills.index.json`.
3. Add or refresh a source: declare it in `registry.config.yaml` `sources:` (id, type `filesystem|cursor|claude-desktop|github|notion`, path, `ingest:` flags; `mode: vercel-skills` + `skills_md: true` for repos with `.agents/skills/<slug>/SKILL.md`), then run `pnpm registry:ingest --source <id>` (omit `--source` to ingest all enabled). Imported skills land as `skills/imported/imported.<slug>/`; redacted raw snapshots go under `sources/`; object hashes in `registry.lock.json` make repeat ingests skip unchanged objects. Done when output reads "Ingest complete: N written, N skipped, 0 conflicts sent to review" — else step 4.
4. Resolve conflicts: strategy is `prefer-local` — a colliding object (same `id`+`kind`, different hash) is never written; a review lands at `dist/reviews/conflicts/<date>-<source-id>.md`. An external object may never overwrite `origin: local`; otherwise merge manually or renamespace under the `imported.` prefix. Done when the review's recommendation is applied and re-ingest reports 0 conflicts.
5. After ingesting a `skills_md` source, run `pnpm registry:materialize --source <id>` to copy each imported skill's source folder into `skills/imported/<id>/content/` and rewrite `entrypoints.prompt` to that local path (symlinks, `.env*`, key files, and binaries are filtered; source dirs outside the configured root abort). Done when it reports materialized skill and file counts and each skill.yaml carries `metadata.materialized: true`.
6. Install into a target: `pnpm registry:skills:add --target <repo> --dry-run`, review the copied/skipped/filtered report, then rerun without `--dry-run`. Every registry skill with a `content/SKILL.md` is copied to `<repo>/.agents/skills/<name>/` (name from frontmatter). A `<repo>/skills-manifest.json` (`{"version": 1, "include": ["global/*", "app-specific/h2ohub-*"], "exclude": ["global/copy-writer"]}`, patterns are `<scope>/<name>` with `*`, exclude wins) limits which skills install; `--scope <scope>` (repeat or comma-separate) intersects with it, and without a manifest everything installs. Skills listed in the target's `skills-lock.json` are never overwritten (reported as locked); imported skills already present are skipped; duplicate skill names abort. Done when the run reports no missing synced skills.
7. Clear security gates: `registry.config.yaml` `security.require_review_for` covers `mcp.servers`, `executable.commands`, and `env.vars`. Imported MCP servers are normalized with `security.review_required: true` and `risk.requires_human_review: true`; commands outside `npx|uvx|node|bunx` and inline secret values are blocked — env vars go in `env.required` by name only. Done when every touched MCP/CLI object has its review flags resolved by a human before `pnpm registry:export`.

## Tools And Sources
- Commands (package.json scripts): `pnpm registry:ingest`, `pnpm registry:materialize`, `pnpm registry:validate`, `pnpm registry:index`, `pnpm registry:skills:add`, `pnpm registry:export`, `pnpm registry:doctor`.
- Config and state: `registry.config.yaml` (sources, conflicts, security), `registry.schema.json` + `src/types.ts` (canonical envelope), `registry.lock.json` (ingest hashes and timestamps).
- Implementation: `src/cli/index.ts` (flags), `src/commands/ingest.ts` / `materialize.ts` / `skills-add.ts`, `src/adapters/filesystem.ts`, `src/normalize/mcp.ts`, `src/registry.ts` (conflict review writer).

## Validation
- `pnpm registry:validate` and `pnpm registry:index` pass after any object change (roadmap acceptance criterion).
- Re-running `pnpm registry:ingest` reports all unchanged objects as skipped and 0 conflicts.
- `dist/reviews/conflicts/` holds no unresolved reviews; `pnpm registry:doctor` reports a healthy workspace.
- After installs, each target's `.agents/skills/<name>/SKILL.md` exists and locked skills are untouched.

## Reference Anchors
- `docs/context.md` (pipeline history and findings), `docs/skill-assets-roadmap.md` (lanes and acceptance criteria)
- `skills/global/seamless-skill-standard/content/SKILL.md` (authoring format for step 2)

## Output
- Registry objects created or updated, `registry.config.yaml` diffs, and the written/skipped/conflict counts from each command run.
- For installs: per-target copied, locked, skipped, and manifest-filtered skill lists.
