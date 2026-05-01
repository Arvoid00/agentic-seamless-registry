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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - layout, hierarchy, spacing scale, typography, color roles, responsive behavior, interactive states.
   - semantic structure before styling.
   - loading, empty, error, disabled, focus, hover, and reduced-motion states.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: shadcn for component install/diff, turbo for scoped checks.
- MCP: figma for design data, 21st-dev for component inspiration, context7 for library API docs.

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
