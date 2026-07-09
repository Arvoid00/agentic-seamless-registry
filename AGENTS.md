# AGENTS.md

Quick reference for AI coding agents and contributors working in this repo.
Deeper detail lives in [`docs/`](./docs/context.md) and
[`.agents/skills/registry-development/SKILL.md`](./.agents/skills/registry-development/SKILL.md).

## What this is

The canonical registry for Seamless agent assets: skills, MCP server
definitions, CLI tool docs, and agent packages. External repos are ingested,
normalized to canonical YAML, indexed, and exported to consumers. Implemented
as a TypeScript CLI (Commander + Zod + YAML, run via tsx); **pnpm**, Node >= 20.19.

## Layout

- `skills/global/`, `skills/app-specific/` — canonical skills authored here
- `skills/imported/` — skills ingested from sources (`imported.*`), never edited locally
- `mcp/` — MCP servers, profiles, and imported entries
- `cli-tools/`, `agent-packages/` — provider CLI docs and agent package definitions
- `registry.config.yaml` (sources, conflict + security policy) · `registry.lock.json` (ingest hashes) · `registry.schema.json` + `src/types.ts` (object envelope)
- `dist/` — **generated** indexes, exports, and conflict reviews; don't hand-edit
- `sources/` — redacted raw source snapshots (generated)

## Pipeline commands

```bash
pnpm registry:ingest --source <id>          # ingest one source (omit --source for all enabled)
pnpm registry:materialize --source <id>     # copy imported skill folders under skills/imported/<id>/content/
pnpm registry:validate                      # validate canonical objects
pnpm registry:index                         # regenerate dist/*.index.json
pnpm registry:export --target skills-repo   # build dist/export/skills-repo/
pnpm registry:skills:add --target <repo>    # install skills into <repo>/.agents/skills/
pnpm registry:doctor                        # workspace health check
pnpm typecheck                              # tsc --noEmit
```

- **Pass flags directly — never insert `--`.** `pnpm registry:skills:add -- --target x`
  fails ("required option '--target' not specified"): pnpm forwards the `--`
  literally and Commander then reads the flags as positionals.
- `registry:skills:add` copies every registry skill that has a `content/SKILL.md`.
  A target `skills-manifest.json` (`include`/`exclude` patterns like `global/*`,
  exclude wins) filters the set; `--scope <scope>` (repeat or comma-separate)
  intersects with it; `--dry-run` reports without writing. Skills in the
  target's `skills-lock.json` are never overwritten.
- Run `pnpm registry:validate` and `pnpm registry:index` after any object change.

## Authoring skills

- Follow [`skills/global/seamless-skill-standard/content/SKILL.md`](./skills/global/seamless-skill-standard/content/SKILL.md):
  frontmatter is exactly `name` + `description`; body is the six canonical
  sections in order (Use When, Workflow, Tools And Sources, Validation,
  Reference Anchors, Output); every Workflow step ends with "Done when ...".
- Placement: reusable across repos → `skills/global/<name>/`; tied to one app →
  `skills/app-specific/<app-slug>-<name>/`. Canonical skills are
  `skill.yaml` + `content/SKILL.md` pairs.
- `seamless-agent-os` skills are **ingested, not authored here** — write them in
  that repo's `.agents/skills/`; the registry imports them as `imported.*`.
- Check `dist/skills.index.json` first: reuse an existing `imported.*` skill
  instead of recreating it locally.

## Standards lane

The nine `global.*` standards skills (`architecture-standard`,
`data-access-standard`, `lint-format-standard`, `git-ai-hooks`,
`vitest-standard`, `playwright-standard`, `design-system-standard`,
`docs-standard`, `cloud-env-standard`) are **binding fleet rules** — every rule
checkable by a command or file test. They reference playbooks via
`requires.skills` and never restate them. Taxonomy:
[`docs/standards-taxonomy.md`](./docs/standards-taxonomy.md).

## Publishing

A push to `main` touching `skills/**` or `src/**` runs
[`.github/workflows/publish-skills.yml`](./.github/workflows/publish-skills.yml):
validate → `pnpm registry:export --target skills-repo` → sync
`dist/export/skills-repo/` to `Seamless-Agency/skills` (requires the
`SKILLS_PUBLISH_TOKEN` repo secret). Consumers install with
`npx skills add Seamless-Agency/skills`.

## Conventions

- **Never edit `imported.*` objects locally** — fix upstream and re-ingest.
  Conflict strategy is `prefer-local`; collisions land as reviews under
  `dist/reviews/conflicts/` and external objects never overwrite `origin: local`.
- **`dist/` and `sources/` are generated** — regenerate, don't hand-edit.
- **Security gates** (`registry.config.yaml`): `mcp.servers`,
  `executable.commands`, and `env.vars` require human review before export;
  MCP commands must start with `npx|uvx|node|bunx`; no inline secret values —
  env vars by name only under `env.required`.
- Log durable findings in [`docs/context.md`](./docs/context.md).
