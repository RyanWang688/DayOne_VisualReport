import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { clusters } from '../content/affinity'
import type { ParticipantId } from '../content/types'

/** Full-screen pin board for one affinity cluster. */
export function ClusterViewer({ index, onClose, onNavigate }: { index: number | null; onClose: () => void; onNavigate: (i: number) => void }) {
  const returnFocus = useRef<HTMLElement | null>(null)
  const [hover, setHover] = useState<ParticipantId | null>(null)
  const open = index !== null

  useEffect(() => {
    if (!open) return
    returnFocus.current ??= document.activeElement as HTMLElement
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (open) return
    returnFocus.current?.focus()
    returnFocus.current = null
  }, [open])

  useEffect(() => {
    if (index === null) return
    const n = clusters.length
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate((index + 1) % n)
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + n) % n)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, onClose, onNavigate])

  const c = index !== null ? clusters[index] : null

  return (
    <AnimatePresence>
      {c && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/50 backdrop-blur-[2px] sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-title"
            className="flex max-h-[92svh] w-full max-w-6xl flex-col overflow-hidden bg-canvas shadow-2xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex flex-wrap items-start justify-between gap-4 border-b border-line bg-paper p-4 sm:p-6">
              <div className="min-w-0">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em]" style={{ color: c.color.ink }}>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.color.ink }} aria-hidden />
                  Theme {String(c.index + 1).padStart(2, '0')} of {clusters.length}
                </p>
                <h3 id="cv-title" className="mt-1 text-[clamp(1.4rem,3vw,2.2rem)] font-bold">
                  {c.title}
                </h3>
                <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[13px] text-muted">
                  {c.notes.length} notes from
                  {c.participants.map((p) => (
                    <span
                      key={p}
                      onMouseEnter={() => setHover(p)}
                      onMouseLeave={() => setHover(null)}
                      className={`pill-p cursor-default ${hover === p ? 'border-blue bg-blue text-white' : ''}`}
                    >
                      {p}
                    </span>
                  ))}
                </p>
              </div>
              <div className="flex shrink-0 gap-1.5">
                <IconButton label="Previous cluster" onClick={() => onNavigate((c.index - 1 + clusters.length) % clusters.length)}>
                  <ChevronLeft size={18} aria-hidden />
                </IconButton>
                <IconButton label="Next cluster" onClick={() => onNavigate((c.index + 1) % clusters.length)}>
                  <ChevronRight size={18} aria-hidden />
                </IconButton>
                <IconButton label="Close" onClick={onClose} autoFocus>
                  <X size={18} aria-hidden />
                </IconButton>
              </div>
            </header>

            <div className="overflow-y-auto bg-[#ece6d6] bg-[radial-gradient(rgba(14,20,34,0.08)_1px,transparent_1px)] [background-size:14px_14px] p-5 sm:p-8">
              <ul key={c.index} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {c.notes.map((n, i) => {
                  const on = hover === n.participant
                  const dim = hover && !on
                  const tilt = [-2.2, 1.4, -0.8, 2, -1.6, 0.9][i % 6]
                  return (
                    <motion.li
                      key={n.id}
                      initial={{ opacity: 0, y: -24, rotate: tilt * 4, scale: 0.92 }}
                      animate={{ opacity: dim ? 0.35 : 1, y: 0, rotate: tilt, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 160, damping: 15, delay: Math.min(i * 0.035, 0.6) }}
                      whileHover={{ rotate: 0, scale: 1.03, transition: { duration: 0.15 } }}
                      onMouseEnter={() => setHover(n.participant)}
                      onMouseLeave={() => setHover(null)}
                      className="relative flex min-h-[150px] flex-col justify-between p-4 pt-6 shadow-[0_2px_3px_rgba(14,20,34,0.12),0_14px_22px_-14px_rgba(14,20,34,0.45)]"
                      style={{ backgroundColor: c.color.note, boxShadow: on ? `0 0 0 2px ${c.color.ink}, 0 14px 22px -14px rgba(14,20,34,0.45)` : undefined }}
                    >
                      <span aria-hidden className="absolute -top-2 left-1/2 h-4 w-14 -translate-x-1/2 rotate-[-2deg] bg-white/60 shadow-sm" />
                      <p className="font-display text-[16px] font-medium leading-snug text-ink">{n.text}</p>
                      <p className="mt-4 flex items-center justify-between font-mono text-[11px] text-ink/50">
                        <span>Code</span>
                        <span className="rounded-[2px] px-1.5 py-px" style={on ? { backgroundColor: c.color.ink, color: '#fff' } : { backgroundColor: 'rgba(14,20,34,0.08)' }}>
                          {n.participant}
                        </span>
                      </p>
                    </motion.li>
                  )
                })}
              </ul>
            </div>
            <p className="hidden border-t border-line bg-paper px-6 py-2 font-mono text-[11px] text-faint sm:block">
              ← → to move between clusters · Esc to close · hover a note to see the same participant’s other notes
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function IconButton({ label, onClick, children, autoFocus }: { label: string; onClick: () => void; children: React.ReactNode; autoFocus?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      autoFocus={autoFocus}
      className="grid h-10 w-10 place-items-center rounded-full border border-line bg-paper text-ink-2 transition-colors hover:border-ink hover:text-ink"
    >
      {children}
    </button>
  )
}
