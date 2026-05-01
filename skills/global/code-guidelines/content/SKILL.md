---
name: code-guidelines
description: Capture and apply project coding standards for modularity, reuse, simplicity, testing, and review. Use when creating standards or reviewing against repo conventions.
---

# Code Guidelines

## Use When
- creating or applying repo coding guidelines
- reviewing architecture, maintainability, modularity, or test strategy
- codifying project conventions into skills, rules, or docs

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to project rules, package structure, lint/test setup, and nearby implementation patterns.
4. Pay special attention to local helpers, shared contracts, and existing UI/system primitives before new abstractions.
5. Pay special attention to actionable do/don't rules with examples only where they prevent ambiguity.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: turbo for scoped checks, gh for review context.
- MCP: context7 for current framework guidance.
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
- Google engineering code review guide: https://google.github.io/eng-practices/review
- GitHub Flow and PR best practices: https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/github-flow
- Cursor Skills docs: https://cursor.sh/docs/skills

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
