---
name: design-system-standard
description: Enforceable Seamless design standard — shadcn/ui on Radix with Tailwind v4, a shared packages/ui, the Seamless design register, and review gates. Use when building or reviewing UI, auditing a repo against the design baseline, or deciding where a component lives.
---

# Design System Standard

## Use When
- building or changing UI in any Seamless app
- auditing a repo against the fleet design baseline
- deciding whether a component belongs in shared `packages/ui` or the app

## Workflow
1. Locate the design system: `components.json` at the repo root for single apps (`h2ohub-next`) or in `packages/ui/` for monorepos (`PWN-NBS-Community`, `seamless-agent-os`); note its `style` and `aliases`. Done when the ui package path, shadcn style, and import alias are known.
2. Enforce the baseline rules:
   - shadcn/ui on Radix is the only component library: `components.json` present; `radix-ui` (or `@radix-ui/*`) a dependency of the ui package; no `@mui/*`, `@chakra-ui/*`, `antd`, `@mantine/*`, or `bootstrap` anywhere.
   - Tailwind v4, CSS-first: `"tailwindcss"` resolves to 4.x; tokens live in `globals.css` under `@theme`; no `tailwind.config.{js,ts}` in new code.
   - Monorepos: UI primitives import only from the shared package (`@workspace/ui/components/*` in PWN-NBS-Community, `@seamless/ui/components/*` in seamless-agent-os); apps never scaffold their own `components/ui/`.
   - New primitives enter via `pnpm dlx shadcn@latest add <component>` into the ui package and are customized there, not forked into apps.
   Done when every Validation command below passes or each failure is listed with file and fix.
3. Design in the Seamless register — "Seamless, fancy, modern, minimal, Silicon Valley funded startup, fluid, highest level UI/UX" — using `global.front-end-design` for composition, `imported.shadcn-ui` for component work, and `global.pixel-perfect-ui` for fidelity. Done when the change uses only shared primitives and `@theme` tokens, with no hardcoded hex/px one-offs.
4. Implement from Figma when a design exists: pull context through the `figma` MCP server (registry `mcp/servers/figma`) and its skills rather than eyeballing screenshots. Done when the UI traces to a Figma node or the absence of a Figma source is recorded in the PR.
5. Gate before UI ships: run `global.ui-ux-review` plus the repo's `web-design-guidelines` skill (`.agents/skills/web-design-guidelines/`); new routes also pass `global.metadata-favicons`. Done when both reviews produced findings and blockers are fixed or explicitly waived.

## Tools And Sources
- Skills: `global.front-end-design`, `global.pixel-perfect-ui`, `global.ui-ux-review`, `global.metadata-favicons`, `imported.shadcn-ui` — this standard sequences and gates them; it never restates their content.
- Repo-local skills: `web-design-guidelines` (PWN-NBS-Community and h2ohub-next `.agents/skills/`), `frontend-design` (h2ohub-next, seamless-agent-os).
- CLI: `shadcn` (registry `cli-tools/shadcn`); pnpm only.
- Reference implementations: `PWN-NBS-Community/packages/ui/` (style `radix-nova`), `seamless-agent-os/packages/ui/` (style `radix-mira`).

## Validation
- `test -f components.json || test -f packages/ui/components.json` — shadcn config present.
- `grep -h '"tailwindcss"' package.json packages/ui/package.json 2>/dev/null | grep -q '4\.'` — Tailwind v4.
- `ls tailwind.config.* packages/ui/tailwind.config.* 2>/dev/null` — no matches (CSS-first; grandfathered only in `h2ohub-next`).
- `grep -rl --include=package.json -E '@mui/|@chakra-ui/|"antd"|@mantine/|"bootstrap"' . | grep -v node_modules` — empty.
- Monorepos: `grep -rn "components/ui/" apps --include='*.tsx'` — empty; primitives resolve through the shared ui alias in `components.json`.

## Reference Anchors
- shadcn/ui docs: https://ui.shadcn.com/docs
- Tailwind v4 CSS-first theming: https://tailwindcss.com/docs/theme
- Ratified standards taxonomy: `agentic-seamless-registry/docs/standards-taxonomy.md`

## Output
- Pass/fail per Validation rule with file paths, plus fixes applied or a violation list.
- Ratification decision: Tailwind v4 CSS-first (`@theme` in `globals.css`, no `tailwind.config.*`) adopted from `PWN-NBS-Community` and `seamless-agent-os`; `h2ohub-next`'s `tailwind.config.js` + `new-york` style is grandfathered, not a template for new repos.
- Ratification decision: the standard is the `packages/ui` path, `./components/*` export shape, and the `radix-ui` monopackage with a `radix-*` components.json style; the package name follows the repo namespace (`@workspace/ui`, `@seamless/ui`).
