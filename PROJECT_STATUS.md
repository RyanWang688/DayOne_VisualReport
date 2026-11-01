# Project Status

_Last updated: 2 Nov 2026_

## Build

| Check | Result |
| --- | --- |
| `npm run build` (tsc + vite) | Passing, no type errors |
| Browser console | No errors |
| Desktop 1440 × 900 | All sections checked |
| Mobile 375 × 812 | No horizontal overflow; menu, filters and anchors work |
| GitHub Pages workflow | `.github/workflows/deploy.yml` — CI build passes; deploy waits on **Settings → Pages → Source: GitHub Actions** |

## Sections

| # | Section | Status | Source material |
| --- | --- | --- | --- |
| 00 | Overview + title block | Done — 4 title-block fields are placeholders | Field report cover, A0 poster |
| 01 | Research Process (interactive timeline) | Done | Field report Method, A0 poster, evaluation deck |
| 02 | Literature Review | Done — 3 major insights + 2 context blocks, 12 references | Field report Literature Review |
| 03 | Study Design + affinity map | Done — 142 coded notes, 10 clusters, P1–P8 | Field report Method/Ethics, coding table |
| 04 | Challenges (4 themes) | Done — sub-findings, 7 translated quotes, scenarios, implications | Field report Findings |
| 05 | HMW | Done | Research question |
| 06 | Abstract | **Draft** — 96-word condensed version, awaiting approval | Field report Abstract |
| 07 | Outcome | Done — finding → opportunity → feature map, prototype screens, usability results | Field report Conclusion, A0 poster, evaluation deck |
| 08 | Conclusions | Done | Field report Discussion & Conclusion |
| R | References | Done — 12 APA entries with DOIs | Field report References |
| A | Appendices | Interview questions, poster, research-data link (placeholder), acknowledgements (placeholder) | Field report Appendix |

## Interactions

- Scroll progress bar, active-section indicator (header + desktop side rail), mobile section menu
- Research Process: sticky stage index, scroll-filled progress line, active stage highlight, expandable details
- Affinity map: filter by cluster, trace a participant, hover/focus to highlight related notes, expand clusters; stacked fallback on mobile
- Challenges: sticky theme index, expandable evidence with participant badges
- HMW: scroll-driven word reveal, background transition, animated emphasis on key words
- Outcome: hover a row to trace finding → opportunity → feature
- Reduced motion respected throughout

## Open items

See `CONTENT_CHECKLIST.md` for the items the team still needs to supply or confirm.
