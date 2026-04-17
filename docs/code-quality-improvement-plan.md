# Code Quality Review & Improvement Plan
**Project:** Love Running — Dublin Running Club  
**Date:** 2026-04-17  
**Reviewer:** Claude Sonnet 4.6  
**Baseline Score:** 6.5 / 10

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
| FIX-01 | P1 | Heading hierarchy on all pages | `[ ] Open` |
| FIX-02 | P1 | Form label/input associations | `[ ] Open` |
| FIX-03 | P1 | Responsive breakpoints | `[ ] Open` |
| FIX-04 | P1 | Page title on index.html | `[ ] Open` |
| FIX-05 | P1 | Hero image HTTP → HTTPS | `[ ] Open` |
| FIX-06 | P1 | Run selector functional | `[ ] Open` |
| FIX-07 | P2 | Meta descriptions | `[ ] Open` |
| FIX-08 | P2 | ARIA labels (nav, social links) | `[ ] Open` |
| FIX-09 | P2 | Extract shared CSS | `[ ] Open` |
| FIX-10 | P2 | Dark tone CSS variables | `[ ] Open` |
| FIX-11 | P2 | Google Fonts preconnect | `[ ] Open` |
| FIX-12 | P3 | Favicon | `[ ] Open` |
| FIX-13 | P3 | Footer colour consistency | `[ ] Open` |
| FIX-14 | P3 | `type="button"` on coffee pill | `[ ] Open` |
| FIX-15 | P3 | Delete legacy style.css | `[ ] Open` |

---

## Target Score

Completing all P1 items should bring the score to approximately **8.0 / 10**.  
Completing P1 + P2 should reach **8.5–9.0 / 10**.
