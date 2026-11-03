# Project Status

_Last updated: 2 Nov 2026_

## Build

| Check | Result |
| --- | --- |
| `npm run build` (tsc + vite) | Passing, no type errors |
| Browser console | No errors |
| Desktop 1440 × 900 | All sections checked |
| Mobile 375 × 812 | No horizontal overflow; menu, filters and anchors work |
| GitHub Pages workflow | `.github/workflows/deploy.yml` — live at https://ryanwang688.github.io/DayOne_VisualReport/ |

## Sections

Reading order (set in `src/content/sections.ts`): front matter → Part I · Research → Part II · Design → back matter. Each part opens with a divider listing its sections and takeaways.

| # | Section | Part | Status | Source material |
| --- | --- | --- | --- | --- |
| 00 | Overview + title block | Front | Done — all title-block fields filled (submission date 5 November 2026). “Watch the video” plays in an in-page YouTube player | Field report cover, A0 poster, team |
| — | Abstract | Front | **Draft** — 96-word condensed version, awaiting approval | Field report Abstract |
| — | Project context + “How this report reads” map | Front | Done | — |
| — | Project Overview (interactive process timeline) — sits just before Part I | Front | Done | Field report Method, A0 poster, usability evaluation report |
| 01 | Literature Review | I | Done — 3 major insights + 2 context blocks, 12 references | Field report Literature Review |
| 02 | Study Design + affinity map (2.1, 2.2) | I | Done — 142 coded notes, 10 clusters, P1–P8; 2 Foundation/Diploma · 2 Bachelor’s · 4 Master’s; countries as flags | Field report Method/Ethics, coding table, team confirmation |
| 03 | Challenges (4 themes) | I | Done — sub-findings, 7 translated quotes, scenarios, implications | Field report Findings |
| 04 | HMW | II | Done | Research question |
| 05 | Design Concept (5.1) | II | Done — finding → opportunity → feature map | Field report Conclusion, A0 poster |
| 06 | Iteration (6.1) | II | Done — opening panel traces the driver licence journey Low-fi → Wireframe → Initial hi-fi; 6.1 fidelity explorer (2 sketch sheets, 16 wireframes, 22 initial hi-fi screens); each initial hi-fi feature names the interview challenge (T1–T4) it was designed for | Team design archives |
| 07 | Evaluation (7.1–7.4) | II | Done — method, 8 problems (2 High · 6 Medium), 6 before/after refinements, embedded live prototype | Usability Evaluation Report; Evaluation Comparison archive |
| 08 | Conclusions | II | Done | Field report Discussion & Conclusion |
| — | References | Back | Done — 12 APA entries with DOIs | Field report References |
| — | Appendices | Back | Interview questions (A1), A0 poster (A2) | Field report Appendix |

## Interactions

- Story line: every chapter opens with a prominent header — large chapter number, part and name on a rule that draws itself in, the guiding question, then a measured headline; part openers list each chapter's question. Subsections share one heading pattern ("N.N · Label" + headline + lead)
- Wayfinding: header breadcrumb (part / chapter) plus a segmented chapter-progress bar (one segment per section, grouped by part; the current one fills as you read, hover for its name); Contents sheet available on every screen size, highlighting the current chapter
- Type scale: display headings reduced (section titles max 2.4rem, sub-headings ~1.85rem, hero wordmark 7rem) so headlines no longer dominate the reading flow
- Readability: 12px minimum for labels, faint grey darkened to ≥4.5:1 contrast, abstract set in the body face
- Hero composition: pointer parallax and a gentle scroll drift
- Project Overview: sticky stage index, scroll-filled progress line, active stage highlight; a sticky evidence panel (key numbers + quote) changes with the active stage; inactive stage cards recede
- Literature: diagrams draw progressively on view (loop, gap line, uneven bars)
- Affinity board: 142 sticky notes auto-play pile → scatter → grouped; notes take their theme colour as they settle; one replay icon. Side panel (sticky on desktop): select a theme, filter by participant, expand participant evidence; “Open as pin board” viewer (← → between themes, Esc to close)
- Challenges: sticky theme index, active theme number lights up, expandable evidence with participant badges, bridge into HMW
- HMW: spring-smoothed scroll scene; each theme T1–T4 lights its phrase of the question word by word with a sweeping underline while its card's progress bar fills; then the full question resolves; static version under reduced motion
- Micro-interactions: consistent button press feedback, card lift, growing link underline, phone-frame hover
- Design Concept: hover a row to trace finding → opportunity → feature
- Iteration: the three fidelities of one journey arrive in sequence as a connector line draws; fidelity explorer tabs (arrow-key navigable) with feature chips; each feature's screens run in a single-row auto-playing carousel that pauses on hover or focus, can be dragged, lifts the hovered screen with a spring, tilts it gently towards the pointer with a soft light sheen, and steps the neighbours back, and opens a full-screen viewer (← → Esc); with reduced motion the row is static and wraps
- Evaluation: severity bar fills on view; selecting a problem expands its evidence, draws an n/6 participant ring and moves a highlight box onto the relevant region of the tested screen; before/after slider sweeps once on first view, then drag, ← → or Before/After buttons; the frame ring, divider and labels shift from red (tested) to green (refined), and the problem/solution columns brighten with the slider
- Try Day One (7.4): the deployed prototype runs inside a phone frame, loaded on demand; tabs pick a feature and the prototype's `?demo=` mode (`demo-mode.js` in the day-one-mobile repo) keeps the visitor inside it; the right column explains the feature, what to try and which evaluation problem it answers
- Feature order is the same everywhere: Home → Short Trip → Journey Tree → AR Lens → Ask This Place
- Reduced motion respected throughout

## Open items

See `CONTENT_CHECKLIST.md` for the items the team still needs to supply or confirm.

- Horizontal scrollers replaced by wrapping grids and tab rows; only the sticky theme index in 03 Challenges still swipes, with its scrollbar hidden
- In-page source notes and caveats that cited the team's own materials (field report, poster, evaluation report, design files, coding table) were removed at the team's request; provenance stays in this file and CONTENT_CHECKLIST.md
