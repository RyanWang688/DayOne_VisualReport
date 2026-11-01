import type { RefKey } from './types'

export type LitInsight = {
  num: string
  title: string
  summary: string
  /** Each point is a claim made in the field report's literature review, with its source. */
  points: { text: string; refs: RefKey[] }[]
  diagram: 'gap' | 'loop' | 'ongoing'
}

export const litFraming = {
  text: 'International students face language barriers, study difficulties, loneliness, discrimination and practical problems that come from a change of environment.',
  refs: ['smith2011'] as RefKey[],
}

/** The three major insights shown as large editorial sections. */
export const litInsights: LitInsight[] = [
  {
    num: '01',
    title: 'Having information does not always mean being prepared.',
    summary:
      'Pre-departure preparation reduces uncertainty, but its value depends on what it covers. Many difficulties only appear once students are living the situation.',
    points: [
      {
        text: 'Students who prepared only for administrative matters did not fully understand what independent living abroad would involve, which made the start more stressful.',
        refs: ['hernandez2021'],
      },
      {
        text: 'Pre-departure information needs were broad, and students reported low satisfaction with online searches — access to information is not the same as adequate preparation.',
        refs: ['yoon2017'],
      },
      {
        text: 'Chinese international students in Australia still struggled with appointments, costs, referrals, insurance and reimbursement in the healthcare system.',
        refs: ['men2024'],
      },
    ],
    diagram: 'gap',
  },
  {
    num: '02',
    title: 'Students often learn through mistakes and practical experience.',
    summary:
      'Understanding a new environment is not the same as being able to act in it. Adaptation requires practical skills, and errors with feedback are part of how those skills form.',
    points: [
      {
        text: 'Sociocultural adaptation requires developing the skills to live in a new cultural environment and to interact effectively with others.',
        refs: ['gebregergis2025'],
      },
      {
        text: 'Making mistakes and receiving feedback can support learning, and mistakes can encourage people to explore and try again.',
        refs: ['metcalfe2017'],
      },
    ],
    diagram: 'loop',
  },
  {
    num: '03',
    title: 'Settling into a new environment is an ongoing process.',
    summary:
      'Adaptation continues well after arrival. Some stresses grow over time, and support needs shift from immediate tasks to longer-term social and academic life.',
    points: [
      {
        text: 'International students keep learning new skills to live in an unfamiliar environment; settling in is a process of repeated learning and adjustment.',
        refs: ['nourian2026'],
      },
      {
        text: 'Acculturative stress among Chinese international students in Australia was higher five months after arrival than at first assessment, led by language and communication difficulties.',
        refs: ['xiong2025'],
      },
      {
        text: 'Seeking information on one’s own abroad can contribute to stress, and can also contribute to personal growth.',
        refs: ['hertzum2019'],
      },
    ],
    diagram: 'ongoing',
  },
]

/** Supporting context from the literature review, shown in a smaller format. */
export const litContext: { title: string; points: { text: string; refs: RefKey[] }[] }[] = [
  {
    title: 'Cross-cultural challenges in social and academic settings',
    points: [
      { text: 'Social support and connections help adaptation; academic stress, group anxiety and cultural distance make it harder.', refs: ['gebregergis2025'] },
      { text: 'Students face sociocultural, language and communication difficulties, alongside new courses and education systems.', refs: ['nourian2026'] },
      { text: 'Few opportunities for meaningful classroom interaction, instruction and feedback impeded academic transition.', refs: ['freeman2019'] },
      { text: 'Support networks that include host-country locals relate to better psychological and sociocultural adaptation.', refs: ['pekerti2020'] },
    ],
  },
  {
    title: 'Technology can support — not replace — real experience',
    points: [
      { text: 'Location-based technology can connect digital content with activities in real places and support experiential, context-based learning.', refs: ['avouris2012'] },
      { text: 'Students use AI for immediate, specific problems, but still value real people and real experiences for complex, long-term settling-in needs.', refs: ['nourian2026'] },
    ],
  },
]
