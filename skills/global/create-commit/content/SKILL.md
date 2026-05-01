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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - status, staged/unstaged diff, untracked files, and recent commit style.
   - only files relevant to the requested change.
   - heredoc commit message without bypassing hooks.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: git and gh only as needed.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- Git commit documentation: https://git-scm.com/docs/git-commit

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
