---
name: setup-auth-oauth-google
description: Set up Google OAuth using existing auth, redirect, and environment conventions. Use for Google sign-in, OAuth callback handling, and provider setup.
---

# Setup Auth OAuth Google

## Use When
- adding Google sign-in or OAuth callback handling
- debugging OAuth redirect, provider, or session issues
- documenting setup for local/staging/production auth

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to auth provider abstraction and existing callback/session handling.
4. Pay special attention to Google OAuth credentials per environment with client secret in env or provider dashboard only.
5. Pay special attention to local, preview/staging, and production redirect URIs.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: supabase for local auth stack; turbo for app checks.
- MCP: supabase for auth settings when configured; context7 for framework/auth docs.
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

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
