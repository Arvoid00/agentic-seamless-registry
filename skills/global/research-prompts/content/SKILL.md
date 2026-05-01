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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - decision the research must support.
   - official docs, repo code, changelogs, issues, examples, or local files.
   - evidence quality, confidence, caveats, URLs, and file references.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: gh for GitHub repo/issue/PR research.
- MCP: context7 for library docs, supabase/figma/21st-dev when domain-specific evidence is needed.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- OpenAI and Anthropic prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering and https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
