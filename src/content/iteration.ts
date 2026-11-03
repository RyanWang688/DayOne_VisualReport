/**
 * Design iteration: Low-fi sketches → wireframes → initial high-fidelity prototype.
 * Screens are the team's supplied design files (Low fi.zip, Wireframe.zip, Initial High.zip), converted to JPG
 * without cropping. Group names and captions follow the team's Low-to-High report.
 */
const it = (p: string) => `assets/iteration/${p}`

export type Screen = { src: string; alt: string; tall?: boolean }
export type ScreenGroup = { key: string; name: string; note?: string; intro: string; screens: Screen[] }
export type FidelityStage = { key: 'low' | 'wire' | 'high'; label: string; short: string; summary: string }

export const fidelityStages: FidelityStage[] = [
  { key: 'low', label: 'Low-fi sketches', short: 'Low-fi', summary: 'Early sketches outline the driver licence journey, local exploration and AR assistance.' },
  { key: 'wire', label: 'Wireframes', short: 'Wireframe', summary: 'The sketches become screen sequences: step-by-step journeys, scenario choices, map exploration and scanning.' },
  { key: 'high', label: 'Initial hi-fi', short: 'Initial hi-fi', summary: 'Detailed content, maps and contextual guidance bring these flows into the prototype used for evaluation.' },
]

export const sketches = [
  {
    src: it('lowfi/driver-licence-journey.jpg'),
    alt: 'Hand-drawn sketches of a driver licence journey',
    caption: 'Driver licence journey — guidance, choices and practice.',
    w: 1016,
    h: 1022,
  },
  {
    src: it('lowfi/map-journey-ar.jpg'),
    alt: 'Hand-drawn sketch sheet: an AR map with guidance, a tree-node guide where each node opens a scenario, and a camera view that shows real-time guidance at a tap-on machine',
    caption: 'Map, journey tree and AR concepts — “each node shows a scenario”, “open cam, show real-time guidance”.',
    w: 2000,
    h: 1415,
  },
]

const s = (stage: 'wireframe' | 'hifi', file: string, alt: string, tall = false): Screen => ({ src: it(`${stage}/${file}.jpg`), alt, tall })

/** Groups follow the report-wide feature order: Home → Short Trip → Journey Tree → AR Lens → Ask This Place. */
export const wireGroups: ScreenGroup[] = [
  {
    key: 'home',
    name: 'Home',
    intro: 'A home screen gathers the everyday tools and points to the journeys.',
    screens: [s('wireframe', 'home', 'Wireframe: home screen')],
  },
  {
    key: 'explore',
    name: 'Explore',
    intro: 'Map-based exploration helps users discover nearby places and navigate their surroundings.',
    screens: [1, 2, 3].map((n) => s('wireframe', `explore-${n}`, `Wireframe: explore ${n}`)),
  },
  {
    key: 'journey',
    name: 'Journey Tree',
    intro: 'Step-by-step journeys introduce unfamiliar everyday procedures.',
    screens: [1, 2, 3].map((n) => s('wireframe', `journey-tree-${n}`, `Wireframe: journey tree ${n}`)),
  },
  {
    key: 'driver',
    name: 'Driver licence journey',
    intro: 'A guided journey explores the steps and documents involved in getting a Victorian driver licence.',
    screens: [1, 2, 3, 4].map((n) => s('wireframe', `driver-licence-${n}`, `Wireframe: driver licence journey ${n}`)),
  },
  {
    key: 'scenario',
    name: 'Scenario simulation',
    intro: 'Everyday scenarios let users practise decisions and see feedback on their choices.',
    screens: [1, 2, 3].map((n) => s('wireframe', `scenario-${n}`, `Wireframe: scenario simulation ${n}`)),
  },
  {
    key: 'ar',
    name: 'AR scan',
    intro: 'Scanning a sign or object connects the surrounding environment with contextual guidance.',
    screens: [1, 2].map((n) => s('wireframe', `ar-scan-${n}`, `Wireframe: AR scan ${n}`)),
  },
]

export const hifiGroups: ScreenGroup[] = [
  {
    key: 'tools',
    name: 'Tools',
    note: 'the hub before Home',
    intro: 'In the initial version a separate Tools page held AR Lens and Ask This Place; after evaluation these moved onto Home.',
    screens: [s('hifi', 'tools', 'Initial hi-fi: Tools page')],
  },
  {
    key: 'explore',
    name: 'Explore · Short Trip',
    intro: 'Plan a short walking trip through recommended checkpoints near you.',
    screens: [1, 2, 3, 4, 5].map((n) => s('hifi', `explore-${n}`, `Initial hi-fi: Explore / Short Trip ${n}`)).concat(s('hifi', 'explore-7', 'Initial hi-fi: Explore / Short Trip 6', true)),
  },
  {
    key: 'journey',
    name: 'Journey Tree',
    intro: 'Step-by-step guides for everyday procedures — visiting a GP, getting a driver licence.',
    screens: [
      s('hifi', 'journey-tree-gp', 'Initial hi-fi: Journey Tree, visit a GP'),
      s('hifi', 'journey-tree-2', 'Initial hi-fi: Journey Tree, a text-heavy step', true),
      s('hifi', 'journey-tree-3', 'Initial hi-fi: Journey Tree, step detail', true),
      s('hifi', 'journey-tree-driver-licence', 'Initial hi-fi: Journey Tree, driver licence'),
      s('hifi', 'journey-tree-5', 'Initial hi-fi: Journey Tree 5'),
      s('hifi', 'journey-tree-6', 'Initial hi-fi: Journey Tree 6', true),
      s('hifi', 'journey-tree-7', 'Initial hi-fi: Journey Tree 7', true),
      s('hifi', 'journey-tree-8', 'Initial hi-fi: Journey Tree 8'),
      s('hifi', 'journey-tree-9', 'Initial hi-fi: Journey Tree 9'),
    ],
  },
  {
    key: 'scenario',
    name: 'Simulate Scenario',
    note: 'now part of Journey Tree',
    intro: 'Practice at the end of a journey: choose what to do and see the consequence.',
    screens: [s('hifi', 'scenario-1', 'Initial hi-fi: scenario simulation 1'), s('hifi', 'scenario-2', 'Initial hi-fi: scenario simulation 2')],
  },
  {
    key: 'ar',
    name: 'AR Lens',
    intro: 'Scan a device such as a myki reader to identify it, then tap Details for instructions.',
    screens: [s('hifi', 'ar-scan-1', 'Initial hi-fi: AR Lens scanning'), s('hifi', 'ar-scan-2', 'Initial hi-fi: AR Lens result')],
  },
  {
    key: 'ask',
    name: 'Ask This Place',
    note: 'part of Tools',
    intro: 'Location-based recommendations and quick questions for the place you are in.',
    screens: [s('hifi', 'ask-this-place-1', 'Initial hi-fi: Ask This Place 1'), s('hifi', 'ask-this-place-2', 'Initial hi-fi: Ask This Place 2')],
  },
]

/** One topic traced through all three fidelities. Same topic, different screen states — not a pixel-matched transformation. */
export const evolutionTrace = {
  topic: 'Driver licence journey',
  note: 'Same topic at each fidelity. The screens show different states; they are not pixel-matched versions of one another.',
  steps: [
    { stage: 'Low-fi', src: it('lowfi/driver-licence-journey.jpg'), alt: 'Low-fi sketch of the driver licence journey', kind: 'sketch' as const },
    { stage: 'Wireframe', src: it('wireframe/driver-licence-1.jpg'), alt: 'Wireframe: “Ready to drive in Victoria?” start screen', kind: 'screen' as const },
    { stage: 'Initial hi-fi', src: it('hifi/journey-tree-driver-licence.jpg'), alt: 'Initial hi-fi: driver licence journey in Journey Tree', kind: 'screen' as const },
  ],
}
