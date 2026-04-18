# PRD: Member Stories

**Status:** Proposed  
**Created:** 2026-04-18  
**Experiment:** E1 (discovery-plan.md)

---

## Problem

The homepage persuades through copy and design but has no social proof from real people. Prospective members have no way to hear from someone like them about what joining was actually like. This is a high-uncertainty assumption — member stories *may* move the needle on sign-up conversions, or visitors may ignore them entirely.

## Goal

Validate demand for member stories content before investing in sourcing it, then — if demand is confirmed — build a genuine testimonials section that increases sign-up page click-through from the homepage.

## Phased Approach

**Phase 1 (Fake Door — 2 weeks):** Add a "Meet the Members" section with 3 placeholder cards and a tracked "Read more" link. If >15% of homepage visitors click, proceed to Phase 2.  
**Phase 2 (Real Content):** Replace placeholders with real member quotes, names, and photos sourced from the club.

## Success Metrics

- Phase 1: >15% of homepage visitors interact with the section
- Phase 2: Homepage → sign-up page click-through rate increases vs. pre-feature baseline

---

## User Stories

| As a… | I want to… | So that… |
|-------|-----------|----------|
| Prospective member | Read about someone else's first run | I feel reassured it's for people like me |
| Prospective member | See that members are friendly and welcoming | I'm less anxious about showing up alone |
| Existing member | See my story featured | I feel recognised and part of the club |

---

## Requirements

### Phase 1 — Fake Door

#### Must Have
- "Meet the Members" section on the homepage, below the ethos section
- 3 member cards, each with: avatar placeholder, name, run type badge, 2-sentence quote
- "Read more" link on each card with `?ref=member-stories` query param for tracking
- Section heading and introductory line

#### Won't Have (Phase 1)
- Real photos
- Real quotes
- Full member profile pages

### Phase 2 — Real Content

#### Must Have
- 3 real member stories with genuine quotes and photos
- Name, how long they've been a member, which run type they do
- Photo sized consistently (square crop, `object-fit: cover`)

#### Should Have
- Rotating or expandable stories (CSS-only `<details>` expand, no JS required)
- 4–6 stories total to give variety

#### Won't Have (this version)
- Dedicated member profile pages
- Member-submitted content / self-service uploads
- Video testimonials

---

## Technical Notes

- Section uses CSS grid: 3 columns desktop, 1 column mobile
- Avatar: `<img>` with fixed square dimensions and `border-radius: 50%`
- Phase 1 placeholder avatars: CSS-generated initials circle using `:before` content
- Quote text: `<blockquote>` element for semantic correctness
- Run type badge: reuse existing pill styling from ethos section

---

## Design Notes

- Section background: `var(--cream)` with a subtle `var(--oat)` top border to separate from ethos section
- Card style: white background, `border-radius: 16px`, light shadow
- Quote text: DM Sans italic, `font-size: 15px`, `color: var(--stone)`
- Member name: DM Sans semibold, `var(--ink)`
- Run badge: small pill using existing matcha/slushie/ube tokens per run type

---

## Content Brief (Phase 2)

Each member story needs:
- Full name (or first name + initial)
- How long they've been a member (e.g. "Member since 2024")
- Which run(s) they do
- A 2–3 sentence quote covering: what made them join, what they didn't expect, what keeps them coming back
- Square headshot photo (minimum 200×200px)

---

## Acceptance Criteria

**Phase 1**
- [ ] Section visible on homepage below ethos
- [ ] 3 placeholder cards render correctly at desktop and mobile
- [ ] Each "Read more" link includes `?ref=member-stories` param
- [ ] Section heading and intro copy present

**Phase 2**
- [ ] 3 real member stories with genuine photos and quotes
- [ ] Photos render correctly at all viewports (square crop, no distortion)
- [ ] `<blockquote>` used for quote text
- [ ] Run type badge matches the member's actual run type
- [ ] All images have descriptive `alt` text
