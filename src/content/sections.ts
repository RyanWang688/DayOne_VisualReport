/**
 * Report structure. `id` is the anchor used in the URL (#project-overview, …).
 * Parts group the main report; front and back matter are unnumbered.
 * `question` is the guiding question each chapter answers — it gives the report its story line
 * and is shown above every section title, in the contents menu and in the report map.
 */
export type PartKey = 'front' | 'research' | 'design' | 'back'

export const parts: readonly { key: PartKey; label: string; story: string; summary?: string }[] = [
  { key: 'front', label: 'Introduction', story: 'Setting the scene' },
  { key: 'research', label: 'Part I · Research', story: 'Listening to students', summary: 'How international students turn information into action — and where they struggle.' },
  { key: 'design', label: 'Part II · Design', story: 'Responding with design', summary: 'From four challenges to one question, a concept, three rounds of fidelity and what testing changed.' },
  { key: 'back', label: 'Sources', story: 'Evidence and materials' },
]

export const sections = [
  { id: 'overview', num: '00', label: 'Overview', part: 'front', question: 'What is this project?', takeaway: 'Title block and project context.' },
  { id: 'abstract', num: '', label: 'Abstract', part: 'front', question: 'What is the short version?', takeaway: 'The whole study in about 100 words.' },
  { id: 'project-overview', num: '', label: 'Project Overview', part: 'front', question: 'How did the project unfold?', takeaway: 'Five stages, each building on the last — from interviews to a tested prototype.' },
  { id: 'literature', num: '01', label: 'Literature Review', part: 'research', question: 'What do we already know?', takeaway: 'Information alone does not prepare students; adaptation is practical and ongoing.' },
  { id: 'study-design', num: '02', label: 'Study Design', part: 'research', question: 'How did we listen?', takeaway: 'Eight interviews, coded into 142 notes and ten clusters.' },
  { id: 'challenges', num: '03', label: 'Challenges', part: 'research', question: 'Where do students struggle?', takeaway: 'Four themes describe the gap between knowing and doing.' },
  { id: 'hmw', num: '04', label: 'HMW', part: 'design', question: 'What should a design answer?', takeaway: 'The four themes converge into one design question.' },
  { id: 'outcome', num: '05', label: 'Design Concept', part: 'design', question: 'What should Day One offer?', takeaway: 'Each research finding mapped to a design opportunity and a feature.' },
  { id: 'iteration', num: '06', label: 'Iteration', part: 'design', question: 'How did the design take shape?', takeaway: 'Low-fi sketches, then wireframes, then an initial hi-fi prototype.' },
  { id: 'evaluation', num: '07', label: 'Evaluation', part: 'design', question: 'Did it work, and what changed?', takeaway: 'Six students tested it; eight problems led to refined designs.' },
  { id: 'conclusions', num: '08', label: 'Conclusions', part: 'design', question: 'What did we learn?', takeaway: 'Information is the first step; practice, help and time do the rest.' },
  { id: 'references', num: '', label: 'References', part: 'back', question: 'Which sources informed us?', takeaway: 'Twelve academic sources, APA 7.' },
  { id: 'appendix', num: '', label: 'Appendix', part: 'back', question: 'Where are the materials?', takeaway: 'Interview questions, poster, research data.' },
] as const satisfies readonly { id: string; num: string; label: string; part: PartKey; question: string; takeaway: string }[]

export type SectionId = (typeof sections)[number]['id']

export const sectionById = Object.fromEntries(sections.map((s) => [s.id, s])) as Record<SectionId, (typeof sections)[number]>

export const partByKey = Object.fromEntries(parts.map((p) => [p.key, p])) as Record<PartKey, (typeof parts)[number]>