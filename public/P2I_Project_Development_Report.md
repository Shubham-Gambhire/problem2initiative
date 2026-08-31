**Project Development Report**

**P2I — A Supply Chain Problem to Initiative Prioritiser**  
A Problem-First Decision Support Tool for Manufacturing Supply Chains

Digital Supply Chain Portfolio Project  
Report updated: August 2026

---

### Table of Contents

1. The Problem This Project Responds To  
2. Vision & Core Approach  
3. Development Progression  
4. Design Issues Raised & Resolved  
5. Feature Architecture  
6. The Prioritisation Logic  
7. Problem-to-Initiative Framework  
8. Domain Grounding & SCOR Alignment  
9. What Is Real vs. What Is Planned  
10. Deliberate Scope Exclusions  
11. Design Verification Approach  
12. Current State Summary  
13. Future Roadmap  
14. Conclusion  

---

### 1. The Problem This Project Responds To

This project did not begin from a blank specification. It began from work on the Smart Industry Readiness Index (SIRI) — a formal framework used to assess Industry 4.0 maturity across manufacturing companies.

While preparing and presenting material on SIRI, a practical gap became clear. Formal maturity assessments are powerful, but they are relatively heavy. Many supply chain professionals need a faster, more focused way to decide which digital initiatives deserve attention *right now*, based on the actual operational problems they are facing.

The first instinct was to build a lightweight version of a SIRI-style maturity assessment. That idea was deliberately rejected. Creating something that closely mirrored the official SIRI process would have been redundant and less credible as a portfolio project. Official SIRI is a certified, multi-dimensional assessment conducted by trained assessors. Replicating its surface form would not demonstrate original thinking.

The real opportunity was different:

- Start from **problems**, not from capability scores.
- Help a planner answer: “Given the supply chain problems we currently face, which digital initiatives should we prioritise?”
- Keep the tool focused on manufacturing supply chains.
- Make the prioritisation logic transparent and explainable.

That gap — too heavy to run a full maturity assessment every time a prioritisation decision is needed, and not informative enough to simply list popular digital technologies — is the reason this project exists.

---

### 2. Vision & Core Approach

The system does not assess digital maturity. It does not produce a maturity score or a 16-dimension profile.

Instead, it works as follows:

1. The user identifies (or describes) the main supply chain problems they are facing.
2. The tool maps those problems to a shortlist of relevant digital initiatives.
3. The user rates each initiative on **Impact** (on the selected problems) and **Effort** (to implement).
4. The tool ranks the initiatives using a transparent scoring method and presents a prioritised list with clear rationale.

The core design principle is **problem-first prioritisation**. Technology recommendations only appear after the problems are established. This is the opposite of many digital transformation conversations that begin with “we should implement AI / IoT / visibility platforms.”

**Why rules-based for version 1**

The prioritisation logic is deliberately a transparent, weighted rules-based model rather than a black-box AI ranking. Every ranking can be traced back to the problems the user selected and the Impact/Effort ratings they provided. A planner (or an interviewer) can always ask “why is this initiative ranked first?” and receive a concrete answer.

AI is used in only one narrow place: converting free-text problem descriptions into the fixed list of recognised problems. The ranking itself remains fully rules-based and under user control.

**Product name**

The tool is named **P2I** (Problem to Initiative), with the description: *A supply chain problem to initiative prioritiser*.

---

### 3. Development Progression

The project was shaped iteratively. Early phases focused on concept and specification; later phases produced a working prototype and refined it through multiple design and usability cycles.

**Phase 1 — Initial Concept**  
Started from the desire to build a SIRI-related portfolio tool. Early framing still looked too much like a simplified maturity assessment.

**Phase 2 — Rejection of Maturity Assessment**  
Explicit decision: the tool would not assess maturity, would not produce maturity scores, and would not attempt to cover all 16 SIRI dimensions. The goal shifted to prioritisation of initiatives.

**Phase 3 — Problem-First Reframe**  
The decisive shift. The tool would start from operational problems rather than from capabilities. This created a clean and defensible separation from official SIRI.

**Phase 4 — Scope Tightening**  
Confirmed manufacturing supply chain focus only. Excluded pure retail, pure services, and non-manufacturing contexts. Positioned the tool inside the Plan process of the SCOR framework.

**Phase 5 — Problem List & Selection Rules**  
Defined an initial curated list of 11 manufacturing supply chain problems. Imposed a hard maximum of 3 problems that a user can select at one time, to keep prioritisation focused.

**Phase 6 — AI Role Definition**  
Decided that AI would be used only for classification of free-text into the fixed problem list. Ranking, scoring, and final recommendations would remain rules-based.

**Phase 7 — Out-of-Bound Handling**  
Added explicit behaviour for free-text descriptions that cannot be mapped to the current problem list: a clear popup stating that the description falls outside the current scope and that more problem categories are coming soon.

**Phase 8 — Quality-of-Life & Professionalism Layer**  
Added progress indicators, sticky selected-problem chips, an example/demo button, Impact–Effort matrix visualisation, copy-summary functionality, disclaimers, and a collapsible “How this works” explanation.

**Phase 9 — PRD Consolidation**  
All decisions were consolidated into a detailed Product Requirements Document (Version 3.2).

**Phase 10 — Working Prototype Built**  
A complete single-page web application prototype was implemented (HTML + Tailwind CSS + vanilla JavaScript). All core flows, scoring, mapping, and quality-of-life features were made functional.

**Phase 11 — Expansion of Problem & Initiative Coverage**  
The initial 11 problems proved too limited: different problem selections often produced nearly identical initiative lists because of heavy mapping overlap. Coverage was expanded to **20 problems** and **20 digital initiatives**, with tighter, more distinctive mappings so that changing the selected problems visibly changes the initiatives presented.

**Phase 12 — Usability & Polish Iteration**  
Multiple rounds of feedback-driven fixes were applied (see Section 4). These included disclaimer placement, selection-limit feedback, rating completeness handling, example-data quality, visual hierarchy, and product naming.

---

### 4. Design Issues Raised & Resolved

Several important design tensions were identified during specification and prototype development. All were resolved.

| Issue | Resolution |
|-------|------------|
| Risk of looking like a copy of SIRI | Completely removed maturity scoring. Made the starting point problems, not capabilities. Persistent (but non-intrusive) disclaimers reinforce the distinction. |
| Too many problems would dilute focus | Hard limit of 3 selectable problems. A dedicated modal explains *why* the limit exists (focus produces clearer, more actionable prioritisation). |
| Free-text input could produce poor or invented problems | AI (keyword classification in the prototype) restricted to mapping only onto the fixed list. Out-of-bound input triggers a “More problems coming soon” popup. |
| AI ranking would reduce transparency | Ranking kept fully rules-based. AI used only for classification. |
| Tool could feel too abstract | Concrete Impact/Effort ratings, visual matrix, and rationale linked back to the user’s original problems. |
| Need for credibility as a portfolio piece | Clear disclaimers, “How this works” section, SCOR Plan positioning, and professional tone throughout. |
| **Disclaimer too prominent / always visible** | Reduced to a small, subtle note on the landing page only. A short illustration disclaimer retained on the Results page. |
| **Selecting a 4th problem gave weak feedback** | Replaced simple alert with a dedicated modal that states the maximum and explains the reasoning. |
| **Results button disabled until all ratings complete** | Button is now always enabled. Incomplete ratings show red asterisks; clicking Results without completing all options displays a clear error message. |
| **“Try with an example” left some ratings blank** | Example data was expanded so every initiative that appears for the sample problems has both Impact and Effort pre-filled. |
| **Different problem selections produced almost the same initiatives** | Expanded from 11 → 20 problems and ~10 → 20 initiatives. Rewrote mappings so each problem has a focused primary set of 3–4 initiatives, reducing unwanted overlap while preserving legitimate multi-purpose initiatives. |
| **Long product name felt heavy** | Renamed to **P2I** with the description “A supply chain problem to initiative prioritiser”. |
| **Visual hierarchy and progress indication** | Progress steps converted to modern pills (active = blue, completed = green). “Start here” results receive a strong emerald left accent border. Rating cards slightly tightened. |

These decisions were treated as first-class design work rather than afterthoughts.

---

### 5. Feature Architecture

The application is organised around a short, guided flow:

1. **Landing** — Product name (P2I), clear purpose statement, subtle disclaimer, primary CTA, and “Try with an example”.
2. **Problem Identification** — Manual selection from the curated list of 20 problems **or** free-text description with classification. Maximum 3 problems. Sticky chips show the current selection.
3. **Initiative Mapping** — System shows only digital initiatives relevant to the selected problems (driven by the tightened mapping table).
4. **Impact & Effort Rating** — User rates each relevant initiative. Incomplete items are marked with red asterisks. Clear instructional text guides the user.
5. **Results** — Ranked list grouped into priority bands, Impact–Effort matrix, short rationales, illustration disclaimer, and one-click copy-summary.

Supporting elements include:

- Progress indicator (pill style) across steps  
- Sticky display of the selected problems while rating  
- Selection-limit modal with explanation  
- Out-of-scope free-text modal  
- Collapsible “How this works” methodology explanation  
- Disabled-state logic only where it improves clarity (Continue button on problem step still requires 1–3 selections)  
- Fully responsive layout  

---

### 6. The Prioritisation Logic

At the centre of the system is a transparent scoring method.

**Impact and Effort ratings**

| Rating | Impact Score | Effort Score |
|--------|--------------|--------------|
| High   | 3            | 1            |
| Medium | 2            | 2            |
| Low    | 1            | 3            |

**Priority Score** = Impact Score + Effort Score  

**Grouping**
- Score 5–6 → High Impact – Lower Effort (**Start here**)
- Score 4 → Medium priority
- Score ≤ 3 → Lower priority

The ranking is fully deterministic once the user has provided ratings. No hidden model sits between the user’s inputs and the final order. The Impact–Effort matrix provides an immediate visual complement to the ranked list.

---

### 7. Problem-to-Initiative Framework

**Curated Problem List (20 problems)**

1. Poor end-to-end supply chain visibility  
2. Long or unreliable lead times  
3. High inventory levels or poor inventory turns  
4. Weak supplier collaboration or responsiveness  
5. Slow response to demand changes  
6. Frequent production or logistics disruptions  
7. High cost-to-serve  
8. Limited ability to re-plan or prioritise quickly  
9. Poor coordination between production and logistics  
10. Lack of reliable data for decision making  
11. Inability to sense or react to supply risks early  
12. Inaccurate or siloed demand forecasts  
13. Excessive expediting and premium freight costs  
14. Low On-Time In-Full (OTIF) performance  
15. Poor warehouse / distribution centre productivity  
16. Limited multi-echelon network visibility  
17. Weak S&OP / IBP process maturity  
18. High scrap, obsolescence or write-offs  
19. Inability to run rapid what-if scenarios  
20. Fragmented systems and manual hand-offs  

**Digital Initiatives (20)**

- Supply Chain Control Tower  
- Advanced Planning & Scheduling (APS)  
- Multi-Echelon Inventory Optimisation  
- Supplier Collaboration Portal  
- AI Demand Sensing & Forecasting  
- Supply Chain Digital Twin  
- Predictive Risk Sensing Platform  
- Cost-to-Serve Analytics  
- Integrated Business Planning (IBP)  
- IoT Tracking & Condition Monitoring  
- Warehouse Management System (WMS) Upgrade  
- Transportation Management System (TMS)  
- S&OP Process & Tooling Enhancement  
- Network Design & Optimisation Tool  
- Master Data Management (MDM)  
- Automated Exception Management  
- Collaborative Forecasting Platform  
- Premium Freight Analytics & Control  
- OTIF Performance Management Suite  
- Process Mining for Supply Chain  

Each problem maps to a focused set of 3–4 highly relevant initiatives. Legitimate multi-purpose initiatives (e.g. Control Tower, Digital Twin) still appear where appropriate, but overall overlap was deliberately reduced so that different problem combinations produce visibly different shortlists.

---

### 8. Domain Grounding & SCOR Alignment

The tool is deliberately positioned inside the **Plan** process of the SCOR framework. It is a planning and prioritisation aid that helps decide which digital capabilities (often affecting Make, Source, and Deliver) should be pursued.

It draws conceptual inspiration from the prioritisation thinking present in Industry 4.0 frameworks such as SIRI, but it does not implement SIRI’s maturity model, building blocks, pillars, or dimensions.

All problem statements and initiative types are framed in language familiar to manufacturing supply chain professionals.

---

### 9. What Is Real vs. What Is Planned

| Element | Status |
|---------|--------|
| Problem-first concept and differentiation from SIRI | Fully defined and implemented |
| Curated problem list (20) and selection rules | Fully implemented |
| Impact / Effort scoring method | Fully implemented |
| Problem-to-initiative mapping (tightened) | Fully implemented |
| Free-text classification (keyword prototype of AI) | Fully implemented |
| Out-of-bound free-text handling | Fully implemented |
| Quality-of-life and professionalism features | Fully implemented |
| Working interactive prototype (single-page web app) | Complete |
| Product naming (P2I) and polished visual design | Complete |
| Detailed PRD (Version 3.2) | Complete |
| Production deployment / Lovable hosting | Optional next step |
| User testing with supply chain practitioners | Future |
| Expanded AI classification (true LLM) | Future |

---

### 10. Deliberate Scope Exclusions

The following were consciously left out of the current version:

- Any form of digital maturity scoring  
- Full SIRI-style assessment across 16 dimensions  
- Benchmarking against other companies  
- Non-manufacturing industries  
- User accounts or saved assessments  
- AI-generated final rankings or long-form recommendations  
- Complex multi-criteria scoring beyond Impact and Effort  
- Production-dependency and substitutability factors (recognised as real but deferred)  
- Backend / database / authentication  

These exclusions keep the tool focused and honest about its current boundaries.

---

### 11. Design Verification Approach

Verification combined specification review with live prototype testing:

- Repeated stress-testing of the differentiation from SIRI until the distinction was unambiguous.  
- Review of the problem list for coverage versus cognitive load; expansion from 11 → 20 when overlap became obvious in testing.  
- Explicit definition of failure modes (especially out-of-bound free-text and incomplete ratings).  
- Walkthrough of the full user flow for clarity and completion time (target ≤ 7 minutes).  
- Confirmation that every ranking decision remains explainable without reference to a black-box model.  
- Iterative UI testing of disclaimer prominence, selection limits, rating completeness feedback, and example-data quality.  

---

### 12. Current State Summary

A complete, interactive prototype now exists. It contains:

- Clear product identity (**P2I** — A supply chain problem to initiative prioritiser)  
- Problem-first concept and sharp differentiation from official SIRI  
- 20 curated problems and 20 digital initiatives with tightened mappings  
- Transparent Impact + Effort prioritisation logic  
- Full guided user flow with progress indication  
- Free-text classification and out-of-scope handling  
- Polished quality-of-life features (sticky chips, example mode, matrix, copy summary, completeness feedback)  
- Professional tone and appropriate disclaimers  

The project has moved from specification into a working demonstration that can be opened in any modern browser and walked through end-to-end in a few minutes.

---

### 13. Future Roadmap

**Near-term**
- Optional hosting / packaging for easier sharing  
- Light user testing with supply chain practitioners  
- Refine free-text classification quality (stronger keyword rules or true LLM classification when available)

**Medium-term**
- Expand or refine the problem list based on feedback  
- Add short explanatory text for top-ranked initiatives  
- PDF / export of results  
- Ability to save or share a prioritisation session

**Longer-term**
- Optional industry-specific initiative variations  
- Consideration of production-dependency and substitutability factors  
- Possibility of light calibration if real outcome data ever becomes available  

---

### 14. Conclusion

This project began as an attempt to create a SIRI-related portfolio piece and matured into something more useful: a focused, problem-driven prioritisation aid for manufacturing supply chains.

By refusing to copy the surface form of a maturity assessment and instead building around the practical question of “which initiatives should we prioritise given our current problems,” the tool occupies a distinct and defensible position.

Development progressed from concept and PRD through a full working prototype. Along the way, coverage was expanded (20 problems, 20 initiatives), mappings were tightened so that problem selection meaningfully changes the initiative shortlist, and multiple usability issues (disclaimer prominence, selection limits, rating completeness, example data quality, visual hierarchy, and product naming) were identified and resolved.

The design emphasises transparency, limited scope, and clear communication of what the tool is — and what it is not. That discipline is intentional. It makes the project both more credible as a portfolio piece and more honest as a decision-support concept.

**Current deliverable:** A complete interactive prototype named **P2I**.

---

*End of Project Development Report*
