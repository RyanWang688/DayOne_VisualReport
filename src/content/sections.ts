/**
 * Report structure. `id` is the anchor used in the URL (#research-process, …).
 * Parts group the main report; front and back matter are unnumbered.
 */
export type PartKey = 'front' | 'research' | 'design' | 'back'

export const parts: readonly { key: PartKey; label: string; summary?: string }[] = [
  { key: 'front', label: 'Front matter' },
  { key: 'research', label: 'Part I · Research', summary: 'How international students turn information into action — and where they struggle.' },
  { key: 'design', label: 'Part II · Design', summary: 'From four challenges to one question, a prototype and what testing told us.' },
  { key: 'back', label: 'Back matter' },
]

export const sections = [
  { id: 'overview', num: '00', label: 'Overview', part: 'front', takeaway: 'Title block and project context.' },
  { id: 'abstract', num: '', label: 'Abstract', part: 'front', takeaway: 'The whole study in about 100 words.' },
  { id: 'research-process', num: '01', label: 'Research Process', part: 'research', takeaway: 'Five stages, each building on the last — from interviews to a tested prototype.' },
  { id: 'literature', num: '02', label: 'Literature Review', part: 'research', takeaway: 'Information alone does not prepare students; adaptation is practical and ongoing.' },
  { id: 'study-design', num: '03', label: 'Study Design', part: 'research', takeaway: 'Eight interviews, coded into 142 notes and ten clusters.' },
  { id: 'challenges', num: '04', label: 'Challenges', part: 'research', takeaway: 'Four themes describe the gap between knowing and doing.' },
  { id: 'hmw', num: '05', label: 'HMW', part: 'design', takeaway: 'The four themes converge into one design question.' },
  { id: 'outcome', num: '06', label: 'Outcome', part: 'design', takeaway: 'Findings mapped to features, built into Day One and tested with six students.' },
  { id: 'conclusions', num: '07', label: 'Conclusions', part: 'design', takeaway: 'Information is the first step; practice, help and time do the rest.' },
  { id: 'references', num: '', label: 'References', part: 'back', takeaway: 'Twelve academic sources, APA 7.' },
  { id: 'appendix', num: '', label: 'Appendix', part: 'back', takeaway: 'Interview questions, poster, research data.' },
] as const satisfies readonly { id: string; num: string; label: string; part: PartKey; takeaway: string }[]

export type SectionId = (typeof sections)[number]['id']

export const sectionById = Object.fromEntries(sections.map((s) => [s.id, s])) as Record<SectionId, (typeof sections)[number]>
