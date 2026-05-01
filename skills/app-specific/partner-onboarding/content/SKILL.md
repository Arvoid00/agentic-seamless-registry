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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - partner roles, invitation source, setup tasks, completion criteria, and internal owner handoff.
   - state machine with pending, invited, active, blocked, and offboarded states.
   - secure invitation and permission handling using existing auth conventions.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: gh for project/issue context, turbo for checks.
- MCP: figma/21st-dev for flow design, supabase for auth/permissions, context7 for docs.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- Supabase Auth templates and Google OAuth: https://supabase.com/docs/guides/local-development/customizing-email-templates and https://supabase.com/docs/learn/auth-deep-dive/auth-google-oauth

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
