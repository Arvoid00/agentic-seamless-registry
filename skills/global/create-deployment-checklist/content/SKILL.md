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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - deployment target, diff scope, user impact, data migrations, env changes, external services, and rollback strategy.
   - required checks, smoke tests, monitoring, and human approvals.
   - migration order, webhook/OAuth callback changes, cache invalidation, and feature flag plan.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: gh for PR/checks/releases, turbo for scoped validation, supabase/sanity/stripe/resend as domain-specific checks.
- MCP: context7 for platform docs; supabase for DB/auth readiness.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- Vercel and Next.js production checklists: https://vercel.com/docs/production-checklist and https://nextjs.org/docs/app/guides/production-checklist
- GitHub CLI PRs/releases/checks: https://cli.github.com/manual/gh_pr_create, https://cli.github.com/manual/gh_pr_checks, https://cli.github.com/manual/gh_release_create

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
