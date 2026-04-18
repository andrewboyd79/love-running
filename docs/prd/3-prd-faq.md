# PRD: FAQ / Getting Started

**Status:** Proposed  
**Created:** 2026-04-18  
**Experiment:** E2 (discovery-plan.md)

---

## Problem

The sign-up form asks prospective members to commit before answering their practical questions: What do I wear? Where exactly do I meet? What happens if I'm slow? What if I want to stop going? These unanswered questions create hesitation at the moment of highest intent — the sign-up page.

## Goal

Reduce sign-up form abandonment by answering the questions most likely to cause hesitation, directly on the sign-up page above the form.

## Success Metrics

- Primary: sign-up form completion rate increases vs. 2-week pre-launch baseline
- Secondary: reduced "basic questions" in club WhatsApp/social channels

---

## User Stories

| As a… | I want to… | So that… |
|-------|-----------|----------|
| Prospective member | Know what to wear on my first run | I don't show up in the wrong kit |
| Prospective member | Understand what happens if I'm much slower than others | I don't feel anxious about holding people back |
| Prospective member | Know where exactly to meet | I don't get lost and give up before I start |
| Prospective member | Understand what I'm committing to | I feel comfortable signing up |
| Existing member | Point a friend to the FAQ | They get answers without me having to explain everything |

---

## Requirements

### Must Have
- FAQ section on `signup.html`, above the sign-up form
- Minimum 5 questions covering the most common first-timer concerns
- CSS-only expand/collapse using native `<details>` / `<summary>` elements (no JavaScript)
- All questions visible in collapsed state (summary text only); answers expand on click

### Should Have
- 7–8 questions covering the full range of concerns
- Section heading ("Getting Started" or "Your Questions, Answered")
- Introductory sentence to frame the section
- Link from the FAQ to the schedule section (for meeting point details)

### Won't Have (this version)
- Search within the FAQ
- User-submitted questions
- FAQ on other pages (homepage, gallery)

---

## Question Set

| # | Question |
|---|---------|
| Q1 | What should I wear / what kit do I need? |
| Q2 | Where exactly do I meet for each run? |
| Q3 | What if I'm slow — will I hold people back? |
| Q4 | Do I need to be a member to come to my first run? |
| Q5 | How much does it cost? |
| Q6 | What happens on a Sunday coffee run? |
| Q7 | Can I come to just one run, or do I have to commit? |
| Q8 | How do I cancel or change my run type? |

---

## Technical Notes

- Use native HTML `<details>` and `<summary>` elements — no JavaScript required
- `<details>` is keyboard accessible and screen-reader friendly out of the box
- Custom chevron indicator via CSS `summary::after` — rotate on `[open]` state
- Remove default `summary` list-style with `summary { list-style: none; }`
- Structure per item:

```html
<details class="faq-item">
  <summary class="faq-question">What should I wear?</summary>
  <div class="faq-answer">
    <p>Comfortable running clothes and road shoes for Urban runs...</p>
  </div>
</details>
```

---

## Design Notes

- Section background: `var(--cream)` with a `var(--oat)` top border
- `summary` text: DM Sans semibold, `var(--ink)`, `font-size: 15px`
- Answer text: DM Sans regular, `var(--stone)`, `font-size: 14px`, `line-height: 1.7`
- Chevron: right-aligned, rotates 180° when open (CSS transition)
- Divider line between each item (`border-bottom: 1px solid var(--oat)`)
- Section placement: above the split-panel sign-up form on `signup.html`
- Mobile: full width, no layout changes needed

---

## Acceptance Criteria

- [ ] FAQ section visible on `signup.html` above the form
- [ ] Minimum 5 questions present with complete answers
- [ ] All items collapsed by default on page load
- [ ] Each item expands/collapses on click without JavaScript
- [ ] Each item is keyboard accessible (Tab to focus, Enter/Space to toggle)
- [ ] Chevron indicator rotates on open state
- [ ] Section is responsive at 375px viewport
- [ ] axe DevTools reports no new violations introduced
