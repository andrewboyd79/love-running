# Love Running — Improvement Plan
**Project:** Love Running — Dublin Running Club  
**Started:** 2026-04-17  

---

## Overview

This document records the full improvement lifecycle for the Love Running project. It covers two phases:

1. **Phase 1 — Visual Redesign** *(completed 2026-04-17)*: A new design spec was defined and implemented across all three pages.
2. **Phase 2 — Code Quality Remediation** *(completed 2026-04-17)*: Following a post-implementation code review, a prioritised set of fixes was identified to improve accessibility, semantics, responsiveness, and maintainability.
3. **Phase 2c — Post-Deployment Follow-up** *(completed 2026-04-18)*: axe DevTools audit and manual mobile testing identified WCAG colour contrast failures and a missing mobile nav — both resolved.

---

## Phase 1 — Visual Redesign

### Design Specification

A comprehensive design system (`DESIGN.md`) was created prior to implementation, inspired by the Clay website aesthetic. Key decisions made in the spec:

| Aspect | Decision |
|---|---|
| Visual style | Editorial/magazine — warm, playful, distinctive |
| Background | Cream canvas `#faf9f7` |
| Accent palette | Matcha `#84e7a5`, Slushie `#0089ad`, Ube `#c1b0ff`, Pomegranate `#fc7981`, Lemon `#fbbd41` |
| Display font | Bebas Neue (adapted from spec's Roobert — chosen for editorial character) |
| Body font | DM Sans |
| Texture | Organic SVG topo contour backgrounds (`topo-light.svg`, `topo-dark.svg`) |
| Dark tone | Warm espresso `#2a2420` (not pure black) |
| Border radius | Layered scale: 4px cards → 20px groups → 32px sections → pill |

The full specification is documented in [`DESIGN.md`](../DESIGN.md) at the project root.

### What Was Built

The spec was implemented as-is across all three pages. The design was developed iteratively using a visual companion (browser-based mockup preview) before being applied to the live files.

| Page | Key Design Features |
|---|---|
| `index.html` | Full-viewport hero with S3 background image and SVG bezier curve edge; topo-textured schedule section with colour-coded run groups; ethos section with pill cards and contour background |
| `gallery.html` | Film strip hero (staggered photo placeholders rising from dark topo background); editorial magazine grid with feature, strip, asymmetric, and quote-block layouts |
| `signup.html` | Split-panel layout: dark invitation panel (topo texture, schedule preview, member avatars) + cream form panel with pill inputs and run-type selector |

Supporting assets added to the project root:
- `topo-dark.svg` — 6-hill organic contour texture for dark backgrounds
- `topo-light.svg` — same hills at higher opacity for light backgrounds

### Phase 1 Outcome

Visual redesign committed and deployed to GitHub Pages:  
**https://andrewboyd79.github.io/love-running/**

---

## Phase 2 — Code Quality Remediation

### Code Review

A code review was conducted immediately after the visual redesign was applied. The review scored the implementation across seven categories.

### Scores by Category

| Category | Score | Summary |
|---|---|---|
| HTML Quality (semantics, accessibility) | 4 / 10 | No heading elements on any page; form labels unlinked |
| CSS Quality (organisation, maintainability) | 5.5 / 10 | Good variables, but all CSS duplicated inline across three files |
| Navigation & Linking | 7 / 10 | Internal links work; social links placeholder only |
| Responsive Design | 2 / 10 | Zero media queries — layout breaks on mobile |
| Performance | 6 / 10 | No JS, good font swap; hero image is HTTP, no preconnect hints |
| Code Consistency | 7.5 / 10 | Palette/nav consistent; footer colour and heading hierarchy inconsistent |
| Bugs & Issues | 5 / 10 | Non-functional run selector, wrong page title, dead CSS file |
| **Overall** | **6.5 / 10** | |

---

## Review Summary

Full redesign applied across three pages (`index.html`, `gallery.html`, `signup.html`) using an editorial/magazine aesthetic with the Clay design system. Visual quality is high. The main gaps are semantic HTML, accessibility, responsive design, and minor code hygiene.

### Scores by Category

| Category | Score | Summary |
|---|---|---|
| HTML Quality (semantics, accessibility) | 4 / 10 | No heading elements on any page; form labels unlinked |
| CSS Quality (organisation, maintainability) | 5.5 / 10 | Good variables, but all CSS duplicated inline across three files |
| Navigation & Linking | 7 / 10 | Internal links work; social links placeholder only |
| Responsive Design | 2 / 10 | Zero media queries — layout breaks on mobile |
| Performance | 6 / 10 | No JS, good font swap; hero image is HTTP, no preconnect hints |
| Code Consistency | 7.5 / 10 | Palette/nav consistent; footer colour and `<h>` hierarchy inconsistent |
| Bugs & Issues | 5 / 10 | Non-functional run selector, wrong page title, dead CSS file |

---

## Priority Fix Plan

Issues are grouped **P1 (must fix)** → **P2 (should fix)** → **P3 (nice to have)**.
Each item has a status field updated as work progresses.

---

## Phase 2b Completion

All six remediation PRs merged to `master` on 2026-04-17.

| PR | Branch | Description |
|---|---|---|
| #2 | `fix/semantics` | Heading hierarchy, page title, clear legacy CSS |
| #4 | `fix/accessibility` | ARIA labels, form associations, functional run selector |
| #5 | `fix/accessibility-quality` | Focus styles, selection colours, fieldset semantics |
| #7 | `fix/responsive` | Mobile breakpoints at 767px for all pages |
| #9 | `fix/performance` | HTTPS hero, preconnect hints, meta descriptions |
| #11 | `fix/css-architecture` | Shared stylesheet, dark-tone variables |
| #14 | `fix/polish` | Favicon, footer colour, button type |

**Lighthouse baseline (2026-04-17):**
- index.html: Performance 97, Accessibility 91, Best Practices 77, SEO 90
- gallery.html: Performance 100, Accessibility 85, Best Practices 100, SEO 90
- signup.html: Performance 98, Accessibility 94, Best Practices 100, SEO 90

**Post-remediation Lighthouse scores verified (2026-04-18):** Performance and SEO improvements vs. baseline confirmed on live GitHub Pages site. All Lighthouse acceptance criteria (issue #8) satisfied.

---

## Phase 2c — Post-Deployment Follow-up Fixes

After merging all Phase 2 PRs, axe DevTools was run against the live site and manual mobile testing was performed. Two categories of issues were found and resolved.

### WCAG Colour Contrast Remediation

axe DevTools reported multiple contrast ratio failures where white text was placed on light-coloured backgrounds. The design palette uses several pale accent colours (matcha green `#84e7a5`, ube purple `#c1b0ff`, lemon `#fbbd41`, slushie blue `#0089ad`) which do not meet the 3:1 minimum contrast ratio required for large bold text (WCAG 1.4.3).

Fixes applied across 7 commits:

| Commit | Fix |
|---|---|
| `7793338` | Initial pass — white text on coloured/dark surfaces across all pages |
| `7a9700c` | Gallery hero scroll indicator `#9f9b93` → `#6b6560` |
| `2b0515d` | Final WCAG pass — remaining white-on-light failures |
| `7ad6435` | Ethos stat labels → `var(--ink)`; ethos pill words → `mix-blend-mode: multiply` |
| `0146f66` | Hero "Running" pill, Docklands text, ethos pill contrast |
| `2152ce2` | Dark ink text on HEALTHY (matcha) and SOCIAL (ube) ethos pills |
| `6e642cd` | Replace `div` children with `span` inside run-option labels (semantic fix) |

**Approach:** Rather than changing the palette, dark ink (`var(--ink)` / `#0d0d0d`) was applied per-element using targeted CSS selectors. This preserved the visual design while meeting contrast requirements.

**Outcome:** axe DevTools reports **zero violations** on all three pages (index, gallery, signup).

---

### Mobile Navigation Fix

During manual DevTools testing at 375px and 768px, the navigation was found to be completely absent — the PR #7 responsive breakpoint had set `.nav-links { display: none; }` with no replacement (no hamburger, no stacked alternative).

**Fix (commit `465a192`):** Changed the mobile nav to stack logo above links rather than hide the links entirely. With only three nav items, a hamburger menu added unnecessary complexity. The fix uses two CSS rules:

```css
nav { flex-direction: column; align-items: flex-start; gap: 10px; }
.nav-links { gap: 20px; }
```

This keeps the navigation fully visible and accessible at all viewport sizes.

---

### Issue Acceptance Criteria — Final Status

All acceptance criteria across all 7 issues are now satisfied:

| Issue | Topic | Status |
|---|---|---|
| #1 | Semantic HTML structure | All criteria met |
| #3 | Accessibility (axe DevTools) | All criteria met — axe 0 violations confirmed |
| #6 | Responsive design | All criteria met — manual DevTools verification completed |
| #8 | Performance / Lighthouse | All criteria met — Lighthouse scores improved vs. baseline |
| #10 | CSS architecture | All criteria met |
| #12/#13 | Polish (favicon, footer, button) | All criteria met |

---

### P1 — Must Fix

#### FIX-01 · Add heading hierarchy to all pages
**Status:** `[ ] Open`  
**Files:** `index.html`, `gallery.html`, `signup.html`  
**Problem:** Not a single `<h1>`–`<h6>` element exists across the three pages. All display text is in `<div>` or `<span>` elements. Screen readers have no document structure to navigate. Search engines cannot determine page topics.  
**Fix:** Promote key display elements to semantic heading tags using a CSS class to preserve visual styling:
- Each page needs exactly one `<h1>` (the page/hero title)
- Section titles should be `<h2>`
- Sub-labels within sections should be `<h3>`
- Keep existing CSS class for styling; just change the tag

**Example:**
```html
<!-- Before -->
<div class="hero-heading">Love Running</div>

<!-- After -->
<h1 class="hero-heading">Love Running</h1>
```

---

#### FIX-02 · Link form labels to inputs (signup.html)
**Status:** `[ ] Open`  
**Files:** `signup.html`  
**Problem:** Every `<label>` is missing a `for` attribute and every `<input>` is missing an `id`. Clicking a label does not focus the field. Screen readers cannot announce which label belongs to which input.  
**Fix:** Add matching `for`/`id` pairs to every label/input combination.

**Example:**
```html
<!-- Before -->
<label class="form-label">First name</label>
<input class="form-input" type="text" placeholder="Your first name">

<!-- After -->
<label class="form-label" for="first-name">First name</label>
<input class="form-input" id="first-name" type="text" placeholder="Your first name">
```

**Fields to fix:** first-name, last-name, email

---

#### FIX-03 · Add responsive breakpoints
**Status:** `[ ] Open`  
**Files:** `index.html`, `gallery.html`, `signup.html`  
**Problem:** Zero `@media` queries exist. All layouts are desktop-only. On a 375px viewport (iPhone), the signup form renders two 170px columns, the schedule grid is unusable, and the gallery film strip clips silently.  
**Fix:** Add a mobile breakpoint at `max-width: 767px` for each page addressing:

| Layout | Desktop | Mobile |
|---|---|---|
| Nav links | `flex` row | Hidden or hamburger |
| Hero title | `clamp(72px, 10vw, 128px)` | `clamp(48px, 12vw, 72px)` |
| Ethos grid `340px 1fr` | fixed column | `1fr` stacked |
| Schedule `1fr 1fr` | two columns | single column |
| Signup split `1fr 1fr` | side by side | stacked (invite panel above form) |
| Gallery grids | multi-column | single column |
| Film strip | horizontal scroll | horizontal scroll with visible overflow |

---

#### FIX-04 · Fix page title on index.html
**Status:** `[ ] Open`  
**Files:** `index.html`  
**Problem:** `<title>` reads "Love Running — Concept A v5" — a leftover development label.  
**Fix:** Change to `Home — Love Running` to match the pattern used on gallery and signup pages.

```html
<!-- Before -->
<title>Love Running — Concept A v5</title>

<!-- After -->
<title>Home — Love Running</title>
```

---

#### FIX-05 · Fix hero image HTTP → HTTPS
**Status:** `[ ] Open`  
**Files:** `index.html`  
**Problem:** Hero background image is loaded over HTTP (`http://codeinstitute.s3.amazonaws.com/...`). GitHub Pages enforces HTTPS; browsers will block mixed-content requests, leaving the hero blank.  
**Fix:** Either:
- Change `http://` to `https://` in the URL (if the S3 bucket supports HTTPS)
- Download the image to `assets/img/hero-image.jpg` and reference it locally — preferred for reliability

---

#### FIX-06 · Make run-option selector functional
**Status:** `[ ] Open`  
**Files:** `signup.html`  
**Problem:** The three run-type selector cards (Urban 5k / Trail 10k / Sunday ☕) look interactive but the `selected` class is hard-coded in HTML and cannot be changed. No keyboard access, no ARIA state.  
**Fix (option A — pure HTML, no JS):** Replace with styled `<input type="checkbox">` elements:
```html
<label class="run-option">
  <input type="checkbox" name="run-type" value="urban" checked>
  <div class="run-option-dot" style="background: var(--matcha);"></div>
  <div class="run-option-name">Urban 5k</div>
  <div class="run-option-detail">Mon &amp; Fri</div>
</label>
```
**Fix (option B — JS toggle):** Add a small click handler to toggle the `selected` class and add `role="checkbox"` / `aria-checked` attributes.

Option A is recommended — it works without JavaScript and is natively keyboard-accessible.

---

### P2 — Should Fix

#### FIX-07 · Add `<meta name="description">` to all pages
**Status:** `[ ] Open`  
**Files:** `index.html`, `gallery.html`, `signup.html`  
**Problem:** No description meta tag on any page.  
**Fix:**
```html
<!-- index.html -->
<meta name="description" content="Love Running — Dublin's friendliest running club. Urban 5k and trail 10k runs, five days a week across the Docklands and Phoenix Park.">

<!-- gallery.html -->
<meta name="description" content="Photos from Love Running Dublin — our weekly runs across Grand Canal Dock and Phoenix Park.">

<!-- signup.html -->
<meta name="description" content="Join Love Running Dublin. Sign up for free to join our weekly urban and trail runs.">
```

---

#### FIX-08 · Add `aria-label` to nav and social links
**Status:** `[ ] Open`  
**Files:** `index.html`, `gallery.html`, `signup.html`  
**Problem:** `<nav>` has no label; footer social links use single-letter text ("FB", "IG") that is meaningless to screen readers.  
**Fix:**
```html
<nav aria-label="Main navigation">

<a href="#" aria-label="Facebook">FB</a>
<a href="#" aria-label="Instagram">IG</a>
<a href="#" aria-label="Twitter">TW</a>
<a href="#" aria-label="YouTube">YT</a>
```

---

#### FIX-09 · Extract shared CSS to `assets/css/style.css`
**Status:** `[ ] Open`  
**Files:** `index.html`, `gallery.html`, `signup.html`, `assets/css/style.css`  
**Problem:** The `:root` colour variables, nav styles, and footer styles are copy-pasted identically into all three HTML files. Any palette change requires editing three files.  
**Fix:**
1. Clear the legacy content from `assets/css/style.css`
2. Move shared styles (reset, `:root` variables, nav, footer) into it
3. Link it from all three pages: `<link rel="stylesheet" href="assets/css/style.css">`
4. Keep page-specific styles inline or in per-page stylesheets

---

#### FIX-10 · Define dark tone CSS variables
**Status:** `[ ] Open`  
**Files:** `index.html`, `gallery.html`, `signup.html`  
**Problem:** Dark tones `#2a2420`, `#1e1a17`, `#3d3730`, `#55504a`, `#7a7065` appear as raw hex literals scattered throughout inline styles and style blocks, bypassing the custom property system.  
**Fix:** Add to `:root`:
```css
--bark:     #2a2420;   /* dark warm brown — schedule/hero bg */
--espresso: #1e1a17;   /* deepest dark — footer bg on home */
--wood:     #3d3730;   /* mid dark — footer text */
--stone:    #55504a;   /* dark muted — secondary text on dark */
--pebble:   #7a7065;   /* lighter muted — tertiary text on dark */
```

---

#### FIX-11 · Add Google Fonts preconnect hints
**Status:** `[ ] Open`  
**Files:** `index.html`, `gallery.html`, `signup.html`  
**Problem:** No `preconnect` hints for Google Fonts. Two DNS lookups are required before any font bytes load, adding latency on first visit.  
**Fix:** Add before the existing `<link>` tag:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

---

### P3 — Nice to Have

#### FIX-12 · Add favicon
**Status:** `[ ] Open`  
**Files:** `index.html`, `gallery.html`, `signup.html`  
**Fix:** Add a favicon (SVG preferred for scalability):
```html
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
```

---

#### FIX-13 · Fix footer colour inconsistency
**Status:** `[ ] Open`  
**Files:** `index.html`  
**Problem:** `index.html` footer uses `background: #1e1a17` while `gallery.html` and `signup.html` use `background: var(--ink)` (`#0d0d0d`). Visually different dark tones.  
**Fix:** Standardise to `var(--ink)` (or introduce `--espresso` per FIX-10 and use that consistently).

---

#### FIX-14 · Add `type="button"` to Sunday join button
**Status:** `[ ] Open`  
**Files:** `index.html`  
**Problem:** `<button class="coffee-pill">` has no `type` attribute and no behaviour.  
**Fix:** Add `type="button"` to prevent accidental form submission; link to signup or add JS.

---

#### FIX-15 · Delete or repurpose legacy `assets/css/style.css`
**Status:** `[ ] Open`  
**Files:** `assets/css/style.css`  
**Problem:** File references fonts (Lato, Oswald), IDs (`#logo`, `#menu`, `#hero-image`), and layouts from the original Code Institute template. It is not linked from any page and has no relation to the current design.  
**Fix:** Either delete it, or replace its content as part of FIX-09 (shared stylesheet).

---

## Progress Tracker

| ID | Priority | Description | Status |
|---|---|---|---|
| FIX-01 | P1 | Heading hierarchy on all pages | `[x] Done (PR #2)` |
| FIX-02 | P1 | Form label/input associations | `[x] Done (PR #4)` |
| FIX-03 | P1 | Responsive breakpoints | `[x] Done (PR #7)` |
| FIX-04 | P1 | Page title on index.html | `[x] Done (PR #2)` |
| FIX-05 | P1 | Hero image HTTP → HTTPS | `[x] Done (PR #9)` |
| FIX-06 | P1 | Run selector functional | `[x] Done (PR #4)` |
| FIX-07 | P2 | Meta descriptions | `[x] Done (PR #9)` |
| FIX-08 | P2 | ARIA labels (nav, social links) | `[x] Done (PR #4)` |
| FIX-09 | P2 | Extract shared CSS | `[x] Done (PR #11)` |
| FIX-10 | P2 | Dark tone CSS variables | `[x] Done (PR #11)` |
| FIX-11 | P2 | Google Fonts preconnect | `[x] Done (PR #9)` |
| FIX-12 | P3 | Favicon | `[x] Done (PR #14)` |
| FIX-13 | P3 | Footer colour consistency | `[x] Done (PR #14)` |
| FIX-14 | P3 | `type="button"` on coffee pill | `[x] Done (PR #14)` |
| FIX-15 | P3 | Delete legacy style.css | `[x] Done (PR #2)` |
| FIX-16 | Post | WCAG contrast — white text on pale accent backgrounds | `[x] Done (commits 7793338–2152ce2)` |
| FIX-17 | Post | Mobile nav hidden with no replacement | `[x] Done (commit 465a192)` |

---

## Final Outcome

All 17 fixes completed. axe DevTools reports zero violations on all three pages. Lighthouse performance and SEO improvements confirmed on live site. Manual mobile testing passed at 375px, 768px, and 1440px.

**Completed:** 2026-04-18  
**Final estimated score:** 9.0–9.5 / 10 (up from 6.5 / 10)
