---
name: partner-onboarding
description: Plan and implement partner onboarding flows with invitations, setup progress, permissions, and handoff communication. Use for partner activation journeys.
---

# Partner Onboarding

## Use When
- creating partner onboarding journeys
- designing invitation, setup, role, and handoff flows
- reviewing activation funnel gaps or partner setup docs

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to partner roles, invitation source, setup tasks, completion criteria, and internal owner handoff.
4. Pay special attention to state machine with pending, invited, active, blocked, and offboarded states.
5. Pay special attention to secure invitation and permission handling using existing auth conventions.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: gh for project/issue context, turbo for checks.
- MCP: figma/21st-dev for flow design, supabase for auth/permissions, context7 for docs.
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
- Next.js accessibility and WAI: https://nextjs.org/docs/architecture/accessibility and https://www.w3.org/WAI/fundamentals/accessibility-intro/
- Google engineering code review guide: https://google.github.io/eng-practices/review

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
