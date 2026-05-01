---
name: metadata-favicons
description: Configure web app metadata, icons, favicons, Open Graph, Twitter/social previews, and app identity. Use for launch readiness and SEO polish.
---

# Metadata Favicons

## Use When
- polishing app identity, SEO metadata, or launch readiness
- adding favicons, app icons, Open Graph images, or route metadata
- fixing social preview or title/description issues

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to root app metadata, nested route metadata, dynamic metadata, or file-based icon metadata.
4. Pay special attention to static metadata exports unless route params, parent metadata, or fetched data are required.
5. Pay special attention to canonical title templates, descriptions, OG/Twitter images, theme color, and robots rules.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: turbo for checks.
- MCP: context7 for Next metadata docs; figma if icons/previews derive from design assets.
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
- Next.js metadata/app icons: https://nextjs.org/docs/app/api-reference/functions/generate-metadata and https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
