# Phase 2b Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remediate all 15 identified code quality issues across six logical PRs, establishing a production-ready baseline before any Phase 3 feature work begins.

**Architecture:** Six sequential feature branches (`fix/<layer>`), each merged to `master` via a GitHub PR linked to a GitHub Projects issue. Changes are grouped by quality concern: semantics → accessibility → responsive → performance → CSS architecture → polish.

**Tech Stack:** HTML5, CSS3, GitHub CLI (`gh`), GitHub Projects v2, W3C Validator, Lighthouse (Chrome DevTools), axe DevTools (Chrome extension)

---

## Pre-requisite: GitHub Projects Setup

**Files:** none (CLI only)

- [ ] **Step 1: Add project scope to gh token**

```bash
gh auth refresh -s project
```
Expected: browser opens to authorize, then returns `✓ Authentication complete.`

- [ ] **Step 2: Create the Phase 2b project board**

```bash
gh project create --owner andrewboyd79 --title "Love Running — Phase 2b Remediation"
```
Expected output includes a project number (e.g. `1`). Note this number — it is used in every subsequent step as `<project-number>`.

- [ ] **Step 3: Link the project to the repository**

```bash
gh project link <project-number> --owner andrewboyd79 --repo andrewboyd79/love-running
```

- [ ] **Step 4: Create the Phase 2b milestone**

```bash
gh api repos/andrewboyd79/love-running/milestones \
  --method POST \
  --field title="Phase 2b — Baseline Remediation" \
  --field description="All remediation PRs required before Phase 3 feature work begins"
```

- [ ] **Step 5: Create the remediation label**

```bash
gh label create "remediation" --color "e11d48" --description "Phase 2b baseline remediation" --repo andrewboyd79/love-running
```

- [ ] **Step 6: Record Lighthouse baseline scores**

Open Chrome, navigate to `https://andrewboyd79.github.io/love-running/`. Open DevTools → Lighthouse tab → run report for Desktop. Record scores here before touching any code:

| Metric | Score |
|---|---|
| Performance | ___ |
| Accessibility | ___ |
| Best Practices | ___ |
| SEO | ___ |

Update these scores in `docs/superpowers/specs/2026-04-17-remediation-design.md` section 2 before proceeding.

---

## Task 1: PR 1 — Semantic HTML Document Structure

**Branch:** `fix/semantics`  
**Files:**
- Modify: `index.html`
- Modify: `gallery.html`
- Modify: `signup.html`
- Modify: `assets/css/style.css` (clear legacy content)

### Issue + branch setup

- [ ] **Step 1: Create GitHub issue**

```bash
gh issue create \
  --title "Establish semantic HTML document structure" \
  --body "$(cat <<'EOF'
## Problem
No heading elements (`<h1>`–`<h3>`) exist on any page. The index.html page title reads 'Concept A v5'. The legacy `assets/css/style.css` references old classes that no longer exist.

## Changes
- Add `<h1>`, `<h2>`, `<h3>` heading hierarchy to all three pages
- Fix `<title>` on index.html
- Clear legacy stylesheet

## Acceptance Criteria
- [ ] Each page has exactly one `<h1>`
- [ ] All major sections have an `<h2>`; sub-sections have `<h3>`
- [ ] `<title>` on `index.html` reads "Home — Love Running"
- [ ] W3C Validator reports no heading hierarchy errors
- [ ] Legacy stylesheet removed or cleared
EOF
)" \
  --milestone "Phase 2b — Baseline Remediation" \
  --label "remediation"
```
Note the issue number printed (e.g. `#1`).

- [ ] **Step 2: Add issue to project board**

```bash
gh project item-add <project-number> --owner andrewboyd79 --url https://github.com/andrewboyd79/love-running/issues/<issue-number>
```

- [ ] **Step 3: Create branch**

```bash
git checkout master && git pull origin master
git checkout -b fix/semantics
```

### index.html changes

- [ ] **Step 4: Fix page title**

In `index.html` line 6, change:
```html
<title>Love Running — Concept A v5</title>
```
To:
```html
<title>Home — Love Running</title>
```

- [ ] **Step 5: Add h1 to hero**

In `index.html`, change:
```html
<div class="hero-heading">Love<br><span>Running</span></div>
```
To:
```html
<h1 class="hero-heading">Love<br><span>Running</span></h1>
```

- [ ] **Step 6: Add h2 to ethos intro label**

In `index.html`, change:
```html
<div class="ethos-intro-label">Why run with us</div>
```
To:
```html
<h2 class="ethos-intro-label">Why run with us</h2>
```

- [ ] **Step 7: Add h3 to ethos right headings**

In `index.html`, change all three instances of:
```html
<div class="ethos-right-heading">
```
To:
```html
<h3 class="ethos-right-heading">
```
And close each with `</h3>` instead of `</div>`. There are three ethos bands — update all three.

- [ ] **Step 8: Add h2 to schedule title**

In `index.html`, change:
```html
<div class="schedule-title">This<br>Week's<br>Runs</div>
```
To:
```html
<h2 class="schedule-title">This<br>Week's<br>Runs</h2>
```

### gallery.html changes

- [ ] **Step 9: Add h1 to gallery hero**

In `gallery.html`, change:
```html
<div class="hero-title">Our Runs,<br><span>Our People</span></div>
```
To:
```html
<h1 class="hero-title">Our Runs,<br><span>Our People</span></h1>
```

- [ ] **Step 10: Add h2 to section labels**

In `gallery.html`, change both instances of:
```html
<div class="section-label" ...>Urban Runs · The Marker, Docklands</div>
<div class="section-label">Trail Runs · Phoenix Park</div>
```
To:
```html
<h2 class="section-label" ...>Urban Runs · The Marker, Docklands</h2>
<h2 class="section-label">Trail Runs · Phoenix Park</h2>
```

### signup.html changes

- [ ] **Step 11: Add h1 to invite heading**

In `signup.html`, change:
```html
<div class="invite-heading">Run With<br><span>People</span><br>Who Get It</div>
```
To:
```html
<h1 class="invite-heading">Run With<br><span>People</span><br>Who Get It</h1>
```

- [ ] **Step 12: Add h2 to form heading**

In `signup.html`, change:
```html
<div class="form-heading">Let's get you running</div>
```
To:
```html
<h2 class="form-heading">Let's get you running</h2>
```

### Clear legacy stylesheet

- [ ] **Step 13: Clear assets/css/style.css**

Replace the entire content of `assets/css/style.css` with a comment placeholder (PR 5 will populate it with shared styles):

```css
/* Shared stylesheet — populated in fix/css-architecture */
```

### Validate and commit

- [ ] **Step 14: Validate with W3C**

Open `https://validator.w3.org/nu/`. Paste the GitHub Pages URL for each page. Confirm no heading hierarchy errors are reported.

- [ ] **Step 15: Commit**

```bash
git add index.html gallery.html signup.html assets/css/style.css
git commit -m "fix(semantics): add heading hierarchy, fix page title, clear legacy CSS"
```

- [ ] **Step 16: Push and raise PR**

```bash
git push -u origin fix/semantics

gh pr create \
  --title "Establish semantic HTML document structure" \
  --body "$(cat <<'EOF'
## What
- Added `<h1>` to each page (hero headings)
- Added `<h2>` to major section titles (ethos, schedule, gallery sections, form heading)
- Added `<h3>` to ethos sub-headings
- Fixed `<title>` on index.html from 'Concept A v5' to 'Home — Love Running'
- Cleared legacy `assets/css/style.css` (placeholder for fix/css-architecture)

## Why
A document with no heading hierarchy is not semantically valid. Search engines and screen readers depend on heading structure to understand page content. This is the foundational layer all other fixes build on.

## Testing
- W3C Validator: no heading hierarchy errors on any page
- Visual regression: headings render identically (CSS classes unchanged, only tag names updated)

Closes #<issue-number>
EOF
)" \
  --base master
```

- [ ] **Step 17: Merge PR on GitHub, then clean up locally**

```bash
gh pr merge --squash --delete-branch
git checkout master && git pull origin master
```

---

## Task 2: PR 2 — Accessibility

**Branch:** `fix/accessibility`  
**Files:**
- Modify: `index.html`
- Modify: `gallery.html`
- Modify: `signup.html`

### Issue + branch setup

- [ ] **Step 1: Create GitHub issue**

```bash
gh issue create \
  --title "Improve accessibility across all pages" \
  --body "$(cat <<'EOF'
## Problem
Form labels are not linked to inputs. Run-type selector is non-functional (hard-coded selection, no keyboard access). Nav has no accessible name. Social links use single-letter text with no aria-label.

## Changes
- Add for/id pairs to all form labels and inputs in signup.html
- Convert run-option selector to real checkbox inputs
- Add aria-label to nav on all pages
- Add aria-label to all footer social links

## Acceptance Criteria
- [ ] Clicking any form label focuses the associated input
- [ ] Run-type selector is keyboard navigable and selection state can be changed
- [ ] axe DevTools reports zero critical or serious violations
- [ ] `<nav aria-label="Main navigation">` present on all three pages
- [ ] All social links have descriptive aria-label attributes
EOF
)" \
  --milestone "Phase 2b — Baseline Remediation" \
  --label "remediation"
```
Note the issue number.

- [ ] **Step 2: Add to project and create branch**

```bash
gh project item-add <project-number> --owner andrewboyd79 --url https://github.com/andrewboyd79/love-running/issues/<issue-number>
git checkout master && git pull origin master
git checkout -b fix/accessibility
```

### Add aria-label to nav (all three pages)

- [ ] **Step 3: index.html nav**

Change:
```html
<nav>
```
To:
```html
<nav aria-label="Main navigation">
```

- [ ] **Step 4: gallery.html nav**

Change:
```html
<nav>
```
To:
```html
<nav aria-label="Main navigation">
```

- [ ] **Step 5: signup.html nav**

Change:
```html
<nav>
```
To:
```html
<nav aria-label="Main navigation">
```

### Add aria-label to social links (all three pages)

- [ ] **Step 6: Update footer social links in index.html**

Change:
```html
<a href="#">FB</a><a href="#">IG</a><a href="#">TW</a><a href="#">YT</a>
```
To:
```html
<a href="#" aria-label="Facebook">FB</a>
<a href="#" aria-label="Instagram">IG</a>
<a href="#" aria-label="Twitter">TW</a>
<a href="#" aria-label="YouTube">YT</a>
```

- [ ] **Step 7: Repeat for gallery.html footer social links**

Same change as Step 6 applied to `gallery.html`.

- [ ] **Step 8: Repeat for signup.html footer social links**

Same change as Step 6 applied to `signup.html`.

### Link form labels to inputs (signup.html)

- [ ] **Step 9: Add for/id to first name field**

Change:
```html
<label class="form-label">First name</label>
<input class="form-input" type="text" placeholder="Your first name">
```
To:
```html
<label class="form-label" for="first-name">First name</label>
<input class="form-input" id="first-name" type="text" placeholder="Your first name">
```

- [ ] **Step 10: Add for/id to last name field**

Change:
```html
<label class="form-label">Last name</label>
<input class="form-input" type="text" placeholder="Your last name">
```
To:
```html
<label class="form-label" for="last-name">Last name</label>
<input class="form-input" id="last-name" type="text" placeholder="Your last name">
```

- [ ] **Step 11: Add for/id to email field**

Change:
```html
<label class="form-label">Email address</label>
<input class="form-input" type="email" placeholder="you@example.com">
```
To:
```html
<label class="form-label" for="email">Email address</label>
<input class="form-input" id="email" type="email" placeholder="you@example.com">
```

### Convert run-option selector to real checkboxes (signup.html)

- [ ] **Step 12: Update run-option CSS**

In the `<style>` block of `signup.html`, replace the existing run-option styles:
```css
.run-option {
  border: 1.5px solid var(--oat); border-radius: 20px;
  padding: 14px 12px; text-align: center; cursor: pointer;
  transition: all 0.2s;
}
.run-option:hover { border-color: var(--ink); }
.run-option.selected { border-color: var(--matcha); background: rgba(132,231,165,0.08); }
```
With:
```css
.run-option {
  border: 1.5px solid var(--oat); border-radius: 20px;
  padding: 14px 12px; text-align: center; cursor: pointer;
  transition: all 0.2s; position: relative;
}
.run-option input[type="checkbox"] {
  position: absolute; opacity: 0; width: 0; height: 0;
}
.run-option:hover { border-color: var(--ink); }
.run-option:has(input[type="checkbox"]:checked) {
  border-color: var(--matcha);
  background: rgba(132,231,165,0.08);
}
```

- [ ] **Step 13: Convert run-option HTML to labels with checkboxes**

Replace the entire `<div class="run-options">` block:
```html
<div class="run-options">
  <div class="run-option selected">
    <div class="run-option-dot" style="background: var(--matcha);"></div>
    <div class="run-option-name">Urban 5k</div>
    <div class="run-option-detail">Mon &amp; Fri</div>
  </div>
  <div class="run-option">
    <div class="run-option-dot" style="background: var(--slushie);"></div>
    <div class="run-option-name">Trail 10k</div>
    <div class="run-option-detail">Tue &amp; Sat</div>
  </div>
  <div class="run-option">
    <div class="run-option-dot" style="background: var(--lemon);"></div>
    <div class="run-option-name">Sunday ☕</div>
    <div class="run-option-detail">Social only</div>
  </div>
</div>
```
With:
```html
<div class="run-options">
  <label class="run-option" for="run-urban">
    <input type="checkbox" id="run-urban" name="run-type" value="urban" checked>
    <div class="run-option-dot" style="background: var(--matcha);"></div>
    <div class="run-option-name">Urban 5k</div>
    <div class="run-option-detail">Mon &amp; Fri</div>
  </label>
  <label class="run-option" for="run-trail">
    <input type="checkbox" id="run-trail" name="run-type" value="trail">
    <div class="run-option-dot" style="background: var(--slushie);"></div>
    <div class="run-option-name">Trail 10k</div>
    <div class="run-option-detail">Tue &amp; Sat</div>
  </label>
  <label class="run-option" for="run-social">
    <input type="checkbox" id="run-social" name="run-type" value="social">
    <div class="run-option-dot" style="background: var(--lemon);"></div>
    <div class="run-option-name">Sunday ☕</div>
    <div class="run-option-detail">Social only</div>
  </label>
</div>
```

### Validate and commit

- [ ] **Step 14: Validate with axe DevTools**

Install axe DevTools Chrome extension if not already installed. Open `index.html`, `gallery.html`, and `signup.html` in Chrome. Run axe scan on each. Confirm zero critical or serious violations.

- [ ] **Step 15: Test run selector interactivity**

On `signup.html`, tab to the run-option selector using keyboard. Press Space to toggle each option. Confirm checked state changes visually.

- [ ] **Step 16: Commit**

```bash
git add index.html gallery.html signup.html
git commit -m "fix(accessibility): aria-labels, form associations, functional run selector"
```

- [ ] **Step 17: Push and raise PR**

```bash
git push -u origin fix/accessibility

gh pr create \
  --title "Improve accessibility across all pages" \
  --body "$(cat <<'EOF'
## What
- Added `aria-label="Main navigation"` to `<nav>` on all three pages
- Added descriptive `aria-label` to all footer social links (FB/IG/TW/YT)
- Linked all form labels to inputs via `for`/`id` pairs in signup.html
- Converted run-type selector from non-interactive divs to real `<label>`/`<input type="checkbox">` elements using CSS `:has()` for styling

## Why
The site was unusable for keyboard and screen reader users. Form inputs couldn't be activated by clicking their labels. The run-type selector had no interactive behaviour at all. These fixes bring the site to WCAG 2.1 AA compliance for its current feature set.

## Testing
- axe DevTools: zero critical or serious violations on all three pages
- Keyboard navigation: run selector navigable and togglable via Tab/Space
- Label click: clicking each form label correctly focuses the associated input

Closes #<issue-number>
EOF
)" \
  --base master
```

- [ ] **Step 18: Merge PR and clean up**

```bash
gh pr merge --squash --delete-branch
git checkout master && git pull origin master
```

---

## Task 3: PR 3 — Responsive Design

**Branch:** `fix/responsive`  
**Files:**
- Modify: `index.html`
- Modify: `gallery.html`
- Modify: `signup.html`

### Issue + branch setup

- [ ] **Step 1: Create GitHub issue**

```bash
gh issue create \
  --title "Add responsive layout for mobile viewports" \
  --body "$(cat <<'EOF'
## Problem
Zero media queries exist. All layouts are desktop-only. The site is unusable on mobile — columns are too narrow, text overflows, forms are unworkable.

## Changes
Add @media (max-width: 767px) breakpoints to all three pages.

## Acceptance Criteria
- [ ] All three pages render without horizontal scrolling at 375px
- [ ] All text is readable (minimum 14px) at 375px
- [ ] Forms are usable on mobile
- [ ] Validated at 375px, 768px, and 1440px in Chrome DevTools
EOF
)" \
  --milestone "Phase 2b — Baseline Remediation" \
  --label "remediation"
```

- [ ] **Step 2: Add to project and create branch**

```bash
gh project item-add <project-number> --owner andrewboyd79 --url https://github.com/andrewboyd79/love-running/issues/<issue-number>
git checkout master && git pull origin master
git checkout -b fix/responsive
```

### index.html — mobile breakpoint

- [ ] **Step 3: Add mobile styles to index.html**

At the end of the `<style>` block in `index.html` (before the closing `</style>`), add:

```css
@media (max-width: 767px) {
  /* Nav */
  nav { padding: 16px 24px; }
  .nav-links { display: none; }

  /* Hero */
  .hero { min-height: 80vh; }
  .hero-content { padding: 0 24px 60px; }
  .hero-heading { font-size: clamp(56px, 14vw, 80px); }
  .hero-sub { font-size: 14px; }

  /* Ethos */
  .ethos-intro { padding: 0 24px 32px; flex-direction: column; gap: 12px; }
  .ethos-band { grid-template-columns: 1fr; min-height: unset; }
  .ethos-band-left { padding: 24px 24px 0; justify-content: flex-start; }
  .ethos-pill { width: 80px; height: 80px; font-size: 11px; border-radius: 50%; }
  .ethos-band-right { margin-right: 0; border-right: none; border-radius: 0; padding: 20px 24px 32px; }
  .ethos-right-top { flex-direction: column; gap: 16px; }
  .ethos-stat-circle { width: 64px; height: 64px; }
  .ethos-stat-num { font-size: 20px; }
  .ethos-tags { flex-wrap: wrap; gap: 6px; }
  .ethos-tag { font-size: 11px; padding: 4px 10px; }

  /* Schedule */
  .schedule-section { margin: 40px 16px; border-radius: 20px; padding: 40px 0 0; }
  .schedule-header { padding: 0 24px 32px; }
  .schedule-title { font-size: 48px; }
  .schedule-cols { grid-template-columns: 1fr; }
  .schedule-group:first-child { border-radius: 0; }
  .schedule-group:last-child  { border-radius: 0; }
  .schedule-coffee { border-radius: 0 0 20px 20px; padding: 24px; }
  .coffee-pill { padding: 10px 20px; font-size: 13px; }

  /* Footer */
  footer { flex-direction: column; gap: 16px; text-align: center; padding: 32px 24px; }
  .footer-social { gap: 16px; }
}
```

### gallery.html — mobile breakpoint

- [ ] **Step 4: Add mobile styles to gallery.html**

At the end of the `<style>` block in `gallery.html` (before `</style>`), add:

```css
@media (max-width: 767px) {
  /* Nav */
  nav { padding: 16px 24px; }
  .nav-links { display: none; }

  /* Hero */
  .hero { padding: 80px 24px 0; }
  .hero-inner { flex-direction: column; align-items: flex-start; gap: 16px; padding-bottom: 32px; }
  .hero-title { font-size: clamp(56px, 14vw, 80px); }
  .hero-meta { text-align: left; max-width: 100%; }
  .film-strip { margin-left: -24px; margin-right: -24px; padding-left: 24px; overflow-x: auto; }
  .film-strip::before { display: none; }

  /* Hero bar */
  .hero-bar { padding: 16px 24px; flex-wrap: wrap; gap: 10px; }
  .hero-bar-scroll { display: none; }

  /* Gallery sections */
  .gallery-section { padding: 48px 24px; }
  .grid-feature { grid-template-columns: 1fr; grid-template-rows: auto; }
  .grid-feature .photo-main { grid-row: auto; }
  .grid-strip { grid-template-columns: 1fr; }
  .grid-asymmetric { grid-template-columns: 1fr; }
  .grid-quote { grid-template-columns: 1fr; }
  .photo-main { min-height: 280px; }
  .photo-sm   { min-height: 200px; }
  .photo-med  { min-height: 240px; }
  .photo-tall { min-height: 260px; }

  /* Footer */
  footer { flex-direction: column; gap: 16px; text-align: center; padding: 32px 24px; }
  .footer-social { gap: 16px; }
}
```

### signup.html — mobile breakpoint

- [ ] **Step 5: Add mobile styles to signup.html**

At the end of the `<style>` block in `signup.html` (before `</style>`), add:

```css
@media (max-width: 767px) {
  /* Nav */
  nav { padding: 16px 24px; }
  .nav-links { display: none; }

  /* Signup layout — stack vertically */
  .signup-wrap {
    grid-template-columns: 1fr;
    margin: 64px 0 0;
    border-radius: 0;
  }

  /* Invite panel */
  .invite-panel { padding: 48px 24px 40px; min-height: unset; }
  .invite-heading { font-size: clamp(48px, 12vw, 72px); }
  .invite-schedule { margin-top: 32px; }
  .invite-bottom { margin-top: 32px; }

  /* Form panel */
  .form-panel { padding: 40px 24px 60px; }

  /* Name row — stack on mobile */
  .form-row { grid-template-columns: 1fr; }

  /* Run options — 1 column on very small screens */
  .run-options { grid-template-columns: 1fr 1fr; }

  /* Footer */
  footer { flex-direction: column; gap: 16px; text-align: center; padding: 32px 24px; }
  .footer-social { gap: 16px; }
}
```

### Validate and commit

- [ ] **Step 6: Test at three viewports**

Open Chrome DevTools. Toggle device toolbar. Test each page at:
- 375px (iPhone SE) — no horizontal scroll, readable text, usable forms
- 768px (tablet) — layouts transition cleanly
- 1440px (desktop) — unchanged from before

- [ ] **Step 7: Commit**

```bash
git add index.html gallery.html signup.html
git commit -m "fix(responsive): add mobile breakpoints at 767px for all pages"
```

- [ ] **Step 8: Push and raise PR**

```bash
git push -u origin fix/responsive

gh pr create \
  --title "Add responsive layout for mobile viewports" \
  --body "$(cat <<'EOF'
## What
Added `@media (max-width: 767px)` breakpoints to all three pages covering:
- Nav links hidden on mobile (no JS required — clean and lightweight)
- Hero content and typography scaled for small screens
- All multi-column grids collapse to single column (ethos bands, schedule, gallery grids, signup split)
- Film strip becomes horizontally scrollable
- Footer stacks vertically
- Form name row stacks on mobile

## Why
Zero media queries meant the site was desktop-only. Mobile accounts for the majority of web traffic in 2026. A single well-considered breakpoint makes all three pages fully usable on phones without adding complexity.

## Testing
- Chrome DevTools responsive mode: all pages tested at 375px, 768px, 1440px
- No horizontal scrolling at 375px on any page
- All text 14px minimum at 375px
- Forms usable on mobile

Closes #<issue-number>
EOF
)" \
  --base master
```

- [ ] **Step 9: Merge PR and clean up**

```bash
gh pr merge --squash --delete-branch
git checkout master && git pull origin master
```

---

## Task 4: PR 4 — Performance and Metadata

**Branch:** `fix/performance`  
**Files:**
- Modify: `index.html`
- Modify: `gallery.html`
- Modify: `signup.html`

### Issue + branch setup

- [ ] **Step 1: Create GitHub issue**

```bash
gh issue create \
  --title "Improve page load performance and document metadata" \
  --body "$(cat <<'EOF'
## Problem
Hero image loads over HTTP — blocked on HTTPS GitHub Pages. No preconnect hints for Google Fonts. No meta descriptions on any page.

## Changes
- Fix hero image URL: http → https
- Add preconnect hints for fonts.googleapis.com and fonts.gstatic.com
- Add unique meta descriptions to all three pages

## Acceptance Criteria
- [ ] Hero image loads with no console warnings on GitHub Pages
- [ ] All three pages have a unique meta description
- [ ] preconnect hints present on all pages
- [ ] Lighthouse Performance and SEO scores improve vs baseline
EOF
)" \
  --milestone "Phase 2b — Baseline Remediation" \
  --label "remediation"
```

- [ ] **Step 2: Add to project and create branch**

```bash
gh project item-add <project-number> --owner andrewboyd79 --url https://github.com/andrewboyd79/love-running/issues/<issue-number>
git checkout master && git pull origin master
git checkout -b fix/performance
```

### Fix hero image HTTP → HTTPS

- [ ] **Step 3: Fix hero image URL in index.html**

In `index.html` line 37, change:
```css
.hero-img { position: absolute; inset: 0; background: url('http://codeinstitute.s3.amazonaws.com/FundamentalsProjects/HTML-CSS/main-image.png') center/cover no-repeat; }
```
To:
```css
.hero-img { position: absolute; inset: 0; background: url('https://codeinstitute.s3.amazonaws.com/FundamentalsProjects/HTML-CSS/main-image.png') center/cover no-repeat; }
```

### Add preconnect hints (all three pages)

- [ ] **Step 4: Add preconnect to index.html**

Before the existing Google Fonts `<link>` tag in `index.html`, add:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

- [ ] **Step 5: Add preconnect to gallery.html**

Same two lines added before the Google Fonts `<link>` in `gallery.html`.

- [ ] **Step 6: Add preconnect to signup.html**

Same two lines added before the Google Fonts `<link>` in `signup.html`.

### Add meta descriptions (all three pages)

- [ ] **Step 7: Add meta description to index.html**

After the `<meta name="viewport">` line in `index.html`, add:
```html
<meta name="description" content="Love Running — Dublin's friendliest running club. Urban 5k and trail 10k runs, five days a week across the Docklands and Phoenix Park. All paces welcome.">
```

- [ ] **Step 8: Add meta description to gallery.html**

After the `<meta name="viewport">` line in `gallery.html`, add:
```html
<meta name="description" content="Photos from Love Running Dublin — our weekly urban runs at Grand Canal Dock and trail runs through Phoenix Park.">
```

- [ ] **Step 9: Add meta description to signup.html**

After the `<meta name="viewport">` line in `signup.html`, add:
```html
<meta name="description" content="Join Love Running Dublin. Sign up to run with us — urban 5k, trail 10k, and Sunday social runs. Free to join, all paces welcome.">
```

### Validate and commit

- [ ] **Step 10: Verify hero image loads**

Push changes and open the live GitHub Pages URL in Chrome. Open DevTools → Console. Confirm no mixed-content warnings. Confirm hero image is visible.

- [ ] **Step 11: Run Lighthouse and record scores**

Run Lighthouse on the live URL. Record Performance and SEO scores. Compare to baseline recorded in the pre-requisite step.

- [ ] **Step 12: Commit**

```bash
git add index.html gallery.html signup.html
git commit -m "fix(performance): https hero image, preconnect hints, meta descriptions"
```

- [ ] **Step 13: Push and raise PR**

```bash
git push -u origin fix/performance

gh pr create \
  --title "Improve page load performance and document metadata" \
  --body "$(cat <<'EOF'
## What
- Fixed hero image URL from HTTP to HTTPS (S3 bucket supports HTTPS — verified with curl)
- Added `<link rel="preconnect">` for `fonts.googleapis.com` and `fonts.gstatic.com` on all pages
- Added unique `<meta name="description">` to all three pages

## Why
A mixed-content image is silently blocked on HTTPS deployments. Preconnect hints eliminate two DNS lookups from the critical render path for font loading. Meta descriptions improve SEO and control how the page appears in search results and shared links.

## Testing
- Hero image: visible on GitHub Pages with zero console warnings
- Lighthouse SEO: improved vs baseline (meta descriptions and HTTPS image)
- Lighthouse Performance: improved vs baseline (preconnect hints)

Closes #<issue-number>
EOF
)" \
  --base master
```

- [ ] **Step 14: Merge PR and clean up**

```bash
gh pr merge --squash --delete-branch
git checkout master && git pull origin master
```

---

## Task 5: PR 5 — CSS Architecture

**Branch:** `fix/css-architecture`  
**Files:**
- Modify: `assets/css/style.css` (populate with shared styles)
- Modify: `index.html` (remove duplicated shared styles, add stylesheet link)
- Modify: `gallery.html` (remove duplicated shared styles, add stylesheet link)
- Modify: `signup.html` (remove duplicated shared styles, add stylesheet link)

### Issue + branch setup

- [ ] **Step 1: Create GitHub issue**

```bash
gh issue create \
  --title "Refactor CSS into shared stylesheet" \
  --body "$(cat <<'EOF'
## Problem
~150 lines of identical CSS (reset, :root variables, nav, footer) are copy-pasted into all three HTML files. Any palette change requires editing three files in sync.

## Changes
- Move shared styles to assets/css/style.css
- Add missing dark-tone CSS variables
- Link shared stylesheet from all three pages
- Remove duplicated inline styles

## Acceptance Criteria
- [ ] assets/css/style.css contains all shared styles
- [ ] All three pages link style.css and render identically
- [ ] No raw hex literals for dark tones remain in inline styles
- [ ] W3C Validator passes on all three pages
EOF
)" \
  --milestone "Phase 2b — Baseline Remediation" \
  --label "remediation"
```

- [ ] **Step 2: Add to project and create branch**

```bash
gh project item-add <project-number> --owner andrewboyd79 --url https://github.com/andrewboyd79/love-running/issues/<issue-number>
git checkout master && git pull origin master
git checkout -b fix/css-architecture
```

### Populate assets/css/style.css

- [ ] **Step 3: Write the shared stylesheet**

Replace the contents of `assets/css/style.css` with:

```css
/* ============================================================
   Love Running — Shared Stylesheet
   Covers: reset, design tokens, nav, footer
   Page-specific styles remain inline in each HTML file
   ============================================================ */

/* Reset */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

/* Design tokens */
:root {
  /* Brand palette */
  --matcha:       #84e7a5;
  --slushie:      #0089ad;
  --ube:          #c1b0ff;
  --pomegranate:  #fc7981;
  --lemon:        #fbbd41;

  /* Neutral palette */
  --cream:        #faf9f7;
  --oat:          #dad4c8;
  --ink:          #0d0d0d;

  /* Dark tone scale */
  --bark:         #2a2420;   /* warm dark brown — hero/schedule backgrounds */
  --espresso:     #1e1a17;   /* deep dark — home page footer */
  --wood:         #3d3730;   /* mid dark — footer text, borders */
  --stone:        #55504a;   /* muted dark — secondary text on dark */
  --pebble:       #7a7065;   /* light muted — tertiary text on dark */
}

/* Base */
body { background: var(--cream); font-family: 'DM Sans', sans-serif; }

/* Nav */
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; justify-content: space-between; align-items: center;
  padding: 20px 48px;
}
.nav-logo {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 22px; letter-spacing: 2px;
  text-decoration: none;
}
.nav-links { display: flex; gap: 32px; }
.nav-links a {
  font-size: 13px; font-weight: 500;
  text-decoration: none;
}

/* Footer */
footer {
  padding: 32px 48px;
  display: flex; justify-content: space-between; align-items: center;
}
.footer-logo {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 18px; letter-spacing: 2px;
}
.footer-social { display: flex; gap: 20px; }
.footer-social a {
  font-size: 11px; text-decoration: none;
  letter-spacing: 1.5px; text-transform: uppercase;
}
.footer-copy { font-size: 11px; }

/* Mobile nav */
@media (max-width: 767px) {
  nav { padding: 16px 24px; }
  .nav-links { display: none; }
  footer {
    flex-direction: column; gap: 16px;
    text-align: center; padding: 32px 24px;
  }
  .footer-social { gap: 16px; }
}
```

### Update index.html

- [ ] **Step 4: Add stylesheet link to index.html**

After the `<meta name="description">` line in `index.html`, add:
```html
<link rel="stylesheet" href="assets/css/style.css">
```

- [ ] **Step 5: Remove duplicated shared styles from index.html**

From the `<style>` block in `index.html`, remove:
- The `*, *::before, *::after` reset rule
- The `:root` variables block
- The `body` base style
- The `nav`, `.nav-logo`, `.nav-links`, `.nav-links a`, `.nav-links a.active` rules
- The `footer`, `.footer-logo`, `.footer-social`, `.footer-social a`, `.footer-copy` rules
- The `@media (max-width: 767px)` rules for `nav`, `.nav-links`, `footer`, `.footer-social` (now in shared CSS)

- [ ] **Step 6: Replace dark hex literals in index.html**

Find and replace raw hex values in `index.html` inline styles and the `<style>` block:

| Replace | With |
|---|---|
| `#2a2420` | `var(--bark)` |
| `#1e1a17` | `var(--espresso)` |
| `#3d3730` | `var(--wood)` |
| `#55504a` | `var(--stone)` |
| `#7a7065` | `var(--pebble)` |

### Update gallery.html

- [ ] **Step 7: Add stylesheet link and remove shared styles from gallery.html**

Same process as Steps 4–5 applied to `gallery.html`. Add `<link rel="stylesheet" href="assets/css/style.css">` and remove the duplicated shared style blocks.

- [ ] **Step 8: Replace dark hex literals in gallery.html**

Same substitution table as Step 6 applied to `gallery.html`.

### Update signup.html

- [ ] **Step 9: Add stylesheet link and remove shared styles from signup.html**

Same process as Steps 4–5 applied to `signup.html`. Add `<link rel="stylesheet" href="assets/css/style.css">` and remove the duplicated shared style blocks.

- [ ] **Step 10: Replace dark hex literals in signup.html**

Same substitution table as Step 6 applied to `signup.html`.

### Validate and commit

- [ ] **Step 11: Visual regression check**

Open all three pages in Chrome. They must look identical to before this PR. Nav, footer, colours, and spacing should be unchanged.

- [ ] **Step 12: Validate with W3C**

Run W3C validator on all three pages. Confirm no errors.

- [ ] **Step 13: Commit**

```bash
git add assets/css/style.css index.html gallery.html signup.html
git commit -m "fix(css-architecture): extract shared styles, add dark-tone variables"
```

- [ ] **Step 14: Push and raise PR**

```bash
git push -u origin fix/css-architecture

gh pr create \
  --title "Refactor CSS into shared stylesheet" \
  --body "$(cat <<'EOF'
## What
- Populated `assets/css/style.css` with all shared styles: reset, design tokens (including 5 new dark-tone variables), nav, footer
- Linked shared stylesheet from all three pages
- Removed ~150 lines of duplicated CSS from each HTML file
- Replaced all raw dark hex literals (`#2a2420`, `#1e1a17`, `#3d3730`, `#55504a`, `#7a7065`) with CSS variables

## Why
Duplicating 150+ lines across three files is a maintenance liability. Any future palette change previously required editing three files in sync. The shared stylesheet establishes a single source of truth and extends the existing design token system to cover the full colour range used in the product.

## Testing
- Visual regression: all three pages render identically before and after
- W3C Validator: passes on all three pages
- Confirmed: removing a shared style from style.css visibly breaks all three pages (link is load-bearing)

Closes #<issue-number>
EOF
)" \
  --base master
```

- [ ] **Step 15: Merge PR and clean up**

```bash
gh pr merge --squash --delete-branch
git checkout master && git pull origin master
```

---

## Task 6: PR 6 — Polish

**Branch:** `fix/polish`  
**Files:**
- Create: `assets/img/favicon.svg`
- Modify: `index.html`
- Modify: `gallery.html`
- Modify: `signup.html`

### Issue + branch setup

- [ ] **Step 1: Create GitHub issue**

```bash
gh issue create \
  --title "Final polish and consistency fixes" \
  --body "$(cat <<'EOF'
## Problem
No favicon. Footer background colour differs between index.html (#1e1a17) and other pages (var(--ink)). Sunday join button missing type attribute.

## Changes
- Add SVG favicon to all pages
- Standardise footer background across all pages
- Add type="button" to Sunday join button

## Acceptance Criteria
- [ ] Favicon visible in browser tab on all three pages
- [ ] Footer background visually identical across all three pages
- [ ] Sunday button has type="button"
- [ ] Final Lighthouse scores recorded
EOF
)" \
  --milestone "Phase 2b — Baseline Remediation" \
  --label "remediation"
```

- [ ] **Step 2: Add to project and create branch**

```bash
gh project item-add <project-number> --owner andrewboyd79 --url https://github.com/andrewboyd79/love-running/issues/<issue-number>
git checkout master && git pull origin master
git checkout -b fix/polish
```

### Create favicon

- [ ] **Step 3: Create assets/img/favicon.svg**

Create the file `assets/img/favicon.svg` with:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#0d0d0d"/>
  <text x="16" y="24" font-family="serif" font-size="20" font-weight="700"
    text-anchor="middle" fill="#fbbd41">LR</text>
</svg>
```

- [ ] **Step 4: Add favicon link to index.html**

After the `<meta name="description">` line in `index.html`, add:
```html
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
```

- [ ] **Step 5: Add favicon link to gallery.html**

Same line added to `gallery.html`.

- [ ] **Step 6: Add favicon link to signup.html**

Same line added to `signup.html`.

### Fix footer background on index.html

- [ ] **Step 7: Standardise footer background in index.html**

In the `<style>` block of `index.html`, find the footer rule and change:
```css
footer { background: #1e1a17; ... }
```
To:
```css
footer { background: var(--ink); ... }
```

Note: if `assets/css/style.css` now controls footer background (from PR 5), verify the inline override is removed rather than changed.

### Fix Sunday join button

- [ ] **Step 8: Add type="button" to coffee-pill**

In `index.html`, find:
```html
<button class="coffee-pill">Join the run →</button>
```
Change to:
```html
<button type="button" class="coffee-pill">Join the run →</button>
```

### Final validation and commit

- [ ] **Step 9: Verify favicon in browser tab**

Open all three pages in Chrome. Confirm the LR favicon appears in the browser tab on each page.

- [ ] **Step 10: Verify footer consistency**

Open all three pages side by side. Confirm footer background is identical.

- [ ] **Step 11: Run final Lighthouse**

Run Lighthouse on the live GitHub Pages URL. Record final scores:

| Metric | Baseline | Final |
|---|---|---|
| Performance | ___ | ___ |
| Accessibility | ___ | ___ |
| Best Practices | ___ | ___ |
| SEO | ___ | ___ |

Update these scores in `docs/superpowers/specs/2026-04-17-remediation-design.md` and `docs/code-quality-improvement-plan.md`.

- [ ] **Step 12: Commit**

```bash
git add assets/img/favicon.svg index.html gallery.html signup.html
git commit -m "fix(polish): favicon, footer consistency, button type attribute"
```

- [ ] **Step 13: Push and raise PR**

```bash
git push -u origin fix/polish

gh pr create \
  --title "Final polish and consistency fixes" \
  --body "$(cat <<'EOF'
## What
- Added SVG favicon (`assets/img/favicon.svg`) — ink background with lemon LR monogram, linked from all three pages
- Standardised footer background to `var(--ink)` on index.html (was `#1e1a17`, visually inconsistent with other pages)
- Added `type="button"` to Sunday join button on index.html

## Why
These are the details that distinguish a developer who finishes from one who ships good enough. The favicon is the first thing a user sees when they have multiple tabs open. Colour inconsistency in the footer is a sign of unfinished work. The button type attribute is a correctness issue, not just a style preference.

## Testing
- Favicon: visible in browser tab on all three pages
- Footer: visually identical across all three pages
- Lighthouse: final scores recorded and compared to baseline

Closes #<issue-number>
EOF
)" \
  --base master
```

- [ ] **Step 14: Merge PR and clean up**

```bash
gh pr merge --squash --delete-branch
git checkout master && git pull origin master
```

---

## Phase 2b Closeout

- [ ] Update Lighthouse baseline table in `docs/superpowers/specs/2026-04-17-remediation-design.md` with final scores
- [ ] Update progress tracker in `docs/code-quality-improvement-plan.md` — mark all 15 fixes complete
- [ ] Update Phase 2b status to `Complete` in the product history table
- [ ] Confirm GitHub Project board shows all 6 issues as `Done`
- [ ] Tag the release:

```bash
git tag -a v0.2.0 -m "Phase 2b remediation complete — baseline quality established"
git push origin v0.2.0
```
