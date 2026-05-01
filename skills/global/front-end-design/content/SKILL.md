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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - user goal, primary action, secondary actions, data dependencies, and failure modes.
   - component hierarchy from data model and route boundaries.
   - loading, empty, partial data, error, success, disabled, permission denied, and mobile states.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: shadcn for component discovery/install.
- MCP: figma for design references, 21st-dev for component exploration, context7 for React/Next docs.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- React Thinking in React: https://react.dev/learn/thinking-in-react
- shadcn/ui CLI and components: https://ui.shadcn.com/docs/cli and https://ui.shadcn.com/docs/components
- Next.js accessibility and WAI: https://nextjs.org/docs/architecture/accessibility and https://www.w3.org/WAI/fundamentals/accessibility-intro/

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
