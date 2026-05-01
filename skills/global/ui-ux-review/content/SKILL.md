---
name: ui-ux-review
description: Review interfaces for usability, visual hierarchy, accessibility, and implementation quality. Use after UI changes, design implementation, or before demos.
---

# UI UX Review

## Use When
- reviewing a page, component, or flow for UI/UX quality
- checking visual hierarchy, accessibility, or interaction clarity
- preparing UI for demo, release, or design handoff

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to actual user goal and most important path before aesthetics.
4. Pay special attention to hierarchy, spacing, typography, alignment, density, contrast, keyboard access, labels, and focus states.
5. Pay special attention to loading, empty, error, permission, and mobile states.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: turbo for lint/test if available, shadcn for component docs/diff.
- MCP: figma for design reference, 21st-dev for component inspiration, context7 for accessibility/library docs.
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
- Next.js accessibility and WAI: https://nextjs.org/docs/architecture/accessibility and https://www.w3.org/WAI/fundamentals/accessibility-intro/
- shadcn/ui CLI and components: https://ui.shadcn.com/docs/cli and https://ui.shadcn.com/docs/components
- React Thinking in React: https://react.dev/learn/thinking-in-react

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
