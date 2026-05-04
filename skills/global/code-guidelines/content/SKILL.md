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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - project rules, package structure, lint/test setup, and nearby implementation patterns.
   - local helpers, shared contracts, and existing UI/system primitives before new abstractions.
   - feature folders, lean routes, service/data-access boundaries, shallow interfaces, and separate schema/type files.
   - fallow evidence for dead code, duplicated logic, circular imports, complexity hotspots, and boundary violations.
   - actionable do/don't rules with examples only where they prevent ambiguity.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: turbo for scoped checks, gh for review context.
- CLI: fallow for codebase health, duplication, dependency, and architecture-boundary evidence.
- MCP: context7 for current framework guidance.
- Skills: `imported.seamless-feature-architecture` for architecture shape and `imported.fallow` for exact fallow usage.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- Google engineering code review guide: https://google.github.io/eng-practices/review
- GitHub Flow and PR best practices: https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/github-flow

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
