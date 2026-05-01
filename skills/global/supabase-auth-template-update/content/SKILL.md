---
name: supabase-auth-template-update
description: Update Supabase Auth templates, redirects, email copy, and auth-related configuration. Use for hosted or local auth email changes.
---

# Supabase Auth Template Update

## Use When
- changing Supabase Auth email templates or redirect URLs
- customizing confirmation, recovery, invite, magic-link, or OTP copy
- aligning local auth templates with hosted dashboard settings

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to template type, locale needs, redirect URLs, project ref, and hosted vs local configuration path.
4. Pay special attention to local content_path entries in supabase/config.toml.
5. Pay special attention to hosted Dashboard Email Templates or approved deployment process.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: supabase for local stack/config validation.
- MCP: supabase for project context when explicitly configured; context7 for docs.
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
- Supabase Auth templates and Google OAuth: https://supabase.com/docs/guides/local-development/customizing-email-templates and https://supabase.com/docs/learn/auth-deep-dive/auth-google-oauth
- Resend API, Next.js, webhooks: https://resend.com/docs/api-reference/emails/send-email, https://resend.com/docs/send-with-nextjs, https://resend.com/docs/webhooks/introduction

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
