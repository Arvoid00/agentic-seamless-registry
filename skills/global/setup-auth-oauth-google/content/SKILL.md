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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - auth provider abstraction and existing callback/session handling.
   - Google OAuth credentials per environment with client secret in env or provider dashboard only.
   - local, preview/staging, and production redirect URIs.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: supabase for local auth stack; turbo for app checks.
- MCP: supabase for auth settings when configured; context7 for framework/auth docs.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- Supabase Google OAuth: https://supabase.com/docs/learn/auth-deep-dive/auth-google-oauth

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
