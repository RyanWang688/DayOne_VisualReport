import { placeholder, type Editable } from './types'

export const interviewGuide = {
  duration: '~15 minutes (core questions); interviews ran 20–30 minutes with follow-ups',
  parts: [
    { part: 'Background', questions: ['Could you briefly tell me when you first came to Melbourne (or other city) and whether it was your first time living overseas?'] },
    {
      part: 'Before Arrival',
      questions: [
        'Before coming to Melbourne, what did you do to prepare for living here?',
        'Looking back, was there anything you wish you had known or prepared for before arriving?',
      ],
    },
    {
      part: 'First Arrival',
      questions: [
        'Can you walk me through your first day or first few days in Melbourne? What did you need to do?',
        'During those first few days, was there any moment when you didn’t know what to do or how things worked?',
      ],
    },
    {
      part: 'Settling In',
      questions: [
        'During your first few weeks in Melbourne, what things did you have to learn or get used to?',
        'Can you remember a specific situation where you knew some basic information, but still weren’t sure what to do when it actually happened?',
        'Were there any local expressions, behaviours, or everyday habits that you found difficult to understand or get used to?',
        'Looking back, at which stage did you feel the most worried or uncertain: before arriving, when you first arrived, or while settling in?',
      ],
    },
    { part: 'Daily Life & Adapting', questions: ['After living in Melbourne for a while, what became easier, and what situations were still difficult or unfamiliar?'] },
    {
      part: 'Reflection',
      questions: ['If you could go back and prepare yourself before coming to Melbourne, what would you want your past self to know or experience beforehand?'],
    },
  ],
}

export const acknowledgements: Editable = placeholder('Acknowledgements — optional, to be written by the team')

/** Customer journey map from the A0 poster. Statements are journey-map voice, not participant quotes. */
export const journeyMap = [
  { stage: 'Before Arrival', voice: 'I think I’m prepared.', actions: ['Search online', 'Ask friends', 'Read forums'], pain: 'Information is fragmented and hard to trust.' },
  { stage: 'First Days', voice: 'Where do I start?', actions: ['Arrive in Melbourne', 'Find accommodation', 'Learn transport system'], pain: 'Reality is different from what is expected.' },
  { stage: 'Facing a Problem', voice: 'What am I supposed to do?', actions: ['See a doctor', 'Use public transport', 'Complete driving process'], pain: 'Unfamiliar processes, confusing information, new terminology.' },
  { stage: 'Trial & Error', voice: 'Did I do this wrong?', actions: ['Make mistakes', 'Ask others for help', 'Search again'], pain: 'Learning often happens through trial and error.' },
  { stage: 'Adapting', voice: 'Now I know what to do.', actions: ['Feel more confident', 'Handle situations independently', 'Explore more of Melbourne'], pain: 'Gain confidence and a sense of belonging.' },
]
