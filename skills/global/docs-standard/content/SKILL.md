---
name: docs-standard
description: Enforceable Seamless documentation standard — required repo docs (AGENTS.md, CLAUDE.md pointer, README, ADRs, CONTEXT.md glossary, run logs) and the procedures that maintain them. Use when auditing a repo's docs, bootstrapping docs in a new repo, or deciding where an architecture decision or domain term is recorded.
---

# Docs Standard

## Use When
- auditing a repo against the fleet documentation baseline
- bootstrapping docs in a new or undocumented repo
- deciding where to record an architecture decision, domain term, or run log

## Workflow
1. Inventory against the baseline. Every repo MUST have: `AGENTS.md` (canonical agent guide: stack, commands, policies), `CLAUDE.md` that declares `AGENTS.md` canonical, and `README.md` with setup and commands sections. Conditionally required: `docs/adr/` where architecture decisions exist; root `CONTEXT.md` glossary where domain language exists (`CONTEXT-MAP.md` for multi-context repos); `docs/context.md` as the agent memory log; `docs/runs/` where autonomous runs report. Done when every Validation check below has a pass/fail with path.
2. Create missing baseline files from the mature exemplars: `h2ohub-next/AGENTS.md` + `CLAUDE.md` (pointer pattern), `h2ohub-next/README.md` (setup and commands), `seamless-agent-os/CONTEXT.md` (term, definition, "_Avoid_" per entry). Done when the step-1 failures now pass.
3. Record each architecture decision as `docs/adr/NNNN-<slug>.md` with a Status/Date/Deciders header and at least `## Context` and `## Decision` sections (shape of `seamless-agent-os/docs/adr/001-tenancy-model.md`). Produce ADRs through the `grill-with-docs` procedure (`.agents/skills/grill-with-docs/`, which runs `grilling` with `domain-modeling`). Done when every decision made in the work has an ADR file containing both headings.
4. Maintain the glossary via `domain-modeling` (`.agents/skills/domain-modeling/`): new or changed domain terms land in root `CONTEXT.md` the moment they crystallise. Done when every domain term introduced by the change appears in `CONTEXT.md`.
5. Run `global.documentation-updates-drift` on every PR that changes setup, APIs, commands, env vars, or UI flows. Done when drift findings are fixed or logged in the PR.
6. Autonomous runs write `docs/runs/YYYY-MM-DD-<slug>.md` containing `## What changed`, `## Verification`, and `## Follow-ups` (shape of `seamless-agent-os/docs/runs/2026-06-29-ui-architecture-tooling-review.md`). Done when the run report exists with all three headings.

## Tools And Sources
- Skills: `global.documentation-updates-drift` (drift check), `imported.grill-me` (interview core); repo-local `grill-with-docs` and `domain-modeling` under `.agents/skills/` in `seamless-agent-os` and `PWN-NBS-Community` — this standard sequences them, never restates them.
- Exemplars: `seamless-agent-os/AGENTS.md` (memory protocol), `h2ohub-next/CLAUDE.md` (pointer pattern), `h2ohub-next/docs/README.md` (docs index).

## Validation
- `test -f AGENTS.md && test -f README.md` — required root files exist.
- `grep -q "AGENTS.md" CLAUDE.md` — CLAUDE.md defers to AGENTS.md.
- `grep -Eiq 'setup|getting started|installatie' README.md && grep -Eiq 'commands|scripts' README.md` — README covers setup and commands.
- `ls docs/adr | grep -Eq '^[0-9]{3,4}-'` where ADRs exist, and `grep -L "## Decision" docs/adr/[0-9]*.md` is empty for ADRs added in the current change — the glob excludes `docs/adr/README.md`, and grandfathered pre-existing files (h2ohub-next's two MADR-style ADRs) are exempt.
- `test -f CONTEXT.md || test -f CONTEXT-MAP.md` — glossary present in domain repos.
- `ls docs/runs/*.md | grep -Eq '/[0-9]{4}-[0-9]{2}-[0-9]{2}-'` — run logs are date-slug named in run-writing repos.

## Reference Anchors
- ADR practice: https://adr.github.io/
- Ratified standards taxonomy: `agentic-seamless-registry/docs/standards-taxonomy.md`
- Domain file layout: `seamless-agent-os/.agents/skills/domain-modeling/SKILL.md`

## Output
- Pass/fail per Validation rule with paths; files created, or a violation list with owners.
- Ratification decision: the `CLAUDE.md`-points-to-`AGENTS.md` pattern (h2ohub-next) is adopted over parallel full documents; `AGENTS.md` is canonical.
- Ratification decision: 4-digit ADR numbering `0001-<slug>.md` (h2ohub-next and the domain-modeling skill) plus the seamless-agent-os body shape (`## Context` + `## Decision`) is adopted for new ADRs; seamless-agent-os's 3-digit filenames and h2ohub-next's two MADR-style ADRs (`## Context` / `## Considered options` / `## Consequences`, no `## Decision` heading) are grandfathered.
- Flag: `seamless-agent-os` has no root `README.md` — a MUST-have baseline file per step 1; create it from the h2ohub-next exemplar.
