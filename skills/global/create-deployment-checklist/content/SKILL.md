---
name: create-deployment-checklist
description: Create deployment readiness checklists covering env vars, migrations, tests, rollback, monitoring, and release communication. Use before preview, staging, or production deploys.
---

# Create Deployment Checklist

## Use When
- preparing a preview, staging, or production deployment
- reviewing release readiness across app, DB, env, monitoring, and rollback
- turning a feature into a release plan

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to deployment target, diff scope, user impact, data migrations, env changes, external services, and rollback strategy.
4. Pay special attention to required checks, smoke tests, monitoring, and human approvals.
5. Pay special attention to migration order, webhook/OAuth callback changes, cache invalidation, and feature flag plan.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: gh for PR/checks/releases, turbo for scoped validation, supabase/sanity/stripe/resend as domain-specific checks.
- MCP: context7 for platform docs; supabase for DB/auth readiness.
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
- Vercel and Next.js production checklists: https://vercel.com/docs/production-checklist and https://nextjs.org/docs/app/guides/production-checklist
- GitHub CLI PRs/releases/checks: https://cli.github.com/manual/gh_pr_create, https://cli.github.com/manual/gh_pr_checks, https://cli.github.com/manual/gh_release_create

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
