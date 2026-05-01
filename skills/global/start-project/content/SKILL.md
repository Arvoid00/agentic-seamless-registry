---
name: start-project
description: Plan and bootstrap new apps, packages, prototypes, or workspaces with repo conventions, setup checks, and a first milestone. Use when starting greenfield work, a new monorepo workspace, or a prototype that must become maintainable.
---

# Start Project

## Use When
- starting a new app, package, prototype, or workspace
- turning a loose product idea into an implementation plan
- choosing initial folders, package boundaries, CLI setup, and validation commands

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to target user, success criteria, deployment target, data/auth needs, non-goals.
4. Pay special attention to repo conventions, package manager, workspace layout, scripts, env schema, shared UI, tests, docs.
5. Pay special attention to smallest first milestone with a working path from local dev to verification.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: turbo for workspace tasks, gh for repo/issue context, shadcn only if UI components are needed.
- MCP: context7 for framework docs, 21st-dev for UI patterns, figma when a design exists.
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
- Cursor Skills docs: https://cursor.sh/docs/skills
- pnpm workspaces and Turborepo: https://pnpm.io/workspaces and https://turborepo.com/docs/crafting-your-repository/structuring-a-repository
- GitHub Flow and PR best practices: https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/github-flow

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
