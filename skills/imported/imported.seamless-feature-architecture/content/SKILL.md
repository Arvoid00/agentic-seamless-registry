---
name: seamless-feature-architecture
description: Guides feature implementation architecture for TypeScript and Next.js projects. Use when adding or refactoring features, routes, server actions, services, data access layers, schemas, types, or modules; when the user asks for feature folders, lean routes, shallow interfaces, small files, or architecture boundary checks; and before using fallow for structural code health validation.
---

# Seamless Feature Architecture

Use this project-owned overlay alongside imported framework skills. Do not edit imported skills listed in `skills-lock.json`; add repo-owned companion skills or Cursor rules instead.

## When Not To Use

Do not use this skill to override framework-specific guidance from imported skills such as `next-best-practices`, `supabase`, `shadcn-ui`, or `fallow`. Use those skills for their exact APIs, commands, and framework rules; use this overlay for project architecture shape and module boundaries.

## Default Shape

Prefer feature folders for product behavior and keep framework routes thin:

```text
<app-or-package-root>/src/features/<feature>/
  index.ts              # shallow public interface
  schema.ts             # Zod input/output schemas for this feature boundary
  types.ts              # local domain types inferred from or composed with schemas
  data.ts               # data access only: queries, persistence, storage adapters
  service.ts            # business orchestration and policy decisions
  actions.ts            # Server Actions, if UI-triggered mutations need them
  components/           # feature-specific UI only
  tests/                # focused tests for service/data/action behavior
```

Use existing app/package conventions first. Introduce this layout for new features or when refactoring a touched area; do not churn unrelated code solely to match the shape.

## Boundaries

- Keep deep modules behind shallow interfaces. Consumers import from `src/features/<feature>` or a named package export, not from nested internals.
- Route handlers, pages, and Server Actions should parse inputs, enforce request/session concerns, call one service function, then map the result to UI or HTTP output.
- Put business rules in `service.ts`, not in `route.ts`, `page.tsx`, or React components.
- Put database, Supabase, filesystem, GitHub, Notion, and external API calls in `data.ts` or a focused adapter file. Services compose data access; routes do not call storage directly.
- Keep schemas and types separate from implementation. Prefer Zod schemas from `@seamless/contracts` for shared/public contracts; use feature-local `schema.ts` only for private feature boundaries.
- Avoid broad barrels that re-export internals. `index.ts` should expose the smallest stable interface a caller needs.

## File Size

- Aim for small files with one reason to change. As a default, split files that grow past roughly 150-200 LOC or mix route parsing, business rules, data access, and presentation.
- Extract by responsibility, not by abstraction fashion. A short cohesive file is better than a premature layer.
- Keep tests focused on the public feature interface and important service/data edge cases.

## Next.js Placement

- Use Server Components for internal reads and Server Actions for UI mutations.
- Use Route Handlers for external clients, webhooks, public REST, streaming endpoints, or cacheable client-side reads.
- A `route.ts` should stay lean: validate request data with schema, call service, return `Response.json` or the correct stream/redirect response.

## Fallow Integration

Use the imported `fallow` skill as the source of truth for exact commands, flags, and command safety rules. For architecture work, use fallow after code shape changes to audit new structural issues, inspect configured boundaries, and find duplication in changed code. Do not hardcode a default branch in reusable guidance; let fallow auto-detect the base ref or resolve the project default branch from git before running changed-file checks.

Interpret fallow as evidence, not an autopilot:

- Use boundary and circular dependency findings to tighten feature interfaces.
- Use duplication findings to consolidate repeated service/data logic.
- Use health hotspots to split large mixed-responsibility files.
- Follow the imported `fallow` skill's agent rules for every command invocation.
- Always dry-run before `fallow fix`, and never apply destructive cleanup without reviewing the proposed changes.
