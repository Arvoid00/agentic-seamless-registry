---
name: git-ai-hooks
description: Enforce the Seamless git pre-commit and Claude Code hook standard. Use when adding pre-commit hooks to a repo, wiring lint-staged or typecheck into commits, configuring .claude/settings.json hooks for post-edit lint, or auditing a repo's hook setup.
---

# Git AI Hooks

## Use When
- adding or auditing git pre-commit hooks in a fleet repo
- wiring post-edit lint into Claude Code via `.claude/settings.json` hooks
- deciding what runs at commit time versus agent edit time

## Workflow
1. Audit current state: `ls -d .husky lefthook.yml 2>/dev/null; jq -r '.scripts.prepare, ."lint-staged", ."simple-git-hooks"' package.json; [ -f .claude/settings.json ] && jq '.hooks' .claude/settings.json || echo none`. Fleet reality (audited 2026-07-03): none of h2ohub-next, PWN-NBS-Community, seamless-agent-os has husky, lefthook, simple-git-hooks, lint-staged, a `prepare` script, or `.claude/settings.json` hooks — this standard is a ratified proposal, not an existing practice. Done when the repo's current runner (or its absence) is recorded.
2. Install the runner: `pnpm add -D husky lint-staged`, add `"prepare": "husky"` to scripts, run `pnpm exec husky init`. Done when `.husky/pre-commit` exists and a fresh `pnpm install` reinstalls the hooks.
3. Configure pre-commit: `.husky/pre-commit` contains `pnpm exec lint-staged` followed by the repo's typecheck script (`pnpm check-types` in h2ohub-next, `pnpm typecheck` in seamless-agent-os; PWN-NBS-Community's root has no typecheck script — wire the repo's equivalent, e.g. `pnpm -r --if-present typecheck`, or add the root script first). Add to `package.json`: `"lint-staged": {"*.{ts,tsx,js,jsx,mjs}": ["eslint --fix", "prettier --write"], "*.{json,md,css}": ["prettier --write"]}`. Done when staging a file with a deliberate type or lint error blocks `git commit`, and reverting it unblocks.
4. Write commits via `global.create-commit` — heredoc message, hooks never bypassed. Done when `grep -r -- --no-verify .husky scripts package.json` returns nothing.
5. Add Claude Code post-edit lint to `.claude/settings.json`: a `PostToolUse` hook with matcher `Edit|Write` running `jq -r '.tool_input.file_path' | { read f; case "$f" in *.ts|*.tsx|*.js|*.jsx|*.mjs) pnpm exec eslint "$f";; esac; }`. Merge into existing settings — h2ohub-next has a `permissions` block and seamless-agent-os an `enabledPlugins` block; do not overwrite them. Done when `jq '.hooks.PostToolUse' .claude/settings.json` is non-null and an agent edit to a file with a lint error surfaces the ESLint output.
6. Verify end-to-end: make a throwaway branch, commit a clean change (hook passes), attempt a commit with a lint error (hook fails). Done when both outcomes are observed and the branch is deleted.

## Tools And Sources
- Runner: husky + lint-staged (ratified below); commands `pnpm exec husky init`, `pnpm exec lint-staged`.
- Lint/typecheck commands the hooks invoke: `global.lint-format-standard`.
- Commit workflow: `global.create-commit` (do not restate it here).
- Audited files: `h2ohub-next/.claude/settings.json` (permissions only), `seamless-agent-os/.claude/settings.json` (enabledPlugins only), PWN-NBS-Community `.claude/` (skills only, no settings.json); no `.husky/`, `lefthook.yml`, or lint-staged config in any of the three.
- Adjacent guardrails: `h2ohub-next/.cursor/rules/` holds enforced editor rules — hooks complement, not replace, them.

## Validation
- `.husky/pre-commit` exists, is executable, and contains `lint-staged` plus the typecheck script.
- `jq '."lint-staged"' package.json` is non-null; `jq -r '.scripts.prepare' package.json` prints `husky`.
- A staged lint error blocks `git commit`; a clean commit passes.
- `jq '.hooks.PostToolUse' .claude/settings.json` is non-null.
- `grep -r -- --no-verify .husky scripts package.json` returns nothing.

## Reference Anchors
- husky: https://typicode.github.io/husky/
- lint-staged: https://github.com/lint-staged/lint-staged
- Claude Code hooks: https://docs.anthropic.com/en/docs/claude-code/hooks

## Output
- Audit result (runner found or absent, `.claude/settings.json` hook state) and the diff applied.
- Ratification decision: husky + lint-staged adopted as the fleet pre-commit runner — no fleet repo had any git hook runner as of 2026-07-03, so this is a proposed standard, chosen over lefthook and simple-git-hooks for pnpm `prepare` integration and ecosystem maturity.
- Ratification decision: Claude Code `PostToolUse` ESLint hook adopted — no fleet repo has `.claude/settings.json` hooks today; this is a proposal, not codification of existing practice.
