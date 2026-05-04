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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - workspace globs, package naming conventions, shared tsconfig, lint/test scripts, and existing exports.
   - app vs shared package vs generated template vs existing module decision.
   - explicit package.json, exports, types, scripts, and dependency boundaries.
   - shallow package/feature interfaces and fallow evidence for circular imports, duplicated modules, or boundary drift.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: pnpm filters, turbo affected/query, gh for PR context.
- CLI: fallow for workspace boundary, duplication, dead-code, and dependency placement checks.
- Skills: `imported.seamless-feature-architecture` for module shape and `imported.fallow` for exact fallow usage.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- pnpm workspaces and Turborepo: https://pnpm.io/workspaces and https://turborepo.com/docs/crafting-your-repository/structuring-a-repository

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
