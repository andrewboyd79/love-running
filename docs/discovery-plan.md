# Discovery Plan: Love Running — New Features

**Date:** 2026-04-18  
**Product stage:** Existing product  
**Discovery question:** What features should we build next to reduce sign-up friction and increase member engagement?

---

## Ideas Explored

Ten ideas were brainstormed from PM, Designer, and Engineer perspectives:

| # | Idea |
|---|------|
| 1 | Route maps — show Grand Canal Dock and Phoenix Park routes |
| 2 | Member stories — testimonial cards with photos and quotes |
| 3 | Event calendar — upcoming races and club events |
| 4 | Newsletter signup — email capture via Mailchimp |
| 5 | FAQ / Getting Started — what to wear, where to park, pace groups |
| 6 | Gallery filters — filter photos by run type or date |
| 7 | Social proof stats — member count, km run, total runs |
| 8 | Strava CTA — link/badge to club Strava group |
| 9 | Run status banner — manually-updated "today's run is on" notice |
| 10 | WhatsApp CTA — prominent link to join the club group chat |

---

## Selected Ideas for Validation

Six ideas carried forward based on potential impact on sign-up conversion and member engagement:

| Idea | Rationale |
|------|-----------|
| Route maps | Removes a concrete logistical barrier for first-timers |
| Member stories | Highest-leverage trust signal for undecided visitors |
| Event calendar | Gives existing members a reason to return to the site |
| FAQ / Getting Started | Directly addresses questions that prevent first sign-ups |
| Gallery filters | Improves browsing experience as photo content grows |
| Social proof stats | Low-effort credibility signal on the homepage |

---

## Critical Assumptions

| # | Assumption | Category | Impact | Uncertainty | Priority |
|---|-----------|----------|--------|-------------|----------|
| A1 | Routes unknown is a genuine sign-up barrier | Value | High | Medium | 1 |
| A6 | Member stories persuade better than copy alone | Value | High | High | 2 |
| A14 | FAQ questions block first-time sign-ups | Value | High | High | 3 |
| A11 | Users return to check the calendar regularly | Value | Medium | High | 4 |
| A22 | Social proof stats increase sign-up intent | Value | Medium | High | 5 |
| A18 | Users want filtered photo browsing | Value | Low | High | 6 |
| A8 | Members will provide quotes and photos | Feasibility | High | Medium | 7 |
| A13 | Committee will maintain events list reliably | Viability | High | Medium | 8 |
| A20 | Adding JS is acceptable on this static site | Feasibility | Medium | Low | 9 |
| A7 | Visitors actually read testimonials | Usability | Medium | Medium | 10 |

**Leap-of-faith assumptions** (high impact, high uncertainty — test first):
- **A6** — member stories actually move the needle on conversions
- **A14** — FAQ friction is real and significant enough to address
- **A22** — social proof stats influence behaviour rather than being ignored

---

## Validation Experiments

| # | Tests Assumption | Method | Success Criteria | Effort | Timeline |
|---|-----------------|--------|-----------------|--------|----------|
| E1 | A6 — Member stories | Fake door section + click tracking | >15% of homepage visitors interact | Low | 2 weeks |
| E2 | A14 — FAQ friction | CSS-only FAQ accordion above sign-up form | Form completion rate increases vs. baseline | Low | 2+2 weeks |
| E3 | A22 — Social proof stats | Static stats bar in hero section | Sign-up click-through from homepage +10% | Very low | 2+2 weeks |
| E4 | A1 — Route maps | OpenStreetMap iframe embeds in schedule section | Reduced "where do I go?" questions; completions stable/up | Low | 4 weeks |

---

## Experiment Details

### E1 — Member Stories Fake Door
**Hypothesis:** Adding 3 member story cards to the homepage will cause >15% of visitors to engage, validating demand for real content.  
**Setup:** Add a "Meet the Members" section with 3 placeholder cards and a "Read more" link with a UTM or `?ref=stories` query param.  
**Measurement:** Track clicks to the linked destination vs. total homepage sessions.  
**Decision criteria:**
- Clicks >15% → invest in sourcing real member content and photos
- Clicks <5% → deprioritise; social proof copy may be sufficient

---

### E2 — FAQ Accordion on Sign-Up Page
**Hypothesis:** A 5-question FAQ above the sign-up form will reduce drop-off and increase form completions.  
**Setup:** CSS-only `<details>`/`<summary>` accordion covering: what to wear, where to meet, pace groups, what happens on your first run, how to cancel.  
**Measurement:** Compare form submission count for 2 weeks before vs. 2 weeks after addition.  
**Decision criteria:**
- Completion rate increases → expand FAQ and consider adding to homepage
- No change → friction is elsewhere (e.g. commitment, timing, trust)

---

### E3 — Social Proof Stats Bar
**Hypothesis:** A stats bar ("312 members · 14,200km run · 5 runs/week") in the hero section will increase click-through to the sign-up page.  
**Setup:** Single `<div>` with hardcoded stats added to hero section of index.html.  
**Measurement:** Track sign-up page click-through rate from homepage for 2 weeks before vs. 2 weeks after.  
**Decision criteria:**
- Click-through increases >10% → keep; establish a process to update numbers monthly
- No change → remove; numbers may not be credible without context

---

### E4 — Route Maps
**Hypothesis:** Embedding maps for both run routes in the schedule section reduces the logistical uncertainty that deters first-timers.  
**Setup:** Two OpenStreetMap `<iframe>` embeds (Grand Canal Dock and Phoenix Park Main Gate) in the schedule section, with a "what to expect" paragraph per route.  
**Measurement:** Qualitative signal (fewer "where do I go?" questions in WhatsApp/social); quantitative signal (sign-up completions stable or up over 4 weeks).  
**Decision criteria:**
- Positive qualitative signal → keep and refine
- No signal after 4 weeks → maps aren't the friction point; investigate further

---

## Discovery Timeline

| Week | Activity |
|------|----------|
| Week 1 | Build E3 (stats bar) and E4 (route maps) — very low effort, ship together |
| Week 2 | Build and ship E2 (FAQ accordion on signup.html) |
| Week 3 | Build and ship E1 (member stories fake door) |
| Weeks 1–4 | All experiments live; collect baseline data |
| Week 5 | Analyse E1 and E2 results |
| Week 6 | Analyse E3 and E4 results; make build/kill decisions |

---

## Decision Framework

| Experiment | If succeeds | If fails |
|-----------|-------------|---------|
| E1 Member stories | Source real member content; build full stories section | Deprioritise; focus trust signals on copy and stats |
| E2 FAQ | Expand FAQ; consider prominent placement on homepage | Investigate other sign-up barriers (commitment, timing) |
| E3 Stats bar | Keep; update numbers monthly; consider animated counter | Remove from hero; stats not compelling without context |
| E4 Route maps | Keep permanently; add "what to bring" content alongside | Maps aren't the barrier; investigate via user interviews |

---

## Next Steps

- [ ] Build E3 (stats bar) and E4 (route maps) — Week 1
- [ ] Build E2 (FAQ accordion) — Week 2
- [ ] Build E1 (member stories fake door) — Week 3
- [ ] Review results at Week 5–6 and update this plan
- [ ] If E1 succeeds: create a brief for sourcing member stories
- [ ] If sign-up barriers persist after experiments: design a customer interview script
