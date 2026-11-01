export type ProcessStage = {
  key: string
  title: string
  verb: string
  summary: string
  outputs: string[]
  details: string[]
  /** Evidence shown in the sticky panel while this stage is active. */
  evidence: { value: string; label: string }[]
  /** Optional real quote or finding line that anchors the stage. */
  anchor?: { text: string; by: string }
  /** Image under public/assets, or a diagram key rendered in code. */
  visual: { kind: 'image'; src: string; alt: string; caption: string } | { kind: 'diagram'; name: 'interviews' | 'affinity' | 'features' }
  source: string
}

export const processStages: ProcessStage[] = [
  {
    key: 'research',
    title: 'Research',
    verb: 'Listen',
    summary: 'A literature review on international student adaptation, followed by semi-structured interviews with eight international students.',
    outputs: ['Literature review · 12 sources', '8 interviews · 11 core questions'],
    details: [
      'Interviews covered four stages: before arrival, first arrival, settling in, and daily life after some time.',
      'Interviews lasted 20–30 minutes, in person or on Zoom, in Chinese, with consent.',
    ],
    visual: { kind: 'diagram', name: 'interviews' },
    source: 'Field report — Method',
    evidence: [
      { value: '12', label: 'academic sources reviewed' },
      { value: '8', label: 'semi-structured interviews' },
      { value: '3', label: 'countries of origin' },
    ],
    anchor: { text: 'Having information does not mean that students know how to act with this information.', by: 'Field report — Introduction' },
  },
  {
    key: 'define',
    title: 'Define',
    verb: 'Make sense',
    summary: 'Codes became sticky notes in Figma, grouped into ten clusters and synthesised into four themes, a journey map and our HMW question.',
    outputs: ['10 affinity clusters', '4 research themes', 'Customer journey map', 'HMW question'],
    details: [
      'Yue coded P1–P4 and Yao coded P5–P8; clusters were agreed through discussion.',
      'The journey map follows students from before arrival, through first days, facing a problem and trial and error, to adapting.',
    ],
    visual: { kind: 'diagram', name: 'affinity' },
    source: 'Field report — Method; A0 poster',
    evidence: [
      { value: '142', label: 'coded observations' },
      { value: '10', label: 'affinity clusters' },
      { value: '4', label: 'research themes' },
    ],
    anchor: { text: 'real experiences had a greater impact', by: 'P8, translated' },
  },
  {
    key: 'ideate',
    title: 'Ideate',
    verb: 'Explore',
    summary: 'Six core feature concepts to help students explore, practise and navigate real life in Melbourne.',
    outputs: ['Interactive simulation', 'Explore mode', 'AR context tool', 'Step-by-step guide', 'Personalised checklist', 'Help & resources'],
    details: ['Concepts were organised around a simple flow: choose a scenario → explore or simulate → follow step-by-step guidance → build real-world confidence.'],
    visual: { kind: 'diagram', name: 'features' },
    source: 'A0 poster — Design Features, User Experience Flow',
    evidence: [
      { value: '6', label: 'feature concepts' },
      { value: '4', label: 'steps in the experience flow' },
    ],
    anchor: { text: 'Choose a scenario → explore or simulate → follow step-by-step guidance → build real-world confidence.', by: 'User experience flow' },
  },
  {
    key: 'prototype',
    title: 'Prototype',
    verb: 'Make',
    summary: 'A clickable mobile web prototype: Journey Tree guides, Short Trip exploration, scenario simulations, AR Lens and Ask This Place.',
    outputs: ['Mobile web app', 'Journey Tree (e.g. Healthcare)', 'Short Trip', 'AR Lens · Ask This Place'],
    details: [
      'The prototype has no back end. AR Lens and Ask This Place use sample photos and preset dialogue.',
      'Screens in this report are captured from the current prototype build.',
    ],
    visual: { kind: 'image', src: 'assets/poster/poster-screens.jpg', alt: 'Five Day One prototype screens: Journey Tree, a hook-turn scenario, the Explore neighbourhood map, AR Lens on a myki reader, and the Tools hub', caption: 'Prototype screens as presented on the A0 poster.' },
    source: 'A0 poster; prototype README',
    evidence: [
      { value: '4', label: 'features tested: Short Trip, Healthcare, AR Lens, Ask This Place' },
      { value: '6', label: 'Journey Tree topics, from healthcare to housing' },
    ],
    anchor: { text: 'Explore. Practice. Feel at home.', by: 'Day One' },
  },
  {
    key: 'evaluate',
    title: 'Evaluate',
    verb: 'Test',
    summary: 'A formative usability round with six students using think-aloud and short interviews, focused on four features.',
    outputs: ['6 participants · 20–40 min', '4 usability problems (U1–U4)', '3 recommendations (R1–R3)'],
    details: [
      'Short Trip was walked through together; the Healthcare guide was completed independently; AR Lens and Ask This Place were demonstrated.',
      'Data: audio recordings, transcribed and sorted by task. Severity rated on Nielsen’s 0–4 scale.',
    ],
    visual: { kind: 'image', src: 'assets/prototype/healthcare-journey.jpg', alt: 'Day One Healthcare Journey screen, step 1 “Choose the Right Care”', caption: 'Healthcare Journey — the feature all six participants found most useful.' },
    source: 'Usability evaluation deck (Oct 2026)',
    evidence: [
      { value: '6/6', label: 'found the healthcare guide most useful' },
      { value: '5/6', label: 'said there was too much text' },
      { value: '3', label: 'recommendations for the next iteration' },
    ],
    anchor: { text: 'The healthcare guide works best. Short Trip and the tools need the most work.', by: 'Evaluation conclusion' },
  },
]
