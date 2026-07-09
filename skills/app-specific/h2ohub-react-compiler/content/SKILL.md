---
name: h2ohub-react-compiler
description: Keep h2ohub-next client components compilable by the React Compiler (reactCompiler enabled). Use when writing or modifying client components, handling try/catch or loading-state cleanup, tempted to add useMemo/useCallback, or triaging react-hooks/todo or preserve-manual-memoization ESLint diagnostics.
---

# H2OHub React Compiler Discipline

## Use When
- writing or modifying any `"use client"` component in h2ohub-next
- adding try/catch, loading-state cleanup, or toast-based error handling
- about to add `useMemo`/`useCallback`, or seeing `react-hooks/preserve-manual-memoization`
- triaging `react-hooks/todo` (BuildHIR bail-out) warnings from `pnpm lint`

## Workflow
1. Model expected outcomes without `throw` inside `try`. Branch on `result.error`, missing `result.data`, or validation checks; show `toast.error(...)` and `return`. Reserve `catch` for unexpected failures and format via `parseErrorMessage(error)` from `@/lib/utils`. Done when no `throw` remains inside a `try` body for a modelled outcome.
2. Eliminate `finally`. Duplicate the cleanup call (e.g. `setIsLoading(false)`) at the end of `try`, the end of `catch`, and before every early `return` inside `try`; extract complex cleanup into a named function. Done when no `finally` block remains and every exit path runs cleanup.
3. Purge value blocks from `try`/`catch` bodies: `obj?.prop` → nested `if`; `a ?? b` → `if/else` or hoist before `try`; `cond ? x : y` → hoist or `if/else`; `a && b` → nested `if`; `for...of` in `try` → extract the loop into a helper called from `try`. Done when the `try` body contains only plain statements and calls.
4. Fix the render-adjacent bans: no dynamic `await import(...)` in component code (use a static top-of-file import), no function call or `new` in prop destructuring defaults (move into the body: `const x = xProp ?? fn()`), no `++`/`--` inside callbacks (use `for...of` or derive the count), and replace `new Promise(async (resolve, reject) => ...)` with an async IIFE. Done when none of these constructs appear in the changed components.
5. Do not hand-add `useMemo`/`useCallback` for referential stability — the compiler memoizes automatically. On a `preserve-manual-memoization` warning, delete the memo hook entirely; never "fix" its dependency array. Done when the diff adds no new memo hooks and flagged ones are removed.
6. Check compliance with `pnpm lint` (eslint + `tsc --noemit`). `react-hooks/todo`, `use-memo`, and `preserve-manual-memoization` warn (the compiler silently skips those components — still fix them in touched code); `rule-suppression` is an error, so never add `eslint-disable` comments for react-hooks rules. Regenerate the bail-out inventory with `node scripts/gen-react-compiler-todo-report.mjs`. Done when `pnpm lint` reports no new react-hooks diagnostics for the changed files.

## Tools And Sources
- Workarounds catalogue: `docs/architecture/react-compiler-workarounds.md` (before/after for every pattern, quick-reference tables)
- Error taxonomy: `docs/architecture/react-compiler-eslint-errors.md`
- Enforced editor rule: `.cursor/rules/10-react-compiler-patterns.mdc`
- Config: `next.config.ts` (`reactCompiler: true`), `eslint.config.mjs` (react-hooks rule severities)
- Tracking report: `docs/architecture/react-compiler-todo-report.md`, regenerated via `node scripts/gen-react-compiler-todo-report.mjs`

## Validation
- `pnpm lint` shows zero new `react-hooks/todo` or `react-hooks/preserve-manual-memoization` warnings on changed files.
- `grep -n "finally" <changed client components>` returns nothing; `grep -n "useMemo\|useCallback"` on the diff adds no hooks.
- No `eslint-disable` for react-hooks rules in the diff (`react-hooks/rule-suppression` would fail the lint as an error).

## Reference Anchors
- `AGENTS.md` — "React Compiler discipline" rule
- `docs/architecture/react-compiler-workarounds.md`
- `.cursor/rules/10-react-compiler-patterns.mdc`

## Output
- Changed client components free of compiler bail-out patterns, with result-based error handling and no manual memoization.
- `pnpm lint` result for the touched files reported.
