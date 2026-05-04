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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - affected routes, components, actions, schemas, env, and integrations.
   - feature-folder boundaries, shallow public interfaces, service/data-access split, and small files.
   - fallow evidence for new boundary, duplication, dead-code, or complexity issues when the change is structural.
   - smallest coherent code, test, doc, and config change.
   - reviewers for UI, migration, security, docs, or release risk.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: turbo for scoped validation, gh for issue/PR context, shadcn for component additions.
- CLI: fallow for code health, architecture boundaries, dead code, and duplication checks.
- MCP: context7 for current library APIs, supabase for database/auth evidence, figma or 21st-dev for UI.
- Skills: `imported.seamless-feature-architecture` for module shape and `imported.fallow` for exact fallow command rules.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- GitHub Flow and PR best practices: https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/github-flow
- Google engineering code review guide: https://google.github.io/eng-practices/review
- pnpm workspaces and Turborepo: https://pnpm.io/workspaces and https://turborepo.com/docs/crafting-your-repository/structuring-a-repository

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
