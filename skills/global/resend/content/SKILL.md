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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - email type, trigger, recipient, sender domain, template, retry/idempotency needs, and compliance footer.
   - server-only RESEND_API_KEY and verified sender domains in production.
   - idempotent webhook handling for duplicates and unordered delivery.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: resend if installed, turbo for template checks.
- MCP: context7 for provider/framework docs.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- Resend API, Next.js, webhooks: https://resend.com/docs/api-reference/emails/send-email, https://resend.com/docs/send-with-nextjs, https://resend.com/docs/webhooks/introduction
- React Email docs: https://react.email/docs/getting-started/manual-setup

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
