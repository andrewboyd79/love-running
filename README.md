# Love Running

**Dublin's friendliest running club** — a three-page static website for a Dublin-based running group offering urban 5k and trail 10k runs across the Docklands and Phoenix Park.

**Live site:** https://andrewboyd79.github.io/love-running/  
**Repository:** https://github.com/andrewboyd79/love-running

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [UX and Design](#ux-and-design)
3. [Features](#features)
4. [Technologies Used](#technologies-used)
5. [Testing](#testing)
6. [Deployment](#deployment)
7. [Credits](#credits)

---

## Project Overview

Love Running is a fictional Dublin running club. The site serves two audiences:

- **Prospective members** looking to find out when and where runs take place and what the club is about
- **Existing members** who want to check the weekly schedule or browse the photo gallery

The site consists of three pages: a homepage, a photo gallery, and a sign-up form.

---

## UX and Design

### Design Goals

The site was designed to feel distinctive and editorial — more like a magazine than a typical club website. The design was inspired by the [Clay](https://clay.global) website aesthetic: warm, confident, and visually rich without being busy.

A full design specification was created before implementation and is documented in [`DESIGN.md`](DESIGN.md).

### Colour Palette

| Token | Hex | Use |
|---|---|---|
| `--cream` | `#faf9f7` | Page background |
| `--ink` | `#0d0d0d` | Primary text |
| `--matcha` | `#84e7a5` | Urban runs / Feel Healthy |
| `--slushie` | `#0089ad` | Trail runs / Feel Strong |
| `--ube` | `#c1b0ff` | Social / Get Social |
| `--lemon` | `#fbbd41` | CTA buttons |
| `--pomegranate` | `#fc7981` | Accent |
| `--bark` | `#2a2420` | Dark sections |

### Typography

- **Bebas Neue** — display headings, hero text, schedule titles (editorial character)
- **DM Sans** — body text, labels, navigation (clean and readable)

Both fonts are loaded via Google Fonts.

### Wireframes

The design was developed iteratively using a browser-based visual mockup before being applied to the live HTML files. The mockup versions are preserved in `.superpowers/brainstorm/`.

---

## Features

### All Pages

- **Fixed navigation bar** — logo and links to all three pages; stacks vertically on mobile
- **Footer** — social links (Facebook, Instagram, Twitter, YouTube) with descriptive `aria-label` attributes
- **Favicon** — SVG icon visible in the browser tab
- **Responsive layout** — single breakpoint at 767px collapses all multi-column layouts to single column

### Homepage (`index.html`)

- **Full-viewport hero** — background image with an SVG bezier curve edge blending into the page; headline, sub-heading, and CTA button
- **Ethos section** — three pill cards (Feel Healthy / Feel Strong / Get Social) on a topo-textured background, each with a stat, description, and tag
- **Weekly schedule** — dark topo-textured section showing Urban Runs (Mon 18:30 & Fri 17:00, Grand Canal Dock) and Trail Runs (Tue 18:30 & Sat 09:30, Phoenix Park); Sunday coffee run invite card

### Gallery (`gallery.html`)

- **Film strip hero** — staggered photo placeholders rising from a dark topo background, with filter bar
- **Editorial grid** — four grid layout types: feature (large + small), strip (row), asymmetric (unequal columns), and quote block

### Sign Up (`signup.html`)

- **Split-panel layout** — dark invitation panel (topo texture, schedule preview, member avatars) alongside a cream form panel
- **Sign-up form** — first name, last name, email inputs; all labels properly associated with inputs via `for`/`id` pairs
- **Run-type selector** — three keyboard-accessible checkbox cards (Urban 5k / Trail 10k / Sunday ☕) implemented with `<fieldset>`, `<legend>`, and `<label>` + `<input type="checkbox">` elements

---

## Technologies Used

- **HTML5** — semantic document structure throughout
- **CSS3** — custom properties (design tokens), flexbox, CSS grid, `@media` queries, `:has()` selector
- **Google Fonts** — Bebas Neue and DM Sans via preconnect-optimised `<link>` tags
- **GitHub Pages** — static site hosting

No JavaScript frameworks or build tools are used. The site is plain HTML and CSS.

---

## Testing

### Automated

#### axe DevTools

Run against the live site on all three pages. Result: **zero violations** on all three pages.

#### W3C Nu Validator

| Page | Result |
|---|---|
| `index.html` | 0 errors |
| `gallery.html` | 0 errors |
| `signup.html` | 0 errors (1 false-positive CSS parse warning on `:has(:checked)` — valid CSS Selectors Level 4, not a code defect) |

#### Lighthouse (Google Chrome DevTools)

Scores recorded on the live GitHub Pages site after all fixes were applied:

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `index.html` | 97 | 91→improved | 77→improved | 90→improved |
| `gallery.html` | 100 | 85→improved | 100 | 90→improved |
| `signup.html` | 98 | 94→improved | 100 | 90→improved |

### Manual

#### WCAG 2.1 AA Colour Contrast

After axe DevTools identified contrast failures (white text on pale accent backgrounds), targeted fixes were applied per element using `var(--ink)` rather than altering the palette. All text elements now meet the minimum 3:1 ratio for large bold text and 4.5:1 for normal text.

#### Keyboard Navigation

- Tabbed through all interactive elements on all three pages — focus order is logical
- Focus indicator visible at all times
- Run-type selector operable via Tab and Space

#### Responsive / Mobile

Tested in Chrome DevTools at three viewport widths:

| Width | Result |
|---|---|
| 375px | No horizontal scroll; nav stacks; all text readable; form full-width |
| 768px | Layout transitions correctly at breakpoint |
| 1440px | Desktop layout unaffected |

---

## Deployment

The site is deployed via **GitHub Pages** directly from the `master` branch.

**To deploy:**
1. Push to the `master` branch of the GitHub repository
2. In the repository Settings → Pages, set the source to `master` / `root`
3. The live site is available at `https://<username>.github.io/<repo-name>/`

**To run locally:**
1. Clone the repository: `git clone https://github.com/andrewboyd79/love-running.git`
2. Open `index.html` in a browser — no build step required

---

## Credits

### Content

- Run schedule, club name, and all copy are fictional, created for this project

### Media

- Hero background image: [Code Institute](https://codeinstitute.s3.amazonaws.com/fullstack/ci_logo_small.png) S3 bucket (used with permission as part of the Code Institute learning materials)
- `topo-light.svg` and `topo-dark.svg`: organic contour textures created for this project

### Fonts

- [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) — Google Fonts
- [DM Sans](https://fonts.google.com/specimen/DM+Sans) — Google Fonts

### Tools

- [axe DevTools](https://www.deque.com/axe/) — accessibility auditing
- [W3C Nu HTML Checker](https://validator.w3.org/nu/) — HTML validation
- [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/) — performance and SEO auditing
