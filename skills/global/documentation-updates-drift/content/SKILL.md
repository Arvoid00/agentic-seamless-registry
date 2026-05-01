---
name: documentation-updates-drift
description: Detect and update documentation that may drift from code, configuration, APIs, setup, or product behavior. Use after code, workflow, schema, env, or release changes.
---

# Documentation Updates Drift

## Use When
- code changes affect setup, APIs, UI flows, commands, env vars, or user behavior
- reviewing docs for drift before a PR or release
- creating docs updates from implementation changes

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to changed behavior and affected audiences.
4. Pay special attention to nearby docs, README files, ADRs, runbooks, examples, and generated references.
5. Pay special attention to canonical source hierarchy and links instead of duplicated details.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: gh for PR/release context, turbo for docs checks if present.
- MCP: context7 for current external docs; supabase when DB/auth docs are involved.
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
- GitHub CLI PRs/releases/checks: https://cli.github.com/manual/gh_pr_create, https://cli.github.com/manual/gh_pr_checks, https://cli.github.com/manual/gh_release_create

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
