/**
 * `status` controls the label shown on the page.
 *  - 'draft'    → "Draft — awaiting team approval"
 *  - 'approved' → no label
 */
export const abstract = {
  status: 'draft' as 'draft' | 'approved',
  /** ~100-word version for the visual report, condensed from the field report abstract. */
  text: 'This study examines how international students obtain information, handle real-life challenges and settle into Melbourne. Semi-structured interviews with eight international students were analysed through thematic analysis. Pre-departure information was often fragmented, outdated or not specific to students’ circumstances, and knowing information did not mean students could apply it. Students learned transport, banking, healthcare and other everyday systems through trial and error, help-seeking and direct experience. Even after managing daily tasks independently, language, social and academic challenges remained. Adaptation is therefore an ongoing, uneven learning process, suggesting that design should help students apply information in real situations.',
  keywords: ['international students', 'adaptation', 'information practice', 'thematic analysis', 'interaction design'],
  /** Original abstract from the field report, shown in an expandable panel. */
  original:
    'This study examines how international students obtain information, deal with real-life challenges, and gradually settle into their local environment before and after arriving in Melbourne. The study utilized semi-structured interviews with 8 international students and organized their experiences through thematic analysis. The results show that the information students obtained before departure was often fragmented, outdated, or not specific to their personal circumstances. Moreover, simply knowing the information does not mean that students have the ability to apply it correctly in real-life situations. Students primarily developed an understanding of transportation, banking, healthcare, and other aspects of daily life through trial and error, seeking help from others, and direct experience. At the same time, even after becoming able to handle daily matters independently, challenges in terms of language, social interactions, and academics may remain. The study suggests that the adaptation of international students is an ongoing and uneven learning process.',
}
