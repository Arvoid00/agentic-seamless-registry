---
name: supabase-init-start
description: Initialize and start local Supabase development safely, including config, ports, Docker, and migration application. Use for Supabase local setup and troubleshooting.
---

# Supabase Init Start

## Use When
- setting up or troubleshooting local Supabase services
- initializing a repo with Supabase config
- validating local migrations and auth configuration

## Workflow
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - Docker availability, existing supabase/ folder, .env conventions, and ports.
   - supabase init only when config does not already exist.
   - supabase start outputs and local-only secrets handling.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: supabase.
- MCP: supabase only when env mapping is explicit; context7 for docs.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- Supabase CLI and local development: https://supabase.com/docs/guides/cli/local-development

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
