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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - changed behavior and affected audiences.
   - nearby docs, README files, ADRs, runbooks, examples, and generated references.
   - canonical source hierarchy and links instead of duplicated details.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: gh for PR/release context, turbo for docs checks if present.
- MCP: context7 for current external docs; supabase when DB/auth docs are involved.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- GitHub CLI PRs/releases/checks: https://cli.github.com/manual/gh_pr_create, https://cli.github.com/manual/gh_pr_checks, https://cli.github.com/manual/gh_release_create

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
