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
    summary: 'A literature review, then interviews with eight international students.',
    outputs: ['Literature review · 12 sources', '8 interviews · 11 core questions'],
    details: [
      'Interviews covered four stages: before arrival, first arrival, settling in, and daily life after some time.',
      'Interviews lasted 20–30 minutes, in person or on Zoom, in Chinese, with consent.',
    ],
    visual: { kind: 'diagram', name: 'interviews' },
    source: 'Field report — Method',
    evidence: [
      { value: '12', label: 'sources reviewed' },
      { value: '8', label: 'interviews' },
      { value: '3', label: 'countries' },
    ],
    anchor: { text: 'Having information does not mean that students know how to act with this information.', by: 'Field report — Introduction' },
  },
  {
    key: 'define',
    title: 'Define',
    verb: 'Make sense',
    summary: 'Interview codes became sticky notes, then clusters, then four themes and our HMW question.',
    outputs: ['10 affinity clusters', '4 research themes', 'Customer journey map', 'HMW question'],
    details: [
      'Yue coded P1–P4 and Yao coded P5–P8; clusters were agreed through discussion.',
      'The journey map follows students from before arrival, through first days, facing a problem and trial and error, to adapting.',
    ],
    visual: { kind: 'diagram', name: 'affinity' },
    source: 'Field report — Method; A0 poster',
    evidence: [
      { value: '142', label: 'codes' },
      { value: '10', label: 'clusters' },
      { value: '4', label: 'themes' },
    ],
    anchor: { text: 'real experiences had a greater impact', by: 'P8, translated' },
  },
  {
    key: 'ideate',
    title: 'Ideate',
    verb: 'Explore',
    summary: 'Six feature concepts to help students explore, practise and act in real life.',
    outputs: ['Interactive simulation', 'Explore mode', 'AR context tool', 'Step-by-step guide', 'Personalised checklist', 'Help & resources'],
    details: ['Concepts were organised around a simple flow: choose a scenario → explore or simulate → follow step-by-step guidance → build real-world confidence.'],
    visual: { kind: 'diagram', name: 'features' },
    source: 'A0 poster — Design Features, User Experience Flow',
    evidence: [
      { value: '6', label: 'feature concepts' },
      { value: '4', label: 'flow steps' },
    ],
    anchor: { text: 'Choose a scenario → explore or simulate → follow the steps → build confidence.', by: 'User experience flow (A0 poster)' },
  },
  {
    key: 'prototype',
    title: 'Prototype',
    verb: 'Make',
    summary: 'A clickable mobile web prototype of the key features.',
    outputs: ['Mobile web app', 'Journey Tree (e.g. Healthcare)', 'Short Trip', 'AR Lens · Ask This Place'],
    details: [
      'The prototype has no back end. AR Lens and Ask This Place use sample photos and preset dialogue.',
      'Screens in this report are captured from the current prototype build.',
    ],
    visual: { kind: 'image', src: 'assets/poster/poster-screens.jpg', alt: 'Five Day One prototype screens: Journey Tree, a hook-turn scenario, the Explore neighbourhood map, AR Lens on a myki reader, and the Tools hub', caption: 'Prototype screens as presented on the A0 poster.' },
    source: 'A0 poster; prototype README',
    evidence: [
      { value: '4', label: 'key features' },
      { value: '6', label: 'guide topics' },
    ],
    anchor: { text: 'Explore. Practice. Feel at home.', by: 'Day One' },
  },
  {
    key: 'evaluate',
    title: 'Evaluate',
    verb: 'Test',
    summary: 'A usability evaluation with six students, then refined designs.',
    outputs: ['6 participants · 30–35 min', '8 usability problems (2 High, 6 Medium)', '8 recommendations'],
    details: [
      'Usability testing, guided walkthroughs and feature demonstrations on the high-fidelity Figma prototype, with semi-structured interviews; three sessions online, three in person.',
      'Transcripts were analysed thematically; problems were identified with Nielsen’s heuristics and rated with Nielsen’s severity ratings.',
    ],
    visual: { kind: 'image', src: 'assets/iteration/compare/journey-tree-after.jpg', alt: 'Refined Journey Tree screen with a card-based overview of steps', caption: 'Journey Tree, refined after evaluation into a card-based overview.' },
    source: 'Usability Evaluation Report (25 Oct 2026)',
    evidence: [
      { value: '6', label: 'participants' },
      { value: '8', label: 'usability problems' },
      { value: '5', label: 'features refined' },
    ],
    anchor: { text: 'Participants found Day One useful in real-life situations, but several usability problems were identified.', by: 'Usability Evaluation Report' },
  },
]
