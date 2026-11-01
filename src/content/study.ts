/** Study design, as reported in the field report's Method and Ethics sections. */
export const study = {
  approach:
    'A qualitative study using semi-structured interviews. Fixed questionnaires could not capture experiences that differ from person to person, so we used 11 core questions with open follow-up questions.',
  facts: [
    { value: '8', label: 'Students interviewed' },
    { value: '20–30', label: 'Minutes each' },
    { value: '11', label: 'Core questions' },
  ],
  /** Study level of the 8 participants (confirmed by the team; matches the A0 poster). */
  levels: [
    { label: 'Foundation / Diploma', count: 2 },
    { label: 'Bachelor’s', count: 2 },
    { label: 'Master’s', count: 4 },
  ],
  /** Countries of origin — shown as flags only, without per-country counts. */
  origins: [
    { country: 'China', flag: 'assets/flags/cn.svg' },
    { country: 'Indonesia', flag: 'assets/flags/id.svg' },
    { country: 'Malaysia', flag: 'assets/flags/my.svg' },
  ],
  steps: [
    {
      title: 'Semi-structured interviews',
      text: 'Conducted in person or on Zoom, in Chinese, recorded and transcribed with consent. Transcripts were translated to English with translation tools and checked by the researchers.',
    },
    {
      title: 'Coding',
      text: 'We read every transcript, marked relevant experiences and coded them. Yue coded P1–P4; Yao coded P5–P8.',
    },
    {
      title: 'Affinity mapping',
      text: 'Each code became a sticky note in Figma. Through discussion we regrouped the notes by commonality into ten clusters.',
    },
    {
      title: 'Thematic analysis',
      text: 'Comparing the clusters, we developed four themes that structure our findings.',
    },
  ],
  ethics:
    'Every participant read the Plain Language Statement and signed a consent form before the interview. Participation was voluntary and could be withdrawn at any time. All transcripts and analysis are anonymised as P1–P8.',
}
