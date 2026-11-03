# Day One — Interactive UX Visual Report

An interactive UX case study for **INFO90009 User Experience Design Project** (2026 Semester 2), Faculty of Engineering and Information Technology, The University of Melbourne.

**Day One — Supporting International Students' Adaptation in Melbourne.**
Research question: *How might we help international students find useful information, understand everyday situations, and feel more confident exploring Melbourne?*

Authors: Yue Wang, Yao Chen.

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

## Deploy to GitHub Pages

The repository includes `.github/workflows/deploy.yml`, which builds and publishes the site on every push to `main`.

One-time setup on GitHub:

1. Open the repository → **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).

The site is published at `https://ryanwang688.github.io/DayOne_VisualReport/`.
`vite.config.ts` uses a relative `base: './'`, so the build also works from any sub-path.

## Editing content

All academic content lives in `src/content/` — no component code needs to change.

| File | What it controls |
| --- | --- |
| `sections.ts` | Report structure: section order, numbering, parts, each chapter's guiding question and one-line takeaway |
| `meta.ts` | Title block: degree, faculty, supervisor, authors, date, video link, prototype link |
| `process.ts` | Project Overview process timeline stages (front matter, before Part I) |
| `literature.ts` | 01 Literature Review insights and citations |
| `study.ts` | 02 Study Design facts, steps and ethics |
| `affinity.ts` | 02 Affinity map — the coding table, verbatim (cluster, participant, codes) |
| `challenges.ts` | 03 Challenges — four themes, sub-findings, quotes, scenarios, implications |
| `hmw.ts` | 04 HMW — the question (single source, also used by the hero) and how each theme T1–T4 leads to a phrase in it |
| `abstract.ts` | Abstract (front matter, ~100 words) and its draft/approved status |
| `outcome.ts` | 05 Design Concept: finding → opportunity → feature map; live-build prototype screens |
| `iteration.ts` | 06 Iteration: Low-fi sketches, wireframe and initial hi-fi screen groups, the driver licence trace |
| `evaluation.ts` | 07 Evaluation: method, eight usability problems, before/after refinements |
| `conclusions.ts` | 08 Conclusions, limitations, implications, future work |
| `references.ts` | APA reference list (in-text citations link here) |
| `appendix.ts` | Interview questions, journey map, acknowledgements |

**Placeholders.** Any value written as `placeholder('…')` renders as a dashed yellow placeholder tag. Replace it with a plain string once confirmed, e.g.

```ts
supervisor: 'Dr Jane Citizen',
```

**Abstract.** Set `status: 'approved'` in `abstract.ts` to remove the draft label.

**Student IDs** are stored in `meta.ts` but hidden on the public site. Set `showStudentIds: true` to show them in the title block.

## Project structure

```
public/assets/
  brand/       Day One wordmark (transparent PNG) and favicon
  poster/      A0 poster and the poster's prototype-screen montage
  prototype/   Screens captured from the Day One prototype
  iteration/   Low-fi, wireframe, initial hi-fi and before/after screens (web JPGs of the team's design files)
src/
  content/     Editable content (see table above)
  components/  Nav, AffinityBoard + ClusterViewer, shared UI (Reveal, Expandable, Cite, Ph…)
  hooks/       Active section / active step observers
  sections/    One component per report section
```

## Tech

React 19 · Vite · TypeScript · Tailwind CSS 4 · Motion for React · Lucide React.

## Accessibility & motion

- Skip link, landmark sections, keyboard-operable menus, filters and disclosures (`aria-expanded`, `aria-pressed`, `aria-current`).
- Visible focus rings; affinity notes are focusable and show related notes on focus as well as hover.
- `prefers-reduced-motion` is respected: Motion runs with `reducedMotion="user"`, the affinity board starts already grouped, the HMW scroll sequence becomes a static composition, and CSS animations stop.

## Content integrity

Every claim, quote, statistic and reference comes from the team's field report, coding table, A0 poster or usability evaluation deck. Quotes are the team's English translation of interviews conducted in Chinese. Missing information is shown as labelled placeholders. See `CONTENT_CHECKLIST.md` and `PROJECT_STATUS.md`.

Photos visible inside prototype screenshots keep their original rights; credits are listed in the prototype's `PHOTO-CREDITS.html`.
