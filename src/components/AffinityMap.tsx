import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { Maximize2, Minimize2, X } from 'lucide-react'
import { clusters, participants, type AffinityCluster } from '../content/affinity'
import type { ParticipantId } from '../content/types'

const PREVIEW = 4

export function AffinityMap() {
  const [cluster, setCluster] = useState<number | null>(null)
  const [person, setPerson] = useState<ParticipantId | null>(null)
  const [hover, setHover] = useState<ParticipantId | null>(null)
  const [expanded, setExpanded] = useState<Set<number>>(new Set())

  const highlight = hover ?? person
  const visible = cluster === null ? clusters : clusters.filter((c) => c.index === cluster)
  const toggleExpand = (i: number) =>
    setExpanded((s) => {
      const n = new Set(s)
      n.has(i) ? n.delete(i) : n.add(i)
      return n
    })

  const personCount = useMemo(
    () => (person ? clusters.reduce((n, c) => n + c.notes.filter((x) => x.participant === person).length, 0) : 0),
    [person],
  )

  return (
    <div className="border border-line bg-paper">
      {/* Controls */}
      <div className="flex flex-col gap-4 border-b border-line p-4 sm:p-6">
        <div>
          <p id="am-cluster-label" className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
            Filter by cluster
          </p>
          <div role="group" aria-labelledby="am-cluster-label" className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 md:flex-wrap md:overflow-visible">
            <Chip pressed={cluster === null} onClick={() => setCluster(null)}>
              All clusters
            </Chip>
            {clusters.map((c) => (
              <Chip key={c.index} pressed={cluster === c.index} onClick={() => setCluster(cluster === c.index ? null : c.index)}>
                <span className="font-mono text-[11px] opacity-60">{String(c.index + 1).padStart(2, '0')}</span> {c.title}
                <span className="ml-1 font-mono text-[11px] opacity-60">{c.notes.length}</span>
              </Chip>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p id="am-person-label" className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
            Trace a participant
          </p>
          <div role="group" aria-labelledby="am-person-label" className="flex flex-wrap gap-1.5">
            {participants.map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={person === p}
                onClick={() => setPerson(person === p ? null : p)}
                className={`h-8 min-w-10 rounded-[3px] border px-2 font-mono text-[12px] transition-colors ${
                  person === p ? 'border-blue bg-blue text-white' : 'border-line text-ink-2 hover:border-ink'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <p className="text-[13px] text-muted" aria-live="polite">
            {person ? `${person}: ${personCount} notes highlighted` : 'Hover any note to see related notes from the same participant.'}
          </p>
          {(person || cluster !== null) && (
            <button
              type="button"
              onClick={() => {
                setPerson(null)
                setCluster(null)
              }}
              className="ml-auto inline-flex items-center gap-1 text-[13px] text-muted hover:text-ink"
            >
              <X size={14} aria-hidden /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Board */}
      <LayoutGroup>
        <motion.div layout className={`grid gap-4 bg-canvas p-4 sm:p-6 ${cluster === null ? 'sm:grid-cols-2 xl:grid-cols-3' : ''}`}>
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((c) => (
              <ClusterCard
                key={c.index}
                c={c}
                focused={cluster !== null}
                open={cluster !== null || expanded.has(c.index)}
                onToggle={() => toggleExpand(c.index)}
                highlight={highlight}
                onHover={setHover}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
      <p className="border-t border-line px-4 py-3 font-mono text-[11px] text-faint sm:px-6">
        Source · team coding table (P1–P4 coded by Yue, P5–P8 by Yao). Codes are reproduced verbatim.
      </p>
    </div>
  )
}

function Chip({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-[3px] border px-2.5 py-1.5 text-[13px] transition-colors ${
        pressed ? 'border-ink bg-ink text-white' : 'border-line bg-paper text-ink-2 hover:border-ink'
      }`}
    >
      {children}
    </button>
  )
}

function ClusterCard({
  c,
  focused,
  open,
  onToggle,
  highlight,
  onHover,
}: {
  c: AffinityCluster
  focused: boolean
  open: boolean
  onToggle: () => void
  highlight: ParticipantId | null
  onHover: (p: ParticipantId | null) => void
}) {
  const notes = open ? c.notes : c.notes.slice(0, PREVIEW)
  const hidden = c.notes.length - notes.length
  const matchCount = highlight ? c.notes.filter((n) => n.participant === highlight).length : 0
  const bodyId = `cluster-body-${c.index}`

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col border bg-paper transition-colors ${highlight && matchCount === 0 ? 'border-line opacity-60' : 'border-line'}`}
      aria-labelledby={`cluster-title-${c.index}`}
    >
      <header className="flex items-start justify-between gap-3 border-b border-line p-4">
        <div>
          <span className="font-mono text-[11px] text-blue">Cluster {String(c.index + 1).padStart(2, '0')}</span>
          <h4 id={`cluster-title-${c.index}`} className="mt-1 font-display text-lg font-bold leading-tight tracking-tight">
            {c.title}
          </h4>
          <p className="mt-1 font-mono text-[11px] text-faint">
            {c.notes.length} notes · {c.participants.join(' ')}
            {highlight && matchCount > 0 && <span className="text-blue"> · {matchCount} from {highlight}</span>}
          </p>
        </div>
        {!focused && (
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={bodyId}
            aria-label={open ? `Collapse ${c.title}` : `Expand all evidence for ${c.title}`}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-[3px] border border-line text-muted hover:border-ink hover:text-ink"
          >
            {open ? <Minimize2 size={14} aria-hidden /> : <Maximize2 size={14} aria-hidden />}
          </button>
        )}
      </header>
      <ul id={bodyId} className={`grid gap-2 p-4 ${focused ? 'sm:grid-cols-2 lg:grid-cols-3' : ''}`}>
        {notes.map((n, i) => {
          const on = highlight === n.participant
          const dim = highlight && !on
          return (
            <motion.li
              layout="position"
              key={n.id}
              tabIndex={0}
              onMouseEnter={() => onHover(n.participant)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(n.participant)}
              onBlur={() => onHover(null)}
              className={`relative cursor-default p-3 pr-12 text-[14px] leading-snug outline-offset-2 transition-all duration-200 ${
                on ? 'bg-blue text-white shadow-[0_8px_18px_-10px_rgba(31,79,216,0.7)]' : 'bg-sun-soft text-ink-2'
              } ${dim ? 'opacity-35' : ''} ${i % 3 === 1 ? 'rotate-[0.4deg]' : i % 3 === 2 ? '-rotate-[0.4deg]' : ''}`}
            >
              {n.text}
              <span className={`absolute right-2 top-2 font-mono text-[11px] ${on ? 'text-white/80' : 'text-faint'}`}>{n.participant}</span>
            </motion.li>
          )
        })}
      </ul>
      {!focused && hidden > 0 && (
        <button type="button" onClick={onToggle} aria-controls={bodyId} className="mx-4 mb-4 mt-auto self-start text-[13px] font-medium text-blue hover:underline">
          + {hidden} more {hidden === 1 ? 'note' : 'notes'}
        </button>
      )}
    </motion.article>
  )
}
