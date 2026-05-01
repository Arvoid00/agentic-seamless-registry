---
name: databricks
description: Work on app-specific Databricks integrations, data jobs, notebooks, SQL warehouses, and warehouse-backed workflows. Use for data platform integrations.
---

# Databricks

## Use When
- adding or reviewing Databricks-backed product workflows
- configuring jobs, warehouses, service principals, or SQL statement execution
- debugging app-to-Databricks data paths

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to workspace, authentication mode, service principal, warehouse/job resource, permissions, and cost controls.
4. Pay special attention to saved Jobs for repeatable work and one-off submits only for ad hoc tasks.
5. Pay special attention to app resources or config references instead of hardcoded warehouse/job IDs.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: databricks when available, gh for review, turbo for app checks.
- MCP: context7 for SDK/API docs; supabase only if results are persisted there.
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
- Databricks Apps, Jobs, Warehouses: https://docs.databricks.com/aws/en/dev-tools/databricks-apps/resources and https://docs.databricks.com/en/jobs/automate.html

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
