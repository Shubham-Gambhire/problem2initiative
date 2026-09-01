# P2I: Supply Chain Problem to Initiative Prioritiser

A problem-first decision support tool for prioritising digital initiatives in manufacturing supply chains. Start from the real operational problems you face today and get a clear, rules-based ranking of which digital initiatives deserve priority first.

P2I deliberately starts from **problems**, not from maturity scores. It does not assess digital maturity, does not produce SIRI-style scores, and does not benchmark against other companies. It answers one focused question:

> Given the specific supply chain problems we are facing today, which digital initiatives should we prioritise first?

---

## How it works

The app runs as a short, guided flow:

1. **Problem identification** - You select 1 to 3 manufacturing supply chain problems (or describe them in free text, which gets classified into the fixed problem list).
2. **Initiative mapping** - The tool shows only the digital initiatives relevant to your selected problems, driven by a tightened problem-to-initiative mapping table.
3. **Impact and Effort rating** - You rate each initiative on Impact (on your problems) and Effort (to implement).
4. **Results** - A transparent score ranks the initiatives into priority bands, with an Impact-Effort matrix, short rationales, and one-click copy-summary.

### Scoring logic (fully transparent)

| Rating | Impact Score | Effort Score |
|--------|--------------|--------------|
| High   | 3            | 1            |
| Medium | 2            | 2            |
| Low    | 1            | 3            |

- **Priority Score** = Impact Score + Effort Score (range 2-6)
- **5-6** - High Impact / Lower Effort: Start here
- **4** - Medium priority
- **<= 3** - Lower priority

The ranking is fully deterministic once ratings are provided. No hidden model sits between your inputs and the final order. AI is used in only one narrow place: converting free-text problem descriptions into the fixed list of recognised problems.

---

## Built with

- [TanStack Start](https://tanstack.com/start) (React 19, SSR)
- [TanStack Router](https://tanstack.com/router) (file-based routing)
- [Tailwind CSS v4](https://tailwindcss.com) (OKLCH design tokens)
- TypeScript

---

## Features

- **Problem-first prioritisation** - 20 curated manufacturing supply chain problems map to 20 digital initiatives.
- **Transparent rules-based ranking** - every score is traceable to your ratings.
- **Impact-Effort matrix** - visual complement to the ranked list.
- **Free-text classification** - describe problems in your own words; out-of-scope input is handled clearly.
- **Saved progress** - selections, ratings and step persist in `localStorage` across refreshes.
- **CSV export** - download the ranked initiatives as a spreadsheet.
- **Print-optimised report** - the About page exports cleanly to a compact A4 PDF.
- **Responsive and accessible** - keyboard-friendly controls, ARIA dialog roles, live status announcements.

---

## Getting started

Requires [Node.js](https://nodejs.org) and [bun](https://bun.sh) (or npm).

```sh
git clone https://github.com/Shubham-Gambhire/problem2initiative.git
cd problem2initiative
bun install   # or: npm install
bun run dev   # or: npm run dev
```

Open the printed local URL (default `http://localhost:8080`).

### Scripts

| Command              | Description                  |
|----------------------|------------------------------|
| `bun run dev`         | Start the dev server         |
| `bun run build`       | Production build             |
| `bun run preview`     | Preview the production build |
| `bun run lint`        | Run ESLint                   |
| `bun run format`      | Format with Prettier         |

---

## Project structure

```
src/
  routes/
    __root.tsx       # Global layout, header nav, footer
    index.tsx        # Landing page
    prioritise.tsx   # Prioritiser wizard route
    report.tsx       # "About the project" narrative + PDF export
  components/
    prioritiser/
      Prioritiser.tsx  # 3-step wizard (problems -> rate -> results)
  data/
    p2i.ts           # Problems, initiatives, mapping, scoring logic
  lib/
    p2i-state.ts     # localStorage persistence + CSV export
  content/
    project-report.md  # Source narrative for the About page
  styles.css         # Tailwind v4 theme tokens + print styles
```

---

## Domain grounding

The tool is positioned inside the **Plan** process of the [SCOR framework](https://www.supplychainops.org/scor). It draws conceptual inspiration from the prioritisation thinking present in Industry 4.0 frameworks such as SIRI, but it does **not** implement SIRI's maturity model, building blocks, pillars, or dimensions. All problem statements and initiative types are framed in language familiar to manufacturing supply chain professionals.

---

## What this tool does not do

- It does not measure digital maturity or produce SIRI-style scores.
- It is not a formal diagnostic or benchmarking tool.
- It does not benchmark against other companies.
- It does not produce AI-generated rankings or long-form recommendations.
- It has no user accounts, backend, or database in the current version.

---

## Author

Made by **Shubham Gambhire** - [LinkedIn](https://www.linkedin.com/in/shubhambg)

---

## License

This project is open source. See the repository for details.
