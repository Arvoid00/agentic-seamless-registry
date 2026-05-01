---
name: create-commit
description: Prepare a focused git commit by reviewing diffs, selecting relevant files, and writing a concise message. Use only when the user asks to commit or prepare commit-ready changes.
---

# Create Commit

## Use When
- the user asks to create, prepare, or review a commit
- splitting unrelated changes before a commit
- writing a commit message from a diff

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to status, staged/unstaged diff, untracked files, and recent commit style.
4. Pay special attention to only files relevant to the requested change.
5. Pay special attention to heredoc commit message without bypassing hooks.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: git and gh only as needed.
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
- GitHub CLI PRs/releases/checks: https://cli.github.com/manual/gh_pr_create, https://cli.github.com/manual/gh_pr_checks, https://cli.github.com/manual/gh_release_create

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
