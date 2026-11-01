# Content Checklist

Use this list to finish and verify the report. Edit values in `src/content/` (see README).

## Still needed from the team

- [ ] **Degree name** for the title block — `meta.ts → degree`
- [ ] **Supervisor** — `meta.ts → supervisor`
- [ ] **Submission date** — `meta.ts → date`
- [ ] **Video link** — `meta.ts → videoUrl`
- [ ] **Prototype URL** (optional) — `meta.ts → prototypeUrl`
- [ ] **Research Data and Code link** (consent templates, transcripts) — `meta.ts → researchDataUrl`
- [ ] **Approve the ~100-word abstract** (currently 96 words, condensed from the 148-word field report abstract) — then set `abstract.ts → status: 'approved'`
- [ ] **Acknowledgements** (optional) — `appendix.ts → acknowledgements`
- [ ] Decide whether **student IDs** should appear publicly — `meta.ts → showStudentIds` (currently hidden)

## Please confirm

- [x] **Participant level split.** Confirmed by the team: 2 Foundation/Diploma, 2 Bachelor’s, 4 Master’s (matches the A0 poster). The field report text still says “4 undergraduates and 4 postgraduate students” — update the report if it should match.
- [ ] **HMW design reasoning** (`hmw.ts`): which theme leads to which keyword (T1 → information, T2 → use, T3 → real-life situations, T4 → help) is our synthesis. Check the wording.
- [ ] **Design opportunity wording** in 06 Outcome (`outcome.ts`). Findings come from the report and features from the poster; the opportunity column is our design interpretation linking them.
- [ ] **Everyday scenarios** in 04 Challenges are short narrative retellings of participants' reported experiences (P5, P8, P3, P2), labelled with the participant. Check the wording.
- [ ] **Usability evaluation** results come from the evaluation deck (6 participants). The deck does not say whether these were the same people as interview P1–P8, so evaluation participant IDs are not shown.
- [ ] **Section takeaways** in `sections.ts` (one line per section, shown in the part openers) are our summaries. Check the wording.

## Content sources used

| Source | Used in |
| --- | --- |
| Field report (“A Field Report on International Students Settling into Melbourne”) | Title block, abstract, literature, study design, challenges, conclusions, references, appendix |
| Coding table (10 themes × P1–P8) | Affinity map — reproduced verbatim |
| A0 poster | Brand, journey map, six design features, prototype screen montage, poster in appendix |
| Usability evaluation deck (Oct 2026) | Evaluate stage, 06 Outcome evaluation results, limitations and next round |
| Day One prototype (current build) | Five screenshots captured 2 Nov 2026 |

## Integrity rules followed

- [x] Quotes are only those in the field report, marked as the team's translation, with participant IDs
- [x] No invented statistics; every number traces to the report, coding table or evaluation deck
- [x] All 12 references copied from the report, with DOIs; every in-text citation links to its entry
- [x] Literature diagrams are labelled as conceptual, not data
- [x] Journey-map statements are labelled as journey-map voice, not participant quotes
- [x] Missing information is shown as labelled placeholders
