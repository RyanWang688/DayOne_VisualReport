import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { ArrowLeft, Maximize2, RotateCcw } from 'lucide-react'
import { clusters, participants, type AffinityNote } from '../content/affinity'
import type { ParticipantId } from '../content/types'
import { ClusterViewer } from './ClusterViewer'
import { Expandable } from './ui'

type Phase = 'pile' | 'scatter' | 'grouped'
type Pos = { x: number; y: number; r: number }

const allNotes: AffinityNote[] = clusters.flatMap((c) => c.notes)
const RAW_NOTE = '#fdf0c4'

/** Deterministic pseudo-random numbers so the "mess" is the same on every visit. */
function rand(seed: number) {
  let t = (seed + 0x6d2b79f5) | 0
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

function computeLayout(W: number) {
  const cols = W < 520 ? 2 : W < 680 ? 3 : 4
  const gap = W < 520 ? 10 : 16
  const perRow = W < 520 ? 3 : 4
  const ng = 4
  const regionW = (W - gap * (cols - 1)) / cols
  const noteW = (regionW - ng * (perRow - 1)) / perRow
  const noteH = noteW * 0.8
  const labelH = 46

  const regions: { index: number; x: number; y: number; w: number; h: number }[] = []
  const grouped = new Map<string, Pos>()
  let y = 0
  for (let start = 0; start < clusters.length; start += cols) {
    const row = clusters.slice(start, start + cols)
    const rowH = Math.max(...row.map((c) => labelH + Math.ceil(c.notes.length / perRow) * (noteH + ng)))
    row.forEach((c, k) => {
      const x = k * (regionW + gap)
      regions.push({ index: c.index, x, y, w: regionW, h: rowH })
      c.notes.forEach((n, i) => {
        const s = allNotes.indexOf(n)
        grouped.set(n.id, {
          x: x + (i % perRow) * (noteW + ng) + (rand(s * 7) - 0.5) * 2,
          y: y + labelH + Math.floor(i / perRow) * (noteH + ng) + (rand(s * 11) - 0.5) * 2,
          r: (rand(s * 13) - 0.5) * 4,
        })
      })
    })
    y += rowH + gap
  }
  const H = Math.max(y - gap, 360)

  const scatter = new Map<string, Pos>()
  const pile = new Map<string, Pos>()
  allNotes.forEach((n, s) => {
    scatter.set(n.id, { x: rand(s * 3 + 1) * (W - noteW), y: rand(s * 5 + 2) * (H - noteH), r: (rand(s * 17) - 0.5) * 34 })
    pile.set(n.id, {
      x: W / 2 - noteW / 2 + (rand(s * 19) - 0.5) * 60,
      y: Math.min(H, 480) / 2 - noteH / 2 + (rand(s * 23) - 0.5) * 40,
      r: (rand(s * 29) - 0.5) * 50,
    })
  })
  return { W, H, noteW, noteH, regions, positions: { pile, scatter, grouped } }
}

export function AffinityBoard() {
  const reduce = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const inView = useInView(wrapRef, { once: true, margin: '0px 0px -25% 0px' })
  const [width, setWidth] = useState(0)
  const [phase, setPhase] = useState<Phase>(reduce ? 'grouped' : 'pile')
  const [selected, setSelected] = useState<number | null>(null)
  const [person, setPerson] = useState<ParticipantId | null>(null)
  const [hover, setHover] = useState<AffinityNote | null>(null)
  const [viewer, setViewerState] = useState<number | null>(null)
  const timers = useRef<number[]>([])

  const setViewer = useCallback((i: number | null) => {
    setHover(null)
    setViewerState(i)
  }, [])

  useLayoutEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setWidth(Math.floor(e.contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const layout = useMemo(() => (width ? computeLayout(width) : null), [width])

  const play = useCallback(() => {
    timers.current.forEach(clearTimeout)
    if (reduce) return setPhase('grouped')
    setPhase('pile')
    timers.current = [window.setTimeout(() => setPhase('scatter'), 350), window.setTimeout(() => setPhase('grouped'), 2200)]
  }, [reduce])

  useEffect(() => {
    if (inView) play()
    return () => timers.current.forEach(clearTimeout)
  }, [inView, play])

  const grouped = phase === 'grouped'
  const tracePerson = hover?.participant ?? person
  const statusText = phase === 'pile' ? `${allNotes.length} codes from 8 interviews` : phase === 'scatter' ? 'Raw codes, before grouping' : `${clusters.length} clusters`

  return (
    <div className="border border-line bg-paper">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Board */}
        <div className="relative border-b border-line bg-canvas bg-[radial-gradient(var(--color-line)_1px,transparent_1px)] [background-size:18px_18px] lg:border-b-0 lg:border-r">
          {/* Stays in view on desktop while the theme panel beside it grows with the page */}
          <div className="lg:sticky lg:top-[80px]">
          <div className="flex items-center justify-between gap-3 px-4 pt-4 sm:px-6">
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-faint" aria-live="polite">
              {statusText}
            </p>
            <button
              type="button"
              onClick={play}
              aria-label="Replay the affinity mapping animation"
              title="Replay"
              className="grid h-9 w-9 place-items-center rounded-full border border-line bg-paper text-ink-2 transition-[transform,color,border-color] duration-200 hover:-rotate-45 hover:border-ink hover:text-ink active:scale-95"
            >
              <RotateCcw size={16} aria-hidden />
            </button>
          </div>
          <div className="p-4 sm:p-6">
            <div ref={wrapRef} className="relative" style={{ height: layout ? layout.H : 420 }}>
              {layout && (
                <>
                  {layout.regions.map((r) => {
                    const c = clusters[r.index]
                    const isSel = selected === r.index
                    const dim = selected !== null && !isSel
                    return (
                      <motion.button
                        key={r.index}
                        type="button"
                        onClick={() => setSelected(isSel ? null : r.index)}
                        aria-pressed={isSel}
                        aria-label={`${c.title}, ${c.notes.length} notes`}
                        tabIndex={grouped ? 0 : -1}
                        className="absolute flex items-start rounded-[3px] border p-2 text-left transition-colors duration-200"
                        style={{
                          left: r.x - 5,
                          top: r.y - 5,
                          width: r.w + 10,
                          height: r.h + 10,
                          pointerEvents: grouped ? 'auto' : 'none',
                          borderColor: isSel ? c.color.ink : 'transparent',
                          backgroundColor: isSel ? `${c.color.note}66` : 'transparent',
                        }}
                        initial={false}
                        animate={{ opacity: grouped ? (dim ? 0.55 : 1) : 0 }}
                        transition={{ duration: 0.35, delay: grouped && !dim ? 0.45 : 0 }}
                      >
                        <span className="flex min-w-0 items-start gap-1.5">
                          <span className="mt-[3px] h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: c.color.ink }} aria-hidden />
                          <span className="line-clamp-2 font-display text-[12px] font-bold leading-tight tracking-tight text-ink">{c.title}</span>
                        </span>
                      </motion.button>
                    )
                  })}

                  {allNotes.map((n, s) => {
                    const p = layout.positions[phase].get(n.id)!
                    const c = clusters[n.cluster]
                    const faded = (selected !== null && n.cluster !== selected) || (tracePerson && n.participant !== tracePerson)
                    const traced = tracePerson && n.participant === tracePerson
                    return (
                      <motion.div
                        key={n.id}
                        aria-hidden
                        onMouseEnter={() => setHover(n)}
                        onMouseLeave={() => setHover(null)}
                        onClick={() => grouped && setSelected(n.cluster)}
                        className={`absolute left-0 top-0 overflow-hidden rounded-[1px] p-[3px] shadow-[0_1px_2px_rgba(14,20,34,0.12),0_4px_8px_-4px_rgba(14,20,34,0.25)] ${grouped ? 'cursor-pointer' : ''}`}
                        style={{
                          width: layout.noteW,
                          height: layout.noteH,
                          zIndex: hover?.id === n.id ? 5 : 1,
                          backgroundColor: grouped ? c.color.note : RAW_NOTE,
                          transition: `background-color 400ms ${grouped ? 300 + n.cluster * 60 : 0}ms, opacity 200ms, box-shadow 200ms`,
                          opacity: faded ? 0.2 : 1,
                          boxShadow: traced ? `0 0 0 2px ${c.color.ink}` : undefined,
                        }}
                        initial={layout.positions.pile.get(n.id)}
                        animate={{ x: p.x, y: p.y, rotate: p.r }}
                        transition={
                          reduce
                            ? { duration: 0 }
                            : {
                                type: 'spring',
                                stiffness: grouped ? 90 : 60,
                                damping: grouped ? 17 : 13,
                                delay: grouped ? n.cluster * 0.06 + (s % 12) * 0.01 : phase === 'scatter' ? s * 0.004 : 0,
                              }
                        }
                      >
                        <span className="line-clamp-4 block text-[6.5px] leading-[1.2] text-ink/55">{n.text}</span>
                        <span className="absolute bottom-[2px] right-[3px] font-mono text-[6px] text-ink/45">{n.participant}</span>
                      </motion.div>
                    )
                  })}

                  {hover && <NotePreview note={hover} pos={layout.positions[phase].get(hover.id)!} W={layout.W} noteW={layout.noteW} noteH={layout.noteH} />}
                </>
              )}
            </div>
          </div>
          </div>
        </div>

        {/* Panel: theme selection + participant evidence */}
        <aside aria-label="Affinity map explorer" className="flex flex-col">
          <div className="shrink-0 border-b border-line p-4 sm:p-5">
            <p id="ab-person" className="mb-2 font-mono text-[12px] uppercase tracking-[0.12em] text-faint">
              Participant
            </p>
            <div role="group" aria-labelledby="ab-person" className="flex flex-wrap gap-1">
              <PersonChip pressed={person === null} onClick={() => setPerson(null)}>
                All
              </PersonChip>
              {participants.map((p) => (
                <PersonChip key={p} pressed={person === p} onClick={() => setPerson(person === p ? null : p)}>
                  {p}
                </PersonChip>
              ))}
            </div>
          </div>

          <div>
            <AnimatePresence mode="wait" initial={false}>
              {selected === null ? (
                <motion.div key="list" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.2 }}>
                  <p className="px-4 pb-2 pt-4 font-mono text-[12px] uppercase tracking-[0.12em] text-faint sm:px-5">Themes · select to explore</p>
                  <ul className="pb-2">
                    {clusters.map((c) => {
                      const n = person ? c.notes.filter((x) => x.participant === person).length : c.notes.length
                      return (
                        <li key={c.index}>
                          <button
                            type="button"
                            onClick={() => setSelected(c.index)}
                            className="group grid w-full grid-cols-[12px_1fr_auto] items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-canvas focus-visible:bg-canvas sm:px-5"
                          >
                            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: c.color.note, boxShadow: `inset 0 0 0 1.5px ${c.color.ink}` }} aria-hidden />
                            <span className={`text-[14px] leading-snug transition-colors group-hover:text-ink ${n ? 'text-ink-2' : 'text-faint'}`}>{c.title}</span>
                            <span className="font-mono text-[12px] text-faint">{n}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </motion.div>
              ) : (
                <ThemeDetail key={selected} index={selected} person={person} onBack={() => setSelected(null)} onOpen={() => setViewer(selected)} />
              )}
            </AnimatePresence>
          </div>
        </aside>
      </div>

      <ClusterViewer index={viewer} onClose={() => setViewer(null)} onNavigate={setViewer} />
    </div>
  )
}

function ThemeDetail({ index, person, onBack, onOpen }: { index: number; person: ParticipantId | null; onBack: () => void; onOpen: () => void }) {
  const c = clusters[index]
  const byPerson = c.participants.map((p) => ({ p, notes: c.notes.filter((n) => n.participant === p) }))
  return (
    <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.2 }} className="p-4 sm:p-5">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-ink">
        <ArrowLeft size={14} aria-hidden /> All themes
      </button>
      <div className="mt-4 border-l-[3px] pl-3" style={{ borderColor: c.color.ink }}>
        <p className="font-mono text-[12px] uppercase tracking-[0.12em]" style={{ color: c.color.ink }}>
          Theme {String(c.index + 1).padStart(2, '0')}
        </p>
        <h4 className="mt-1 font-display text-xl font-bold leading-tight tracking-tight">{c.title}</h4>
        <p className="mt-1 text-[13px] text-muted">
          {c.notes.length} codes · {c.participants.length} participants
        </p>
      </div>
      <button
        type="button"
        onClick={onOpen}
        className="mt-4 inline-flex items-center gap-2 rounded-[3px] border border-ink bg-ink px-3 py-2 text-[13px] text-white transition-[transform,background-color] duration-200 hover:bg-ink-2 active:scale-[0.98]"
      >
        <Maximize2 size={14} aria-hidden /> Open as pin board
      </button>

      <div className="mt-5">
        <p className="mb-1 font-mono text-[12px] uppercase tracking-[0.12em] text-faint">Participant evidence</p>
        {byPerson.map(({ p, notes }) => (
          <Expandable
            key={`${p}-${person}`}
            defaultOpen={person ? person === p : false}
            label={
              <span className={`flex items-center gap-2 ${person && person !== p ? 'opacity-40' : ''}`}>
                <span className="pill-p">{p}</span>
                <span className="text-[13px] font-normal text-muted">
                  {notes.length} {notes.length === 1 ? 'code' : 'codes'}
                </span>
              </span>
            }
          >
            <ul className="space-y-2">
              {notes.map((n) => (
                <li key={n.id} className="px-3 py-2 text-[14px] leading-snug text-ink-2" style={{ backgroundColor: c.color.note }}>
                  {n.text}
                </li>
              ))}
            </ul>
          </Expandable>
        ))}
        {person && !c.participants.includes(person) && <p className="border-t border-line pt-3 text-[13px] text-faint">{person} has no codes in this theme.</p>}
      </div>
    </motion.div>
  )
}

function PersonChip({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`h-8 min-w-9 rounded-[3px] border px-2 font-mono text-[12px] transition-colors duration-150 ${
        pressed ? 'border-ink bg-ink text-white' : 'border-line bg-paper text-ink-2 hover:border-ink'
      }`}
    >
      {children}
    </button>
  )
}

function NotePreview({ note, pos, W, noteW, noteH }: { note: AffinityNote; pos: Pos; W: number; noteW: number; noteH: number }) {
  const w = Math.min(240, W - 8)
  const left = Math.max(0, Math.min(pos.x + noteW / 2 - w / 2, W - w))
  const above = pos.y > 120
  const c = clusters[note.cluster]
  return (
    <div
      className="pointer-events-none absolute z-20 bg-ink p-3 text-[13px] leading-snug text-white shadow-lg"
      style={{ width: w, left, top: above ? undefined : pos.y + noteH + 8, bottom: above ? `calc(100% - ${pos.y - 8}px)` : undefined }}
    >
      <p>{note.text}</p>
      <p className="mt-2 flex items-center gap-1.5 font-mono text-[12px] text-white/60">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color.note }} />
        {note.participant} · {c.title}
      </p>
    </div>
  )
}
