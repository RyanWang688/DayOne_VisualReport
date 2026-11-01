/** A value that is either confirmed text or a labelled placeholder. */
export type Placeholder = { placeholder: true; label: string }
export type Editable = string | Placeholder

export const placeholder = (label: string): Placeholder => ({ placeholder: true, label })

export const isPlaceholder = (v: Editable): v is Placeholder =>
  typeof v === 'object' && v !== null && 'placeholder' in v

/** Participant ID used throughout the field study (P1–P8). */
export type ParticipantId = 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'P7' | 'P8'

/** A participant quote. All interviews were conducted in Chinese; quotes are the team's English translation. */
export type Quote = { text: string; participant: ParticipantId; context?: string }

/** Key into `references` (src/content/references.ts). */
export type RefKey =
  | 'avouris2012'
  | 'freeman2019'
  | 'gebregergis2025'
  | 'hernandez2021'
  | 'hertzum2019'
  | 'men2024'
  | 'metcalfe2017'
  | 'nourian2026'
  | 'pekerti2020'
  | 'smith2011'
  | 'xiong2025'
  | 'yoon2017'
