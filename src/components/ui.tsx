import { useId, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, CircleDashed } from 'lucide-react'
import { isPlaceholder, type Editable, type ParticipantId, type RefKey } from '../content/types'
import { refByKey } from '../content/references'
import { partByKey, sectionById, type SectionId } from '../content/sections'

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

/** Fade-up on first view. Motion respects reduced-motion through <MotionConfig reducedMotion="user">. */
export function Reveal({ children, delay = 0, className, as = 'div' }: { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' | 'article' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  )
}

/**
 * Section opener: a large chapter number and name on a rule that draws itself in,
 * then the guiding question and the answer as a measured headline.
 */
export function SectionHeader({ id, title, intro, tone = 'light', titleId }: { id: SectionId; title?: ReactNode; intro?: ReactNode; tone?: 'light' | 'dark'; titleId?: string }) {
  const s = sectionById[id]
  const dark = tone === 'dark'
  return (
    <header className="mb-14 md:mb-16">
      <Reveal>
        <div className={`relative flex items-end justify-between gap-6 border-b-2 pb-4 ${dark ? 'border-white/25' : 'border-ink/15'}`}>
          <div className="flex items-end gap-4 sm:gap-6">
            {s.num ? (
              <span className={`font-display text-[clamp(3rem,6.5vw,5rem)] font-bold leading-[0.78] tracking-[-0.045em] ${dark ? 'text-sun' : 'text-blue'}`}>{s.num}</span>
            ) : (
              <span aria-hidden className={`mb-1.5 block h-8 w-8 rounded-[4px] sm:h-10 sm:w-10 ${dark ? 'bg-sun' : 'bg-blue'}`} />
            )}
            <div>
              <p className={`font-mono text-[12px] uppercase tracking-[0.12em] ${dark ? 'text-white/50' : 'text-faint'}`}>{partByKey[s.part].label}</p>
              <p className={`mt-1 font-display text-[clamp(1.2rem,2vw,1.6rem)] font-semibold leading-none tracking-tight ${dark ? 'text-white' : 'text-ink'}`}>{s.label}</p>
            </div>
          </div>
          <p className={`hidden max-w-[30ch] pb-0.5 text-right font-serif text-[1.15rem] italic leading-snug md:block ${dark ? 'text-sun' : 'text-blue'}`}>{s.question}</p>
          {/* accent that draws across the rule when the chapter arrives */}
          <motion.span
            aria-hidden
            className={`absolute -bottom-[2px] left-0 h-[2px] w-full origin-left ${dark ? 'bg-sun' : 'bg-blue'}`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          />
        </div>
      </Reveal>
      {title ? (
        <div className="mt-8 grid md:mt-10 md:grid-cols-12">
          <div className="md:col-span-9 md:col-start-4">
            <Reveal>
              <p className={`font-serif text-[1.15rem] italic leading-snug md:hidden ${dark ? 'text-sun' : 'text-blue'}`}>{s.question}</p>
              <h2 id={titleId} className={`mt-2 max-w-[28ch] text-[clamp(1.65rem,2.8vw,2.4rem)] font-semibold leading-[1.15] tracking-[-0.02em] md:mt-0 ${dark ? 'text-white' : 'text-ink'}`}>
                {title}
              </h2>
            </Reveal>
            {intro && (
              <Reveal delay={0.08}>
                <p className={`mt-5 max-w-[62ch] text-[17px] leading-relaxed ${dark ? 'text-white/75' : 'text-muted'}`}>{intro}</p>
              </Reveal>
            )}
          </div>
        </div>
      ) : (
        // No headline: the chapter rule above names the section; the intro reads as the lead.
        <>
          <h2 id={titleId} className="sr-only">
            {s.label}
          </h2>
          <p className={`mt-6 font-serif text-[1.15rem] italic leading-snug md:hidden ${dark ? 'text-sun' : 'text-blue'}`}>{s.question}</p>
          {intro && (
            <Reveal delay={0.05}>
              <p className={`mt-4 max-w-[68ch] text-[clamp(1.05rem,1.35vw,1.2rem)] leading-relaxed md:mt-8 ${dark ? 'text-white/80' : 'text-ink-2'}`}>{intro}</p>
            </Reveal>
          )}
        </>
      )}
    </header>
  )
}

/** Standard subsection heading: "N.N · Label" eyebrow, a headline, an optional lead and an optional right-hand slot. */
export function SubHeader({ num, label, title, lead, aside }: { num: string; label: string; title: ReactNode; lead?: ReactNode; aside?: ReactNode }) {
  return (
    <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
      <div className="max-w-[62ch]">
        <p className="eyebrow text-blue">
          {num} · {label}
        </p>
        <h3 className="mt-2 text-[clamp(1.4rem,2.2vw,1.85rem)] font-semibold leading-[1.2]">{title}</h3>
        {lead && <p className="mt-3 text-[15px] text-muted">{lead}</p>}
      </div>
      {aside}
    </Reveal>
  )
}

/** Renders confirmed text, or a clearly labelled placeholder. */
export function Ph({ value, className = '' }: { value: Editable; className?: string }) {
  if (!isPlaceholder(value)) return <span className={className}>{value}</span>
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-[3px] border border-dashed border-sun bg-sun-soft px-2 py-0.5 font-mono text-[12px] text-ink-2 ${className}`}>
      <CircleDashed size={12} aria-hidden />
      <span>
        <span className="sr-only">Placeholder: </span>
        {value.label}
      </span>
    </span>
  )
}

export function Cite({ refs }: { refs: RefKey[] }) {
  return (
    <span className="whitespace-nowrap text-muted">
      (
      {refs.map((k, i) => (
        <span key={k}>
          {i > 0 && '; '}
          <a href={`#ref-${k}`} className="underline decoration-line underline-offset-2 hover:text-blue hover:decoration-blue" title={refByKey[k].apa}>
            {refByKey[k].cite}
          </a>
        </span>
      ))}
      )
    </span>
  )
}

export function PBadge({ id, active, onHover }: { id: ParticipantId; active?: boolean; onHover?: (id: ParticipantId | null) => void }) {
  return (
    <span
      className={`pill-p transition-colors ${active ? 'border-blue bg-blue text-white' : ''}`}
      onMouseEnter={onHover ? () => onHover(id) : undefined}
      onMouseLeave={onHover ? () => onHover(null) : undefined}
    >
      {id}
    </span>
  )
}

export function Expandable({ label, children, tone = 'light', defaultOpen = false }: { label: ReactNode; children: ReactNode; tone?: 'light' | 'dark'; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  const dark = tone === 'dark'
  return (
    <div className={`border-t ${dark ? 'border-white/15' : 'border-line'}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={`group flex w-full items-center justify-between gap-4 py-4 text-left text-[15px] font-medium transition-colors ${dark ? 'text-white hover:text-sun' : 'text-ink hover:text-blue'}`}
      >
        <span>{label}</span>
        <ChevronDown size={18} aria-hidden className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function PhoneFrame({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[28px] border-[6px] border-ink bg-ink shadow-[0_30px_60px_-30px_rgba(14,20,34,0.45)] transition-transform duration-300 ease-out group-hover:-translate-y-1 ${className}`}
    >
      <img src={asset(src)} alt={alt} loading="lazy" decoding="async" className="block h-full w-full rounded-[22px] object-cover object-top" />
    </div>
  )
}
