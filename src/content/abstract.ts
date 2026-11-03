/**
 * `status` controls the label shown on the page.
 *  - 'draft'    → "Draft — awaiting team approval"
 *  - 'approved' → no label
 */
export const abstract = {
  status: 'approved' as 'draft' | 'approved',
  /** Final abstract supplied by the team (four paragraphs). */
  paragraphs: [
    'International students adapting to life in Melbourne face unfamiliar procedures, local rules, and communication practices. Access to information alone does not ensure that students can apply it in everyday situations. This project investigates this gap through the design of Day One, a mobile application supporting practical learning and local exploration.',
    'A literature review and semi-structured interviews with eight international students informed thematic analysis. Four themes emerged: uncertain pre-arrival information, a gap between knowledge and practice, learning through experience, and uneven adaptation across everyday, social, and academic life. These findings informed a prototype developed through sketches, wireframes, and high-fidelity design. Short Trip supports exploration, Journey Tree and Simulate Scenario enable learning and practice, while AR Lens and Ask This Place offer contextual assistance.',
    'Usability testing, guided walkthroughs, and interviews with six participants identified eight usability problems. Participants recognised potential benefits but encountered difficulties with route flexibility, feature purpose, information access, and integration. Findings informed refinements to route customisation, journey overviews, scanning interactions, location selection, and cross-feature access, alongside removing gamification rewards.',
    'The project highlights opportunities to connect information with practical action. However, small samples and incomplete prototype functionality limit conclusions; further testing in real-world settings is needed to assess the refined design.',
  ],  keywords: ['international students', 'adaptation', 'information practice', 'thematic analysis', 'interaction design'],
  /** Original abstract from the field report, shown in an expandable panel. */
  original:
    'This study examines how international students obtain information, deal with real-life challenges, and gradually settle into their local environment before and after arriving in Melbourne. The study utilized semi-structured interviews with 8 international students and organized their experiences through thematic analysis. The results show that the information students obtained before departure was often fragmented, outdated, or not specific to their personal circumstances. Moreover, simply knowing the information does not mean that students have the ability to apply it correctly in real-life situations. Students primarily developed an understanding of transportation, banking, healthcare, and other aspects of daily life through trial and error, seeking help from others, and direct experience. At the same time, even after becoming able to handle daily matters independently, challenges in terms of language, social interactions, and academics may remain. The study suggests that the adaptation of international students is an ongoing and uneven learning process.',
}
