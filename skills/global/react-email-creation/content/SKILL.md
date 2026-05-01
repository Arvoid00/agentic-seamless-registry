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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - recipient, trigger, sender domain, subject, preheader, fallback text, and legal/footer requirements.
   - React Email component with Html, Preview, semantic sections, and email-safe styles.
   - realistic preview fixtures and edge cases like long names or missing optional fields.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: turbo for template checks; resend for send/webhook tests when available.
- MCP: context7 for React Email docs.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- React Email docs: https://react.email/docs/getting-started/manual-setup
- Resend API, Next.js, webhooks: https://resend.com/docs/api-reference/emails/send-email, https://resend.com/docs/send-with-nextjs, https://resend.com/docs/webhooks/introduction

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
