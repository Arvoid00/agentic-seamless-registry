---
name: migration-handling
description: Plan and review database, framework, dependency, and data migrations with rollback and validation. Use when persisted state or compatibility can break.
---

# Migration Handling

## Use When
- changing persisted state, framework versions, or data contracts
- adding or reviewing DB migrations, content migrations, dependency migrations, or schema transforms
- planning rollback, repair, or rollout sequencing

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to migration type: schema, data, dependency, framework, content, auth, or infrastructure.
4. Pay special attention to owners, environments, backwards compatibility, downtime risk, and rollback path.
5. Pay special attention to additive expand-contract migrations for live systems.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: supabase for DB migrations, sanity for content migrations, turbo for compatibility checks, gh for CI/PR review.
- MCP: supabase for schema evidence, context7 for framework migration docs.
- Use Context7 or official docs before relying on memory for provider APIs, framework conventions, or CLI flags.

## Guardrails
- Keep secrets in environment variables or provider dashboards; never inline them in skill, MCP, CLI, or docs assets.
- Prefer existing imported skills and local conventions before creating duplicate guidance.
- Escalate for destructive operations, production data, billing, auth, migrations, security findings, and external sends.

## Validation
- Name the exact command, browser check, docs review, or manual verification performed.
- If validation cannot run, state why and what evidence should be gathered next.
- For UI or content work, include empty/error/loading and edge-case review where relevant.

## Reference Anchors
- Supabase CLI and local development: https://supabase.com/docs/guides/cli/local-development
- Sanity schemas and migrations: https://www.sanity.io/docs/schema-and-content-migrations and https://www.sanity.io/docs/cli-migration
- Renovate dashboard/scheduling/automerge/validation: https://docs.renovatebot.com/key-concepts/dashboard/

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
