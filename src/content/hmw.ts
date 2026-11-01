/**
 * The HMW question and the design reasoning that connects the four themes (04 Challenges) to it.
 * `question` is written as segments; a segment with `step` is the phrase that theme points to.
 * The theme → phrase mapping is the team's synthesis.
 */
export const hmwQuestion: { text: string; step?: number }[] = [
  { text: 'How might we help international students ' },
  { text: 'find useful information', step: 0 },
  { text: ', ' },
  { text: 'understand everyday situations', step: 1 },
  { text: ', and ' },
  { text: 'feel more confident', step: 2 },
  { text: ' ' },
  { text: 'exploring Melbourne', step: 3 },
  { text: '?' },
]

export const hmwText = hmwQuestion.map((s) => s.text).join('')

export const hmwBridge = {
  eyebrow: 'From four challenges to one question',
  note: 'Design reasoning — the team’s synthesis of the four themes.',
  steps: [
    {
      theme: 'T1',
      short: 'Uncertain information',
      phrase: 'find useful information',
      why: 'Students gather plenty of information, but struggle to judge what is reliable, current and relevant to them.',
    },
    {
      theme: 'T2',
      short: 'Knowing ≠ doing',
      phrase: 'understand everyday situations',
      why: 'Knowing a rule is not the same as knowing what to do when the situation actually happens.',
    },
    {
      theme: 'T3',
      short: 'Learning by doing',
      phrase: 'feel more confident',
      why: 'Confidence grew through trying, making mistakes and getting help — practice, not more reading.',
    },
    {
      theme: 'T4',
      short: 'Not fully settled',
      phrase: 'exploring Melbourne',
      why: 'Adaptation keeps going after the basics, so support should invite students to keep exploring.',
    },
  ],
  outro:
    'Students are rarely short of information. What they need is information they can trust, a feel for how everyday situations work, and the confidence to go out and explore. Day One is designed around those three needs.',
}
