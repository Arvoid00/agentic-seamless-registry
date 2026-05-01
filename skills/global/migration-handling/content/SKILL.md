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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - migration type: schema, data, dependency, framework, content, auth, or infrastructure.
   - owners, environments, backwards compatibility, downtime risk, and rollback path.
   - additive expand-contract migrations for live systems.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: supabase for DB migrations, sanity for content migrations, turbo for compatibility checks, gh for CI/PR review.
- MCP: supabase for schema evidence, context7 for framework migration docs.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- Supabase CLI and local development: https://supabase.com/docs/guides/cli/local-development
- Sanity schemas and migrations: https://www.sanity.io/docs/schema-and-content-migrations and https://www.sanity.io/docs/cli-migration

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
