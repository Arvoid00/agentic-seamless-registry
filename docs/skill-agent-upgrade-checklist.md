# Skill And Focused Agent Upgrade Checklist

**Date:** 2026-05-01  
**Scope:** local registry skills, MCP profile composition, CLI tool usage, and focused agent packages.

## Research Baseline

- [x] Cursor skill authoring: `SKILL.md` frontmatter, specific descriptions, progressive disclosure, and focused workflows from Cursor Skills docs.
- [x] Frontend/UI: Next.js metadata/i18n/accessibility, React component decomposition, shadcn/ui CLI, Playwright, React Email, Keep a Changelog, and GitHub Releases.
- [x] Backend/SaaS: Supabase CLI/Auth/OAuth/migrations, Stripe Checkout/webhooks/portal, Resend, Sanity schemas/migrations, and Databricks jobs/warehouses.
- [x] Operations: pnpm workspaces, Turborepo, GitHub CLI, deployment readiness, Renovate, Aikido, code review, documentation drift, and prompt engineering.
- [x] MCP composition: bounded toolsets, domain-prefixed naming, filtered discovery, gateway-level ACLs, explicit env mapping, and default-deny high-risk tools.

## Skill Upgrade Checklist

- [x] Replace generic 4-step skill bodies with domain-specific workflows for all local global skills.
- [x] Replace generic app-specific skill bodies with workflows for practitioner profiles, partner onboarding, Databricks, and Sanity CMS manuals.
- [x] Add tool and MCP guidance to each skill so agents know when to use Context7, Supabase, Figma, 21st Dev, and CLI tools.
- [x] Add validation sections to every local skill.
- [x] Add official documentation anchors to every local skill.
- [x] Verify all 29 local skill entrypoints against the Cursor skill outline and remove repeated boilerplate bloat.
- [x] Remove generic guardrail sections that were not specific to each skill's description.
- [x] Remove off-scope validation text from non-UI/non-content skills.
- [x] Keep each skill focused on its own triggers, domain checklist, tools, validation, references, and output.
- [ ] Decide whether imported skills should remain read-only or receive local wrapper skills for project-specific constraints.
- [ ] Add optional `references.md` files only for skills that outgrow the main `SKILL.md`.

## Focused Agent Package Checklist

- [x] `agent.frontend-experience-builder`: combines frontend design, pixel-perfect UI, UI/UX review, E2E, shadcn, Figma, 21st Dev, Context7, and Turbo.
- [x] `agent.full-stack-feature-operator`: combines feature building, guidelines, docs drift, migration handling, deployment readiness, Context7, Supabase MCP, Turbo, GitHub, and Supabase CLI.
- [x] `agent.supabase-auth-operator`: combines Supabase imported skills, local Supabase setup, auth templates, Google OAuth, migrations, Supabase MCP, and Supabase CLI.
- [x] `agent.content-commerce-operator`: combines Sanity, Stripe, Resend, React Email, CMS manuals, copywriting, Sanity CLI, GitHub CLI, and provider CLIs.
- [x] `agent.dependency-security-maintainer`: combines Renovate/Aikido triage, migration handling, code guidelines, commit prep, GitHub CLI, Turbo, and Context7.
- [x] `agent.release-readiness-coordinator`: combines deployment checklists, changelogs, docs drift, copywriting, E2E, GitHub CLI, Turbo, and Context7.
- [x] `agent.data-platform-operator`: combines Databricks, migration handling, code guidelines, deployment readiness, Databricks CLI, GitHub CLI, and Context7.
- [x] `agent.research-docs-curator`: combines research prompts, docs drift, code guidelines, copywriting, GitHub CLI, and Context7.
- [x] Each focused agent package now resolves to an `AGENT.md` prompt entrypoint instead of raw YAML metadata.

## MCP And CLI Guardrails

- [x] Keep MCP profile env policy set to explicit env mapping and inline secret blocking.
- [x] Keep MCP servers in draft/review-required state until package identity and env scopes are verified.
- [x] Record provider CLI invocations in agent package metadata instead of assuming they are installed.
- [x] Add provider CLI objects for Stripe, Resend, and Databricks because focused agents invoke those commands.
- [ ] Add separate read-only and write-enabled MCP profiles before exporting to shared clients.
- [ ] Add quarterly review cadence for agent package tool access and MCP server scopes.

## Validation Checklist

- [x] Run `pnpm registry:validate`.
- [x] Run `pnpm registry:index` after validation passes.
- [x] Inspect generated `dist/` objects for new `agent-package` entries: `dist/registry.index.json` reports 57 objects and 8 agent packages.
- [ ] Review changed skill descriptions in Cursor/Claude-compatible discovery contexts.
- [ ] Decide whether to promote MCP server entries from `draft` to `active` after manual package verification.
