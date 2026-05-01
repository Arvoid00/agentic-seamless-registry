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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - schema types, references, validation rules, previews, desk structure, and consuming frontend queries.
   - schema and document validation before migrations.
   - dry-run, idempotent content migrations, and dataset export/rollback strategy.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: sanity for schema validation, document validation, migrations, dataset export/import.
- MCP: context7 for Sanity docs; figma/21st-dev only for CMS UI/manual design.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- Sanity schemas and migrations: https://www.sanity.io/docs/schema-and-content-migrations and https://www.sanity.io/docs/cli-migration

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
