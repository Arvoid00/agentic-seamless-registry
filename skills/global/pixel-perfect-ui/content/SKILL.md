---
name: pixel-perfect-ui
description: Implement high-fidelity UI from designs, screenshots, or references using design tokens, accessible states, and existing component patterns. Use when visual fidelity matters.
---

# Pixel Perfect UI

## Use When
- translating a design, screenshot, or visual reference into UI
- polishing spacing, typography, responsive behavior, or component states
- aligning implementation with shadcn/Radix and project tokens

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to layout, hierarchy, spacing scale, typography, color roles, responsive behavior, interactive states.
4. Pay special attention to semantic structure before styling.
5. Pay special attention to loading, empty, error, disabled, focus, hover, and reduced-motion states.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: shadcn for component install/diff, turbo for scoped checks.
- MCP: figma for design data, 21st-dev for component inspiration, context7 for library API docs.
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
