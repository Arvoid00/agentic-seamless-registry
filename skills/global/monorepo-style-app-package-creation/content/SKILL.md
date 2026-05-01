---
name: monorepo-style-app-package-creation
description: Create apps and packages that match pnpm/Turborepo monorepo conventions. Use when adding workspaces, shared packages, or reusable modules.
---

# Monorepo Style App Package Creation

## Use When
- adding a workspace app, package, or shared module
- moving duplicated code into a package
- setting up package exports, scripts, or workspace dependencies

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to workspace globs, package naming conventions, shared tsconfig, lint/test scripts, and existing exports.
4. Pay special attention to app vs shared package vs generated template vs existing module decision.
5. Pay special attention to explicit package.json, exports, types, scripts, and dependency boundaries.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: pnpm filters, turbo affected/query, gh for PR context.
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
- pnpm workspaces and Turborepo: https://pnpm.io/workspaces and https://turborepo.com/docs/crafting-your-repository/structuring-a-repository

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
