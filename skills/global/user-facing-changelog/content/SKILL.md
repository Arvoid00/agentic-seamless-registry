---
name: user-facing-changelog
description: Write user-facing changelog entries from code changes, PRs, or release notes. Use for release communication, customer updates, and product announcements.
---

# User Facing Changelog

## Use When
- preparing user-facing release communication
- turning PRs or commits into release notes
- writing changelog entries for non-technical readers

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to merged PRs, issues, user impact, screenshots if relevant, and known issues.
4. Pay special attention to Added, Changed, Fixed, Deprecated, Removed, Security groupings.
5. Pay special attention to action required, rollout scope, plan limits, migration steps, and approved security wording.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: gh release/pr/issue commands.
- MCP: context7 only when product docs need current terminology.
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
- Keep a Changelog and GitHub Releases: https://keepachangelog.com/en/1.1.0/ and https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases
- GitHub CLI PRs/releases/checks: https://cli.github.com/manual/gh_pr_create, https://cli.github.com/manual/gh_pr_checks, https://cli.github.com/manual/gh_release_create

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
