---
name: e2e-create-run
description: Create or run end-to-end tests for user-facing workflows and critical paths. Use when validating browser behavior, regressions, onboarding, auth, checkout, or key product flows.
---

# E2E Create Run

## Use When
- adding or running E2E coverage
- validating a critical path after implementation
- debugging browser behavior that unit tests cannot cover

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to smallest user journey that proves behavior.
4. Pay special attention to role, label, text, or test-id locators.
5. Pay special attention to web-first assertions plus trace/screenshot output for failures.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: turbo for test orchestration; gh for CI results if validating PRs.
- MCP: browser automation when manual visual verification is required.
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
- Playwright best practices: https://playwright.dev/docs/best-practices

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
