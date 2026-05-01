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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - smallest user journey that proves behavior.
   - role, label, text, or test-id locators.
   - web-first assertions plus trace/screenshot output for failures.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: turbo for test orchestration; gh for CI results if validating PRs.
- MCP: browser automation when manual visual verification is required.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- Playwright best practices: https://playwright.dev/docs/best-practices

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
