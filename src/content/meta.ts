/**
 * Title block and project-level information.
 * Any value wrapped in `placeholder(...)` renders as a clearly labelled
 * placeholder on the site. Replace it with a plain string once confirmed.
 */
import { placeholder, type Editable } from './types'
import { hmwText } from './hmw'

export const meta = {
  projectName: 'Day One',
  brandLine: 'Small steps, a brighter you',
  posterLine: 'Explore. Practice. Feel at home.',
  title: "Supporting International Students' Adaptation in Melbourne",
  reportTitle: 'A Field Report on International Students Settling into Melbourne',
  subtitle: 'Helping international students move from knowing what to do to confidently doing it.',
  introLead: 'Having information does not mean knowing how to act on it.',
  intro:
    'Day One began as a field study of how international students prepare for, arrive in and gradually settle into Melbourne. Our interviews showed that students rarely lack information. What they lack is a way to turn that information into action in unfamiliar, real-life situations. This report follows the research from interviews to themes, and from themes to the design of the Day One prototype.',
  /** Single source: the HMW question in hmw.ts. */
  researchQuestion: hmwText,

  university: 'The University of Melbourne',
  faculty: 'Faculty of Engineering and Information Technology',
  degree: placeholder('Degree name (e.g. Master of …) — to confirm') as Editable,
  subject: 'INFO90009 User Experience Design Project',
  semester: '2026 Semester 2',
  supervisor: placeholder('Supervisor name — to confirm') as Editable,
  date: placeholder('Submission date — to confirm') as Editable,
  videoUrl: placeholder('Video link — to be supplied') as Editable,
  prototypeUrl: placeholder('Prototype URL — to be supplied') as Editable,
  researchDataUrl: placeholder('Research Data and Code link — to be supplied') as Editable,

  /** Student IDs are kept here for the submitted PDF but hidden on the public site by default. */
  showStudentIds: false,
  authors: [
    { name: 'Yue Wang', studentId: '1118786', role: 'Interviews & coding P1–P4' },
    { name: 'Yao Chen', studentId: '1118937', role: 'Interviews & coding P5–P8' },
  ],
}
