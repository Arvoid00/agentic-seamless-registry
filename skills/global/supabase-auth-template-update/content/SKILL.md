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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - template type, locale needs, redirect URLs, project ref, and hosted vs local configuration path.
   - local content_path entries in supabase/config.toml.
   - hosted Dashboard Email Templates or approved deployment process.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: supabase for local stack/config validation.
- MCP: supabase for project context when explicitly configured; context7 for docs.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- Supabase Auth templates: https://supabase.com/docs/guides/local-development/customizing-email-templates

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
