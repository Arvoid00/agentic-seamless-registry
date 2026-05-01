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
1. Confirm the requested outcome and constraints.
2. Review the relevant existing files, configuration, and registry assets.
3. Apply the domain checklist:
   - products, prices, customers, subscriptions, entitlements, and local DB state.
   - server-side Checkout Sessions with mode=subscription for recurring billing.
   - verified webhook reconciliation instead of trusting client redirects.
4. Make the smallest scoped change or checklist that satisfies the request.

## Tools And Sources
- CLI: stripe for webhook forwarding, gh for deployment/release context, turbo for checks.
- MCP: context7 for framework docs; supabase if billing state is stored there.

## Validation
- Record the exact command, browser check, docs review, or manual verification used.
- If validation is skipped, state why and what evidence should be gathered next.

## Reference Anchors
- Stripe Checkout, webhooks, portal: https://stripe.com/docs/payments/checkout/subscriptions, https://stripe.com/docs/billing/subscriptions/webhooks, https://stripe.com/docs/customer-management/integrate-customer-portal

## Output
- Scope, actions, files, commands, owners, and validation evidence.
- Remaining risks or review needs, only when they are relevant to this skill.
