# Phase 3 — Six New Features: Design Spec

**Date:** 2026-04-18  
**Status:** Approved  
**Author:** Claude Code + Andrew Boyd  
**Preceding work:** Phase 2b remediation (`2026-04-17-remediation-design.md`) — complete

---

## Overview

Phase 3 adds six new features to the Love Running static site:

| # | Feature | Page(s) affected |
|---|---------|-----------------|
| 1 | Social proof stats bar | `index.html` |
| 2 | Route maps | `index.html` (schedule section) |
| 3 | FAQ / Getting Started | `signup.html` |
| 4 | Event calendar | `index.html` |
| 5 | Member stories | `index.html` |
| 6 | Gallery filters | `gallery.html` |

Implementation follows the same process as Phase 2b: one GitHub issue per feature, one PR per issue, `superpowers:verification-before-completion` gate before every merge, user review required before any PR can be closed.

---

## Process Gates (Prerequisite — before any feature work starts)

### Branch protection
Before the first feature branch is created, enable GitHub branch protection on `master`:
- Require pull request reviews before merging
- Required reviewer: `andrewboyd79` (cannot be bypassed)
- Dismiss stale reviews when new commits are pushed
- Block author from approving their own PR

### GitHub Project board
Create a new Phase 3 project board (Kanban: Backlog → In Progress → In Review → Done). One card per feature issue.

### Verification gate
The `superpowers:verification-before-completion` skill **must** be invoked before requesting merge on every PR. No exceptions.

---

## Final Homepage Section Order

After all Phase 3 features land, the homepage reads top to bottom:

1. Nav
2. Hero
3. **Stats bar** ← new
4. Ethos section
5. **Member Stories** ← new
6. Schedule section (with **Route Maps** strip embedded) ← new
7. **Event Calendar** ← new
8. Footer

---

## Feature 1 — Social Proof Stats Bar

**PRD:** `docs/prd/1-prd-social-proof-stats.md`

### Placement decision
Option C (visual review, 2026-04-18): cream-background full-width band immediately below the hero bezier curve, above the ethos section. The band sits on `var(--cream)` (not `var(--lemon)`), with Bebas Neue large numbers in `var(--ink)` and small DM Sans labels below each number.

### Design
- Four stats: Members, km run in 2026, runs every week, years in the Docklands
- Layout: `display: flex; justify-content: space-evenly` with thin `var(--oat)` vertical dividers on desktop
- Mobile (≤767px): 2×2 grid, dividers removed
- No JavaScript

### Numbers
Numbers must be confirmed with the club committee before launch. Placeholders are not acceptable at launch. If real numbers are unavailable, this feature is deferred.

### New HTML structure
```html
<section class="stats-bar" aria-label="Club statistics">
  <div class="stat">
    <span class="stat-num">312</span>
    <span class="stat-label">members</span>
  </div>
  <!-- repeat × 4 -->
</section>
```

### Files changed
- `index.html` — add `<section class="stats-bar">` after hero
- `assets/css/style.css` — `.stats-bar`, `.stat`, `.stat-num`, `.stat-label` rules

---

## Feature 2 — Route Maps

**PRD:** `docs/prd/2-prd-route-maps.md`

### Placement decision
Option B (visual review, 2026-04-18): full-width two-column strip directly below the schedule run-type cards, still within the schedule section. Left column = Urban (matcha colour tag), right column = Trail (slushie colour tag). Each column has a colour-coded label, a short "what to expect" paragraph, an OpenStreetMap `<iframe>`, and a "Get directions" link.

### Design
- Two-column grid on desktop (`1fr 1fr`), stacks to single column on mobile
- Left column header bar: `var(--matcha)` tint — "Urban Run · Grand Canal Dock"
- Right column header bar: `var(--slushie)` tint — "Trail Run · Phoenix Park"
- `<iframe>` `aspect-ratio: 16/9`, `border-radius: 12px`, no border
- Each iframe has a descriptive `title` attribute (accessibility)
- No API key required (OpenStreetMap embed)

### Files changed
- `index.html` — add maps strip inside schedule section
- `assets/css/style.css` — `.maps-strip`, `.map-col`, `.map-header` rules

---

## Feature 3 — FAQ / Getting Started

**PRD:** `docs/prd/3-prd-faq.md`

### Placement decision
Option A (visual review, 2026-04-18): inside the existing sign-up form panel on `signup.html`, above the form heading. The FAQ lives inside the split panel rather than in a separate section, so it stays within the same cream background and doesn't push the form down the page.

### Design
- Eight questions using native `<details>` / `<summary>` — no JavaScript
- All items collapsed by default
- Chevron (`›`) right-aligned, rotates 180° on `[open]` state via CSS `transition: transform`
- `summary` text: DM Sans 600, `var(--ink)`, 15px
- Answer text: DM Sans 400, `var(--stone)`, 14px, line-height 1.7
- Divider: `border-bottom: 1px solid var(--oat)` between items
- Section heading: "Getting Started" in Bebas Neue above the accordion

### Files changed
- `signup.html` — add `<section class="faq">` inside form panel, above `<h2>`
- `assets/css/style.css` — `.faq`, `.faq-item`, `.faq-question`, `.faq-answer` rules

---

## Feature 4 — Event Calendar

**PRD:** `docs/prd/4-prd-event-calendar.md`

### Placement decision
Option B (visual review, 2026-04-18): between the schedule section and the footer on the homepage. The schedule shows weekly recurring runs; the Events section extends the horizon to one-off races and club events.

### Implementation approach
Hybrid: Google Calendar iCal → GitHub Actions daily cron → `data/events.json` → vanilla JS renders branded event cards.

This gives the committee self-service (they add events to Google Calendar) while keeping the visual appearance fully on-brand (not the Google Calendar iframe).

**Architecture:**
```
Google Calendar (public iCal)
        ↓  (daily GitHub Actions cron)
.github/workflows/sync-calendar.yml
        ↓  (parses iCal, filters future events, writes JSON)
data/events.json
        ↓  (vanilla JS on page load)
assets/js/events.js
        ↓  (renders branded event cards)
<section class="events-section"> in index.html
```

### data/events.json shape
```json
[
  {
    "id": "abc123",
    "title": "Dublin City 10k",
    "date": "2026-05-12",
    "location": "Phoenix Park",
    "description": "Club group entry — register together",
    "link": "https://example.com/event-registration",
    "type": "race"
  }
]
```

### Graceful degradation
The `<section class="events-section">` is pre-rendered in HTML with a static "No upcoming events" state. `events.js` replaces this on load if `data/events.json` contains future events. If JS is disabled or the JSON fetch fails, the static fallback shows.

### GitHub Actions workflow
- Trigger: `schedule: cron('0 6 * * *')` (daily at 06:00 UTC) + `workflow_dispatch`
- Steps: fetch iCal URL, parse with `ical.js`, filter to events with `start > now`, write `data/events.json`, commit if changed

### New files
- `data/events.json`
- `.github/workflows/sync-calendar.yml`
- `assets/js/events.js`

### Files changed
- `index.html` — add `<section class="events-section">` with static fallback before footer
- `assets/css/style.css` — `.events-section`, `.event-card`, `.event-date-badge` rules

---

## Feature 5 — Member Stories

**PRD:** `docs/prd/5-prd-member-stories.md`

### Placement decision
Option B (visual review, 2026-04-18): between the ethos section and the schedule section. The ethos section makes claims about the club's values; member stories immediately follow with real voices that validate those claims. Then the schedule closes the case by giving readers something concrete to act on.

### Implementation
Full implementation (not fake door) — real member quotes and photos sourced from the club before launch.

### Design
- Three-column card grid on desktop, single column on mobile
- Each card: circular avatar photo (square crop, `object-fit: cover`, `border-radius: 50%`), name, "Member since YYYY", run type badge, italic blockquote
- Card style: white `background`, `border-radius: 16px`, `border: 1px solid var(--oat)`, subtle shadow
- Run type badge: reuses existing pill tokens (`--matcha` for Urban, `--slushie` for Trail, a lavender/ube token for Sunday)
- Section heading: Bebas Neue "Real people. Real runs." with an eyebrow label "Member stories"
- Section background: `var(--cream)`, `border-top: 1px solid var(--oat)`

### Content requirements (before launch)
Three real members must supply: first name + last initial, membership year, run type, 2–3 sentence quote, square headshot (min 200×200px). If content is unavailable before launch, the section is deferred.

### Files changed
- `index.html` — add `<section class="stories-section">` after ethos, before schedule
- `assets/css/style.css` — `.stories-section`, `.stories-grid`, `.story-card`, `.story-avatar`, `.story-quote` rules
- `assets/images/` — three member headshot images

---

## Feature 6 — Gallery Filters

**PRD:** `docs/prd/6-prd-gallery-filters.md`

### Placement decision
Option B (visual review, 2026-04-18): replace the existing hero-bar pills with prominent filter buttons that include photo counts per category (e.g. "Urban · 14"). This replaces the current decorative-only pills with functional controls and is clearer about the fact that filtering is possible.

### Design
- Filter bar stays in its current position below the gallery hero strip
- Four buttons: All · Urban · Trail · Sunday — pill style, larger than current pills
- Each button shows the count of photos in that category ("Urban · 14")
- Active state: `background: var(--ink)`, white text
- Inactive state: `background: #fff`, `border: 1.5px solid var(--oat)`, `color: var(--stone)`
- Active Urban: `background: var(--matcha)`, `color: var(--ink)`
- Active Trail: `background: var(--slushie)`, white text
- Active Sunday: `background: var(--lemon)`, `color: var(--ink)`

### JavaScript approach
Vanilla JS (~20 lines), no library, no build step:

```js
// assets/js/gallery-filters.js
const buttons = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.gallery-item');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    items.forEach(item => {
      item.hidden = filter !== 'all' && item.dataset.type !== filter;
    });
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
```

`item.hidden = true` is used instead of `display: none` for better accessibility (hidden attribute is understood by screen readers).

### Graceful degradation
With JS disabled, all photos remain visible and filter buttons are inert — no broken state.

### Tagging convention
All existing and new gallery `<figure>` elements must receive `data-type="urban|trail|sunday|event"` before launch. Authoring convention documented in the PRD.

### New files
- `assets/js/gallery-filters.js`

### Files changed
- `gallery.html` — replace existing hero-bar pills with new filter buttons; add `data-type` to all `<figure>` elements; add `<script src="assets/js/gallery-filters.js">` before `</body>`
- `assets/css/style.css` — update `.hero-bar` pill rules for new filter button states

---

## New Files Introduced in Phase 3

| File | Purpose |
|------|---------|
| `data/events.json` | Upcoming events data, synced from Google Calendar |
| `.github/workflows/sync-calendar.yml` | Daily cron to refresh `events.json` from iCal |
| `assets/js/events.js` | Renders branded event cards from `events.json` |
| `assets/js/gallery-filters.js` | Vanilla JS gallery filter logic |

---

## Shared Non-Functional Requirements

- All new HTML must pass W3C validator with zero errors
- All new UI must pass axe DevTools with zero new violations
- All new colour combinations must meet WCAG 2.1 AA contrast (4.5:1 normal text, 3:1 large/bold)
- All new sections must be responsive at 375px, 768px, and 1440px viewports
- No third-party JS libraries introduced — vanilla only

---

## Implementation Order

Features are delivered in this sequence, one PR at a time:

| Order | Feature | Dependency |
|-------|---------|-----------|
| 1 | Stats bar | None |
| 2 | Route maps | None |
| 3 | FAQ | None |
| 4 | Event calendar | GitHub Actions setup |
| 5 | Member stories | Real content sourced |
| 6 | Gallery filters | `data-type` tagging plan agreed |

Features 1–3 can proceed immediately. Features 4–6 have content/config prerequisites that must be confirmed before the branch opens.

---

## Issue and PR Management

- One GitHub issue per feature, using the same template as Phase 2b
- Issues labelled: `phase-3`, `enhancement`
- Each issue references this spec and its corresponding PRD
- Each PR targets `master`, requires one approving review from `andrewboyd79`
- `superpowers:verification-before-completion` is run before requesting review on every PR
- No PR is merged without explicit user approval

---

## Out of Scope for Phase 3

- Strava / Garmin live data integration
- Member-submitted content or self-service uploads
- Video content
- Dedicated member profile pages
- Multi-select gallery filters
- RunIreland / race registration platform integration
