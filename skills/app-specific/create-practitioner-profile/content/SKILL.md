---
name: create-practitioner-profile
description: Create or update practitioner profile workflows with app-specific fields, validation, onboarding, and completeness rules. Use for practitioner profile creation/edit flows.
---

# Create Practitioner Profile

## Use When
- building practitioner profile creation or edit flows
- defining profile completeness, onboarding, permissions, or review rules
- connecting practitioner data to search, listing, or matching UX

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to required profile fields, optional enrichment, verification steps, privacy boundaries, and completion criteria.
4. Pay special attention to form fields mapped to persisted schema and reusable validation.
5. Pay special attention to draft, validate, preview, publish/request-review flow.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: turbo for app checks, gh for issue/PR context.
- MCP: supabase for schema/auth if configured, figma/21st-dev for profile UI, context7 for library docs.
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
- Next.js accessibility and WAI: https://nextjs.org/docs/architecture/accessibility and https://www.w3.org/WAI/fundamentals/accessibility-intro/
- Supabase CLI and local development: https://supabase.com/docs/guides/cli/local-development
- Google engineering code review guide: https://google.github.io/eng-practices/review

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
