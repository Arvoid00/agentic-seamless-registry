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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - required profile fields, optional enrichment, verification steps, privacy boundaries, and completion criteria.
   - form fields mapped to persisted schema and reusable validation.
   - draft, validate, preview, publish/request-review flow.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: turbo for app checks, gh for issue/PR context.
- MCP: supabase for schema/auth if configured, figma/21st-dev for profile UI, context7 for library docs.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- Next.js accessibility and WAI: https://nextjs.org/docs/architecture/accessibility and https://www.w3.org/WAI/fundamentals/accessibility-intro/
- Supabase CLI and local development: https://supabase.com/docs/guides/cli/local-development

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
