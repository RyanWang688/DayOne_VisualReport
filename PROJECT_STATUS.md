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
| 01 | Research Process (interactive timeline) | I | Done | Field report Method, A0 poster, evaluation deck |
| 02 | Literature Review | I | Done — 3 major insights + 2 context blocks, 12 references | Field report Literature Review |
| 03 | Study Design + affinity map (3.1, 3.2) | I | Done — 142 coded notes, 10 clusters, P1–P8; 2 Foundation/Diploma · 2 Bachelor’s · 4 Master’s; countries as flags | Field report Method/Ethics, coding table, team confirmation |
| 04 | Challenges (4 themes) | I | Done — sub-findings, 7 translated quotes, scenarios, implications | Field report Findings |
| 05 | HMW | II | Done | Research question |
| 06 | Outcome (6.1–6.3) | II | Done — finding → opportunity → feature map, prototype screens, usability results | Field report Conclusion, A0 poster, evaluation deck |
| 07 | Conclusions | II | Done | Field report Discussion & Conclusion |
| — | References | Back | Done — 12 APA entries with DOIs | Field report References |
| — | Appendices | Back | Interview questions, poster, research-data link (placeholder), acknowledgements (placeholder) | Field report Appendix |

## Interactions

- Scroll progress bar, active-section indicator (header + desktop side rail grouped by part), mobile section menu grouped by part
- Readability: 12px minimum for labels, faint grey darkened to ≥4.5:1 contrast, abstract set in the body face
- Hero composition: pointer parallax and a gentle scroll drift
- Research Process: sticky stage index, scroll-filled progress line, active stage highlight; a sticky evidence panel (key numbers + quote) changes with the active stage; inactive stage cards recede
- Literature: diagrams draw progressively on view (loop, gap line, uneven bars)
- Affinity board: 142 sticky notes auto-play pile → scatter → grouped; notes take their theme colour as they settle; one replay icon. Side panel (sticky on desktop): select a theme, filter by participant, expand participant evidence; “Open as pin board” viewer (← → between themes, Esc to close)
- Challenges: sticky theme index, active theme number lights up, expandable evidence with participant badges, bridge into HMW
- HMW: spring-smoothed scroll scene; each theme T1–T4 lights its phrase of the question word by word with a sweeping underline while its card's progress bar fills; then the full question resolves; static version under reduced motion
- Micro-interactions: consistent button press feedback, card lift, growing link underline, phone-frame hover
- Outcome: hover a row to trace finding → opportunity → feature
- Reduced motion respected throughout

## Open items

See `CONTENT_CHECKLIST.md` for the items the team still needs to supply or confirm.
