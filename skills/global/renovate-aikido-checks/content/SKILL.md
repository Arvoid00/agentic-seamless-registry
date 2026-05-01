---
name: renovate-aikido-checks
description: Triage dependency updates and security findings from Renovate, Aikido, or similar tools. Use for dependency PRs, vulnerability alerts, reachability review, and safe remediation.
---

# Renovate Aikido Checks

## Use When
- reviewing dependency update PRs or vulnerability alerts
- deciding whether to merge, group, defer, or remediate security findings
- validating Renovate or Aikido configuration changes

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to patch/minor/major, production/dev dependency, reachable/unreachable, exploitability, and ecosystem risk.
4. Pay special attention to changelog, release notes, advisory, lockfile diff, and CI output.
5. Pay special attention to ignore reason, scope, expiry, and compensating controls for suppressed findings.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: gh for PR/checks, turbo for targeted tests, npx renovate-config-validator for config.
- MCP: context7 for migration docs.
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
- Renovate dashboard/scheduling/automerge/validation: https://docs.renovatebot.com/key-concepts/dashboard/
- Aikido reachability, ignores, AutoFix: https://help.aikido.dev/getting-started/reachability-analysis/introduction-to-reachability-analysis
- GitHub CLI PRs/releases/checks: https://cli.github.com/manual/gh_pr_create, https://cli.github.com/manual/gh_pr_checks, https://cli.github.com/manual/gh_release_create

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
