---
name: lint-format-standard
description: Enforce the Seamless ESLint + Prettier + TypeScript configuration standard. Use when setting up lint/format/typecheck tooling in a repo, auditing a repo against the standard, or reviewing changes to eslint.config.*, tsconfig, .prettierrc, or package.json scripts.
---

# Lint Format Standard

## Use When
- setting up ESLint, Prettier, or TypeScript tooling in a new or existing repo
- auditing a repo's lint/format/typecheck setup against the fleet standard
- reviewing changes to `eslint.config.*`, `tsconfig*.json`, `.prettierrc*`, or `package.json` scripts

## Workflow
1. Enforce pnpm as the only package manager: root `package.json` pins `"packageManager": "pnpm@<version>"` and no other lockfile exists. Done when `jq -r .packageManager package.json` prints `pnpm@…` and `ls package-lock.json yarn.lock` matches nothing.
2. Enforce Node engines: root `package.json` declares `"engines": {"node": ">=22"}` or stricter. Done when `jq -r .engines.node package.json` prints `>=22` or higher.
3. Enforce strict TypeScript: resolved tsconfig has `strict: true`, `noUncheckedIndexedAccess: true`, `isolatedModules: true`, `skipLibCheck: true`, target `ES2022`. Monorepos extend a shared config package with `base.json` / `nextjs.json` / `react-library.json` variants (seed: `PWN-NBS-Community/packages/typescript-config`, analog `seamless-agent-os/packages/tsconfig`). Done when `pnpm exec tsc --noEmit` passes and `pnpm exec tsc --showConfig` shows the four flags.
4. Enforce flat ESLint config: `eslint.config.mjs` exists, no legacy `.eslintrc.*` remains. Layer order: `@eslint/js` recommended → framework config (`eslint-config-next` flat for Next.js apps) → `typescript-eslint` recommended → project rules → `eslint-config-prettier` last. Monorepos publish a shared `@workspace/eslint-config` with `base` / `next-js` / `react-internal` exports (seed: `PWN-NBS-Community/packages/eslint-config`); single apps follow `h2ohub-next/eslint.config.mjs`. Rule violations are errors, not blanket warnings. Done when `pnpm exec eslint .` exits 0 and `ls .eslintrc*` matches nothing.
5. Enforce committed Prettier config: `.prettierrc.json` in the repo root, seeded from `h2ohub-next/.prettierrc.json` (printWidth 100, tabWidth 4, semi true, singleQuote false, trailingComma es5, proseWrap always). Done when the file exists and `pnpm exec prettier --check .` exits 0.
6. Enforce required scripts in `package.json`: `lint` (ESLint plus typecheck, e.g. `eslint . && pnpm check-types`), `typecheck` or `check-types` (`tsc --noEmit`), `format` (`prettier --write .`). Monorepo roots fan out via `turbo lint` / `turbo typecheck`; each workspace exposes `lint: eslint .` and `typecheck: tsc --noEmit`. Done when `pnpm lint` and `pnpm run typecheck` (or `check-types`) both execute and pass, and a `format` script exists.
7. Remove drift: delete legacy `.eslintrc.*` files, unpinned package managers, or duplicate local configs that shadow the shared packages. Done when `find . -name '.eslintrc*' -not -path '*/node_modules/*'` returns nothing.

## Tools And Sources
- Seed packages: `PWN-NBS-Community/packages/eslint-config` (flat `base.js`, `next.js`, `react-internal.js`), `PWN-NBS-Community/packages/typescript-config` (`base.json`, `nextjs.json`, `react-library.json`).
- Single-app reference: `h2ohub-next/eslint.config.mjs` (eslint-config-next 16 native flat configs + react-hooks compiler rules + prettier last) and `h2ohub-next/.prettierrc.json`.
- Monorepo script reference: `seamless-agent-os/package.json` (`turbo lint`, `turbo typecheck`, `format`, `format:check`).
- Skills: `global.code-guidelines` for architecture and review standards beyond tooling config.

## Validation
- `jq -r '.packageManager, .engines.node' package.json` → `pnpm@…` and `>=22`.
- `pnpm exec tsc --noEmit` and `pnpm exec eslint .` exit 0.
- `pnpm exec prettier --check .` exits 0 and `.prettierrc.json` is committed.
- `jq -r '.scripts | keys[]' package.json` includes `lint`, `format`, and `typecheck` or `check-types`.
- `find . -name '.eslintrc*' -not -path '*/node_modules/*'` returns nothing.

## Reference Anchors
- ESLint flat config: https://eslint.org/docs/latest/use/configure/configuration-files
- typescript-eslint setup: https://typescript-eslint.io/getting-started
- Prettier options: https://prettier.io/docs/options

## Output
- Per-rule audit table (pass/fail with the command run) or the config diff applied.
- Ratification decision: Node `>=22` (h2ohub-next, seamless-agent-os) chosen over `>=20` (PWN-NBS-Community).
- Ratification decision: committed `.prettierrc.json` per h2ohub-next chosen over unconfigured Prettier defaults (PWN-NBS-Community, seamless-agent-os).
- Ratification decision: errors-by-default chosen over `eslint-plugin-only-warn` (PWN-NBS-Community `base.js` downgrades all rules to warnings).
- Known drift to flag: `PWN-NBS-Community/.eslintrc.js` is legacy eslintrc referencing a non-existent `library.js` export — mark for removal.
- Known drift to flag: `h2ohub-next/tsconfig.json` targets `es2015` and lacks `noUncheckedIndexedAccess`; `h2ohub-next/package.json` has no `format` script; `PWN-NBS-Community` root `package.json` has no `typecheck` script.
