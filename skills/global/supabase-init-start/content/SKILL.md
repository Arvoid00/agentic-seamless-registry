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
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to Docker availability, existing supabase/ folder, .env conventions, and ports.
4. Pay special attention to supabase init only when config does not already exist.
5. Pay special attention to supabase start outputs and local-only secrets handling.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: supabase.
- MCP: supabase only when env mapping is explicit; context7 for docs.
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
- Supabase CLI and local development: https://supabase.com/docs/guides/cli/local-development

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
