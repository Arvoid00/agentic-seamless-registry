---
name: skill-assets-roadmap
overview: Create a roadmap/checklist document that turns the image lanes into concrete registry, Cursor, and Claude Code deliverables, then use it to drive skill, hook, subagent, CLI, and MCP asset creation in reviewable waves.
todos:
  - id: draft-roadmap-doc
    content: Create the markdown roadmap/checklist under docs with lane-by-lane image item mapping and artifact conventions.
    status: completed
  - id: inventory-existing-assets
    content: Record existing imported Claude/agent skills and Cursor built-in/personal skills to avoid duplicating them.
    status: completed
  - id: prioritize-skill-waves
    content: Group global, app-specific, CLI, MCP, hook, and subagent assets into implementation waves with acceptance criteria.
    status: completed
  - id: implement-wave-2-skills
    content: After roadmap approval, create the first wave of missing high-leverage global skills using the create-skill workflow.
    status: completed
  - id: implement-tooling-assets
    content: Create CLI/MCP registry objects plus hooks/subagents where deterministic workflows are needed.
    status: completed
  - id: validate-registry
    content: Validate and index registry changes, then check hooks/subagents with their platform-specific requirements.
    status: in_progress
isProject: false
---

# Skill Assets Roadmap Plan

## Current State
- The registry already supports these object kinds in [`/Users/arviddehaas/Documents/GitHub/agentic-seamless-registry/src/types.ts`](/Users/arviddehaas/Documents/GitHub/agentic-seamless-registry/src/types.ts): `skill`, `mcp-server`, `mcp-profile`, `cli-tool`, `workflow`, `prompt`, `template`, `policy`, and `agent-package`.
- Skill paths are defined by [`/Users/arviddehaas/Documents/GitHub/agentic-seamless-registry/src/paths.ts`](/Users/arviddehaas/Documents/GitHub/agentic-seamless-registry/src/paths.ts): global skills go under `skills/global/<id>/skill.yaml`, app-specific skills under `skills/app-specific/<id>/skill.yaml`, imported skills under `skills/imported/<id>/skill.yaml`.
- Existing imports already include Claude/agent-style skills from `../seamless-agent-os/.agents/skills`: `deploy-to-vercel`, `next-best-practices`, `shadcn-ui`, `supabase`, `supabase-postgres-best-practices`, and `vercel-react-best-practices`.
- Cursor built-in/personal skill sources should be referenced as roadmap inputs, not edited directly when managed by Cursor. The roadmap should explicitly include Cursor authoring skills like `create-skill`, `create-hook`, `create-subagent`, plus workflow skills such as `review`, `tdd`, `security-audit`, `create-pr`, `e2e`, `update-docs`, `canvas`, `babysit`, `split-to-prs`, and `statusline`.

## Roadmap Document
Create [`/Users/arviddehaas/Documents/GitHub/agentic-seamless-registry/docs/skill-assets-roadmap.md`](/Users/arviddehaas/Documents/GitHub/agentic-seamless-registry/docs/skill-assets-roadmap.md) as the canonical checklist.

The document will contain:
- Scope and conventions for `skill`, `mcp-server`, `mcp-profile`, `cli-tool`, hook, subagent, and agent-package artifacts.
- A checklist for all image items, grouped by lane.
- A Cursor and Claude Code skills inventory section.
- A priority wave plan so the asset creation can happen incrementally.
- Acceptance criteria for each artifact type.
- Validation commands: `pnpm registry:validate`, `pnpm registry:index`, and targeted checks for hooks/subagents when those files are created.

## Image Item Mapping
- CLI lane: `Supabase`, `Sanity`, `Turbo`, `Github`, `Shadcn` become `cli-tool` registry objects, with optional companion skills where workflow guidance is useful.
- MCP lane: `Figma`, `21st dev`, `Context7`, `Supabase` become `mcp-server` objects and are added to a Cursor MCP profile after secrets/env requirements are documented.
- Global Skills lane: `Start project`, `Feature builder`, `Supabase`, `Copy writer`, `Pixel-perfect UI`, `Shadcn Skill`, `react-next best practice`, `create-commit`, `E2E create/run`, `Documentation updates / drift`, `Front-end design`, `Research prompts`, `Code guidelines`, `Migration handling`, `Renovate / Aikido checks`, `Sanity`, `monorepo style - app / package creation`, `Meta-data-favicons`, `react-email-creation`, `create-translations`, `UI/UX review`, `Supabase auth template update`, `Setup + auth + OAuth google`, `Stripe`, `create deployment checklist`, `user-facing changelog`, `supabase init / start`, and `Resend` become `skills/global/...` entries unless already covered by imported Cursor/Claude skills.
- App Specific Skills lane: `Create-practitioner-profile`, `partner onboarding`, `Databricks`, and `Create sanity cms manuals` become `skills/app-specific/...` entries, likely with project context and app-specific acceptance criteria.

## Artifact Strategy
- Prefer canonical registry YAML for repository-owned assets.
- Preserve Cursor-managed skills as references; create local project/user skills only for missing workflows.
- Treat hooks and subagents as Cursor-side companion assets initially, because they are not current registry object kinds. The roadmap will mark whether each should become a future `agent-package`, `workflow`, or schema extension.
- Deduplicate against existing imported skills before creating anything new, especially `next-best-practices`, `shadcn-ui`, `supabase`, `deploy-to-vercel`, and Vercel React performance guidance.

## Implementation Waves
- Wave 1: Roadmap/checklist only. Create the markdown document and, if useful, append 1-3 factual bullets to [`/Users/arviddehaas/Documents/GitHub/agentic-seamless-registry/docs/context.md`](/Users/arviddehaas/Documents/GitHub/agentic-seamless-registry/docs/context.md).
- Wave 2: Create high-leverage global skills that are not already imported: `start-project`, `feature-builder`, `create-commit`, `documentation-updates-drift`, `research-prompts`, `code-guidelines`, `ui-ux-review`, and `create-deployment-checklist`.
- Wave 3: Add CLI and MCP registry objects for Supabase, Sanity, Turbo, GitHub, shadcn, Figma, 21st dev, Context7, and Supabase MCP, with env/security review fields.
- Wave 4: Create specialized hooks and subagents where they add deterministic value: command safety/preflight hooks, documentation drift checks, security/dependency checks, UI review subagent, migration reviewer subagent, and release/changelog subagent.
- Wave 5: Create app-specific skills for practitioner profile, partner onboarding, Databricks, and Sanity CMS manuals once their target app context is confirmed.

## Validation
- Run `pnpm registry:validate` after creating canonical registry objects.
- Run `pnpm registry:index` after validation passes.
- Use `pnpm typecheck` only if registry TypeScript code changes are required; the roadmap-only pass should not need it.
- For hooks, verify scripts are executable and dependencies exist before marking checklist items complete.
- For subagents, verify frontmatter names/descriptions are valid and scoped to either `.cursor/agents/` or `~/.cursor/agents/` depending on the final target.