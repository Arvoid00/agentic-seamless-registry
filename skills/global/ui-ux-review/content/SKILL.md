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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - actual user goal and most important path before aesthetics.
   - hierarchy, spacing, typography, alignment, density, contrast, keyboard access, labels, and focus states.
   - loading, empty, error, permission, and mobile states.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: turbo for lint/test if available, shadcn for component docs/diff.
- MCP: figma for design reference, 21st-dev for component inspiration, context7 for accessibility/library docs.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- Next.js accessibility and WAI: https://nextjs.org/docs/architecture/accessibility and https://www.w3.org/WAI/fundamentals/accessibility-intro/
- shadcn/ui CLI and components: https://ui.shadcn.com/docs/cli and https://ui.shadcn.com/docs/components
- React Thinking in React: https://react.dev/learn/thinking-in-react

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
