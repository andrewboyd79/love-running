# PRD: Social Proof Stats

**Status:** Proposed  
**Created:** 2026-04-18  
**Experiment:** E3 (discovery-plan.md)

---

## Problem

The homepage makes claims about the club through copy and design but presents no numbers. Prospective members have no way to gauge how active or established the club is. A stat like "312 members" or "14,200km run this year" communicates momentum and credibility at a glance — but only if the numbers are real, current, and contextualised.

## Goal

Add a lightweight stats bar to the homepage hero that signals the club's activity level and increases click-through to the sign-up page.

## Success Metrics

- Homepage → sign-up page click-through rate increases by >10% vs. 2-week baseline
- No negative user feedback about stats feeling fake or inflated

---

## User Stories

| As a… | I want to… | So that… |
|-------|-----------|----------|
| Prospective member | See that this is an active, established club | I feel confident it's worth joining |
| Prospective member | Understand the scale of the club | I know whether it's an intimate group or a large community |
| Club committee | Update the stats periodically | The numbers stay credible as the club grows |

---

## Requirements

### Must Have
- Stats bar on the homepage, within or immediately below the hero section
- Minimum 3 stats: member count, total km run (or runs completed), runs per week
- Stats are hardcoded (static HTML) — no API or live data source
- Numbers must be accurate at launch — placeholder or invented numbers are not acceptable

### Should Have
- Stats bar updates process documented (who updates, how often, what numbers to use)
- 4 stats if a meaningful fourth number is available (e.g. years running, events attended)
- Subtle label beneath each number for context ("members", "km run this year", "runs each week")

### Won't Have (this version)
- Animated counting effect on scroll
- Live data from Strava, Garmin, or a database
- Per-member stats or leaderboards

---

## Stats to Display

Confirm actual numbers with the club committee before launch. Suggested set:

| Stat | Example value | Label |
|------|--------------|-------|
| Members | 312 | members |
| Km run this year | 14,200 | km run in 2026 |
| Weekly runs | 5 | runs every week |
| Years running | 6 | years in the Docklands |

**Important:** If real numbers are unavailable or unverifiable, do not launch this feature. Inflated stats will backfire if members notice.

---

## Technical Notes

- Single `<div class="stats-bar">` containing `<div class="stat">` items
- Each stat: `<span class="stat-num">` (large, Bebas Neue) + `<span class="stat-label">` (small, DM Sans)
- Hardcoded values — update in HTML when numbers change
- No JavaScript required
- Layout: `display: flex; gap: 48px; justify-content: center` on desktop
- Mobile (≤767px): wrap to 2×2 grid or single column

---

## Design Notes

- Placement: full-width band between the hero CTA and the ethos section
- Background: `var(--lemon)` (warm yellow) — high contrast, draws the eye, on-brand
- Number text: Bebas Neue, `font-size: 56px`, `color: var(--ink)`
- Label text: DM Sans, `font-size: 11px`, `font-weight: 600`, `letter-spacing: 2px`, uppercase, `color: var(--bark)`
- Dividers: thin `1px solid rgba(0,0,0,0.1)` vertical lines between stats on desktop
- Mobile: remove dividers; centre-align each stat

---

## Update Process

Stats should be reviewed and updated:
- **Monthly** during the running season (March–October)
- **At year-end** to reset "km run this year" counter
- **After a membership milestone** (e.g. hitting 400 members)

Responsibility: club committee or site owner. Process: edit the three `stat-num` values in `index.html` and commit.

---

## Acceptance Criteria

- [ ] Stats bar visible on homepage between hero and ethos sections
- [ ] Minimum 3 stats displayed with number and label
- [ ] Numbers are accurate and confirmed by the committee before launch
- [ ] Stats bar is responsive at 375px (wraps cleanly)
- [ ] Text contrast meets WCAG 3:1 minimum (lemon background — use `var(--ink)` text)
- [ ] No JavaScript used
- [ ] Update process documented and communicated to the committee
