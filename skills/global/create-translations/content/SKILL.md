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
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to locales, routing strategy, message namespace, fallback behavior, and ownership.
4. Pay special attention to structured keys tied to product concepts, not raw English sentences.
5. Pay special attention to plurals, selects, dates, numbers, currencies, and RTL layout.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: turbo for checks; gh for review workflows.
- MCP: context7 for Next.js/next-intl docs.
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
- Next.js internationalization: https://nextjs.org/docs/app/guides/internationalization and next-intl App Router: https://next-intl.dev/docs/getting-started/app-router

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
