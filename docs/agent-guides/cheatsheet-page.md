# Cheatsheet Page Instructions

Use this guide when implementing or updating the dedicated cheatsheet page.

## Objective

Add a separate cheatsheet page that feels like part of the same portfolio, not a detached utility page.

## Page Requirements

- Create a standalone page, expected name: `cheatsheet.html`.
- Add a visible `Cheatsheet` link in the main navigation.
- Keep the same font, color system, header treatment, and theme toggle behavior as the homepage.
- Reuse shared CSS and JS files first; add new page-specific files only when shared styles are insufficient.

## Visual Direction

- Keep the current dark/light theme support powered by `css/theme.css` and `js/theme.js`.
- Match the existing premium DevOps portfolio aesthetic:
  - deep background
  - warm gold accent
  - elevated cards
  - subtle borders
  - soft motion only
- Use the same content width and spacing rhythm as the main page.

## Layout Guidance

- Include a hero/introduction area that explains the page purpose in one short paragraph.
- Present tool families as clearly separated sections.
- Inside each section, organize commands into smaller grouped blocks such as:
  - navigation
  - files
  - branches
  - images
  - pods
- Favor scan-friendly layouts:
  - card grid on desktop
  - single-column stack on mobile
- Each command block should show:
  - command
  - short explanation
  - optional note or caution when useful

## Implementation Notes

- Avoid huge unbroken tables if they hurt mobile readability.
- Prefer semantic HTML sections and headings.
- Keep copy concise; this is a reference page, not a tutorial.
- If page-specific styles are needed, place them in a dedicated file such as `css/cheatsheet.css`.
- If page-specific interactions are needed, keep them lightweight and isolated.

## Non-Goals

- Do not add search, filtering, or generated content unless requested later.
- Do not introduce markdown rendering, CMS logic, or client-side frameworks.
- Do not redesign the entire site while adding this page.
