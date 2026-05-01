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

## Important Findings

- The current user-level Cursor MCP file exists at `~/.cursor/mcp.json`, but it currently contains an empty `mcpServers` object.
- No MCP server objects were imported during the first targeted Cursor ingest because there were no configured servers in that file.
- The default local MCP profile is `mcp/profiles/cursor-default.yaml`; its include list is empty, which means exports include all normalized MCP servers unless exclusions are added.
- `../seamless-agent-os` is configured as an example filesystem source. Its Vercel-style skills live at `.agents/skills/<slug>/SKILL.md` and are pinned by `skills-lock.json`.
- The filesystem adapter supports `mode: vercel-skills` / `ingest.skills_md` and normalizes those `SKILL.md` files into imported `skill` registry objects with upstream GitHub provenance where available.
- The first `seamless-agent-os` ingest imported six skills: `deploy-to-vercel`, `next-best-practices`, `shadcn-ui`, `supabase`, `supabase-postgres-best-practices`, and `vercel-react-best-practices`.
- Imported registry objects use deterministic `source.imported_at: null`; ingest timestamps live in `registry.lock.json` so repeat ingests can skip unchanged objects cleanly.

## Next Useful Extensions

- Add a real Cursor MCP server to `~/.cursor/mcp.json` and rerun `pnpm registry:ingest --source cursor-mcp-config`.
- Copy imported skill entrypoint content into normalized registry folders instead of pointing `entrypoints.prompt` at the source repo path.
- Implement GitHub ingestion by downloading or cloning a configured repo ref into `sources/github/<source-id>`.
- Add profile-aware MCP exports for Claude Desktop, Codex, and OpenClaw.
- Add richer conflict review output with side-by-side normalized YAML diffs.
