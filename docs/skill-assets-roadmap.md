# Skill Assets Roadmap

This roadmap turns the skill map image into a concrete checklist for registry objects, Cursor assets, and Claude Code compatible skills. It is the working source for creating skills, CLI tools, MCP servers, hooks, subagents, and future agent packages without duplicating imported upstream skills.

## Artifact Conventions

- Registry-owned skills use `skills/global/<slug>/skill.yaml` or `skills/app-specific/<slug>/skill.yaml` with a local `content/SKILL.md` prompt entrypoint.
- Imported skills remain under `skills/imported/` and should be reused before creating local duplicates.
- CLI entries use `cli-tools/<slug>/object.yaml` with command metadata and related skills.
- MCP entries use `mcp/servers/<slug>/server.yaml`; required tokens belong in `env.required`, never inline values.
- Cursor hooks live under `.cursor/hooks.json` and `.cursor/hooks/`.
- Cursor subagents live under `.cursor/agents/`.
- Claude Code compatible skills use `SKILL.md` frontmatter and can be imported into this registry through the filesystem `skills_md` flow.

## Existing Skill Inventory

These imported skills already cover several items from the image and should not be recreated as local duplicates:

- `imported.deploy-to-vercel`
- `imported.next-best-practices`
- `imported.shadcn-ui`
- `imported.supabase`
- `imported.supabase-postgres-best-practices`
- `imported.vercel-react-best-practices`

Cursor-managed and personal skills to reference as source material:

- Authoring and platform skills: `create-skill`, `create-hook`, `create-subagent`, `create-rule`, `migrate-to-skills`, `shell`, `update-cursor-settings`, `update-cli-config`.
- Workflow skills: `commit`, `create-pr`, `e2e`, `fix-issue`, `generate-cursor-rules`, `init`, `preflight`, `review`, `security-audit`, `tdd`, `update-docs`.
- Delivery and collaboration skills: `babysit`, `canvas`, `split-to-prs`, `statusline`.

## Checklist By Lane

### CLI

- [x] `Supabase` -> `cli-tools/supabase/object.yaml`
- [x] `Sanity` -> `cli-tools/sanity/object.yaml`
- [x] `Turbo` -> `cli-tools/turbo/object.yaml`
- [x] `Github` -> `cli-tools/github/object.yaml`
- [x] `Shadcn` -> `cli-tools/shadcn/object.yaml`
- [x] `Stripe` -> `cli-tools/stripe/object.yaml`
- [x] `Resend` -> `cli-tools/resend/object.yaml`
- [x] `Databricks` -> `cli-tools/databricks/object.yaml`

### MCP

- [x] `Figma` -> `mcp/servers/figma/server.yaml`
- [x] `21st dev` -> `mcp/servers/21st-dev/server.yaml`
- [x] `Context7` -> `mcp/servers/context7/server.yaml`
- [x] `Supabase` -> `mcp/servers/supabase/server.yaml`

### Global Skills

- [x] `Start project` -> `skills/global/start-project/`
- [x] `Feature builder` -> `skills/global/feature-builder/`
- [x] `Supabase` -> covered by `imported.supabase` and `imported.supabase-postgres-best-practices`
- [x] `Copy writer` -> `skills/global/copy-writer/`
- [x] `Pixel-perfect UI` -> `skills/global/pixel-perfect-ui/`
- [x] `Shadcn Skill` -> covered by `imported.shadcn-ui`
- [x] `react-next best practice` -> covered by `imported.next-best-practices` and `imported.vercel-react-best-practices`
- [x] `create-commit` -> `skills/global/create-commit/`
- [x] `E2E create/run` -> `skills/global/e2e-create-run/`
- [x] `Documentation updates / drift` -> `skills/global/documentation-updates-drift/`
- [x] `Front-end design` -> `skills/global/front-end-design/`
- [x] `Research prompts` -> `skills/global/research-prompts/`
- [x] `Code guidelines / ...` -> `skills/global/code-guidelines/`
- [x] `Migration handling` -> `skills/global/migration-handling/`
- [x] `Renovate / Aikido checks` -> `skills/global/renovate-aikido-checks/`
- [x] `Sanity` -> `skills/global/sanity/`
- [x] `monorepo style - app / package creation` -> `skills/global/monorepo-style-app-package-creation/`
- [x] `Meta-data-favicons` -> `skills/global/metadata-favicons/`
- [x] `react-email-creation` -> `skills/global/react-email-creation/`
- [x] `create-translations` -> `skills/global/create-translations/`
- [x] `UI/UX review` -> `skills/global/ui-ux-review/`
- [x] `Supabase auth template update` -> `skills/global/supabase-auth-template-update/`
- [x] `Setup + auth + OAuth google` -> `skills/global/setup-auth-oauth-google/`
- [x] `Stripe` -> `skills/global/stripe/`
- [x] `create deployment checklist` -> `skills/global/create-deployment-checklist/`
- [x] `user-facing changelog` -> `skills/global/user-facing-changelog/`
- [x] `supabase init / start` -> `skills/global/supabase-init-start/`
- [x] `Resend` -> `skills/global/resend/`

### App-Specific Skills

- [x] `Create-practitioner-profile` -> `skills/app-specific/create-practitioner-profile/`
- [x] `partner onboarding` -> `skills/app-specific/partner-onboarding/`
- [x] `Databricks` -> `skills/app-specific/databricks/`
- [x] `Create sanity cms manuals` -> `skills/app-specific/create-sanity-cms-manuals/`

### Hooks And Subagents

- [x] Shell safety/preflight hook -> `.cursor/hooks/agent-shell-safety.py`
- [x] UI review subagent -> `.cursor/agents/ui-ux-reviewer.md`
- [x] migration review subagent -> `.cursor/agents/migration-reviewer.md`
- [x] dependency/security subagent -> `.cursor/agents/security-dependency-reviewer.md`
- [x] documentation drift subagent -> `.cursor/agents/documentation-drift-reviewer.md`
- [x] release/changelog subagent -> `.cursor/agents/release-changelog-writer.md`

### Workflows

- [x] Project launch from Figma -> `workflows/project-launch-from-figma/object.yaml`

### Focused Agent Packages

- [x] Frontend experience builder -> `agent-packages/frontend-experience-builder/object.yaml`
- [x] Full-stack feature operator -> `agent-packages/full-stack-feature-operator/object.yaml`
- [x] Supabase auth operator -> `agent-packages/supabase-auth-operator/object.yaml`
- [x] Content commerce operator -> `agent-packages/content-commerce-operator/object.yaml`
- [x] Dependency security maintainer -> `agent-packages/dependency-security-maintainer/object.yaml`
- [x] Release readiness coordinator -> `agent-packages/release-readiness-coordinator/object.yaml`
- [x] Data platform operator -> `agent-packages/data-platform-operator/object.yaml`
- [x] Research docs curator -> `agent-packages/research-docs-curator/object.yaml`

## Implementation Waves

1. Roadmap and inventory: keep this document current as registry assets are added.
2. High-leverage global skills: create reusable skills for starting projects, building features, commits, docs drift, research, code guidelines, UI review, and deployment checklists.
3. Tooling assets: add CLI tool and MCP server registry entries with explicit security/env metadata.
4. Hooks and subagents: use deterministic hooks for dangerous commands and subagents for review-heavy workflows.
5. App-specific skills: keep app workflow skills scoped under `skills/app-specific/` until they are generalized.
6. Focused agent packages: compose skills, MCP profiles, and CLI invocations into narrow specialist packages.

## Acceptance Criteria

- Every skill has a concise `skill.yaml` and a Cursor/Claude compatible `content/SKILL.md`.
- Every CLI object includes the command name, install hint, and related skills.
- Every MCP server has no inline secrets and marks review-required configuration.
- Every hook is executable, has a narrow event, and returns only fields supported by the event.
- Every subagent has valid frontmatter and a focused system prompt.
- Every focused agent package lists its skills, MCP servers/profile, CLI invocations, env requirements, and human-review risk.
- `pnpm registry:validate` and `pnpm registry:index` pass after registry object changes.

