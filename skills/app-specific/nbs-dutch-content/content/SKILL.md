---
name: nbs-dutch-content
description: Write Dutch user-facing copy for the Mee(r)Makers platform in the correct brand voice and terminology. Use when adding or reviewing UI labels, error messages, emails, CTAs, or page copy in PWN-NBS-Community, when naming a new route or content surface, or when another skill needs the brand glossary.
---

# NbS Dutch Content

## Use When
- writing or reviewing any user-facing text in PWN-NBS-Community: UI labels, toasts, errors, emails, landing copy, AI chat prompts
- naming a new route, content type, or editorial surface
- checking brand terms, persona names, or CTA phrasing

## Workflow
1. Language: every user-visible string is Dutch — UI, toasts, error messages, emails, and "Chat met De Natuur" (which always answers in Dutch, first person, as the IJsselmeer ecosystem persona). English stays in code identifiers, comments, and docs. Done when no user-visible string in the diff is English.
2. Brand casing: display copy uses `Mee(r)Makers` (community), singular `Mee(r)Maker`, and `NbS` for Nature-based Solutions (`docs/context.md` "Brand Name Consistency" supersedes the older `NBS` casing still present in `docs/SYSTEM_PROMPT.md`). Fixed names: `Klimaatbuffer IJsselmeer` (initiative), `PWN` (owner), `klimaatbufferijsselmeer.nl` (domain), core message "Wij zijn water. Wij zijn natuur.". Technical identifiers keep their lowercase/legacy machine values — `meermakers@pwn.nl`, slugs, asset paths, query params — and must not be renamed to match display casing. Done when new copy uses these exact casings and no identifier changed.
3. Tone (`docs/SYSTEM_PROMPT.md` §7): transparant, gedurfd, sociaal — uitnodigend, duidelijk, eerlijk over probleem en aanpak; results are shared "the good, the bad & the ugly"; no marketing jargon. Copy invites people to join and act ("coalition of the willing"), it does not advertise. Done when every claim in the copy traces to `docs/SYSTEM_PROMPT.md` or existing platform content — invent no facts, numbers, or slogans.
4. Glossary — reuse, never invent: persona machine values `omwonende` | `pwn_medewerker` | `ambassadeur` | `other` (the code enum in `apps/web/app/community/profiel/page.tsx`), rendered with display labels "Betrokken Omwonende", "PWN Medewerker", "Organisatie Ambassadeur"; post types `Win`, `Update`, `Les`, `Oproep`, `Discussie`; levels `Nieuwkomer` → `Deelnemer` → `Bijdrager` → `Actief Lid` → `Ambassadeur` → `Mee(r)Maker`; content-type labels `Nieuwsbericht`, `Evenement`, `Persbericht`, `Mijlpaal`, `Kennisbankbestand` and approval statuses "Wacht op goedkeuring" / "Goedgekeurd" / "Afgewezen" / "Geannuleerd" (both in `apps/web/lib/content/publication.ts`). Done when every domain term in new copy exists in `docs/SYSTEM_PROMPT.md` or an existing label constant.
5. CTAs and routes: the primary CTA is "Word Mee(r)Maker" (see `apps/web/components/landing/KBHero.tsx`, `KBNavbar.tsx`, `KBCtaSection.tsx` — it opens the signup drawer); routes are Dutch nouns (`/nieuws`, `/evenementen`, `/kennisbank`, `/mijlpalen`, `/pers`, `/over-ons`, `/redactie`, `/veelgestelde-vragen`, `/contributor-uitnodiging`). Done when new CTAs reuse existing phrasing and new routes follow the Dutch-noun pattern.
6. Errors: surface database/PostgREST failures through `getUserFacingErrorMessage` in `apps/web/lib/user-facing-errors.ts` — never raw codes, hints, or JSON coercion text; Postgres RPCs raise Dutch messages directly (e.g. "Je moet ingelogd zijn om publicatie aan te vragen"). Done when every new error path shows Dutch text with no PGRST/SQLSTATE leakage.

## Tools And Sources
- `docs/SYSTEM_PROMPT.md` — domain, personas, gamification, tone (§7), "De Natuur" persona (§4.10). Caveat: its §6 tech stack (Vite, React Router) is stale; trust it for domain and brand only.
- `docs/context.md` — "Brand Name Consistency Context" and "Mee(r)Makers Brand Copy Context" (binding casing decisions).
- `apps/web/lib/content/publication.ts` — canonical Dutch label constants for editorial content.

## Validation
- Grep the diff for legacy casings: `Meermakers`, `MeerMakers`, `Mee(r)makers`, and display-copy `NBS` — zero hits in user-visible strings (component names like `MeermakersCarousel` are exempt technical identifiers).
- Every quoted domain term appears verbatim in `docs/SYSTEM_PROMPT.md`, `docs/context.md`, or an existing label constant.
- No user-visible English strings in the changed files.

## Reference Anchors
- `docs/SYSTEM_PROMPT.md` §7 "Taal en toon" and §8 "Samenvatting voor de LLM"
- `docs/context.md` "# Mee(r)Makers Brand Copy Context"

## Output
- Dutch copy that passes the three Validation greps, with any newly needed term explicitly flagged to the user as "not in the existing glossary" instead of silently invented.
