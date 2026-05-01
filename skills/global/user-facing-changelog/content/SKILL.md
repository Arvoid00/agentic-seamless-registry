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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - merged PRs, issues, user impact, screenshots if relevant, and known issues.
   - Added, Changed, Fixed, Deprecated, Removed, Security groupings.
   - action required, rollout scope, plan limits, migration steps, and approved security wording.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: gh release/pr/issue commands.
- MCP: context7 only when product docs need current terminology.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- Keep a Changelog and GitHub Releases: https://keepachangelog.com/en/1.1.0/ and https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
