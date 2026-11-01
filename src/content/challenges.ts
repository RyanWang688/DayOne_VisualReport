import type { ParticipantId, Quote } from './types'

export type SubFinding = { id: string; title: string; text: string; participants: ParticipantId[] }

export type Challenge = {
  num: string
  title: string
  short: string
  explanation: string
  subFindings: SubFinding[]
  quotes: Quote[]
  scenario: { label: string; text: string; participants: ParticipantId[] }
  implication: string
}

/** Note shown with every quote block. */
export const quoteNote = 'Interviews were conducted in Chinese. Quotes are the research team’s English translation.'

/** Findings from the field report, condensed for the case study. Participant IDs are kept as evidence. */
export const challenges: Challenge[] = [
  {
    num: '01',
    title: 'Preparing using uncertain and context-dependent information.',
    short: 'Uncertain information',
    explanation:
      'Before arrival, participants pieced together information on housing, transport, banking and daily life from social media, agents, map tools, student groups, friends and family. Spread across many sources, it was hard to verify for reliability, timeliness and fit with their own situation.',
    subFindings: [
      {
        id: '1.1',
        title: 'Preparation depends on unofficial sources',
        text: 'Xiaohongshu was the most-mentioned source (P2–P6), alongside TikTok, WeChat and agents. P7 and P8 checked Google Maps for supermarkets, food and transport near their accommodation. P1 relied on senior students in a group chat; P6 and P7 asked relatives and friends. No participant used a single comprehensive guide.',
        participants: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
      },
      {
        id: '1.2',
        title: 'Reliability and timeliness are hard to judge',
        text: 'P5 bought a filtered showerhead and power adapter on social-media advice, then found the accommodation already provided them; some claims about water quality felt exaggerated. P2 later found cheaper phone plans than the one an agent recommended. P7’s relative had lived in Melbourne over a decade ago, and that advice no longer matched reality.',
        participants: ['P2', 'P5', 'P7'],
      },
      {
        id: '1.3',
        title: 'Lived experience is valued over online guides',
        text: 'P5 and P6 valued advice from people living in Melbourne more than online guides. P5’s friend helped them buy a SIM card and explained how to open a bank account — step-by-step guidance that helped far more than reading guides.',
        participants: ['P5', 'P6'],
      },
    ],
    quotes: [],
    scenario: {
      label: 'Everyday scenario',
      text: 'A student follows a popular packing list, buys a filtered showerhead and an adapter before flying — and finds both already waiting in their accommodation.',
      participants: ['P5'],
    },
    implication:
      'Information needs to be current, specific to Melbourne and to the student’s situation, and ideally grounded in lived local experience.',
  },
  {
    num: '02',
    title: 'Gap between knowing local information and actual practice.',
    short: 'Knowing ≠ doing',
    explanation:
      'Even with a basic understanding of local life, participants were caught out by specific procedures and unwritten rules. These problems surfaced in restaurants, on public transport and in healthcare — only when students actually tried to use the service.',
    subFindings: [
      {
        id: '2.1',
        title: 'Unwritten rules only appear in the moment',
        text: 'P3 did not know to wait to be seated at a restaurant and only realised after reading comments online. P5 and P7 did not know they needed to press the bell to get off a tram. P8 learned that orange seats were priority seats only when asked to give one up. P7 arrived late at night and found most shops and restaurants already closed.',
        participants: ['P3', 'P5', 'P7', 'P8'],
      },
      {
        id: '2.2',
        title: 'Healthcare needs practical knowledge',
        text: 'Two weeks after arriving, P6 felt unwell but did not know how to book a GP, which app to use or how OSHC worked, and relied on medication brought from China until the university explained the process. P2 is still unsure what student insurance covers. P8 received a GP referral but did not know how to contact a psychologist.',
        participants: ['P2', 'P6', 'P8'],
      },
    ],
    quotes: [],
    scenario: {
      label: 'Everyday scenario',
      text: 'On the way to the beach, a student sits in an orange seat on public transport. They only learn it is a priority seat when someone asks them to move — an awkward moment no guide had prepared them for.',
      participants: ['P8'],
    },
    implication:
      'Students need to rehearse unfamiliar procedures and see unwritten rules before they meet them — especially high-stakes ones like healthcare.',
  },
  {
    num: '03',
    title: 'Learning to manage local life through practical experience.',
    short: 'Learning by doing',
    explanation:
      'Managing local life was learned progressively. Many issues were only understood by trying them in real situations, making mistakes, asking for help and trying again. As experience grew, participants became more confident and independent.',
    subFindings: [
      {
        id: '3.1',
        title: 'Learning through trial and error',
        text: 'P3 could not find the station, took the wrong train, asked others for help and changed route. P3’s bank account only made sense after using it. P8 read tutorials before applying for a TFN yet still found the process complicated. P7 knew about public transport but did not realise a Myki card was required until using the system.',
        participants: ['P3', 'P7', 'P8'],
      },
      {
        id: '3.2',
        title: 'Support fills the experience gap',
        text: 'P6 felt that someone guiding them on arrival would have made transport and shopping easier. P7 often asked people nearby, and searched the university’s online platform for answers to similar problems.',
        participants: ['P6', 'P7'],
      },
      {
        id: '3.3',
        title: 'Confidence grows with experience — situation by situation',
        text: 'P8 was initially uncomfortable serving local customers at work, and grew more comfortable with experience — yet still felt unsure in new situations.',
        participants: ['P8'],
      },
    ],
    quotes: [
      { text: 'I still did not really understand how it worked.', participant: 'P3', context: 'On their bank account, after reading about it in advance' },
      { text: 'real experiences had a greater impact', participant: 'P8', context: 'Compared with information obtained before arrival' },
      { text: 'at least you would know which supermarket to go to.', participant: 'P6', context: 'On having someone to guide them after arriving' },
      { text: 'I used to be afraid of working at the counter.', participant: 'P8', context: 'Now feels “much better now”, but still “a little unsure of what to do” in unfamiliar situations' },
    ],
    scenario: {
      label: 'Everyday scenario',
      text: 'A student cannot find a station entrance that is right nearby, boards the wrong train, asks a stranger for help, and reroutes. The next trip goes smoothly.',
      participants: ['P3'],
    },
    implication:
      'Mistakes are part of learning. Design can offer safe, low-stakes practice and help at the moment of need, rather than more information up front.',
  },
  {
    num: '04',
    title: 'Practical independence does not mean students are fully settled.',
    short: 'Not fully settled',
    explanation:
      'Settling in does not happen in every area at once. Participants could shop, travel and cook independently while still facing new challenges in language, culture, social life and study.',
    subFindings: [
      {
        id: '4.1',
        title: 'Daily independence before social comfort',
        text: 'P6 could live independently but found making friends harder, citing language and cultural differences. P7 became familiar with routes, shopping and the neighbourhood quickly.',
        participants: ['P6', 'P7'],
      },
      {
        id: '4.2',
        title: 'Language goes beyond English skills',
        text: 'P7 had no obvious language problems but struggled with strong local accents. P2 had to learn how local small talk with strangers works — when to respond and whether to continue.',
        participants: ['P2', 'P7'],
      },
      {
        id: '4.3',
        title: 'Ongoing social and academic challenges',
        text: 'P3 kept meeting new challenges across courses and group members. P6 found friendships with local students difficult, and friendships with other Chinese students also took time.',
        participants: ['P3', 'P6'],
      },
    ],
    quotes: [
      { text: 'now I can live here more independently', participant: 'P6', context: 'While also feeling that “making friends became more difficult”' },
      { text: 'within the first three months, I had become familiar with local routes, shopping, and the surrounding area.', participant: 'P7' },
      {
        text: 'After living here for some time, I became more familiar with daily life. However, I still faced new challenges in different courses and had to adjust to working with different group members.',
        participant: 'P3',
      },
    ],
    scenario: {
      label: 'Everyday scenario',
      text: 'A stranger asks “How are you?” The student understands every word, but is unsure how much to say, or whether to continue the conversation.',
      participants: ['P2'],
    },
    implication:
      'Support should be ongoing and extend beyond logistics — to language in context, social life and study — at the pace each student needs.',
  },
]
