---
name: stripe
description: Implement Stripe billing, checkout, webhooks, and customer portal flows. Use for payments, subscriptions, invoices, entitlements, and billing events.
---

# Stripe

## Use When
- adding payments, subscriptions, invoices, or billing events
- debugging Stripe checkout, portal, or webhook behavior
- mapping Stripe state to app entitlements

## Workflow
1. Restate the requested outcome, constraints, and risk level before touching files or running commands.
2. Inspect the existing repo patterns, related assets, and active configuration before adding new abstractions.
3. Pay special attention to products, prices, customers, subscriptions, entitlements, and local DB state.
4. Pay special attention to server-side Checkout Sessions with mode=subscription for recurring billing.
5. Pay special attention to verified webhook reconciliation instead of trusting client redirects.
6. Implement or document the smallest coherent change, keeping behavior aligned with existing conventions.
7. Validate with targeted checks and capture evidence, owner review needs, and remaining risk.

## Tools And Sources
- CLI: stripe for webhook forwarding, gh for deployment/release context, turbo for checks.
- MCP: context7 for framework docs; supabase if billing state is stored there.
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
- Stripe Checkout, webhooks, portal: https://stripe.com/docs/payments/checkout/subscriptions, https://stripe.com/docs/billing/subscriptions/webhooks, https://stripe.com/docs/customer-management/integrate-customer-portal

## Output
- A scoped implementation or operating checklist tied to concrete files, commands, and owners.
- Validation evidence and remaining risk.
- Follow-up tasks only when they are truly deferred.
