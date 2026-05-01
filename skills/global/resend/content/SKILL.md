---
name: resend
description: Integrate Resend for transactional email sending with safe env handling, templates, idempotency, and delivery checks. Use for email send paths and deliverability.
---

# Resend

## Use When
- adding or debugging transactional email delivery through Resend
- wiring React Email templates to a provider send path
- tracking email delivery and webhook events

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to email type, trigger, recipient, sender domain, template, retry/idempotency needs, and compliance footer.
4. Pay special attention to server-only RESEND_API_KEY and verified sender domains in production.
5. Pay special attention to idempotent webhook handling for duplicates and unordered delivery.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: resend if installed, turbo for template checks.
- MCP: context7 for provider/framework docs.
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
- Resend API, Next.js, webhooks: https://resend.com/docs/api-reference/emails/send-email, https://resend.com/docs/send-with-nextjs, https://resend.com/docs/webhooks/introduction
- React Email docs: https://react.email/docs/getting-started/manual-setup

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
