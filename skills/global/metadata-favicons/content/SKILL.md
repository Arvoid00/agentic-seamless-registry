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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - root app metadata, nested route metadata, dynamic metadata, or file-based icon metadata.
   - static metadata exports unless route params, parent metadata, or fetched data are required.
   - canonical title templates, descriptions, OG/Twitter images, theme color, and robots rules.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: turbo for checks.
- MCP: context7 for Next metadata docs; figma if icons/previews derive from design assets.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- Next.js metadata/app icons: https://nextjs.org/docs/app/api-reference/functions/generate-metadata and https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
