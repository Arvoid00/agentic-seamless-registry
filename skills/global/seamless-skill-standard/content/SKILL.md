---
name: seamless-skill-standard
description: Author or edit a skill to the Seamless canonical format. Use when creating a new skill, reviewing or standardizing an existing SKILL.md, or deciding where a skill should live (registry scope vs repo).
---

# Seamless Skill Standard

## Use When
- authoring a new skill for any Seamless repo or the registry
- reviewing or standardizing an existing SKILL.md
- deciding where a skill lives: registry `global`, registry `app-specific`, or a source repo

## Workflow
1. Decide placement. Reusable across repos → registry `skills/global/<name>/`. Tied to one app → registry `skills/app-specific/<name>/`, prefixed with the app slug (`h2ohub-`, `nbs-`, `registry-`). For repos that are themselves registry ingest sources (e.g. `seamless-agent-os`), write only to the repo's `.agents/skills/<name>/` — the registry imports them on ingest. Done when the target path is named and does not collide with an existing skill name anywhere in the registry.
2. Write the frontmatter. Exactly `name` (kebab-case, matches folder, `^[a-z0-9-]{1,64}$`) and `description` ("What it does. Use when <distinct triggers>." — one trigger per branch, no synonym padding). Done when the description reads correctly as the only thing a model sees before invoking.
3. Write the body using the six canonical sections in order: `## Use When`, `## Workflow`, `## Tools And Sources`, `## Validation`, `## Reference Anchors`, `## Output`. Every line must be specific to this skill — real file paths, real commands, real thresholds. Done when no sentence would survive unchanged in a different skill (generic boilerplate is banned).
4. End every Workflow step with a checkable completion criterion ("Done when …") that distinguishes done from not-done. Done when each step has one.
5. For canonical registry skills, add `skill.yaml` beside `content/SKILL.md` with: `id: <scope>.<name>`, `kind: skill`, `name` (Title Case), `scope`, `version: 0.1.0`, `status: active`, `source: {origin: local, source_id: seamless-local-skills, imported_at: null, source_path: skills/<scope>/<name>/skill.yaml}`, `description` (may equal the frontmatter description), `tags`, `capabilities`, `metadata: {source_format: SKILL.md, roadmap: docs/skill-assets-roadmap.md, image_lane: <scope>-skills}`, `requires: {}` (or real skill ids), `entrypoints: {prompt: skills/<scope>/<name>/content/SKILL.md}`. Done when the YAML parses and `id`, folder, and frontmatter `name` agree.
6. Prune. Delete every sentence the model already obeys by default (no-op test), every restated meaning (single source of truth), and compress recurring phrases into one strong leading word. Done when a pass over the file removes nothing further.
7. Install into consuming repos as `.agents/skills/<name>/SKILL.md`, byte-identical to `content/SKILL.md`. Never overwrite a skill listed in the target's `skills-lock.json`. Done when `diff` between canonical and installed copy is empty.

## Tools And Sources
- Skills: `writing-great-skills` (quality principles: invocation, information hierarchy, leading words, failure modes).
- Registry CLI: `pnpm registry:skills:add --target <repo> [--dry-run]` from `agentic-seamless-registry/` (no `--` separator — it breaks option parsing) installs registry skills into a target's `.agents/skills/`, filtered by the target's `skills-manifest.json` (include/exclude patterns like `app-specific/h2ohub-*`) and/or `--scope`.
- Files: `agentic-seamless-registry/registry.schema.json` (canonical object envelope), existing `skills/global/create-commit/` as a minimal reference pair.

## Validation
- Frontmatter parses as YAML; `name` matches the folder and `^[a-z0-9-]{1,64}$`.
- Body contains exactly the six canonical section headings, in order.
- Every Workflow step ends with a completion criterion.
- `diff <canonical content/SKILL.md> <installed SKILL.md>` is empty for each consuming repo.
- No skill name appears in the target repo's `skills-lock.json`.

## Reference Anchors
- Writing-great-skills source: https://github.com/mattpocock/skills/blob/main/skills/productivity/writing-great-skills/SKILL.md
- Registry context: `agentic-seamless-registry/docs/context.md`

## Output
- The skill folder(s) written: canonical `skill.yaml` + `content/SKILL.md`, plus installed copies.
- A one-line description per skill and the validation evidence (checks above, actually run).
