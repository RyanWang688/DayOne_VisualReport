import type { RefKey } from './types'

export type Reference = { key: RefKey; cite: string; apa: string; doi: string }

/** APA 7 reference list, copied from the field report. */
export const references: Reference[] = [
  {
    key: 'avouris2012',
    cite: 'Avouris & Yiannoutsou, 2012',
    apa: 'Avouris, N., & Yiannoutsou, N. (2012). A review of mobile location-based games for learning across physical and virtual spaces. Journal of Universal Computer Science, 18(15), 2120–2142.',
    doi: 'https://doi.org/10.3217/jucs-018-15-2120',
  },
  {
    key: 'freeman2019',
    cite: 'Freeman & Li, 2019',
    apa: 'Freeman, K., & Li, M. (2019). “We are a ghost in the class”: First year international students’ experiences in the global contact zone. Journal of International Students, 9(1), 19–38.',
    doi: 'https://doi.org/10.32674/jis.v9i1.270',
  },
  {
    key: 'gebregergis2025',
    cite: 'Gebregergis & Csukonyi, 2025',
    apa: 'Gebregergis, W. T., & Csukonyi, C. (2025). A systematic review of personal and situational factors associated with intercultural adaptation of international students: Unravelling the resources and demands. International Journal of Intercultural Relations, 108, 102252.',
    doi: 'https://doi.org/10.1016/j.ijintrel.2025.102252',
  },
  {
    key: 'hernandez2021',
    cite: 'Hernández López, 2021',
    apa: 'Hernández López, E. M. (2021). International students involvement with preparations: Pre-departure coping strategies implemented by Mexican postgraduate students in the UK. International Journal of Intercultural Relations, 81, 167–175.',
    doi: 'https://doi.org/10.1016/j.ijintrel.2021.01.010',
  },
  {
    key: 'hertzum2019',
    cite: 'Hertzum & Hyldegård, 2019',
    apa: 'Hertzum, M., & Hyldegård, J. S. (2019). Information seeking abroad: An everyday-life study of international students. Journal of Documentation, 75(6), 1298–1316.',
    doi: 'https://doi.org/10.1108/JD-11-2018-0183',
  },
  {
    key: 'men2024',
    cite: 'Men et al., 2024',
    apa: 'Men, Q., Li, W., Khan, A., & Gillies, R. M. (2024). Challenges and strategies for navigating Australian healthcare access: Experience from Chinese international students. International Journal for Equity in Health, 23, 189.',
    doi: 'https://doi.org/10.1186/s12939-024-02273-6',
  },
  {
    key: 'metcalfe2017',
    cite: 'Metcalfe, 2017',
    apa: 'Metcalfe, J. (2017). Learning from errors. Annual Review of Psychology, 68, 465–489.',
    doi: 'https://doi.org/10.1146/annurev-psych-010416-044022',
  },
  {
    key: 'nourian2026',
    cite: 'Nourian et al., 2026',
    apa: 'Nourian, L., Callis, A., Patterson, S., Miao, J., Heard, J., & Tigwell, G. W. (2026). Understanding how international students in the U.S. are using conversational AI to support cross-cultural adaptation [Preprint]. arXiv.',
    doi: 'https://doi.org/10.48550/arXiv.2605.15127',
  },
  {
    key: 'pekerti2020',
    cite: 'Pekerti et al., 2020',
    apa: 'Pekerti, A. A., van de Vijver, F. J. R., Moeller, M., & Okimoto, T. G. (2020). Intercultural contacts and acculturation resources among international students in Australia: A mixed-methods study. International Journal of Intercultural Relations, 75, 56–81.',
    doi: 'https://doi.org/10.1016/j.ijintrel.2019.12.004',
  },
  {
    key: 'smith2011',
    cite: 'Smith & Khawaja, 2011',
    apa: 'Smith, R. A., & Khawaja, N. G. (2011). A review of the acculturation experiences of international students. International Journal of Intercultural Relations, 35(6), 699–713.',
    doi: 'https://doi.org/10.1016/j.ijintrel.2011.08.004',
  },
  {
    key: 'xiong2025',
    cite: 'Xiong et al., 2025',
    apa: 'Xiong, W., Quinney, B., King, D. L., Ali, K., Radunz, M., Zhao, Y., Kyrios, M., & Fassnacht, D. B. (2025). The acculturation challenge: A longitudinal investigation of acculturative stress and mental health of Chinese international students in Australia. Journal of Affective Disorders, 374, 477–485.',
    doi: 'https://doi.org/10.1016/j.jad.2025.01.082',
  },
  {
    key: 'yoon2017',
    cite: 'Yoon & Chung, 2017',
    apa: 'Yoon, J., & Chung, E. (2017). International students’ information needs and seeking behaviours throughout the settlement stages. Libri, 67(2), 119–128.',
    doi: 'https://doi.org/10.1515/libri-2016-0048',
  },
]

export const refByKey = Object.fromEntries(references.map((r) => [r.key, r])) as Record<RefKey, Reference>
