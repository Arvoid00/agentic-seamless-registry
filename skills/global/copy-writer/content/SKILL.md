---
name: copy-writer
description: Draft product, UI, docs, release, and support copy with clear audience, tone, and action constraints. Use when writing or improving user-facing text.
---

# Copy Writer

## Use When
- writing UI text, onboarding copy, launch copy, or user-facing documentation
- simplifying technical language for non-technical users
- turning release changes into customer-ready messaging

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to audience, desired action, channel, tone, reading level, and localization constraints.
4. Pay special attention to direct language, strong verbs, concrete benefits, and short sentences.
5. Pay special attention to legal, pricing, privacy, or security claims that need human review.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: gh for release/PR context when copy is derived from changes.
- MCP: context7 for product/docs conventions if framework terms must be current.
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
- Keep a Changelog and GitHub Releases: https://keepachangelog.com/en/1.1.0/ and https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases
- Next.js accessibility and WAI: https://nextjs.org/docs/architecture/accessibility and https://www.w3.org/WAI/fundamentals/accessibility-intro/

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
