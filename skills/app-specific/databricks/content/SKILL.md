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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - workspace, authentication mode, service principal, warehouse/job resource, permissions, and cost controls.
   - saved Jobs for repeatable work and one-off submits only for ad hoc tasks.
   - app resources or config references instead of hardcoded warehouse/job IDs.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: databricks when available, gh for review, turbo for app checks.
- MCP: context7 for SDK/API docs; supabase only if results are persisted there.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- Databricks Apps, Jobs, Warehouses: https://docs.databricks.com/aws/en/dev-tools/databricks-apps/resources and https://docs.databricks.com/en/jobs/automate.html

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
