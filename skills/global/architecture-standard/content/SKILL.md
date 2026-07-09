---
name: architecture-standard
description: Enforce Seamless architecture rules - deep modules behind shallow interfaces, feature folders with thin routes, pnpm/Turborepo monorepo layout, package boundaries. Use when reviewing code structure, planning a feature or package, or auditing architecture boundaries.
---

# Architecture Standard

## Use When
- reviewing a diff or plan for structural compliance
- deciding where new code lives: feature folder, service, package, or route
- auditing a repo for boundary, layering, or monorepo-layout drift

## Workflow
1. Map the repo shape. Monorepo when root `package.json` has `"packageManager": "pnpm@..."`, a `pnpm-workspace.yaml`, and `turbo.json` (reference: seamless-agent-os); single app otherwise (reference: h2ohub-next). Locate the feature root (`features/` or `src/features/`). Done when shape and feature root are named.
2. Enforce feature folders and thin routes. Product behavior lives in `features/<domain>/`; `route.ts`, `page.tsx`, and Server Actions only parse input, enforce session concerns, call one feature/service function, and map the result. Business rules never sit in routes or React components. Done when every touched route body is parse -> one call -> respond, verified by reading each touched route.
3. Enforce shallow interfaces. Feature modules are consumed through their public module files — `features/<domain>/queries`, `mutations`, `query-options`, `hooks`, `types` (the ratified data-access split; h2ohub features expose no `index.ts` barrel and none is required) — or a named package export. Banned: importing a feature's internal helpers from outside it — transaction wrappers (`utils.ts`), private utils, `_components` — and broad barrels re-exporting internals. Apply the deletion test from `imported.improve-codebase-architecture` to suspected pass-through modules. Done when `git diff <base> -- app components src/app | grep -nE "from ['\"]@?/?features/[a-z-]+/(utils|_)"` returns nothing — this check is diff-relative and only matches internal-helper imports (`utils`, underscore-prefixed paths), not the public module files.
4. Enforce separation of concerns and file size. Data access sits in the feature's data files (rule detail: `global.data-access-standard`); orchestration in `service.ts`; schemas/types in their own files. Split any file past roughly 200 LOC that mixes route parsing, business rules, data access, or presentation. Done when no touched file mixes two of those concerns, checked per file in the diff.
5. Monorepo layout norms (monorepos only). Apps under `apps/`, shared code under `packages/` with a scope name (`@seamless/*` shape); internal deps use `workspace:*`; packages declare an explicit `exports` map in one of the accepted shapes — a `"."` entry with conditional-export objects (`{ "types": "./src/index.ts", "import": "./dist/index.js", ... }`, per seamless-agent-os `packages/contracts` and `packages/db`) or a subpath-only map with no `"."` entry where consumers import subpaths (PWN `packages/ui` exposes only `./components/*`, `./lib/*`, `./hooks/*`, styles); tsconfigs extend the shared tsconfig package; dependency graph stays acyclic with `contracts`/`tsconfig`-style leaf packages. Creation mechanics: `global.monorepo-style-app-package-creation`. Done when `grep -rn '"@' apps/*/package.json packages/*/package.json | grep -E '"[~^0-9]' | grep "@seamless/"` (replace `@seamless` with the repo's workspace scope) returns nothing (no internal dep pinned instead of `workspace:*`).
6. Audit with fallow on changed code: architecture boundaries, circular dependencies, duplication (exact usage: `imported.fallow`). Done when the run reports no new boundary or circular-dependency findings against the base ref.

## Tools And Sources
- Skills: `imported.improve-codebase-architecture` (deep/shallow vocabulary, deletion test), `imported.seamless-feature-architecture` (feature-folder shape, Next.js placement), `global.monorepo-style-app-package-creation` (creating apps/packages), `imported.fallow` (boundary/circular/duplication commands), `global.data-access-standard` (data layer rules).
- Reference implementations: `seamless-agent-os/AGENTS.md` (workspace layout, dependency graph), `h2ohub-next/AGENTS.md` + `docs/architecture/feature-module-pattern.md` (feature modules in a single app).
- Commands: `test -f turbo.json && test -f pnpm-workspace.yaml`, `pnpm ls --depth -1 -r` (workspace inventory).

## Validation
- Step 3 diff-relative grep for feature-internal imports (`utils`, underscore-prefixed) returns nothing.
- Step 5 grep finds no internal dependency declared without `workspace:*` (monorepos).
- fallow changed-code audit shows no new boundary or circular-dependency findings.
- Every touched route/page reads as parse -> one call -> respond.
- No touched file past ~200 LOC mixes route parsing, business rules, data access, or presentation.

## Reference Anchors
- `seamless-agent-os/CLAUDE.md` "Workspace layout" and "Conventions" (exports, tsconfig, workspace protocol)
- `h2ohub-next/docs/architecture/feature-module-pattern.md`
- pnpm workspaces / Turborepo: https://pnpm.io/workspaces and https://turborepo.com/docs/crafting-your-repository/structuring-a-repository

## Output
- Pass/fail per rule (steps 2-6) with the exact command or file evidence for each failure.
- Ratification decision: seamless-agent-os monorepo norms (apps/+packages/, `workspace:*`, shared tsconfig package, explicit `exports` maps in the step-5 accepted shapes) adopted over single-app layouts as the monorepo standard; ~200 LOC split threshold adopted from `imported.seamless-feature-architecture`; feature-folder-with-thin-routes adopted from h2ohub-next/seamless-feature-architecture over NBS's flat `lib/` modules.
