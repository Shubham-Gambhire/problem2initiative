# P2I — Supply Chain Problem to Initiative Prioritiser

Rebuild the uploaded HTML prototype as a real React app, keeping its exact look (brand blue, Inter, slate surfaces, rounded cards) and its rules-based logic unchanged. Add the project development report as a proper page in the app.

## Pages

- `/` — landing: title, subtitle, disclaimer, "What this tool does" / "does not do" cards, core question box, Start prioritisation + Try with an example buttons, collapsible "How this works" with the scoring logic.
- `/prioritise` — the 3-step wizard with the progress indicator:
  1. Problems: free-text box with keyword-based "Suggest problems from my description", curated problem list (max 3, with the max-3 and out-of-scope modals), selected chips.
  2. Rate initiatives: only initiatives mapped to selected problems, sticky selected-problem chips, Impact and Effort choices, incomplete-rating validation, "why relevant" details.
  3. Results: grouped priority bands (Start here / Medium / Lower), score per initiative, Impact–Effort matrix, results disclaimer, restart / back actions.
- `/report` — the Project Development Report, rendered as readable long-form content with a sticky table-of-contents sidebar on desktop (the report's 14 sections), plus a link to download the original Markdown.

Navigation: a light header with P2I wordmark, "Prioritiser" and "Project report" links; footer with the disclaimer and a "Read the project development report" link. The results page also links to the report ("How this tool was designed").

## Behaviour details kept from the prototype

- Impact H/M/L = 3/2/1; Effort L/M/H = 3/2/1; Priority Score = Impact + Effort (2–6).
- Bands: 5–6 Start here, 4 Medium priority, ≤3 Lower priority.
- Problem→initiative mapping, initiative names/descriptions/rationales, and the keyword suggestion lists are copied verbatim from the uploaded file (no AI, no backend).
- "Try with an example" preloads example problems and ratings as in the prototype.

## Technical notes

- TanStack Start routes: rewrite `src/routes/index.tsx` (landing), add `src/routes/prioritise.tsx` and `src/routes/report.tsx`, plus a shared layout in `__root.tsx`.
- Wizard state lives in React state in one client component (`src/components/prioritiser/*`), with data constants in `src/data/p2i.ts` (problems, initiatives, mapping, keywords). No database needed.
- Prototype's Tailwind CDN config replaced by semantic design tokens in `src/styles.css` (brand blue scale mapped to primary, slate neutrals), Inter loaded via a `<link>` in the root head. No hardcoded color utilities in components.
- Report content stored as structured content in `src/content/project-report.tsx` (or markdown rendered with a small renderer) and the original `.md` copied to `public/` for download.
- Per-route SEO `head()` with unique titles/descriptions and og/twitter tags.
