# PRD: Gallery Filters

**Status:** Proposed  
**Created:** 2026-04-18  
**Experiment:** E1 assumption A18 (discovery-plan.md)

---

## Problem

The gallery currently shows all photos in a fixed editorial grid. As the photo library grows this becomes unwieldy — a member looking for photos from a specific Trail run or Sunday coffee run has to scroll the entire page. The value of the gallery decreases as content volume increases.

**Note:** This is a low-priority, high-uncertainty assumption (A18). Demand for filtering should be validated before building. Consider running the member stories fake door experiment first to confirm gallery engagement is meaningful.

## Goal

Let users quickly find photos relevant to them by filtering the gallery by run type, allowing the gallery to scale as content grows.

## Success Metrics

- Filter controls are used by >20% of gallery page visitors
- Average time on gallery page increases (users engaging more deeply with photos)

---

## User Stories

| As a… | I want to… | So that… |
|-------|-----------|----------|
| Member | Filter to Trail run photos | I can find and share photos from runs I attended |
| Member | Filter to Sunday coffee run photos | I can see the social side of the club |
| Prospective member | Filter by run type I'm interested in | I can see what a specific run type looks like |

---

## Requirements

### Must Have
- Filter controls above the gallery grid: All / Urban / Trail / Sunday
- Filtering shows only photos tagged with the selected run type
- "All" selected by default
- Active filter state clearly indicated
- Works without a page reload

### Should Have
- Filter persists if user scrolls down (sticky or prominent placement)
- Photo count shown per filter ("14 Urban photos")
- Smooth transition when photos show/hide (CSS transition, no JS animation library)

### Won't Have (this version)
- Filter by date or month
- Multi-select filters (e.g. Urban + Trail simultaneously)
- Search by keyword
- Server-side filtering

---

## Technical Notes

This feature **requires JavaScript** — the site currently has none. This is the only proposed feature that introduces JS. Options:

### Option A — JavaScript show/hide (Recommended)
Each photo `<figure>` gets a `data-type="urban|trail|sunday"` attribute. Filter buttons call a small vanilla JS function that toggles `display: none` on non-matching items.

```html
<button class="filter-btn active" data-filter="all">All</button>
<button class="filter-btn" data-filter="urban">Urban</button>

<figure class="gallery-item" data-type="urban">...</figure>
```

```js
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.style.display =
        filter === 'all' || item.dataset.type === filter ? '' : 'none';
    });
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
```

### Option B — CSS :checked hack
Use hidden radio inputs + labels as filter buttons; show/hide grid items using CSS sibling selectors. Works without JS but is brittle, hard to maintain, and has accessibility limitations.

**Recommendation:** Option A. The JS is minimal (~15 lines), vanilla, and has no dependencies.

---

## Design Notes

- Filter bar placement: between the hero section and the first photo grid
- Filter buttons: pill style, consistent with existing `.hero-bar` buttons
- Active state: filled background (`var(--ink)`), white text
- Inactive state: outlined, `var(--stone)` text
- Photo count badge: small number in the button pill ("Urban · 14")
- On mobile: filter buttons wrap or scroll horizontally (`overflow-x: auto` row)
- Hidden photos: `display: none` (not `visibility: hidden`) to collapse layout

---

## Tagging Convention

All gallery `<figure>` elements must have `data-type` set at time of authoring. Convention:

| Run type | `data-type` value |
|----------|------------------|
| Urban 5k (Mon/Fri) | `urban` |
| Trail 10k (Tue/Sat) | `trail` |
| Sunday coffee run | `sunday` |
| Club event / race | `event` |

---

## Acceptance Criteria

- [ ] Filter bar shows: All / Urban / Trail / Sunday
- [ ] Clicking a filter shows only matching photos
- [ ] "All" is selected and active by default on page load
- [ ] Active filter button is visually distinct from inactive buttons
- [ ] Filtering works without page reload
- [ ] All existing gallery `<figure>` elements have a `data-type` attribute
- [ ] Filter bar is responsive at 375px (buttons wrap or scroll)
- [ ] axe DevTools reports no new violations (filter buttons are keyboard accessible)
- [ ] Feature works with JavaScript disabled (all photos visible — graceful degradation)
