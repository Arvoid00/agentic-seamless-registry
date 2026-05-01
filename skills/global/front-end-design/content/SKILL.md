---
name: front-end-design
description: Design frontend pages, dashboards, modals, and multi-step flows before implementation. Use when planning UI structure, state, or interaction patterns.
---

# Front End Design

## Use When
- planning a new page, dashboard, modal, or multi-step UI flow
- choosing component composition before coding
- translating product requirements into UX states

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to user goal, primary action, secondary actions, data dependencies, and failure modes.
4. Pay special attention to component hierarchy from data model and route boundaries.
5. Pay special attention to loading, empty, partial data, error, success, disabled, permission denied, and mobile states.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: shadcn for component discovery/install.
- MCP: figma for design references, 21st-dev for component exploration, context7 for React/Next docs.
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
- React Thinking in React: https://react.dev/learn/thinking-in-react
- shadcn/ui CLI and components: https://ui.shadcn.com/docs/cli and https://ui.shadcn.com/docs/components
- Next.js accessibility and WAI: https://nextjs.org/docs/architecture/accessibility and https://www.w3.org/WAI/fundamentals/accessibility-intro/

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
