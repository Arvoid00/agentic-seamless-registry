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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - target user, success criteria, deployment target, data/auth needs, non-goals.
   - repo conventions, package manager, workspace layout, scripts, env schema, shared UI, tests, docs.
   - smallest first milestone with a working path from local dev to verification.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: turbo for workspace tasks, gh for repo/issue context, shadcn only if UI components are needed.
- MCP: context7 for framework docs, 21st-dev for UI patterns, figma when a design exists.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- pnpm workspaces and Turborepo: https://pnpm.io/workspaces and https://turborepo.com/docs/crafting-your-repository/structuring-a-repository
- GitHub Flow and PR best practices: https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/github-flow

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
