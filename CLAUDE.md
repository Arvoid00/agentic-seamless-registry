# CLAUDE.md

Guidance for Claude Code (and other AI agents) when working in this repository.

**The canonical project guide is [`AGENTS.md`](./AGENTS.md)** — repo layout,
pipeline commands, authoring rules, and conventions. Read it first. This file
only adds Claude-Code-specific notes; everything in `AGENTS.md` applies here too.

## Working in this repo

- **Verify before you finish.** Run `pnpm registry:validate` and
  `pnpm registry:index` after changing any registry object; `pnpm typecheck`
  after changing `src/`. Report failures honestly.
- **Invoke scripts without `--`** — `pnpm registry:ingest --source <id>`, not
  `pnpm registry:ingest -- --source <id>`.
- **Never edit `skills/imported/` or `dist/` by hand** — re-ingest or
  regenerate instead.
- **Don't commit, push, or open PRs unless asked.** Pushing `skills/**` or
  `src/**` to `main` auto-publishes to `Seamless-Agency/skills`.

## Key paths

| Need | Where |
| --- | --- |
| Project & agent guide | [`AGENTS.md`](./AGENTS.md) |
| Pipeline procedures | [`.agents/skills/registry-development/SKILL.md`](./.agents/skills/registry-development/SKILL.md) |
| Skill authoring format | [`skills/global/seamless-skill-standard/content/SKILL.md`](./skills/global/seamless-skill-standard/content/SKILL.md) |
| Standards taxonomy | [`docs/standards-taxonomy.md`](./docs/standards-taxonomy.md) |
| Memory log | [`docs/context.md`](./docs/context.md) |
