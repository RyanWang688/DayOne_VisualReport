import { useId, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, CircleDashed } from 'lucide-react'
import { isPlaceholder, type Editable, type ParticipantId, type RefKey } from '../content/types'
import { refByKey } from '../content/references'

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

export function SectionHeader({ num, label, title, intro, tone = 'light' }: { num: string; label: string; title: ReactNode; intro?: ReactNode; tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark'
  return (
    <header className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12">
      <Reveal className="md:col-span-3">
        <div className={`flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.14em] ${dark ? 'text-white/60' : 'text-muted'}`}>
          {num && (
            <>
              <span className={dark ? 'text-white' : 'text-blue'}>{num}</span>
              <span className={`h-px w-8 ${dark ? 'bg-white/30' : 'bg-line'}`} />
            </>
          )}
          <span>{label}</span>
        </div>
      </Reveal>
      <div className="md:col-span-9">
        <Reveal>
          <h2 className={`text-[clamp(2.1rem,5vw,4.2rem)] font-bold ${dark ? 'text-white' : 'text-ink'}`}>{title}</h2>
        </Reveal>
        {intro && (
          <Reveal delay={0.08}>
            <p className={`mt-6 max-w-[62ch] text-lg leading-relaxed ${dark ? 'text-white/75' : 'text-muted'}`}>{intro}</p>
          </Reveal>
        )}
      </div>
    </header>
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

export function SourceTag({ children, tone = 'light' }: { children: ReactNode; tone?: 'light' | 'dark' }) {
  return <p className={`font-mono text-[12px] uppercase tracking-[0.12em] ${tone === 'dark' ? 'text-white/45' : 'text-faint'}`}>Source · {children}</p>
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
