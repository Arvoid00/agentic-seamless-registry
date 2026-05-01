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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - patch/minor/major, production/dev dependency, reachable/unreachable, exploitability, and ecosystem risk.
   - changelog, release notes, advisory, lockfile diff, and CI output.
   - ignore reason, scope, expiry, and compensating controls for suppressed findings.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: gh for PR/checks, turbo for targeted tests, npx renovate-config-validator for config.
- MCP: context7 for migration docs.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- Renovate dashboard/scheduling/automerge/validation: https://docs.renovatebot.com/key-concepts/dashboard/
- Aikido reachability, ignores, AutoFix: https://help.aikido.dev/getting-started/reachability-analysis/introduction-to-reachability-analysis
- GitHub CLI PRs/releases/checks: https://cli.github.com/manual/gh_pr_create, https://cli.github.com/manual/gh_pr_checks, https://cli.github.com/manual/gh_release_create

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
