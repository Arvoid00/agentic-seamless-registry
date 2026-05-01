---
name: react-email-creation
description: Create transactional email templates with React Email patterns, preview states, and provider-ready payloads. Use for onboarding, billing, auth, and notification emails.
---

# React Email Creation

## Use When
- creating onboarding, billing, auth, or notification emails
- building provider-ready transactional templates
- reviewing email rendering, copy, and deliverability constraints

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to recipient, trigger, sender domain, subject, preheader, fallback text, and legal/footer requirements.
4. Pay special attention to React Email component with Html, Preview, semantic sections, and email-safe styles.
5. Pay special attention to realistic preview fixtures and edge cases like long names or missing optional fields.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: turbo for template checks; resend for send/webhook tests when available.
- MCP: context7 for React Email docs.
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
- React Email docs: https://react.email/docs/getting-started/manual-setup
- Resend API, Next.js, webhooks: https://resend.com/docs/api-reference/emails/send-email, https://resend.com/docs/send-with-nextjs, https://resend.com/docs/webhooks/introduction

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
