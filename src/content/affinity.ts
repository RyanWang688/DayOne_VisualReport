import type { ParticipantId } from './types'

/**
 * Affinity map data — copied verbatim from the team's coding table.
 * Format: [cluster title, participant, codes separated by ";"].
 * Edit the table below directly; the site splits each row into sticky notes.
 */
const table: [string, ParticipantId, string][] = [
  ['Information Source and Reliability', 'P1', 'Got most pre-arrival information from senior students and student groups; Found student-run groups more useful than official groups; Felt online information was less real than personal experience.'],
  ['Information Source and Reliability', 'P2', 'Relied heavily on Xiaohongshu, Chinese platforms, and agents; Later found some options recommended by agents were expensive; Did not know there were more choices for internet and phone plans.'],
  ['Information Source and Reliability', 'P3', 'Read online banking guides but still did not understand what to do in practice; Went back to Xiaohongshu for more information after struggling.'],
  ['Information Source and Reliability', 'P4', 'Mainly used Xiaohongshu to learn about transport, renting, and daily life before arrival.'],
  ['Information Source and Reliability', 'P5', 'Using social media (XiaoHongShu) for pre-arrival preparation; Difficult to verify whether online information is correct; Online information exaggerates actual circumstances.'],
  ['Information Source and Reliability', 'P6', 'Access to information from a peer who lives in Melbourne; Value information from peers in Melbourne more than information from social media or agents; Online information mismatching actual experience (safety).'],
  ['Information Source and Reliability', 'P7', 'Using maps and online search to prepare before arrival; Having relatives who lived in Melbourne 10 years ago; Uncertain about whether information provided by relatives was still useful; Preferring up-to-date information from people living in Melbourne.'],
  ['Information Source and Reliability', 'P8', 'Lack of information sources from people living in Melbourne; Using information from social media, agents, and Google Maps; Direct experience being more valuable than online information.'],
  ['Accommodation and Housing', 'P2', 'Arranged accommodation before arrival; Relied on agents for rental information; Needed to buy household items after moving in.'],
  ['Accommodation and Housing', 'P3', 'Found a roommate online before arrival; Found a sublet through Xiaohongshu; Gradually bought furniture and household items after arrival.'],
  ['Accommodation and Housing', 'P4', 'Searched for rental information before arrival.'],
  ['Accommodation and Housing', 'P5', 'Rely on an agent for renting a house; Lack of experience with shared housing; Difficulty resolving housemate conflict through formal support.'],
  ['Accommodation and Housing', 'P6', 'Using student accommodation as a lower-risk transition.'],
  ['Accommodation and Housing', 'P7', 'Choosing student accommodation.'],
  ['Unfamiliar Local Systems and Procedures', 'P1', 'Had safety concerns that affected how and when they travelled; Felt unfamiliar with tipping and tax practices.'],
  ['Unfamiliar Local Systems and Procedures', 'P2', 'Had trouble understanding how bank queues worked; Still unfamiliar with local transport procedures after settling in; Found conflicting information about Myki rules.'],
  ['Unfamiliar Local Systems and Procedures', 'P3', 'Could not tell the difference between trains and trams; Could not find the station entrance even though it was nearby; Did not know the train line would split; Ended up taking the wrong train; Read banking guides but still did not know what to do in practice; Did not know they had to wait to be seated at a restaurant.'],
  ['Unfamiliar Local Systems and Procedures', 'P4', 'Did not know how buying and weighing fruit worked in a supermarket; Found the study pace faster than expected.'],
  ['Unfamiliar Local Systems and Procedures', 'P5', 'Unfamiliar with local transportation when first arriving.'],
  ['Unfamiliar Local Systems and Procedures', 'P6', 'Adapting fast to unfamiliar everyday systems.'],
  ['Unfamiliar Local Systems and Procedures', 'P7', 'Knowing transport routes but not knowing the full usage procedures; Encountering unexpected local norms and business practices.'],
  ['Unfamiliar Local Systems and Procedures', 'P8', 'Unfamiliar with implicit local rules (tram priority seats); Still unfamiliar with local transport procedures even after settling in for some time.'],
  ['Access and Understand Medical Service', 'P2', 'Did not know what student insurance would cover; Did not know how the local healthcare process worked; Felt worried about getting sick because the system was unfamiliar.'],
  ['Access and Understand Medical Service', 'P4', 'Did not know when a health problem required seeing a doctor; Found the healthcare system unfamiliar; Found long appointment waiting times difficult.'],
  ['Access and Understand Medical Service', 'P5', 'Having problems using medical services and understanding healthcare costs.'],
  ['Access and Understand Medical Service', 'P6', 'Uncertain about how to access healthcare.'],
  ['Access and Understand Medical Service', 'P7', 'Have no idea how to use medical services.'],
  ['Access and Understand Medical Service', 'P8', 'Difficulty using medical services.'],
  ['Seeking Help and External Support', 'P1', 'Relied on senior students for practical information; Learned from student groups.'],
  ['Seeking Help and External Support', 'P2', 'Needed help with practical tasks that were difficult to complete alone; Felt a student mutual-help system would be useful.'],
  ['Seeking Help and External Support', 'P3', 'Asked strangers for help when they could not find the station; Switched to Uber after being unable to solve the transport problem; Searched online again when banking information was unclear.'],
  ['Seeking Help and External Support', 'P4', 'Asked supermarket staff for help; Felt more reassured when talking to friends facing similar problems.'],
  ['Seeking Help and External Support', 'P5', 'Depend on peers for early settlement tasks; Learning through experience and seeking help.'],
  ['Seeking Help and External Support', 'P6', 'Seeking university guidance for unfamiliar procedures.'],
  ['Seeking Help and External Support', 'P7', 'Directly seeking help from strangers when facing problems.'],
  ['Seeking Help and External Support', 'P8', 'Getting guidance and help from student accommodation.'],
  ['Learning and Adaptation Through Direct Experience', 'P1', 'Learned how things worked mainly by experiencing them in real life; Became more confident after experiencing similar situations repeatedly.'],
  ['Learning and Adaptation Through Direct Experience', 'P2', 'Gradually learned local communication through repeated interactions; Became more familiar with everyday life by trying things.'],
  ['Learning and Adaptation Through Direct Experience', 'P3', 'Learned the transport system after getting lost and making mistakes; Found banking easier after actually using it; Only realised the restaurant rule after making the mistake; Learned local norms after seeing related information later; Found most problems manageable after actually experiencing them.'],
  ['Learning and Adaptation Through Direct Experience', 'P4', 'Figured out the supermarket process by watching other people; Gradually became more confident through everyday experience.'],
  ['Learning and Adaptation Through Direct Experience', 'P5', 'Applying previous travel experience upon arrival; Growing confidence through local experience.'],
  ['Learning and Adaptation Through Direct Experience', 'P6', 'Believing that some problems can only be handled after arrival; Learning about the local environment through independent exploration; Learning transportation through mistakes and repeated use; Becoming familiar with a new environment can be easier with maps and payment access.'],
  ['Learning and Adaptation Through Direct Experience', 'P7', 'Learning about the local environment through independent exploration; Getting familiar with the local environment through repeated exploration and experience.'],
  ['Learning and Adaptation Through Direct Experience', 'P8', 'Resolving unfamiliar situations through repeated practice and help-seeking; Wanting a short trip before actually settling in.'],
  ['Language and Everyday Communication', 'P1', 'Became more comfortable speaking English through repeated conversations; Still found it difficult to communicate naturally with locals.'],
  ['Language and Everyday Communication', 'P2', 'Found greetings and small talk difficult to understand; Did not know how much to say when someone asked "How are you?"; Gradually understood that these conversations were often just polite small talk.'],
  ['Language and Everyday Communication', 'P4', 'Had difficulty explaining the supermarket problem to staff; Became more confident communicating with other people.'],
  ['Language and Everyday Communication', 'P6', 'Language becoming more prominent after settling in; Difficulty managing further everyday communication.'],
  ['Language and Everyday Communication', 'P7', 'Having no problem communicating due to good language skills; Language ability reducing difficulty with local services; Language confidence enabling independent problem-solving; Still needing to adapt to local conversational norms despite strong English ability.'],
  ['Language and Everyday Communication', 'P8', 'Difficulty understanding fast and locally specific English; Building communication confidence through repeated real-world interaction.'],
  ['Social and Cultural Adaptation', 'P1', 'Felt unfamiliar with tipping culture; Had difficulty building deeper relationships with local people; Felt they could survive locally but had not fully integrated.'],
  ['Social and Cultural Adaptation', 'P2', 'Found local communication styles different from China; Needed to adjust to different social expectations.'],
  ['Social and Cultural Adaptation', 'P3', 'Did not know the restaurant seating etiquette; Later realised their behaviour might have been impolite.'],
  ['Social and Cultural Adaptation', 'P4', 'Adjusted lifestyle and expectations to fit local habits and pace.'],
  ['Social and Cultural Adaptation', 'P5', 'Difficulty understanding local social and cultural context.'],
  ['Social and Cultural Adaptation', 'P6', 'Social connection becoming difficult due to language barriers.'],
  ['Social and Cultural Adaptation', 'P8', 'Encountering unexpected local lifestyles; Having problems socialising with people.'],
  ['Anxious Before Arrival', 'P1', 'Felt most uncertain before arrival because information did not feel real.'],
  ['Anxious Before Arrival', 'P2', 'Had safety concerns before arrival that were different from reality.'],
  ['Anxious Before Arrival', 'P3', 'Felt most worried before arrival; Imagined many possible problems before coming; Found most problems were actually solvable after arrival.'],
  ['Anxious Before Arrival', 'P6', 'Most anxious about the before-arrival stage.'],
  ['Anxious Before Arrival', 'P7', 'Most anxious about the pre-arrival stage due to the inability to verify information.'],
  ['Personal Independence and Self-Management', 'P1', 'Became more confident handling everyday situations; Learned to actively communicate with teachers and advocate for themselves.'],
  ['Personal Independence and Self-Management', 'P2', 'Adjusted to more independent university learning; Became more comfortable handling daily life independently.'],
  ['Personal Independence and Self-Management', 'P3', 'Became more capable of handling everyday problems after repeated experience; Continued adapting to new academic and group-work challenges.'],
  ['Personal Independence and Self-Management', 'P4', 'Had to learn basic independent living skills such as cooking; Adjusted expectations and lifestyle to fit life in Melbourne; Became more confident expressing personal opinions.'],
  ['Personal Independence and Self-Management', 'P8', 'Not used to self-discipline and time management.'],
]

export type AffinityNote = { id: string; cluster: number; participant: ParticipantId; text: string }
export type AffinityCluster = {
  index: number
  title: string
  notes: AffinityNote[]
  participants: ParticipantId[]
  /** Sticky-note fill and a darker ink tone for labels. */
  color: { note: string; ink: string }
}

/** One muted colour per cluster, in table order. */
const palette = [
  { note: '#fbe7a1', ink: '#8a6400' },
  { note: '#f9d5bd', ink: '#a24d16' },
  { note: '#f6cdd6', ink: '#a3324f' },
  { note: '#ddd5f4', ink: '#5e45b0' },
  { note: '#cfe0f8', ink: '#2453b5' },
  { note: '#cdeadb', ink: '#24774a' },
  { note: '#c9e7e9', ink: '#17707a' },
  { note: '#ebe0c9', ink: '#7a5a22' },
  { note: '#ecd3ea', ink: '#86367f' },
  { note: '#e1ecc2', ink: '#56701a' },
]

export const participants: ParticipantId[] = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8']

export const clusters: AffinityCluster[] = (() => {
  const titles = [...new Set(table.map((r) => r[0]))]
  return titles.map((title, index) => {
    const rows = table.filter((r) => r[0] === title)
    const notes = rows.flatMap(([, participant, codes], r) =>
      codes
        .split(';')
        .map((c) => c.trim().replace(/\.$/, ''))
        .filter(Boolean)
        .map((text, i) => ({ id: `${index}-${r}-${i}`, cluster: index, participant, text })),
    )
    return { index, title, notes, participants: rows.map((r) => r[1]), color: palette[index % palette.length] }
  })
})()

export const totalNotes = clusters.reduce((n, c) => n + c.notes.length, 0)
