/**
 * Usability evaluation of the initial high-fidelity prototype.
 * Source: Day One Usability Evaluation Report (Yue Wang, Yao Chen; submitted 25 Oct 2026), §§2–6.
 * Problem/solution wording for the refinements: the team's ProblemSolutionText.md (Evaluation Comparison.zip).
 * Highlight boxes mark the relevant UI region for the reader; they are editorial, not gaze or click data.
 */
const it = (p: string) => `assets/iteration/${p}`

export const evalSource = 'Usability Evaluation Report (25 Oct 2026)'

export const evalMethod = {
  facts: [
    { value: '6', label: 'participants (P1–P6)' },
    { value: '3 + 3', label: 'online + in-person sessions' },
    { value: '30–35', label: 'minutes per session' },
  ],
  aim: 'Could users understand the interface, use the features, and find them helpful?',
  steps: [
    { title: 'Participants', text: 'International students who have studied or plan to study overseas, with different lengths of time in Melbourne; recruited through personal connections and Xiaohongshu.' },
    { title: 'Sessions', text: 'Usability testing, guided walkthroughs and feature demonstrations on the high-fidelity Figma prototype, followed by semi-structured interviews. Participants thought aloud.' },
    { title: 'Analysis', text: 'Recorded sessions were transcribed and analysed thematically by feature. Nielsen’s 10 usability heuristics identified problems; Nielsen’s severity ratings weighed frequency, impact and persistence.' },
  ],
  overall: 'Overall, participants found Day One useful in real-life situations, but several usability problems were identified.',
  limitations: [
    'Small sample of six participants.',
    'Some incomplete features needed researchers’ explanations, which may have shaped how they were understood.',
    'Task completion rates, error rates and satisfaction scores were not collected.',
    'Testing used a web prototype; the experience may differ on a real phone.',
  ],
}

export type Severity = 'High' | 'Medium'

/** Feature order used everywhere in the report: Home → Short Trip → Journey Tree → AR Lens → Ask This Place. */
export const featureOrder = ['Home & integration', 'Short Trip', 'Journey Tree', 'AR Lens', 'Ask This Place']
export type UsabilityProblem = {
  id: string
  feature: string
  title: string
  severity: Severity
  heuristic: string
  count?: number // participants out of 6, where the report gives a count
  who: string
  evidence: string
  quote?: { text: string; by: string }
  screen: { src: string; alt: string; region: string; box: [number, number, number, number] } // box: x, y, w, h in %
  recommendation: { id: string; text: string; priority?: 'High' | 'Medium' | 'Low' }
}

export const problems: UsabilityProblem[] = [
  {
    id: '4.1',
    feature: 'Short Trip',
    title: 'Limited route customisation',
    severity: 'High',
    heuristic: 'User control and freedom',
    count: 4,
    who: '4 of 6 participants',
    evidence: 'Participants wanted to choose or change checkpoints to suit their interests, available time and destination, instead of only following the recommended route.',
    quote: { text: 'I want to see nearby places on the map, such as Queen Victoria Market, cafes, and dessert shops. Then I can choose where I want to go.', by: 'P4' },
    screen: { src: it('compare/short-trip-plan-before.jpg'), alt: 'Initial Short Trip route-planning screen', region: 'Route-planning entry', box: [5, 79, 90, 14] },
    recommendation: { id: '5.1', priority: 'High', text: 'Let users add, remove or replace checkpoints on the map; keep recommended places as optional stops.' },
  },
  {
    id: '4.2',
    feature: 'Short Trip',
    title: 'Unclear exploration purpose',
    severity: 'High',
    heuristic: 'Match between system and the real world',
    who: 'Several participants',
    evidence: 'Some participants first read Short Trip as ordinary wayfinding or shop recommendations. Once its purpose was explained, they became more positive.',
    quote: { text: 'This is very useful for new students. It can help them learn more about their local community.', by: 'P3' },
    screen: { src: it('hifi/explore-1.jpg'), alt: 'Initial Explore screen with the Short Trip entry', region: 'Short Trip entry', box: [5, 79, 90, 14] },
    recommendation: { id: '5.2', priority: 'High', text: 'Explain the exploration purpose at the entry (“Explore new places on your way”) and give each recommended place a short introduction.' },
  },
  {
    id: '4.3',
    feature: 'Short Trip',
    title: 'Interface clarity and discoverability',
    severity: 'Medium',
    heuristic: 'Recognition rather than recall',
    who: 'P5',
    evidence: 'Map markers and the place cards below repeated the same information, and P5 needed the researcher’s help to find Start Journey.',
    screen: { src: it('hifi/explore-4.jpg'), alt: 'Initial route preview with place cards', region: 'Route preview and primary action', box: [4, 85, 92, 8] },
    recommendation: { id: '5.3', priority: 'Medium', text: 'Show short place details from map markers, place Start Journey where it is easy to find, and hint that panels can be swiped.' },
  },
  {
    id: '4.4',
    feature: 'Short Trip',
    title: 'Unclear gamification feedback',
    severity: 'Medium',
    heuristic: 'Visibility of system status',
    count: 2,
    who: '2 of 6 participants',
    evidence: 'P2 and P5 did not understand what XP and Level meant, and interest in rewards differed between participants.',
    screen: { src: it('hifi/explore-1.jpg'), alt: 'Initial Explore screen with XP and level indicators', region: 'XP and level indicators', box: [58, 4, 39, 8] },
    recommendation: { id: '5.4', priority: 'Low', text: 'Remove XP, Level and badges so Short Trip focuses on exploring.' },
  },
  {
    id: '4.5',
    feature: 'Journey Tree',
    title: 'Limited flexibility in information access',
    severity: 'Medium',
    heuristic: 'Flexibility and efficiency of use',
    count: 5,
    who: '5 of 6 participants',
    evidence: 'Steps were dense with text and had to be followed in order. P2 wanted to jump to a specific step; P4 and P6 wanted an overview before the details.',
    screen: { src: it('hifi/journey-tree-2.jpg'), alt: 'Initial Journey Tree step with long text', region: 'Text-heavy journey content', box: [5, 25, 90, 61] },
    recommendation: { id: '5.5', text: 'Redesign Journey Tree around a card-based overview with step summaries, free access to any step and a shortcut to Scenario Simulation.' },
  },
  {
    id: '4.6',
    feature: 'AR Lens',
    title: 'Inefficient access to time-sensitive information',
    severity: 'Medium',
    heuristic: 'Match between system and the real world',
    who: 'P1, P2, P4, P6',
    evidence: 'Reaching instructions took too many steps (Tools → AR Lens → scan → Details) for moments like boarding a tram. P2 and P4 wanted practical instructions straight after scanning.',
    screen: { src: it('hifi/ar-scan-1.jpg'), alt: 'Initial AR Lens scan result', region: 'Scan result and Details action', box: [4, 72, 92, 10] },
    recommendation: { id: '5.6', text: 'Open AR Lens from Home and show practical guidance automatically after a scan, without an extra Details tap.' },
  },
  {
    id: '4.7',
    feature: 'Ask This Place',
    title: 'Limited control over location recommendations',
    severity: 'Medium',
    heuristic: 'User control and freedom',
    count: 2,
    who: '2 of 6 participants',
    evidence: 'Being somewhere does not mean needing its services — a user may only be passing by. Nearby or overlapping places can also produce the wrong suggestions.',
    screen: { src: it('compare/ask-this-place-before.jpg'), alt: 'Initial Ask This Place screen', region: 'Automatically identified location', box: [5, 5, 90, 10] },
    recommendation: { id: '5.7', text: 'Show the identified place by name and image, and let users choose a different location.' },
  },
  {
    id: '4.8',
    feature: 'Home & integration',
    title: 'Fragmented feature integration',
    severity: 'Medium',
    heuristic: 'Flexibility and efficiency of use',
    count: 2,
    who: '2 of 6 participants',
    evidence: 'Explore, Journey Tree and Tools worked separately, so getting related help meant leaving the current flow and starting again.',
    screen: { src: it('hifi/tools.jpg'), alt: 'Initial Tools page with separate entry points', region: 'Separate feature entry points', box: [4, 17, 92, 53] },
    recommendation: { id: '5.8', text: 'Bring AR Lens, Ask This Place and Scenario Simulation onto Home, and let Ask This Place work inside a Short Trip.' },
  },
]

export type Refinement = {
  key: string
  name: string
  recs: string[]
  before: string
  after: string
  problems: string[]
  solutions: string[]
}

/** Feature order used everywhere in the report: Home → Short Trip → Journey Tree → AR Lens → Ask This Place. */
export const refinements: Refinement[] = [
  {
    key: 'home',
    name: 'Homepage',
    recs: ['5.8'],
    before: it('compare/home-before.jpg'),
    after: it('compare/home-after.jpg'),
    problems: ['Scenario Simulation is difficult to access directly.', 'Key features are separated across different sections.'],
    solutions: ['Direct access to Scenario Simulation.', 'Integrated shortcuts to essential tools.'],
  },
  {
    key: 'plan',
    name: 'Short Trip · planning',
    recs: ['5.1', '5.2'],
    before: it('compare/short-trip-plan-before.jpg'),
    after: it('compare/short-trip-plan-after.jpg'),
    problems: ['Limited route customisation.', 'Unclear purpose of local exploration.'],
    solutions: ['Customisable routes and checkpoints.', 'Clearer emphasis on local exploration.'],
  },
  {
    key: 'route',
    name: 'Short Trip · route',
    recs: ['5.3', '5.4'],
    before: it('compare/short-trip-route-before.jpg'),
    after: it('compare/short-trip-route-after.jpg'),
    problems: ['Cluttered information and unclear primary actions.', 'Confusing gamification feedback.'],
    solutions: ['Simplified information layout and prominent primary actions.', 'Removal of XP, Level, and badges.'],
  },
  {
    key: 'journey',
    name: 'Journey Tree',
    recs: ['5.5'],
    before: it('compare/journey-tree-before.jpg'),
    after: it('compare/journey-tree-after.jpg'),
    problems: ['High information density makes content difficult to scan.', 'Linear navigation limits access to specific steps.'],
    solutions: ['Card-based overview with clear step summaries.', 'Flexible navigation with direct access to individual steps.'],
  },
  {
    key: 'ar',
    name: 'AR Lens',
    recs: ['5.6'],
    before: it('compare/ar-lens-before.jpg'),
    after: it('compare/ar-lens-after.jpg'),
    problems: ['Too many steps to access practical information.', 'Scan results do not immediately provide actionable instructions.'],
    solutions: ['Simplified scanning workflow.', 'Immediate, action-oriented guidance.'],
  },
  {
    key: 'ask',
    name: 'Ask This Place',
    recs: ['5.7'],
    before: it('compare/ask-this-place-before.jpg'),
    after: it('compare/ask-this-place-after.jpg'),
    problems: ['Location-based recommendations may not match users’ actual needs.'],
    solutions: ['User-controlled location selection for more relevant recommendations.'],
  },
]

/**
 * Live demo: the deployed prototype embedded with ?demo=<key>, which opens one feature and keeps the visitor inside it.
 * Feature descriptions follow the prototype README; "responds to" links each feature to the evaluation.
 */
export type DemoFeature = { key: string; name: string; summary: string; tryThis: string[]; respondsTo: string; note?: string }

export const demoFeatures: DemoFeature[] = [
  {
    key: 'home',
    name: 'Home',
    summary: 'One place to start: the everyday tools, a suggested Short Trip and small local discoveries — with scenario practice one tap away.',
    tryThis: ['Look at the tools along the top of Home.', 'Open Simulate Scenario and practise a conversation, such as a GP visit.', 'Save the tip cards you want to keep.'],
    respondsTo: 'Fragmented feature integration',
    note: 'People, prices and situations in the simulations are examples.',
  },
  {
    key: 'explore',
    name: 'Short Trip',
    summary: 'Plan a short trip from where you are to where you need to be, with a few places worth discovering on the way.',
    tryThis: ['Choose how you travel and how much time you have.', 'Find routes, then build your own by adding or removing stops.', 'Open a place to see why it is worth a visit.'],
    respondsTo: 'Route control, unclear purpose, cluttered layout and gamification',
    note: 'Routes and times are a planning simulation, not live navigation.',
  },
  {
    key: 'journey',
    name: 'Journey Tree',
    summary: 'Step-by-step guides for everyday procedures: healthcare, transport, driving, campus, housing and daily life.',
    tryThis: ['Open the Healthcare journey and read the step summaries.', 'Jump straight to any step instead of reading in order.', 'Switch tracks with the tabs along the top.'],
    respondsTo: 'Limited flexibility in information access',
  },
  {
    key: 'ar',
    name: 'AR Lens',
    summary: 'Point the camera at an unfamiliar machine, such as a myki reader, and get practical instructions straight away.',
    tryThis: ['Wait for the sample scan to finish.', 'Read the guidance that appears without an extra Details step.', 'Switch to the parking-machine example from the history.'],
    respondsTo: 'Inefficient access to time-sensitive information',
    note: 'Uses sample photos; there is no real image recognition.',
  },
  {
    key: 'ask',
    name: 'Ask This Place',
    summary: 'Ask questions about the place you are in, and confirm or change the place the app has identified.',
    tryThis: ['Check the identified place at the top and change it if needed.', 'Pick a suggested question.', 'Open the map or a follow-up card from the answer.'],
    respondsTo: 'Limited control over location recommendations',
    note: 'Answers are preset dialogue, not live AI.',
  },
]
