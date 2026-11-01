/** Navigation order. `id` is the anchor used in the URL (#research-process, …). */
export const sections = [
  { id: 'overview', num: '00', label: 'Overview' },
  { id: 'research-process', num: '01', label: 'Research Process' },
  { id: 'literature', num: '02', label: 'Literature Review' },
  { id: 'study-design', num: '03', label: 'Study Design' },
  { id: 'challenges', num: '04', label: 'Challenges' },
  { id: 'hmw', num: '05', label: 'HMW' },
  { id: 'abstract', num: '06', label: 'Abstract' },
  { id: 'outcome', num: '07', label: 'Outcome' },
  { id: 'conclusions', num: '08', label: 'Conclusions' },
  { id: 'references', num: 'R', label: 'References' },
  { id: 'appendix', num: 'A', label: 'Appendix' },
] as const

export type SectionId = (typeof sections)[number]['id']
