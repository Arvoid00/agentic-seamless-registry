---
name: feature-builder
description: Build or extend product functionality through discovery, scoped implementation, validation, and review. Use when the user asks to add a feature, modify a workflow, or complete an implementation slice.
---

# Feature Builder

## Use When
- building or extending product functionality
- turning requirements into code changes across app/package boundaries
- coordinating implementation with tests, docs, and review

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to affected routes, components, actions, schemas, env, and integrations.
4. Pay special attention to smallest coherent code, test, doc, and config change.
5. Pay special attention to reviewers for UI, migration, security, docs, or release risk.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: turbo for scoped validation, gh for issue/PR context, shadcn for component additions.
- MCP: context7 for current library APIs, supabase for database/auth evidence, figma or 21st-dev for UI.
- Use Context7 or official docs before relying on memory for provider APIs, framework conventions, or CLI flags.

## Guardrails
- Keep secrets in environment variables or provider dashboards; never inline them in skill, MCP, CLI, or docs assets.
- Prefer existing imported skills and local conventions before creating duplicate guidance.
- Escalate for destructive operations, production data, billing, auth, migrations, security findings, and external sends.

## Validation
- Name the exact command, browser check, docs review, or manual verification performed.
- If validation cannot run, state why and what evidence should be gathered next.
- For UI or content work, include empty/error/loading and edge-case review where relevant.

## Reference Anchors
- GitHub Flow and PR best practices: https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/github-flow
- Google engineering code review guide: https://google.github.io/eng-practices/review
- pnpm workspaces and Turborepo: https://pnpm.io/workspaces and https://turborepo.com/docs/crafting-your-repository/structuring-a-repository
- Cursor Skills docs: https://cursor.sh/docs/skills

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
