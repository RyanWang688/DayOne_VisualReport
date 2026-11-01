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

| # | Section | Status | Source material |
| --- | --- | --- | --- |
| 00 | Overview + title block | Done — 4 title-block fields are placeholders | Field report cover, A0 poster |
| 01 | Research Process (interactive timeline) | Done | Field report Method, A0 poster, evaluation deck |
| 02 | Literature Review | Done — 3 major insights + 2 context blocks, 12 references | Field report Literature Review |
| 03 | Study Design + affinity map | Done — 142 coded notes, 10 clusters, P1–P8; study level 2 Foundation/Diploma · 2 Bachelor’s · 4 Master’s; countries shown as flags only | Field report Method/Ethics, coding table, team confirmation |
| 04 | Challenges (4 themes) | Done — sub-findings, 7 translated quotes, scenarios, implications | Field report Findings |
| 05 | HMW | Done | Research question |
| 06 | Abstract | **Draft** — 96-word condensed version, awaiting approval | Field report Abstract |
| 07 | Outcome | Done — finding → opportunity → feature map, prototype screens, usability results | Field report Conclusion, A0 poster, evaluation deck |
| 08 | Conclusions | Done | Field report Discussion & Conclusion |
| R | References | Done — 12 APA entries with DOIs | Field report References |
| A | Appendices | Interview questions, poster, research-data link (placeholder), acknowledgements (placeholder) | Field report Appendix |

## Interactions

- Scroll progress bar, active-section indicator (header + desktop side rail), mobile section menu
- Hero composition: pointer parallax and a gentle scroll drift
- Research Process: sticky stage index, scroll-filled progress line, active stage highlight; a sticky evidence panel (key numbers + quote) changes with the active stage; inactive stage cards recede
- Literature: diagrams draw progressively on view (loop, gap line, uneven bars)
- Affinity board: 142 sticky notes auto-play pile → scatter → grouped; notes take their theme colour as they settle; one replay icon. Side panel (sticky on desktop): select a theme, filter by participant, expand participant evidence; “Open as pin board” viewer (← → between themes, Esc to close)
- Challenges: sticky theme index, active theme number lights up, expandable evidence with participant badges, bridge into HMW
- HMW: scroll scene connecting T1–T4 to the keywords of the question (information, use, real-life situations, help), then the full question resolves; static version under reduced motion
- Micro-interactions: consistent button press feedback, card lift, growing link underline, phone-frame hover
- Outcome: hover a row to trace finding → opportunity → feature
- Reduced motion respected throughout

## Open items

See `CONTENT_CHECKLIST.md` for the items the team still needs to supply or confirm.
