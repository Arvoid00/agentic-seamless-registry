---
name: research-prompts
description: Create focused research prompts for agents, docs lookup, web search, and codebase exploration. Use when delegating research or gathering current library guidance.
---

# Research Prompts

## Use When
- delegating research or asking for current library guidance
- comparing products, APIs, architectural patterns, or implementation options
- turning broad uncertainty into verified findings

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to decision the research must support.
4. Pay special attention to official docs, repo code, changelogs, issues, examples, or local files.
5. Pay special attention to evidence quality, confidence, caveats, URLs, and file references.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: gh for GitHub repo/issue/PR research.
- MCP: context7 for library docs, supabase/figma/21st-dev when domain-specific evidence is needed.
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
- OpenAI and Anthropic prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering and https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- Cursor Skills docs: https://cursor.sh/docs/skills

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
