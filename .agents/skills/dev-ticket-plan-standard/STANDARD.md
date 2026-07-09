---
name: dev-ticket-plan-standard
description: Standard every dev-ticket plan must satisfy before execution.
license: CC-BY-4.0
riskLevel: low
metadata:
  version: 1.0.0
  author: Seamless
---

# Dev Ticket Plan Standard

Every implementation plan MUST:
- State the goal and the checkable output of each phase.
- List the exact files/modules each phase touches.
- Enumerate open decisions; mark any that block implementation and STOP to ask.
- Include test coverage (happy + error paths) and a rollback path.
- Cite the ticket's acceptance criteria as approval criteria.

Refine this over time; bump `metadata.version` on each edit.