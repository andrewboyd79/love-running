# PRD: Route Maps

**Status:** Proposed  
**Created:** 2026-04-18  
**Experiment:** E4 (discovery-plan.md)

---

## Problem

First-time visitors who want to join a run don't know exactly where to show up. The schedule section names locations ("Grand Canal Dock", "Phoenix Park Main Gate") but provides no visual reference. This logistical uncertainty is a plausible barrier to first attendance.

## Goal

Reduce the "where exactly do I go?" friction for prospective members by showing the meeting point and approximate route for each run type directly on the homepage.

## Success Metrics

- Qualitative: reduction in "where do I go?" questions via social/WhatsApp
- Quantitative: sign-up form completions stable or increased after 4 weeks live

---

## User Stories

| As a… | I want to… | So that… |
|-------|-----------|----------|
| Prospective member | See where Urban runs start | I know exactly where to meet on Monday/Friday |
| Prospective member | See the Phoenix Park meeting point | I don't get lost on my first trail run |
| Existing member | Share a map link with a friend | They can find us without asking |

---

## Requirements

### Must Have
- Embedded map showing Grand Canal Dock meeting point (The Marker) for Urban runs
- Embedded map showing Phoenix Park Main Gate meeting point for Trail runs
- Maps displayed within the existing schedule section, alongside the relevant run group
- Maps load without JavaScript
- Maps are accessible (keyboard-focusable iframe with `title` attribute)

### Should Have
- Short "what to expect" paragraph per route (distance, terrain, typical duration)
- Link to open the location in Google Maps / Apple Maps for navigation

### Won't Have (this version)
- Animated route trace
- Turn-by-turn directions
- Dynamic distance/elevation data

---

## Technical Notes

- Use OpenStreetMap via `<iframe>` (free, no API key required)
- Embed URL format: `https://www.openstreetmap.org/export/embed.html?bbox=...&marker=...`
- Add `title="Urban run meeting point — Grand Canal Dock"` to each iframe for accessibility
- Wrap in a `<div>` with `aspect-ratio: 16/9` and `width: 100%` for responsive sizing
- On mobile (≤767px), maps stack below the run group text

---

## Design Notes

- Maps sit below the run entry list within each schedule group card
- Style: rounded corners (`border-radius: 12px`), no border, slight shadow consistent with card styling
- Map marker should be visible at default zoom — test zoom level for both locations

---

## Acceptance Criteria

- [ ] Urban run map embeds correctly and shows The Marker, Grand Canal Dock
- [ ] Trail run map embeds correctly and shows Phoenix Park Main Gate
- [ ] Both maps have a descriptive `title` attribute
- [ ] Maps are responsive — no overflow at 375px viewport
- [ ] "What to expect" copy present for both routes
- [ ] Google/Apple Maps link present for both routes
- [ ] Page loads without JS errors
