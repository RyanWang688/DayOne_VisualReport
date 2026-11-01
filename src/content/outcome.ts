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

/** Formative usability evaluation — from the team's evaluation deck. */
export const evaluation = {
  label: 'Formative usability evaluation',
  method: '6 students · 20–40 min sessions · think-aloud with short interviews · clickable prototype with no back end',
  questions: [
    { id: 'RQ1', feature: 'Short Trip', q: 'Do new students understand the walking routes, and would they use them instead of Google Maps?' },
    { id: 'RQ2', feature: 'Healthcare Journey', q: 'Does the step-by-step guide help someone who has never seen a GP know what to do?' },
    { id: 'RQ3', feature: 'AR Lens & Ask This Place', q: 'Do these tools give the right information, and are they easy to find when needed?' },
  ],
  findings: [
    { fraction: '6/6', title: 'The healthcare guide was the most useful part', text: 'Everyone said it explained the GP process clearly. Several trusted it more than asking a chatbot.' },
    { fraction: '5/6', title: 'There is too much text to read', text: 'Most wanted steps shorter, easier to skim, or shown as video.' },
    { fraction: '4/5', title: 'People want to choose their own stops', text: 'Short Trip was easy to follow, but a fixed route felt like a detour.' },
    { fraction: '4/6', title: 'On-site tools are useful but hard to reach', text: 'People liked scanning signs and machines, but wanted it one tap away from the map.' },
  ],
  fractionNote: 'Fractions show how many of the participants who tested that feature said this. One participant did not test Short Trip.',
  problems: [
    { id: 'U1', severity: 'High', text: 'Short Trip gives one fixed route; stops cannot be added, removed or changed.', who: '4 of 5' },
    { id: 'U2', severity: 'Medium', text: 'Healthcare steps are long and must be read in order.', who: '6 of 6' },
    { id: 'U3', severity: 'High', text: 'AR Lens and Ask This Place are hidden in the Tools tab.', who: '4 of 6' },
    { id: 'U4', severity: 'Medium', text: 'Ask This Place guesses the location and it cannot be changed.', who: '2 of 6' },
  ],
  recommendations: [
    { id: 'R1', from: 'U1', priority: 'High', text: 'Let people build their own route on the map.' },
    { id: 'R2', from: 'U2', priority: 'High', text: 'Show the key points first; let people jump between steps.' },
    { id: 'R3', from: 'U3, U4', priority: 'Medium', text: 'Put the tools where people need them — on the map screen.' },
  ],
  limitations: [
    'All six participants speak Chinese, and most had lived in Melbourne for over a year.',
    'The prototype had no back end, so some features were explained rather than used.',
    'Task time and success rate were not measured.',
  ],
  nextRound: [
    'Test with 6–8 students who arrived in the last 3 months.',
    'Compare the new designs with the current ones.',
    'Measure task time, success rate and SUS score.',
    'Test on site at a tram stop and a clinic.',
  ],
}

/** Real screens from the current prototype build (captured 2 Nov 2026). */
export const prototypeScreens = [
  { src: 'assets/prototype/home.jpg', title: 'Home', caption: 'Tools, Short Trip and small discoveries.' },
  { src: 'assets/prototype/healthcare-journey.jpg', title: 'Journey Tree · Healthcare', caption: 'Your first GP visit, step by step.' },
  { src: 'assets/prototype/short-trip-builder.jpg', title: 'Build your short trip', caption: 'Drag places onto the route within the time available.' },
  { src: 'assets/prototype/explore-stop.jpg', title: 'Explore · a stop', caption: 'Why explore here, and what to try first.' },
  { src: 'assets/prototype/place-guide.jpg', title: 'A little discovery', caption: 'A first, manageable taste of local life.' },
]
