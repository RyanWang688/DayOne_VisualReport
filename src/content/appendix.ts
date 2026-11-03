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

/** Usability evaluation guide used with the initial hi-fi prototype (team's evaluation script). */
export type EvalTask = { title: string; scenario?: string; prompt?: string; questions: string[] }
export const evaluationGuide = {
  duration: 'Approximately 30–35 minutes · background interview and prototype evaluation',
  intro: [
    'Thank you for participating in our evaluation of Day One.',
    'Day One is an application concept designed to help international students become more familiar with daily life in Melbourne.',
    'During this session, you will explore several features, including trip planning, healthcare guidance, and location-based assistance.',
    'Some parts of the prototype are not fully functional. You may be guided through certain screens during the session.',
    'There are no right or wrong answers. We are interested in your understanding, experiences, and opinions. You are welcome to share anything you find confusing, useful, or unnecessary.',
  ],
  parts: [
    {
      part: 'Background questions',
      time: '~5 min',
      tasks: [
        {
          title: '',
          questions: [
            'How long have you been living in Melbourne? How familiar are you with daily life here?',
            'Have you experienced any difficulties understanding or completing everyday tasks in Melbourne? How did you solve them?',
            'What applications or resources do you normally use to find directions or information about local services?',
            'Have you ever booked an appointment with or visited a GP in Australia? What was your experience?',
          ],
        },
      ],
    },
    {
      part: 'Trip feature',
      time: '~8 min',
      scenario: 'Imagine you have recently arrived in Melbourne. You are planning to visit the University of Melbourne, but you are not in a hurry and would like to explore some interesting places along the way.',
      tasks: [
        { title: 'Task 1 — Plan a trip', prompt: 'Explore the map and try to plan your journey.', questions: ['Where would you start to plan your trip?', 'What do you think the Trip feature is designed to do?'] },
        {
          title: 'Task 2 — Explore the route',
          prompt: 'Review the suggested route and the information provided.',
          questions: [
            'What do you expect to experience along this route?',
            'Is there enough information to help you decide whether to start the trip?',
            'Would you prefer to choose the places you visit or follow a suggested route?',
            'When would you use this feature instead of a regular navigation application?',
          ],
        },
        { title: 'Task 3 — During the trip', prompt: 'Imagine you have started your journey.', questions: ['Can you tell where you are in the journey and what you should do next?', 'How would you check the next destination or pause your trip?'] },
        {
          title: 'Task 4 — Complete the trip',
          prompt: 'Review the trip completion screen.',
          questions: ['What information does this screen provide?', 'In what situations would you use this feature?', 'What would you improve about the Trip experience?'],
        },
      ],
    },
    {
      part: 'Hospital journey',
      time: '~10–12 min',
      scenario: 'Imagine you have recently arrived in Melbourne and need to visit a doctor for a general, non-emergency health concern. However, you are unfamiliar with the Australian healthcare system.',
      tasks: [
        {
          title: 'Task 1 — Find the Hospital Journey',
          prompt: 'Explore the application and locate the healthcare guidance feature.',
          questions: ['Where would you go to learn how to visit a doctor?', 'What do you expect the Hospital Journey to help you do?', 'Are the steps and their order easy to understand?'],
        },
        {
          title: 'Task 2 — Explore the journey',
          prompt: 'Go through the available steps of the Hospital Journey. As you explore, consider the following questions:',
          questions: [
            'What is each step trying to explain?',
            'Do you understand what you would need to do next?',
            'Are there any unfamiliar words or confusing instructions?',
            'Is the information sufficient for you to take action in a real-life situation?',
          ],
        },
        {
          title: 'Task 3 — Overall experience',
          prompt: 'After exploring the Hospital Journey:',
          questions: [
            'If you needed to book a medical appointment, would you know where to start? What would you still be unsure about?',
            'Which part of the Journey was most helpful?',
            'Was there anything unnecessary, confusing, or missing?',
            'Would you prefer to read the entire Journey beforehand or access individual steps when needed?',
            'Would you prefer text, images, or videos to explain these processes?',
          ],
        },
      ],
    },
    {
      part: 'Tools',
      time: '~5–6 min',
      tasks: [
        {
          title: 'Task 1 — AR Lens',
          scenario: 'Imagine you are travelling on a Melbourne tram and notice an unfamiliar card-reading device. You want to understand what it is and how to use it.',
          prompt: 'Explore the AR Lens prototype.',
          questions: [
            'How do you think this feature works?',
            'Does the information provided answer what you would want to know?',
            'In what situations would you use this feature?',
            'What information would you want to see immediately after scanning an object?',
            'What would you expect to happen if the application identified something incorrectly?',
          ],
        },
        {
          title: 'Task 2 — Ask This Place',
          scenario: 'Imagine you have arrived at a medical clinic and need help communicating with the reception staff or understanding what to do next.',
          prompt: 'Explore the Ask This Place feature.',
          questions: [
            'Where would you start if you needed help?',
            'Are the suggested questions relevant to your needs? What else would you want to ask?',
            'How is this feature different from searching online or using a general chatbot?',
            'Does the location information help you understand the feature?',
            'What additional information would make you more confident about following its guidance?',
          ],
        },
      ],
    },
    {
      part: 'Overall feedback',
      time: '~2 min',
      tasks: [
        {
          title: '',
          questions: [
            'Which Day One feature would be most useful to you? Why?',
            'Which feature would you be least likely to use? Why?',
            'If you could change or improve one thing about Day One, what would it be?',
            'Is there anything else you would like to share about your experience?',
          ],
        },
      ],
    },
  ] as { part: string; time: string; scenario?: string; tasks: EvalTask[] }[],
  thanks:
    'Thank you for taking part in the Day One evaluation. Your feedback will help us improve the application and better understand how we can support international students adapting to life in Melbourne.',
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
