# Love Running — Phase 2 Remediation Design Spec
**Date:** 2026-04-17  
**Status:** Approved  
**Author:** Andrew Boyd (with Claude Sonnet 4.6)

---

## 1. Context

### Product History

| Phase | Description | Status |
|---|---|---|
| Phase 1 | Original Code Institute HTML/CSS template — functional but mediocre quality | Complete |
| Phase 2a | Full visual redesign using `DESIGN.md` specification (Clay-inspired editorial system) | Complete |
| Phase 2b | Baseline code quality remediation — this document | **In progress** |
| Phase 3+ | Feature development, new pages, added functionality | Gated on Phase 2b |

### Why This Remediation Exists

The visual redesign (Phase 2a) was implemented correctly against the design spec. However, a post-implementation code review scored the site at **6.5/10**, identifying critical gaps in semantic HTML, accessibility, responsive design, and code architecture. These are not optional improvements — they represent the minimum standard expected of any production web product.

**Phase 3 work does not begin until all six PRs in this plan are merged.** Building features on top of a broken foundation wastes effort and compounds technical debt.

### Design for Extensibility

The workflow defined in this spec — GitHub Projects, feature branches, linked PRs — is deliberately sized for the current project but designed to accommodate CI/GitHub Actions integration in a future phase. That integration would add automated validation (W3C, Lighthouse, axe) on every PR, making the acceptance criteria self-enforcing.

---

## 2. Baseline Assessment

### Lighthouse Scores (pre-remediation)
*Recorded 2026-04-17 against the live GitHub Pages URL: https://andrewboyd79.github.io/love-running/*

| Metric | index.html | gallery.html | signup.html |
|---|---|---|---|
| Performance | 97 | 100 | 98 |
| Accessibility | 91 | 85 | 94 |
| Best Practices | 77 | 100 | 100 |
| SEO | 90 | 90 | 90 |

**Notes:** Best Practices 77 on homepage is the HTTP hero image (mixed content warning — fixed in PR 4). Accessibility gap on gallery (85) reflects missing heading hierarchy and aria-labels. Performance scores are strong across all pages.

### Code Review Scores (post-redesign, pre-remediation)

| Category | Score |
|---|---|
| HTML Quality (semantics, accessibility) | 4 / 10 |
| CSS Quality (organisation, maintainability) | 5.5 / 10 |
| Navigation & Linking | 7 / 10 |
| Responsive Design | 2 / 10 |
| Performance | 6 / 10 |
| Code Consistency | 7.5 / 10 |
| Bugs & Issues | 5 / 10 |
| **Overall** | **6.5 / 10** |

### Target
Completing all six PRs should bring the overall code review score to **8.5–9.0 / 10** and Lighthouse Accessibility and SEO scores to **90+**.

---

## 3. GitHub Projects Workflow

All task management for this phase runs from the terminal using the GitHub CLI (`gh`). This is documented here as a reference and as evidence of AI-assisted product management practice.

### One-time Setup

```bash
# Add project scope to gh token
gh auth refresh -s project

# Create the Phase 2b project board
gh project create --owner andrewboyd79 --title "Love Running — Phase 2b Remediation"

# Link the project to the repository
gh project link <project-number> --repo andrewboyd79/love-running

# Create a milestone for this phase
gh api repos/andrewboyd79/love-running/milestones \
  --method POST \
  --field title="Phase 2b — Baseline Remediation" \
  --field description="All remediation PRs required before Phase 3 feature work begins"
```

### Per-PR Workflow

```bash
# 1. Create a GitHub issue for the PR group
gh issue create \
  --title "<issue title>" \
  --body "<rationale and acceptance criteria>" \
  --milestone "Phase 2b — Baseline Remediation" \
  --label "remediation"

# 2. Add the issue to the Project board
gh project item-add <project-number> --owner andrewboyd79 --url <issue-url>

# 3. Create feature branch and implement changes
git checkout -b fix/<layer>

# 4. Commit changes
git add <files> && git commit -m "<message>"

# 5. Push and raise PR — "Closes #X" auto-links issue and closes it on merge
gh pr create \
  --title "<PR title>" \
  --body "$(cat <<'EOF'
## What
<summary of changes>

## Why
<rationale — the senior decision being made>

## Acceptance Criteria
<checklist>

## Testing
<what was validated and how>

Closes #<issue-number>
EOF
)"

# 6. On merge: issue closes automatically → Project board updates automatically
```

### Project Board States
Issues progress through: `Todo` → `In Progress` → `Done`

---

## 4. Testing Approach

Minimal but defined. Each PR is validated against the following before merge:

| Tool | What it checks | How to run |
|---|---|---|
| W3C Validator | Valid HTML, no structural errors | https://validator.w3.org (paste URL) |
| Lighthouse | Performance, Accessibility, Best Practices, SEO | Chrome DevTools → Lighthouse tab |
| axe DevTools | Accessibility violations (WCAG 2.1 AA) | Chrome extension — axe DevTools |
| Manual viewport check | Layout at 375px, 768px, 1440px | Chrome DevTools → responsive mode |

Scores are recorded in the PR description. The `fix/responsive` PR additionally requires manual review on a real mobile device where possible.

---

## 5. Remediation PRs

### PR 1 — `fix/semantics`
**Title:** Establish semantic HTML document structure  
**Rationale:** A document with no heading hierarchy, a stale page title, and a dead stylesheet is not semantically valid. Search engines, screen readers, and developer tooling all depend on correct document structure. This is the foundational layer everything else builds on.

**Fixes included:**
- `FIX-01` — Add `<h1>` to each page; `<h2>`/`<h3>` for section titles
- `FIX-04` — Fix page title on `index.html` ("Concept A v5" → "Home — Love Running")
- `FIX-15` — Delete legacy `assets/css/style.css` content (replaced in PR 5) or remove the file

**Acceptance criteria:**
- [ ] Each page has exactly one `<h1>`
- [ ] All major sections have an `<h2>`; sub-sections have `<h3>`
- [ ] `<title>` on `index.html` reads "Home — Love Running"
- [ ] W3C Validator reports no heading hierarchy errors
- [ ] Legacy stylesheet removed or cleared

---

### PR 2 — `fix/accessibility`
**Title:** Improve accessibility across all pages  
**Rationale:** The site is currently unusable for keyboard and screen reader users. Form inputs cannot be activated by clicking their labels. The run-type selector is non-functional. Navigation has no accessible name. Fixing these brings the site to WCAG 2.1 AA compliance for its current feature set.

**Fixes included:**
- `FIX-02` — Add `for`/`id` pairs to all form labels and inputs in `signup.html`
- `FIX-06` — Convert run-option selector to real `<input type="checkbox">` elements
- `FIX-08` — Add `aria-label` to `<nav>` and all footer social links

**Acceptance criteria:**
- [ ] Clicking any form label focuses the associated input
- [ ] Run-type selector is keyboard navigable; selection state can be changed
- [ ] axe DevTools reports zero critical or serious violations
- [ ] `<nav aria-label="Main navigation">` present on all three pages
- [ ] All social links have descriptive `aria-label` attributes

---

### PR 3 — `fix/responsive`
**Title:** Add responsive layout for mobile viewports  
**Rationale:** Zero media queries means the site is effectively desktop-only. A product with no mobile support in 2026 is not production ready — mobile accounts for the majority of web traffic. This PR adds a single well-considered breakpoint that makes all three pages usable on phones.

**Fixes included:**
- `FIX-03` — Add `@media (max-width: 767px)` breakpoints across all three pages

**Key layout changes at mobile:**

| Element | Desktop | Mobile |
|---|---|---|
| Nav links | Visible `flex` row | Hidden (hamburger or stacked) |
| Hero title | `clamp(72px, 10vw, 128px)` | `clamp(48px, 12vw, 72px)` |
| Ethos grid `340px 1fr` | Fixed column | Single column stacked |
| Schedule grid `1fr 1fr` | Two columns | Single column |
| Signup split `1fr 1fr` | Side by side | Stacked (invite above form) |
| Gallery grids | Multi-column | Single column |
| Film strip | Overflow hidden | Horizontal scroll |

**Acceptance criteria:**
- [ ] All three pages render without horizontal scrolling at 375px viewport
- [ ] All text is readable (minimum 14px) at 375px
- [ ] Forms are usable on mobile
- [ ] Validated at 375px, 768px, and 1440px in Chrome DevTools
- [ ] Tested on a real mobile device where possible

---

### PR 4 — `fix/performance`
**Title:** Improve page load performance and document metadata  
**Rationale:** A mixed-content hero image will be silently blocked on HTTPS. Missing `preconnect` hints add measurable latency to font loading. Missing meta descriptions hurt SEO and make shared links look unfinished. These are low-effort, high-signal fixes.

**Fixes included:**
- `FIX-05` — Fix hero image URL: HTTP → HTTPS or move to `assets/img/`
- `FIX-07` — Add `<meta name="description">` to all three pages
- `FIX-11` — Add `preconnect` hints for Google Fonts domains

**Acceptance criteria:**
- [ ] Hero image loads on the live GitHub Pages HTTPS URL with no console warnings
- [ ] All three pages have a unique, descriptive `<meta name="description">`
- [ ] `<link rel="preconnect">` for both `fonts.googleapis.com` and `fonts.gstatic.com` present on all pages
- [ ] Lighthouse Performance score improves vs. baseline
- [ ] Lighthouse SEO score improves vs. baseline

---

### PR 5 — `fix/css-architecture`
**Title:** Refactor CSS into shared stylesheet  
**Rationale:** Duplicating 150+ lines of identical CSS across three files is a maintenance liability. Any future palette or component change requires editing three files in sync. Extracting shared styles into `assets/css/style.css` establishes a single source of truth and is the foundation for the design token system.

**Fixes included:**
- `FIX-09` — Move shared styles (reset, `:root` variables, nav, footer) to `assets/css/style.css`; link from all pages
- `FIX-10` — Define missing dark-tone CSS variables (`--bark`, `--espresso`, `--wood`, `--stone`, `--pebble`) and replace scattered hex literals

**Acceptance criteria:**
- [ ] `assets/css/style.css` contains all shared styles
- [ ] All three pages link `assets/css/style.css` and render identically to before
- [ ] No colour hex literals remain in inline `<style>` blocks (all values reference CSS variables)
- [ ] Removing any shared style from `style.css` visibly breaks all three pages (confirms the link is load-bearing)
- [ ] W3C Validator passes on all three pages after refactor

---

### PR 6 — `fix/polish`
**Title:** Final polish and consistency fixes  
**Rationale:** These are the details that distinguish a developer who finishes from one who ships "good enough." Individually minor; collectively they signal care and completeness.

**Fixes included:**
- `FIX-12` — Add favicon (`assets/img/favicon.svg`)
- `FIX-13` — Standardise footer background colour across all pages
- `FIX-14` — Add `type="button"` to Sunday join button

**Acceptance criteria:**
- [ ] Favicon visible in browser tab on all three pages
- [ ] Footer background is visually identical across all three pages
- [ ] Sunday join button has `type="button"` and does not trigger unexpected behaviour
- [ ] Final Lighthouse scores recorded and compared to baseline
- [ ] Final code review score estimated and recorded in `docs/code-quality-improvement-plan.md`

---

## 6. Sequence and Dependencies

PRs should be raised and merged in order. PR 5 (CSS architecture) depends on PR 1 (semantics) being complete so the legacy stylesheet is already cleared. All other PRs are independent of each other but follow the logical layering sequence.

```
PR1 (semantics)
    ↓
PR2 (accessibility)
    ↓
PR3 (responsive)
    ↓
PR4 (performance)
    ↓
PR5 (css-architecture)   ← depends on PR1 (legacy CSS cleared)
    ↓
PR6 (polish)
```

---

## 7. Definition of Done — Phase 2b

Phase 2b is complete when:
- [x] All six PRs merged to `master` ✓ (7 PRs total — PR #5 added for quality fixes post-review)
- [x] All acceptance criteria checked off
- [ ] Lighthouse scores recorded post-remediation ← run after merge completes
- [x] Updated code review score recorded in `docs/code-quality-improvement-plan.md`
- [ ] GitHub Project board shows all issues as `Done`
- [ ] `docs/code-quality-improvement-plan.md` updated to mark Phase 2b complete
