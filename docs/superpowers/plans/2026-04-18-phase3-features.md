# Phase 3 — Six New Features: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add six new features to the Love Running static site — stats bar, route maps, FAQ accordion, event calendar, member stories, and gallery filters — one PR per feature, fully verified before merge.

**Architecture:** Pure HTML/CSS/vanilla JS static site. No build step, no npm, no framework. New JS files are small and self-contained (`<20 lines each`). New CSS appended to `assets/css/style.css`. GitHub Actions handles the one automation task (iCal → JSON sync for event calendar).

**Tech Stack:** HTML5, CSS3 custom properties, vanilla JS (ES2017), Python 3 (GitHub Actions calendar sync), OpenStreetMap iframes, `gh` CLI for GitHub management.

---

## Process Gate — Every PR

Before opening any PR for review, **run `superpowers:verification-before-completion`**. No PR may be merged without this gate and without explicit approval from `andrewboyd79`.

---

## Task 0: Project Setup (Prerequisite)

**Files:**
- No files changed — GitHub configuration only

- [ ] **Step 1: Enable branch protection on master**

```bash
gh api repos/andrewboyd79/love-running/branches/master/protection \
  --method PUT \
  -H "Accept: application/vnd.github+json" \
  --input - <<'EOF'
{
  "required_status_checks": null,
  "enforce_admins": false,
  "required_pull_request_reviews": {
    "required_approving_review_count": 1,
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": false,
    "require_last_push_approval": false
  },
  "restrictions": null
}
EOF
```

Expected: `200 OK` JSON response with `required_pull_request_reviews.required_approving_review_count: 1`.

- [ ] **Step 2: Verify protection is active**

```bash
gh api repos/andrewboyd79/love-running/branches/master/protection \
  -H "Accept: application/vnd.github+json" \
  | jq '.required_pull_request_reviews'
```

Expected output:
```json
{
  "dismiss_stale_reviews": true,
  "require_code_owner_reviews": false,
  "required_approving_review_count": 1
}
```

- [ ] **Step 3: Create Phase 3 GitHub Project board**

Go to https://github.com/andrewboyd79/love-running → Projects → New project → Board template.
Name it "Phase 3 — New Features". Add columns: Backlog, In Progress, In Review, Done.

- [ ] **Step 4: Create GitHub issues for all six features**

```bash
gh issue create \
  --title "feat: social proof stats bar on homepage" \
  --body "Implement the stats bar per \`docs/prd/1-prd-social-proof-stats.md\` and Phase 3 spec." \
  --label "enhancement"

gh issue create \
  --title "feat: route maps in schedule section" \
  --body "Implement OpenStreetMap iframes per \`docs/prd/2-prd-route-maps.md\` and Phase 3 spec." \
  --label "enhancement"

gh issue create \
  --title "feat: FAQ accordion on signup page" \
  --body "Implement getting-started FAQ per \`docs/prd/3-prd-faq.md\` and Phase 3 spec." \
  --label "enhancement"

gh issue create \
  --title "feat: event calendar on homepage" \
  --body "Implement Google Calendar → GitHub Actions → JSON → branded cards per \`docs/prd/4-prd-event-calendar.md\` and Phase 3 spec." \
  --label "enhancement"

gh issue create \
  --title "feat: member stories section on homepage" \
  --body "Implement 3-column member story cards per \`docs/prd/5-prd-member-stories.md\` and Phase 3 spec." \
  --label "enhancement"

gh issue create \
  --title "feat: gallery filter buttons with photo counts" \
  --body "Implement vanilla JS gallery filters per \`docs/prd/6-prd-gallery-filters.md\` and Phase 3 spec." \
  --label "enhancement"
```

- [ ] **Step 5: Add all six issues to the Phase 3 board**

In GitHub Projects, add each issue to the Backlog column.

---

## Task 1: Social Proof Stats Bar

**Files:**
- Modify: `index.html` — insert `<section class="stats-bar">` after line 196 (`</section>` hero close)
- Modify: `assets/css/style.css` — append stats bar CSS

**Prerequisite:** Confirm real member numbers with the club committee before coding. If numbers are unavailable, defer this feature. Do not use invented numbers.

- [ ] **Step 1: Create feature branch**

```bash
git checkout master && git pull
git checkout -b feature/stats-bar
```

- [ ] **Step 2: Add stats bar HTML to index.html**

In `index.html`, find the line:
```html
</section>

<section class="ethos">
```

Replace it with:
```html
</section>

<section class="stats-bar" aria-label="Club statistics">
  <div class="stat">
    <span class="stat-num">312</span>
    <span class="stat-label">members</span>
  </div>
  <div class="stat-divider" aria-hidden="true"></div>
  <div class="stat">
    <span class="stat-num">14,200</span>
    <span class="stat-label">km run in 2026</span>
  </div>
  <div class="stat-divider" aria-hidden="true"></div>
  <div class="stat">
    <span class="stat-num">5</span>
    <span class="stat-label">runs every week</span>
  </div>
  <div class="stat-divider" aria-hidden="true"></div>
  <div class="stat">
    <span class="stat-num">6</span>
    <span class="stat-label">years in the Docklands</span>
  </div>
</section>

<section class="ethos">
```

> Update the four `stat-num` values to match the confirmed real numbers before committing.

- [ ] **Step 3: Add stats bar CSS to style.css**

Append to the end of `assets/css/style.css`:

```css
/* ── STATS BAR ── */
.stats-bar { background: var(--cream); border-bottom: 1px solid var(--oat); padding: 36px 48px; display: flex; align-items: center; justify-content: center; gap: 0; }
.stat { text-align: center; padding: 0 48px; }
.stat-num { display: block; font-family: 'Bebas Neue', sans-serif; font-size: 56px; line-height: 1; color: var(--ink); letter-spacing: 1px; }
.stat-label { display: block; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--bark); margin-top: 4px; }
.stat-divider { width: 1px; height: 48px; background: var(--oat); flex-shrink: 0; }
@media (max-width: 767px) {
  .stats-bar { flex-wrap: wrap; gap: 32px; padding: 28px 20px; }
  .stat { padding: 0; flex: 1 1 calc(50% - 16px); }
  .stat-num { font-size: 40px; }
  .stat-divider { display: none; }
}
```

- [ ] **Step 4: Open index.html in browser and verify**

Open `index.html` directly in browser (or use Live Server). Check:
- Stats bar appears between hero and ethos ✓
- Four numbers with labels render correctly ✓
- Divider lines appear between stats on desktop ✓

- [ ] **Step 5: Check at 375px viewport**

Open DevTools → toggle device toolbar → set width to 375px. Check:
- Stats wrap to 2×2 grid ✓
- Numbers readable, no overflow ✓
- Dividers hidden on mobile ✓

- [ ] **Step 6: Check at 768px viewport**

Set width to 768px. Check layout sits between mobile wrap and desktop row.

- [ ] **Step 7: Run axe DevTools**

Open the axe DevTools browser extension → Analyse page. Expected: 0 new violations introduced.

- [ ] **Step 8: Validate HTML**

Copy `index.html` contents to https://validator.w3.org/#validate_by_input. Expected: 0 errors.

- [ ] **Step 9: Check colour contrast manually**

Stats bar uses `var(--ink)` (`#0d0d0d`) on `var(--cream)` (`#faf9f7`). Contrast ratio ~19:1 — passes WCAG AA easily. No action needed.

- [ ] **Step 10: Commit**

```bash
git add index.html assets/css/style.css
git commit -m "feat: add social proof stats bar below hero"
```

- [ ] **Step 11: Run verification-before-completion skill**

Invoke `superpowers:verification-before-completion` and resolve any issues before proceeding.

- [ ] **Step 12: Push branch and open PR**

```bash
git push -u origin feature/stats-bar
```

```bash
gh pr create \
  --title "feat: social proof stats bar on homepage" \
  --body "$(cat <<'EOF'
## Summary
- Adds a full-width stats band between the hero and ethos sections on the homepage
- Four stats: members, km run in 2026, runs/week, years in the Docklands
- Pure HTML/CSS, no JavaScript
- Responsive: 2×2 grid on mobile

## Test checklist
- [ ] Visual check at 375px, 768px, 1440px
- [ ] axe DevTools: 0 new violations
- [ ] W3C validator: 0 errors
- [ ] Numbers confirmed with club committee

Closes #1
EOF
)" \
  --reviewer andrewboyd79
```

---

## Task 2: Route Maps

**Files:**
- Modify: `index.html` — insert maps strip inside schedule section, after `.schedule-cols` closing `</div>`, before `<!-- Sunday: event invite... -->`
- Modify: `assets/css/style.css` — append maps CSS

- [ ] **Step 1: Create feature branch**

```bash
git checkout master && git pull
git checkout -b feature/route-maps
```

- [ ] **Step 2: Add maps strip HTML to index.html**

In `index.html`, find:
```html
  </div>

  <!-- Sunday: event invite with ticket stub -->
```

Replace with:
```html
  </div>

  <!-- Route maps -->
  <div class="maps-strip">
    <div class="map-col map-col-urban">
      <div class="map-header" style="background: rgba(132,231,165,0.15); border-left: 3px solid var(--matcha);">
        <span class="map-run-dot" style="background: var(--matcha);"></span>
        <span class="map-run-label" style="color: #02492a;">Urban Run · Grand Canal Dock</span>
      </div>
      <p class="map-expect">5km on flat city paths along the Grand Canal. All paces welcome — the group never leaves anyone behind. Typical duration: 35–50 minutes. Road shoes, any kit.</p>
      <iframe
        title="Urban run meeting point — Grand Canal Dock, Dublin"
        src="https://www.openstreetmap.org/export/embed.html?bbox=-6.2440%2C53.3360%2C-6.2310%2C53.3430&amp;layer=mapnik&amp;marker=53.3394%2C-6.2376"
        class="map-frame"
        loading="lazy"
        referrerpolicy="no-referrer">
      </iframe>
      <a class="map-directions" href="https://maps.google.com/?q=The+Marker+Hotel,+Grand+Canal+Dock,+Dublin" target="_blank" rel="noopener">Get directions in Google Maps →</a>
    </div>
    <div class="map-col map-col-trail">
      <div class="map-header" style="background: rgba(0,137,173,0.1); border-left: 3px solid var(--slushie);">
        <span class="map-run-dot" style="background: var(--slushie);"></span>
        <span class="map-run-label" style="color: #00374a;">Trail Run · Phoenix Park</span>
      </div>
      <p class="map-expect">10km on mixed-terrain trails through Phoenix Park. Expect gentle hills, soft ground, and open sky. Typical duration: 55–75 minutes. Trail shoes recommended but road shoes fine.</p>
      <iframe
        title="Trail run meeting point — Phoenix Park Main Gate, Dublin"
        src="https://www.openstreetmap.org/export/embed.html?bbox=-6.3380%2C53.3530%2C-6.3240%2C53.3590&amp;layer=mapnik&amp;marker=53.3558%2C-6.3307"
        class="map-frame"
        loading="lazy"
        referrerpolicy="no-referrer">
      </iframe>
      <a class="map-directions" href="https://maps.google.com/?q=Phoenix+Park+Main+Gate,+Dublin" target="_blank" rel="noopener">Get directions in Google Maps →</a>
    </div>
  </div>

  <!-- Sunday: event invite with ticket stub -->
```

- [ ] **Step 3: Add maps CSS to style.css**

Append to the end of `assets/css/style.css`:

```css
/* ── ROUTE MAPS ── */
.maps-strip { display: grid; grid-template-columns: 1fr 1fr; gap: 0; background: var(--bark); }
.map-col { padding: 28px 32px 32px; }
.map-header { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 8px; margin-bottom: 14px; }
.map-run-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.map-run-label { font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
.map-expect { font-size: 13px; color: rgba(255,255,255,0.65); line-height: 1.6; margin-bottom: 16px; }
.map-frame { width: 100%; aspect-ratio: 16 / 9; border: none; border-radius: 12px; display: block; }
.map-directions { display: inline-block; margin-top: 12px; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.7); text-decoration: none; }
.map-directions:hover { color: #fff; }
@media (max-width: 767px) {
  .maps-strip { grid-template-columns: 1fr; }
  .map-col { padding: 24px 20px; }
}
```

- [ ] **Step 4: Open index.html in browser and verify**

Check:
- Maps strip appears inside schedule section, below the run-type cards ✓
- Urban map shows Grand Canal Dock area with a marker ✓
- Trail map shows Phoenix Park Main Gate area with a marker ✓
- "Get directions" links are present on both ✓
- "What to expect" text is present on both ✓

If maps don't show a marker: open each `src` URL directly in a browser tab to debug the bbox/marker coordinates.

- [ ] **Step 5: Check at 375px viewport**

- Maps stack to single column ✓
- Neither map overflows the viewport ✓
- Text readable at mobile size ✓

- [ ] **Step 6: Check iframe accessibility**

Open DevTools → Elements. Confirm each `<iframe>` has a non-empty `title` attribute.

- [ ] **Step 7: Run axe DevTools** — Expected: 0 new violations.

- [ ] **Step 8: Validate HTML** — W3C validator, 0 errors.

- [ ] **Step 9: Commit**

```bash
git add index.html assets/css/style.css
git commit -m "feat: add OpenStreetMap route maps to schedule section"
```

- [ ] **Step 10: Run verification-before-completion skill**

- [ ] **Step 11: Push and open PR**

```bash
git push -u origin feature/route-maps
gh pr create \
  --title "feat: route maps in schedule section" \
  --body "$(cat <<'EOF'
## Summary
- Adds two-column maps strip below schedule run-type cards
- Urban map: Grand Canal Dock (OpenStreetMap iframe, no API key)
- Trail map: Phoenix Park Main Gate (OpenStreetMap iframe, no API key)
- Includes what-to-expect copy and Google Maps directions link per route
- Responsive: stacks to single column on mobile

## Test checklist
- [ ] Visual check at 375px, 768px, 1440px
- [ ] Both maps render with visible marker
- [ ] Both iframes have descriptive title attributes
- [ ] axe DevTools: 0 new violations
- [ ] W3C validator: 0 errors

Closes #2
EOF
)" \
  --reviewer andrewboyd79
```

---

## Task 3: FAQ Accordion

**Files:**
- Modify: `signup.html` — insert FAQ section inside `.form-panel`, before `<h2 class="form-heading">`
- Modify: `assets/css/style.css` — append FAQ CSS

- [ ] **Step 1: Create feature branch**

```bash
git checkout master && git pull
git checkout -b feature/faq
```

- [ ] **Step 2: Add FAQ HTML to signup.html**

In `signup.html`, find:
```html
  <div class="form-panel">
    <h2 class="form-heading">Let's get you running</h2>
```

Replace with:
```html
  <div class="form-panel">
    <section class="faq" aria-label="Getting started">
      <h2 class="faq-heading">Getting Started</h2>
      <p class="faq-intro">Everything you need to know before your first run.</p>

      <details class="faq-item">
        <summary class="faq-question">What should I wear / what kit do I need?</summary>
        <div class="faq-answer">
          <p>Comfortable running clothes and any road or trail shoes depending on your run type. You don't need specialist kit — if you can run in it, bring it. For Trail runs, trail shoes with grip are recommended but not required.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">Where exactly do I meet for each run?</summary>
        <div class="faq-answer">
          <p>Urban runs meet at <strong>The Marker Hotel, Grand Canal Dock</strong> (Google Maps: "The Marker Hotel Dublin"). Trail runs meet at the <strong>Phoenix Park Main Gate</strong> off Parkgate Street. See the route maps on the homepage for precise pin locations.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">What if I'm slow — will I hold people back?</summary>
        <div class="faq-answer">
          <p>No. The club runs at all paces and nobody gets left behind. Faster runners double back to run with the group. We finish together. Your pace on day one is irrelevant — just show up.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">Do I need to be a member to come to my first run?</summary>
        <div class="faq-answer">
          <p>No — your first run is always free and commitment-free. Just show up at the meeting point at the right time. If you want to keep coming, sign up here and we'll add you to the group.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">How much does it cost?</summary>
        <div class="faq-answer">
          <p>Membership is free. There are no fees, no subscriptions, and no hidden costs. Some members chip in for club events like races but that's always optional.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">What happens on a Sunday coffee run?</summary>
        <div class="faq-answer">
          <p>The Sunday run is a relaxed social run — about 5–6km at whatever pace feels good. It ends at a nearby café for coffee and a debrief. No run required: some members just show up for the coffee. It starts at 11:30 at The Marker Hotel.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">Can I come to just one run, or do I have to commit?</summary>
        <div class="faq-answer">
          <p>Come as often or as rarely as you like. There's no attendance requirement. Some members come every day; others come once a month. The group will always be there when you want it.</p>
        </div>
      </details>

      <details class="faq-item">
        <summary class="faq-question">How do I cancel or change my run type after signing up?</summary>
        <div class="faq-answer">
          <p>Just reply to the welcome email or message us on Instagram. We'll update your run type with no hassle.</p>
        </div>
      </details>
    </section>

    <h2 class="form-heading">Let's get you running</h2>
```

- [ ] **Step 3: Add FAQ CSS to style.css**

Append to the end of `assets/css/style.css`:

```css
/* ── FAQ ── */
.faq { border-bottom: 1px solid var(--oat); padding-bottom: 32px; margin-bottom: 32px; }
.faq-heading { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 1px; color: var(--ink); margin-bottom: 6px; }
.faq-intro { font-size: 13px; color: var(--pebble); margin-bottom: 20px; }
.faq-item { border-top: 1px solid var(--oat); }
.faq-item:last-of-type { border-bottom: 1px solid var(--oat); }
.faq-question { list-style: none; display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 16px 0; font-size: 15px; font-weight: 600; color: var(--ink); cursor: pointer; user-select: none; }
.faq-question::-webkit-details-marker { display: none; }
.faq-question::after { content: '›'; font-size: 20px; color: var(--pebble); flex-shrink: 0; transition: transform 0.2s ease; display: inline-block; }
details[open] > .faq-question::after { transform: rotate(90deg); }
.faq-answer { padding: 0 0 16px; }
.faq-answer p { font-size: 14px; color: var(--stone); line-height: 1.7; }
```

- [ ] **Step 4: Open signup.html in browser and verify**

Check:
- FAQ section appears above the "Let's get you running" heading inside the form panel ✓
- All 8 questions visible as collapsed rows ✓
- Clicking a question expands its answer ✓
- Chevron rotates when open ✓

- [ ] **Step 5: Test keyboard accessibility**

Tab to the first FAQ item. Press Enter — it should expand. Press Enter again — it should collapse. Tab through all 8 items.

- [ ] **Step 6: Check at 375px viewport** — FAQ items full-width, no overflow, readable.

- [ ] **Step 7: Run axe DevTools** — Expected: 0 new violations.

- [ ] **Step 8: Validate HTML** — W3C validator, 0 errors.

- [ ] **Step 9: Commit**

```bash
git add signup.html assets/css/style.css
git commit -m "feat: add FAQ accordion to signup page"
```

- [ ] **Step 10: Run verification-before-completion skill**

- [ ] **Step 11: Push and open PR**

```bash
git push -u origin feature/faq
gh pr create \
  --title "feat: FAQ accordion on signup page" \
  --body "$(cat <<'EOF'
## Summary
- Adds 8-question FAQ section inside the form panel above the sign-up form
- Pure CSS expand/collapse using native <details>/<summary> — no JavaScript
- Chevron indicator rotates on open state via CSS transition
- Keyboard accessible out of the box

## Test checklist
- [ ] All 8 questions present with complete answers
- [ ] Collapsed by default on page load
- [ ] Keyboard accessible (Tab, Enter/Space)
- [ ] Responsive at 375px
- [ ] axe DevTools: 0 new violations
- [ ] W3C validator: 0 errors

Closes #3
EOF
)" \
  --reviewer andrewboyd79
```

---

## Task 4: Event Calendar

**Files:**
- Create: `data/events.json`
- Create: `.github/scripts/sync-calendar.py`
- Create: `.github/workflows/sync-calendar.yml`
- Create: `assets/js/events.js`
- Modify: `index.html` — insert events section before `<footer>`
- Modify: `assets/css/style.css` — append events CSS

**Prerequisite:** The club committee must provide a **public** Google Calendar link. In Google Calendar: Settings → the club calendar → "Integrate calendar" → copy the "Secret address in iCal format". This URL goes into GitHub → Settings → Secrets → Actions → New secret named `GOOGLE_CALENDAR_ICAL_URL`.

If the iCal URL is not yet available, seed `data/events.json` with 2–3 static sample events and skip the GitHub Actions steps. The JS renderer works identically with static JSON.

- [ ] **Step 1: Create feature branch**

```bash
git checkout master && git pull
git checkout -b feature/event-calendar
```

- [ ] **Step 2: Create data directory and seed events.json**

```bash
mkdir -p data
```

Create `data/events.json`:
```json
[
  {
    "id": "event-1",
    "title": "Dublin City 10k",
    "date": "2026-05-12",
    "location": "Phoenix Park, Dublin",
    "description": "Club group entry — register with us to run together.",
    "link": ""
  },
  {
    "id": "event-2",
    "title": "Howth Head 5 Mile",
    "date": "2026-06-01",
    "location": "Howth Village, Co. Dublin",
    "description": "Scenic coastal race. Club entry closes 10 days before race day.",
    "link": ""
  },
  {
    "id": "event-3",
    "title": "Docklands Summer Parkrun",
    "date": "2026-06-20",
    "location": "Grand Canal Dock, Dublin",
    "description": "Free 5k. Just show up and run — no registration required.",
    "link": ""
  }
]
```

- [ ] **Step 3: Create Python sync script**

Create directory and file:
```bash
mkdir -p .github/scripts
```

Create `.github/scripts/sync-calendar.py`:
```python
import json
import os
import sys
from datetime import datetime, timezone

import requests
from icalendar import Calendar

url = os.environ.get("ICAL_URL", "")
if not url:
    print("ICAL_URL not set — skipping sync")
    sys.exit(0)

try:
    response = requests.get(url, timeout=30)
    response.raise_for_status()
except requests.RequestException as e:
    print(f"Failed to fetch calendar: {e}")
    sys.exit(1)

cal = Calendar.from_ical(response.text)
now = datetime.now(timezone.utc)
events = []

for component in cal.walk():
    if component.name != "VEVENT":
        continue
    dtstart = component.get("dtstart")
    if dtstart is None:
        continue
    start = dtstart.dt
    if not hasattr(start, "tzinfo"):
        start = datetime(start.year, start.month, start.day, tzinfo=timezone.utc)
    elif start.tzinfo is None:
        start = start.replace(tzinfo=timezone.utc)
    if start < now:
        continue
    events.append({
        "id": str(component.get("uid", "")),
        "title": str(component.get("summary", "")),
        "date": start.strftime("%Y-%m-%d"),
        "location": str(component.get("location", "")),
        "description": str(component.get("description", "")),
        "link": str(component.get("url", ""))
    })

events.sort(key=lambda e: e["date"])

output_path = os.path.join(os.path.dirname(__file__), "../../data/events.json")
with open(output_path, "w") as f:
    json.dump(events, f, indent=2)
    f.write("\n")
print(f"Wrote {len(events)} upcoming events to data/events.json")
```

- [ ] **Step 4: Create GitHub Actions workflow**

Create `.github/workflows/sync-calendar.yml`:
```yaml
name: Sync Google Calendar

on:
  schedule:
    - cron: '0 6 * * *'
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: Install dependencies
        run: pip install icalendar requests

      - name: Sync calendar
        run: python .github/scripts/sync-calendar.py
        env:
          ICAL_URL: ${{ secrets.GOOGLE_CALENDAR_ICAL_URL }}

      - name: Commit if changed
        run: |
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git config user.name "github-actions[bot]"
          git add data/events.json
          git diff --staged --quiet || git commit -m "chore: sync events from Google Calendar [skip ci]"
          git push
```

- [ ] **Step 5: Create events.js**

Create `assets/js/events.js`:
```js
(function () {
  'use strict';
  var section = document.querySelector('.events-section');
  if (!section) return;

  fetch('data/events.json')
    .then(function (r) { return r.json(); })
    .then(function (events) {
      if (!events.length) return;
      var list = section.querySelector('.events-list');
      list.innerHTML = '';
      events.forEach(function (ev) {
        var d = new Date(ev.date + 'T00:00:00');
        var day = String(d.getDate()).padStart(2, '0');
        var mon = d.toLocaleString('en-IE', { month: 'short' }).toUpperCase();
        var linkHtml = ev.link
          ? '<a class="event-link" href="' + ev.link + '" target="_blank" rel="noopener">Register \u2192</a>'
          : '';
        var locHtml = ev.location
          ? '<div class="event-loc">' + ev.location + '</div>'
          : '';
        var descHtml = ev.description
          ? '<div class="event-desc">' + ev.description + '</div>'
          : '';
        list.insertAdjacentHTML('beforeend',
          '<li class="event-card">' +
            '<div class="event-date-badge">' +
              '<div class="event-date-day">' + day + '</div>' +
              '<div class="event-date-mon">' + mon + '</div>' +
            '</div>' +
            '<div class="event-body">' +
              '<div class="event-name">' + ev.title + '</div>' +
              locHtml + descHtml +
            '</div>' +
            linkHtml +
          '</li>'
        );
      });
    })
    .catch(function () { /* keep static fallback */ });
}());
```

- [ ] **Step 6: Add events section HTML to index.html**

In `index.html`, find:
```html
<footer>
```

Replace with:
```html
<section class="events-section" aria-label="Upcoming events">
  <div class="events-header">
    <h2 class="events-title">Upcoming Events</h2>
    <p class="events-sub">Races &amp; club events</p>
  </div>
  <ul class="events-list" aria-live="polite">
    <li class="event-empty">No upcoming events scheduled — check back soon.</li>
  </ul>
</section>

<footer>
```

- [ ] **Step 7: Add `<script>` tag to index.html**

In `index.html`, find:
```html
</body>
```

Replace with:
```html
  <script src="assets/js/events.js"></script>
</body>
```

- [ ] **Step 8: Add events CSS to style.css**

Append to the end of `assets/css/style.css`:

```css
/* ── EVENT CALENDAR ── */
.events-section { background: var(--cream); padding: 48px 48px 56px; border-top: 1px solid var(--oat); }
.events-header { display: flex; align-items: baseline; gap: 16px; margin-bottom: 28px; }
.events-title { font-family: 'Bebas Neue', sans-serif; font-size: 48px; letter-spacing: 1px; color: var(--ink); }
.events-sub { font-size: 13px; color: var(--pebble); }
.events-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.event-empty { font-size: 14px; color: var(--pebble); font-style: italic; }
.event-card { display: flex; align-items: center; gap: 20px; background: #fff; border-radius: 12px; padding: 16px 20px; border: 1px solid var(--oat); }
.event-date-badge { background: var(--lemon); border-radius: 8px; padding: 8px 12px; text-align: center; min-width: 52px; flex-shrink: 0; }
.event-date-day { font-family: 'Bebas Neue', sans-serif; font-size: 28px; line-height: 1; color: var(--ink); }
.event-date-mon { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--bark); }
.event-body { flex: 1; }
.event-name { font-size: 15px; font-weight: 600; color: var(--ink); margin-bottom: 3px; }
.event-loc { font-size: 12px; color: var(--pebble); }
.event-desc { font-size: 12px; color: var(--stone); margin-top: 4px; line-height: 1.5; }
.event-link { font-size: 12px; font-weight: 700; color: var(--slushie); text-decoration: none; flex-shrink: 0; }
.event-link:hover { text-decoration: underline; }
@media (max-width: 767px) {
  .events-section { padding: 32px 20px 40px; }
  .event-card { flex-wrap: wrap; gap: 12px; }
  .event-link { width: 100%; }
}
```

- [ ] **Step 9: Open index.html in browser and verify**

Open `index.html` directly. Because `fetch('data/events.json')` won't work over `file://`, serve the directory:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

Check:
- Events section appears between schedule and footer ✓
- Three event cards render with lemon date badges ✓
- Event name, location, and description show ✓

- [ ] **Step 10: Test graceful degradation (no JS)**

Disable JavaScript in DevTools (Settings → Debugger → Disable JavaScript). Reload. Check:
- The static "No upcoming events scheduled" fallback text shows ✓
- No broken layout ✓

Re-enable JavaScript.

- [ ] **Step 11: Check at 375px viewport** — Cards stack cleanly, no overflow.

- [ ] **Step 12: Run axe DevTools** — Expected: 0 new violations.

- [ ] **Step 13: Validate HTML** — W3C validator, 0 errors.

- [ ] **Step 14: Commit**

```bash
git add data/events.json .github/scripts/sync-calendar.py .github/workflows/sync-calendar.yml assets/js/events.js index.html assets/css/style.css
git commit -m "feat: add event calendar section with Google Calendar sync via GitHub Actions"
```

- [ ] **Step 15: Add GOOGLE_CALENDAR_ICAL_URL secret to GitHub** (if iCal URL is available)

Go to https://github.com/andrewboyd79/love-running/settings/secrets/actions → New repository secret.
Name: `GOOGLE_CALENDAR_ICAL_URL`. Value: the iCal URL from Google Calendar.

- [ ] **Step 16: Test workflow (if iCal URL is set)**

```bash
gh workflow run sync-calendar.yml
```

Wait ~60 seconds, then:
```bash
gh run list --workflow=sync-calendar.yml --limit 1
```

Check the run succeeded and `data/events.json` was updated on `master`.

- [ ] **Step 17: Run verification-before-completion skill**

- [ ] **Step 18: Push and open PR**

```bash
git push -u origin feature/event-calendar
gh pr create \
  --title "feat: event calendar section on homepage" \
  --body "$(cat <<'EOF'
## Summary
- Adds event calendar section between schedule and footer on homepage
- Branded event cards: lemon date badge, event name, location, description, register link
- Data sourced from Google Calendar via daily GitHub Actions cron (iCal → JSON)
- Graceful degradation: static fallback shows if JS disabled or JSON fetch fails
- Responsive at all viewports

## Test checklist
- [ ] Event cards render from data/events.json
- [ ] Graceful degradation with JS disabled
- [ ] Responsive at 375px, 768px, 1440px
- [ ] axe DevTools: 0 new violations
- [ ] W3C validator: 0 errors
- [ ] GitHub Actions workflow runs cleanly (if iCal URL configured)

Closes #4
EOF
)" \
  --reviewer andrewboyd79
```

---

## Task 5: Member Stories

**Files:**
- Modify: `index.html` — insert stories section between ethos (line 286) and schedule (line 288)
- Modify: `assets/css/style.css` — append stories CSS
- Add: `assets/images/member-[name].jpg` (three headshot images, square crop)

**Prerequisite:** Three real members must provide: first name + last initial, membership year, run type (urban/trail/sunday), a 2–3 sentence quote, and a square headshot photo (min 200×200px). Do not launch with placeholder quotes. If content is not yet available, defer this feature.

- [ ] **Step 1: Create feature branch**

```bash
git checkout master && git pull
git checkout -b feature/member-stories
```

- [ ] **Step 2: Add headshot images**

Place the three square headshot images in `assets/images/`. Name them `member-1.jpg`, `member-2.jpg`, `member-3.jpg` (or use first name + initial, e.g. `member-sarah-m.jpg`). Each must be at least 200×200px and square-cropped.

- [ ] **Step 3: Add stories section HTML to index.html**

In `index.html`, find:
```html
</section>

<section class="schedule">
```

Replace with:
```html
</section>

<section class="stories-section" aria-label="Member stories">
  <div class="stories-header">
    <p class="stories-eyebrow">Member stories</p>
    <h2 class="stories-title">Real people. Real runs.</h2>
  </div>
  <div class="stories-grid">

    <article class="story-card">
      <img src="assets/images/member-1.jpg" alt="Sarah M., Love Running member since 2023" class="story-avatar" width="56" height="56">
      <div class="story-name">Sarah M.</div>
      <div class="story-meta">Member since 2023</div>
      <span class="story-badge story-badge-urban">Urban 5k</span>
      <blockquote class="story-quote">"I showed up alone on a Monday evening. By Friday I had running friends."</blockquote>
    </article>

    <article class="story-card">
      <img src="assets/images/member-2.jpg" alt="David J., Love Running member since 2022" class="story-avatar" width="56" height="56">
      <div class="story-name">David J.</div>
      <div class="story-meta">Member since 2022</div>
      <span class="story-badge story-badge-trail">Trail 10k</span>
      <blockquote class="story-quote">"Trail running on a Tuesday evening changed how I handle pressure at work."</blockquote>
    </article>

    <article class="story-card">
      <img src="assets/images/member-3.jpg" alt="Anna K., Love Running member since 2024" class="story-avatar" width="56" height="56">
      <div class="story-name">Anna K.</div>
      <div class="story-meta">Member since 2024</div>
      <span class="story-badge story-badge-sunday">Sunday ☕</span>
      <blockquote class="story-quote">"The Sunday run is less about pace, more about the coffee after."</blockquote>
    </article>

  </div>
</section>

<section class="schedule">
```

> Replace all quotes, names, membership years, run types, and image filenames with the real member content before committing.

- [ ] **Step 4: Add stories CSS to style.css**

Append to the end of `assets/css/style.css`:

```css
/* ── MEMBER STORIES ── */
.stories-section { background: var(--cream); border-top: 1px solid var(--oat); padding: 48px 48px 56px; }
.stories-header { margin-bottom: 28px; }
.stories-eyebrow { font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--pebble); margin-bottom: 6px; }
.stories-title { font-family: 'Bebas Neue', sans-serif; font-size: 48px; letter-spacing: 1px; color: var(--ink); }
.stories-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.story-card { background: #fff; border-radius: 16px; padding: 24px; border: 1px solid var(--oat); }
.story-avatar { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; display: block; margin-bottom: 12px; }
.story-name { font-size: 14px; font-weight: 600; color: var(--ink); }
.story-meta { font-size: 11px; color: var(--pebble); margin-bottom: 10px; }
.story-badge { display: inline-block; font-size: 10px; font-weight: 600; padding: 3px 10px; border-radius: 100px; margin-bottom: 14px; }
.story-badge-urban { background: rgba(132,231,165,0.15); color: #02492a; }
.story-badge-trail { background: rgba(0,137,173,0.12); color: #00374a; }
.story-badge-sunday { background: rgba(251,189,65,0.18); color: #6b4400; }
.story-quote { font-size: 14px; font-style: italic; color: var(--stone); line-height: 1.65; margin: 0; }
@media (max-width: 767px) {
  .stories-section { padding: 32px 20px 40px; }
  .stories-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 5: Open index.html in browser and verify**

Check:
- Stories section appears between ethos and schedule ✓
- Three cards render with avatar photos, names, run badges, quotes ✓
- Photos display as circles ✓

- [ ] **Step 6: Verify image accessibility**

DevTools → Elements. Confirm each `<img>` has a non-empty, descriptive `alt` attribute.

- [ ] **Step 7: Check at 375px viewport** — Cards stack to single column, photos not distorted.

- [ ] **Step 8: Run axe DevTools** — Expected: 0 new violations.

- [ ] **Step 9: Validate HTML** — W3C validator, 0 errors.

- [ ] **Step 10: Commit**

```bash
git add index.html assets/css/style.css assets/images/member-*.jpg
git commit -m "feat: add member stories section between ethos and schedule"
```

- [ ] **Step 11: Run verification-before-completion skill**

- [ ] **Step 12: Push and open PR**

```bash
git push -u origin feature/member-stories
gh pr create \
  --title "feat: member stories section on homepage" \
  --body "$(cat <<'EOF'
## Summary
- Adds three-column member stories grid between ethos and schedule sections
- Real member photos, names, membership years, run type badges, and blockquote testimonials
- Responsive: stacks to single column on mobile

## Test checklist
- [ ] Three real member stories with genuine photos and quotes
- [ ] Photos render as circles (object-fit: cover, border-radius: 50%)
- [ ] All images have descriptive alt text
- [ ] Run type badge matches each member's run type
- [ ] Responsive at 375px, 768px, 1440px
- [ ] axe DevTools: 0 new violations
- [ ] W3C validator: 0 errors

Closes #5
EOF
)" \
  --reviewer andrewboyd79
```

---

## Task 6: Gallery Filters

**Files:**
- Create: `assets/js/gallery-filters.js`
- Modify: `gallery.html` — add `data-type` to gallery sections, replace hero-bar pills with filter buttons, add `<script>` tag
- Modify: `assets/css/style.css` — update hero-bar filter button styles

- [ ] **Step 1: Create feature branch**

```bash
git checkout master && git pull
git checkout -b feature/gallery-filters
```

- [ ] **Step 2: Create gallery-filters.js**

Create `assets/js/gallery-filters.js`:
```js
(function () {
  'use strict';
  var buttons = document.querySelectorAll('.filter-btn');
  var sections = document.querySelectorAll('.gallery-section[data-type]');

  if (!buttons.length) return;

  // Populate photo counts
  buttons.forEach(function (btn) {
    var filter = btn.dataset.filter;
    var countEl = btn.querySelector('.filter-count');
    if (!countEl) return;
    if (filter === 'all') {
      countEl.textContent = document.querySelectorAll('.gallery-section[data-type] .photo').length;
    } else {
      var sec = document.querySelector('.gallery-section[data-type="' + filter + '"]');
      countEl.textContent = sec ? sec.querySelectorAll('.photo').length : 0;
    }
  });

  // Filter on click
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.dataset.filter;
      sections.forEach(function (sec) {
        sec.hidden = filter !== 'all' && sec.dataset.type !== filter;
      });
      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
    });
  });
}());
```

- [ ] **Step 3: Add data-type attributes to gallery sections in gallery.html**

In `gallery.html`, find:
```html
<!-- URBAN RUNS -->
<section class="gallery-section">
  <h2 class="section-label" style="--dot: var(--matcha);">Urban Runs · The Marker, Docklands</h2>
```

Replace with:
```html
<!-- URBAN RUNS -->
<section class="gallery-section" data-type="urban">
  <h2 class="section-label" style="--dot: var(--matcha);">Urban Runs · The Marker, Docklands</h2>
```

Then find:
```html
<!-- TRAIL RUNS -->
<section class="gallery-section" style="padding-top: 0;">
  <h2 class="section-label">Trail Runs · Phoenix Park</h2>
```

Replace with:
```html
<!-- TRAIL RUNS -->
<section class="gallery-section" data-type="trail" style="padding-top: 0;">
  <h2 class="section-label">Trail Runs · Phoenix Park</h2>
```

- [ ] **Step 4: Replace hero-bar pills with filter buttons in gallery.html**

In `gallery.html`, find:
```html
<div class="hero-bar">
  <div class="hero-bar-pill"><div class="hero-bar-pill-dot" style="background: var(--matcha);"></div> Urban Runs</div>
  <div class="hero-bar-pill"><div class="hero-bar-pill-dot" style="background: var(--slushie);"></div> Trail Runs</div>
  <div class="hero-bar-pill"><div class="hero-bar-pill-dot" style="background: var(--lemon);"></div> After Run Social</div>
  <div class="hero-bar-scroll">Scroll to explore ↓</div>
</div>
```

Replace with:
```html
<div class="hero-bar" role="group" aria-label="Filter photos by run type">
  <button class="filter-btn active" data-filter="all" type="button">All <span class="filter-count" aria-label="photos"></span></button>
  <button class="filter-btn" data-filter="urban" type="button"><span class="filter-dot" style="background: var(--matcha);" aria-hidden="true"></span>Urban <span class="filter-count" aria-label="urban photos"></span></button>
  <button class="filter-btn" data-filter="trail" type="button"><span class="filter-dot" style="background: var(--slushie);" aria-hidden="true"></span>Trail <span class="filter-count" aria-label="trail photos"></span></button>
  <div class="hero-bar-scroll">Scroll to explore ↓</div>
</div>
```

- [ ] **Step 5: Add `<script>` tag to gallery.html**

In `gallery.html`, find:
```html
</body>
```

Replace with:
```html
  <script src="assets/js/gallery-filters.js"></script>
</body>
```

- [ ] **Step 6: Update gallery filter CSS in style.css**

The existing `.hero-bar-pill` rules in `gallery.html`'s inline `<style>` block (lines 80–92) will remain for any pages that still use the old pill style. Append the new filter button rules to `assets/css/style.css`:

```css
/* ── GALLERY FILTERS ── */
.filter-btn { display: inline-flex; align-items: center; gap: 6px; border-radius: 100px; padding: 9px 18px; font-size: 13px; font-weight: 600; cursor: pointer; border: 1.5px solid var(--oat); background: #fff; color: var(--stone); font-family: 'DM Sans', sans-serif; transition: all 0.15s; }
.filter-btn.active { background: var(--ink); color: #fff; border-color: var(--ink); }
.filter-btn[data-filter="urban"].active { background: var(--matcha); color: var(--ink); border-color: var(--matcha); }
.filter-btn[data-filter="trail"].active { background: var(--slushie); color: #fff; border-color: var(--slushie); }
.filter-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.filter-count { font-size: 11px; font-weight: 400; opacity: 0.7; }
@media (max-width: 767px) {
  .hero-bar { flex-wrap: wrap; gap: 8px; }
}
```

- [ ] **Step 7: Open gallery.html in browser and verify**

Serve via local server (fetch won't be needed here, but JS requires a server for correct MIME type):
```bash
python3 -m http.server 8080
# open http://localhost:8080/gallery.html
```

Check:
- Filter buttons show with photo counts populated ✓
- "All" is active (dark background) by default ✓
- Clicking "Urban" shows only the Urban section, hides Trail ✓
- Clicking "Trail" shows only the Trail section, hides Urban ✓
- Clicking "All" shows both sections ✓
- Active Urban button gets matcha background ✓
- Active Trail button gets slushie background ✓

- [ ] **Step 8: Test graceful degradation (no JS)**

Disable JavaScript in DevTools. Reload. Both gallery sections should be visible — no broken layout.

- [ ] **Step 9: Test keyboard accessibility**

Tab to the filter buttons. Press Enter/Space to activate. Each filter should work without a mouse.

- [ ] **Step 10: Check at 375px viewport** — Filter buttons wrap cleanly, no overflow.

- [ ] **Step 11: Run axe DevTools** — Expected: 0 new violations.

- [ ] **Step 12: Validate HTML** — W3C validator, 0 errors.

- [ ] **Step 13: Commit**

```bash
git add gallery.html assets/js/gallery-filters.js assets/css/style.css
git commit -m "feat: add gallery filter buttons with photo counts"
```

- [ ] **Step 14: Run verification-before-completion skill**

- [ ] **Step 15: Push and open PR**

```bash
git push -u origin feature/gallery-filters
gh pr create \
  --title "feat: gallery filter buttons with photo counts" \
  --body "$(cat <<'EOF'
## Summary
- Replaces static decorative hero-bar pills with functional filter buttons
- Filter buttons show photo count per run type (All / Urban / Trail)
- Vanilla JS (~25 lines): filters show/hide entire gallery sections using data-type attribute
- Active state per run type: matcha for Urban, slushie for Trail
- Graceful degradation: all photos visible with JS disabled

## Test checklist
- [ ] Filter buttons show correct photo counts on load
- [ ] Clicking each filter shows only matching section
- [ ] Clicking All restores all sections
- [ ] Graceful degradation with JS disabled (all photos visible)
- [ ] Keyboard accessible (Tab, Enter/Space)
- [ ] Responsive at 375px
- [ ] axe DevTools: 0 new violations
- [ ] W3C validator: 0 errors

Closes #6
EOF
)" \
  --reviewer andrewboyd79
```

---

## Self-Review Checklist

All spec requirements covered:

| Spec requirement | Task |
|-----------------|------|
| Stats bar cream band below hero | Task 1 |
| Stats bar responsive 2×2 on mobile | Task 1 |
| Route maps 2-col strip in schedule | Task 2 |
| OpenStreetMap iframes with title | Task 2 |
| What-to-expect copy + directions link | Task 2 |
| FAQ inside form panel above heading | Task 3 |
| 8 questions, CSS-only details/summary | Task 3 |
| Chevron rotate animation | Task 3 |
| Events section between schedule/footer | Task 4 |
| Google Calendar → GH Actions → JSON → JS | Task 4 |
| Static fallback + graceful degradation | Task 4 |
| Member stories between ethos/schedule | Task 5 |
| 3 cards, real content, blockquote | Task 5 |
| Gallery filter buttons with counts | Task 6 |
| data-type on gallery sections | Task 6 |
| Graceful degradation no-JS | Task 6 |
| Branch protection prerequisite | Task 0 |
| GitHub Project board | Task 0 |
| Verification gate before every PR | Every task |
| andrewboyd79 reviewer on every PR | Every task |
| W3C + axe checks on every feature | Every task |
| WCAG contrast on all new UI | CSS uses established tokens |
