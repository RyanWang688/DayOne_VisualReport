/**
 * Research finding → design opportunity → proposed feature.
 * Findings come from the field report; features are the six Day One features on the A0 poster.
 * The "opportunity" column is the team's design interpretation linking the two.
 */
export type OutcomeRow = {
  finding: string
  findingNum: string
  opportunity: string
  features: { name: string; how: string }[]
}

export const outcomeSummary =
  'Support for international students should not stop at providing information. It should help students apply information in real situations and build practical experience over time. Day One translates this into features for exploring, practising and acting in context.'

export const outcomeMap: OutcomeRow[] = [
  {
    findingNum: '01',
    finding: 'Pre-arrival information is fragmented and hard to verify.',
    opportunity: 'Offer current, Melbourne-specific guidance that links to official services.',
    features: [
      { name: 'Help & Resources', how: 'Common questions, verified information, links to official services.' },
      { name: 'Explore Mode', how: 'Nearby places, student-recommended spots and useful tips in context.' },
    ],
  },
  {
    findingNum: '02',
    finding: 'Knowing information is not the same as knowing what to do.',
    opportunity: 'Let students rehearse unfamiliar procedures and unwritten rules before facing them.',
    features: [
      { name: 'Interactive Simulation', how: 'Realistic scenarios with step-by-step choices, e.g. a hook-turn intersection.' },
      { name: 'Step-by-step Guide', how: 'Clear, localised instructions with visual support, e.g. the Healthcare Journey to a first GP visit.' },
    ],
  },
  {
    findingNum: '03',
    finding: 'Practical experience builds confidence.',
    opportunity: 'Make the first real-world attempts small, safe and supported at the moment of need.',
    features: [
      { name: 'Explore Mode · Short Trip', how: 'Short, curated walks to real places near campus.' },
      { name: 'AR Context Tool', how: 'Scan a real sign or machine, get an instant explanation and a matching tutorial.' },
    ],
  },
  {
    findingNum: '04',
    finding: 'Independence does not mean feeling fully settled.',
    opportunity: 'Support progress over time, across different areas of life.',
    features: [{ name: 'Personalised Checklist', how: 'Track essential tasks, customise to individual needs, build confidence progressively.' }],
  },
]

/** Real screens from the current prototype build (captured 2 Nov 2026). */
export const prototypeScreens = [
  { src: 'assets/prototype/home.jpg', title: 'Home', caption: 'Tools, Short Trip and small discoveries.' },
  { src: 'assets/prototype/healthcare-journey.jpg', title: 'Journey Tree · Healthcare', caption: 'Your first GP visit, step by step.' },
  { src: 'assets/prototype/short-trip-builder.jpg', title: 'Build your short trip', caption: 'Drag places onto the route within the time available.' },
  { src: 'assets/prototype/explore-stop.jpg', title: 'Explore · a stop', caption: 'Why explore here, and what to try first.' },
  { src: 'assets/prototype/place-guide.jpg', title: 'A little discovery', caption: 'A first, manageable taste of local life.' },
]
