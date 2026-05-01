---
name: sanity
description: Work with Sanity CMS schemas, Studio configuration, content migrations, releases, and editorial workflows. Use when product behavior depends on Sanity content.
---

# Sanity

## Use When
- adding or maintaining Sanity-backed content features
- changing schemas, previews, desk structure, or content migrations
- documenting editorial workflows

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to schema types, references, validation rules, previews, desk structure, and consuming frontend queries.
4. Pay special attention to schema and document validation before migrations.
5. Pay special attention to dry-run, idempotent content migrations, and dataset export/rollback strategy.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: sanity for schema validation, document validation, migrations, dataset export/import.
- MCP: context7 for Sanity docs; figma/21st-dev only for CMS UI/manual design.
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
- Sanity schemas and migrations: https://www.sanity.io/docs/schema-and-content-migrations and https://www.sanity.io/docs/cli-migration

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
