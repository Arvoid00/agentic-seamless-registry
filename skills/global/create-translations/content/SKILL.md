---
name: create-translations
description: Add or update localization keys, translation files, and language QA workflows. Use when introducing multilingual product copy or locale routing.
---

# Create Translations

## Use When
- introducing multilingual product copy
- adding locale routing, message namespaces, or translation QA
- reviewing UI text for i18n readiness

## Workflow
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - locales, routing strategy, message namespace, fallback behavior, and ownership.
   - structured keys tied to product concepts, not raw English sentences.
   - plurals, selects, dates, numbers, currencies, and RTL layout.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: turbo for checks; gh for review workflows.
- MCP: context7 for Next.js/next-intl docs.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- Next.js internationalization: https://nextjs.org/docs/app/guides/internationalization and next-intl App Router: https://next-intl.dev/docs/getting-started/app-router

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
