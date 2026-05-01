---
name: create-sanity-cms-manuals
description: Create app-specific Sanity CMS manuals for editors, content operations, schemas, previews, and publishing workflows. Use when documenting editorial operations.
---

# Create Sanity CMS Manuals

## Use When
- writing CMS manuals for content editors
- documenting Sanity schema, Studio, preview, release, or publishing workflows
- turning implementation into editor-ready operating instructions

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to editor roles, common tasks, content types, approval steps, release model, and preview behavior.
4. Pay special attention to actual schema and Studio structure before writing instructions.
5. Pay special attention to create, edit, preview, schedule, release, rollback, and troubleshoot paths.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: sanity for schema/document validation and migrations.
- MCP: figma for manual visuals if needed, context7 for Sanity docs.
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
