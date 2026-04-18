# PRD: Event Calendar

**Status:** Proposed  
**Created:** 2026-04-18

---

## Problem

The weekly schedule section shows recurring runs but gives members no visibility of one-off events — races the club is entering together, social runs, park runs, charity events. Members currently have no reason to return to the site between sign-up and their first run, and existing members have no reason to check back after joining.

## Goal

Give members a reason to return to the site by surfacing upcoming club events and races beyond the weekly schedule. Increase site return visits and club event attendance.

## Success Metrics

- Qualitative: members reference the calendar when asking about events (social/WhatsApp signal)
- Quantitative: pages per session increases (indicating return visits to check events)

---

## User Stories

| As a… | I want to… | So that… |
|-------|-----------|----------|
| Existing member | See upcoming races the club is entering | I can register in time and run with friends |
| Prospective member | See that the club does things beyond weekly runs | I understand the full social offering before joining |
| Club committee | Publish new events without a developer | I can keep the calendar current independently |

---

## Requirements

### Must Have
- A dedicated events section on the homepage (or a standalone `events.html` page)
- Each event shows: name, date, location, brief description, and a link (registration or info)
- Events displayed in chronological order
- Past events do not show (or are visually de-emphasised)
- Maintainable without code changes (see options below)

### Should Have
- 3–5 upcoming events visible at launch
- "Add to calendar" link per event (Google Calendar / .ics file)
- Clear empty state if no events are upcoming ("No events scheduled — check back soon")

### Won't Have (this version)
- Member RSVP or attendance tracking
- Event photos or post-event recaps
- Integration with race registration platforms (RunIreland, Strava)

---

## Implementation Options

Two approaches — choose based on how comfortable the committee is with maintaining content:

### Option A — Static HTML List (Recommended for launch)
Hardcoded `<ul>` of events in `index.html`. Simple to build, requires a developer to update. Low maintenance burden if events are infrequent.

**Pros:** No third-party dependency, fully on-brand, zero cost  
**Cons:** Committee cannot update without editing HTML

### Option B — Google Calendar Embed
Embed a public Google Calendar iframe. Committee manages events in Google Calendar; site updates automatically.

**Pros:** Committee can self-serve; events stay current without a developer  
**Cons:** Google Calendar iframe is hard to style; may look off-brand; relies on Google

**Recommendation:** Launch with Option A. If the committee needs to update events more than once a month, migrate to Option B.

---

## Technical Notes

- Option A: `<ul class="events-list">` with `<li>` per event; each `<li>` contains date badge, name, location, description, link
- Date badge: display month + day prominently (Bebas Neue, large, accent colour)
- Past event filtering (Option A): Add `data-date="YYYY-MM-DD"` attribute; a small `<script>` can hide past events, or manually remove them
- Option B: `<iframe src="https://calendar.google.com/calendar/embed?src=...">` with `frameborder="0"` and responsive sizing

---

## Design Notes

- Section placement: between the schedule and ethos sections on the homepage, or as a standalone page linked from nav
- Each event card: left-aligned date badge (lemon `#fbbd41` background, ink text), event name in Bebas Neue, details in DM Sans
- Layout: single column list (not grid) — events are sequential, not comparable
- Mobile: full-width cards, date badge above title

---

## Acceptance Criteria

- [ ] Events section visible with minimum 3 upcoming events at launch
- [ ] Each event shows name, date, location, description, and link
- [ ] Events are in chronological order
- [ ] Empty state message shown if no events are listed
- [ ] "Add to calendar" link present per event
- [ ] Section is responsive at 375px, 768px, and 1440px
- [ ] If Option B: Google Calendar iframe loads and displays events correctly
