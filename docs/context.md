# Agentic Seamless Registry Context

## Current State

- This repository started as an empty Git repository.
- The workspace is now scaffolded as a composable registry for canonical agent skills, MCP servers, profiles, policies, workflows, templates, and generated agent package exports.
- The MVP is implemented as a TypeScript CLI using Commander.js, Zod, and YAML.

## Implemented MVP

- `registry.config.yaml` is the source configuration for enabled registry sources.
- `registry.lock.json` tracks ingested source outputs and object hashes.
- `registry.schema.json` documents the canonical registry object envelope.
- `src/types.ts` defines the canonical registry object schemas and TypeScript types.
- Filesystem ingestion validates existing canonical YAML files.
- Cursor MCP ingestion reads `~/.cursor/mcp.json`, stores a redacted raw snapshot under `sources/`, and normalizes MCP servers into `mcp/servers/<id>/server.yaml`.
- Index generation writes compact agent-facing indexes to `dist/registry.index.json`, `dist/skills.index.json`, and `dist/mcp.index.json`.
- Cursor export writes generated MCP config to `dist/agent-packages/cursor/mcp.json`.
- `materialize` copies imported skill source folders into normalized registry folders and rewrites entrypoints to local registry paths.

## Important Findings

- The current user-level Cursor MCP file exists at `~/.cursor/mcp.json`, but it currently contains an empty `mcpServers` object.
- No MCP server objects were imported during the first targeted Cursor ingest because there were no configured servers in that file.
- The default local MCP profile is `mcp/profiles/cursor-default.yaml`; it now explicitly includes the draft Figma, 21st Dev, Context7, and Supabase MCP registry entries created from the skill asset roadmap.
- `../seamless-agent-os` is configured as an example filesystem source. Its Vercel-style skills live at `.agents/skills/<slug>/SKILL.md` and are pinned by `skills-lock.json`.
- The filesystem adapter supports `mode: vercel-skills` / `ingest.skills_md` and normalizes those `SKILL.md` files into imported `skill` registry objects with upstream GitHub provenance where available.
- The first `seamless-agent-os` ingest imported six skills; it now imports those six plus `fallow` and `seamless-feature-architecture`.
- Imported registry objects use deterministic `source.imported_at: null`; ingest timestamps live in `registry.lock.json` so repeat ingests can skip unchanged objects cleanly.
- Run `pnpm registry:materialize --source seamless-agent-os` after ingesting external `SKILL.md` sources to make imported skill entrypoints and sibling collateral self-contained under `skills/imported/<id>/content/`.
- The latest materialize run copied 137 files across eight imported skills. Re-running `ingest` after materialization skips unchanged objects because the filesystem adapter now detects existing `content/SKILL.md` files and emits local entrypoints.

## Next Useful Extensions

- Add a real Cursor MCP server to `~/.cursor/mcp.json` and rerun `pnpm registry:ingest --source cursor-mcp-config`.
- Implement GitHub ingestion by downloading or cloning a configured repo ref into `sources/github/<source-id>`.
- Add profile-aware MCP exports for Claude Desktop, Codex, and OpenClaw.
- Add richer conflict review output with side-by-side normalized YAML diffs.

## Skill Asset Roadmap

- Added `docs/skill-assets-roadmap.md` as the canonical checklist for image-derived CLI, MCP, global skill, app-specific skill, hook, and subagent assets.
- Local skills now use canonical registry YAML plus Cursor/Claude compatible `content/SKILL.md` entrypoints.
- Draft MCP server entries require review before relying on exported Cursor MCP configuration.
- Local skill entrypoints were upgraded from generic placeholders to docs-backed playbooks with domain-specific workflow, tool/MCP guidance, validation, and reference anchors.
- The registry now scans `agent-packages/` as first-class canonical objects; index generation reports 57 objects including 8 focused agent packages and provider CLI entries for Stripe, Resend, and Databricks.
- Local skill entrypoints were trimmed again to remove repeated guardrail/validation boilerplate; each now keeps only trigger scope, domain checklist, relevant tools, validation, references, and output.
- The `seamless-agent-os` source now imports `imported.fallow` and `imported.seamless-feature-architecture`; local feature/code/monorepo/dependency skills reference them instead of duplicating imported skill instructions.
- `cli.fallow` is the local registry object for Fallow CLI usage, with human review required for fix flows because read-only analysis and write-capable cleanup share the same tool.
