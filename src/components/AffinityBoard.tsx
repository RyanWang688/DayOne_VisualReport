import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { Layers, RotateCcw, Shuffle } from 'lucide-react'
import { clusters, participants, type AffinityNote } from '../content/affinity'
import type { ParticipantId } from '../content/types'
import { ClusterViewer } from './ClusterViewer'

type Phase = 'pile' | 'scatter' | 'grouped'
type Pos = { x: number; y: number; r: number }

const allNotes: AffinityNote[] = clusters.flatMap((c) => c.notes)

/** Deterministic pseudo-random numbers so the "mess" is the same on every visit. */
function rand(seed: number) {
  let t = (seed + 0x6d2b79f5) | 0
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

function computeLayout(W: number) {
  const cols = W < 640 ? 2 : W < 1024 ? 3 : 5
  const gap = W < 640 ? 12 : 20
  const perRow = W < 640 ? 3 : 4
  const ng = 4
  const regionW = (W - gap * (cols - 1)) / cols
  const noteW = (regionW - ng * (perRow - 1)) / perRow
  const noteH = noteW * 0.8
  const labelH = W < 640 ? 58 : 64

  const regions: { index: number; x: number; y: number; w: number; h: number }[] = []
  const grouped = new Map<string, Pos>()
  let y = 0
  for (let start = 0; start < clusters.length; start += cols) {
    const row = clusters.slice(start, start + cols)
    const heights = row.map((c) => labelH + Math.ceil(c.notes.length / perRow) * (noteH + ng) + 8)
    const rowH = Math.max(...heights)
    row.forEach((c, k) => {
      const x = k * (regionW + gap)
      regions.push({ index: c.index, x, y, w: regionW, h: rowH })
      c.notes.forEach((n, i) => {
        const s = allNotes.indexOf(n)
        grouped.set(n.id, {
          x: x + (i % perRow) * (noteW + ng) + (rand(s * 7) - 0.5) * 3,
          y: y + labelH + Math.floor(i / perRow) * (noteH + ng) + (rand(s * 11) - 0.5) * 3,
          r: (rand(s * 13) - 0.5) * 5,
        })
      })
    })
    y += rowH + gap
  }
  const H = Math.max(y - gap, 420)

  const scatter = new Map<string, Pos>()
  const pile = new Map<string, Pos>()
  allNotes.forEach((n, s) => {
    scatter.set(n.id, { x: rand(s * 3 + 1) * (W - noteW), y: rand(s * 5 + 2) * (H - noteH), r: (rand(s * 17) - 0.5) * 34 })
    pile.set(n.id, {
      x: W / 2 - noteW / 2 + (rand(s * 19) - 0.5) * 60,
      y: Math.min(H, 520) / 2 - noteH / 2 + (rand(s * 23) - 0.5) * 40,
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
  const [person, setPerson] = useState<ParticipantId | null>(null)
  const [hover, setHover] = useState<AffinityNote | null>(null)
  const [open, setOpenState] = useState<number | null>(null)
  const setOpen = useCallback((i: number | null) => {
    setHover(null)
    setOpenState(i)
  }, [])
  const timers = useRef<number[]>([])

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
    timers.current = [window.setTimeout(() => setPhase('scatter'), 350), window.setTimeout(() => setPhase('grouped'), 2300)]
  }, [reduce])

  useEffect(() => {
    if (inView) play()
    return () => timers.current.forEach(clearTimeout)
  }, [inView, play])

  const grouped = phase === 'grouped'
  const highlight = hover?.participant ?? person

  return (
    <div className="border border-line bg-paper">
      {/* Controls */}
      <div className="flex flex-col gap-4 border-b border-line p-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:p-6">
        <div role="group" aria-label="Board state" className="flex gap-1.5">
          <ToolButton pressed={phase === 'scatter'} onClick={() => setPhase('scatter')} icon={<Shuffle size={14} aria-hidden />}>
            Raw notes
          </ToolButton>
          <ToolButton pressed={grouped} onClick={() => setPhase('grouped')} icon={<Layers size={14} aria-hidden />}>
            Grouped
          </ToolButton>
          <ToolButton pressed={false} onClick={play} icon={<RotateCcw size={14} aria-hidden />}>
            Replay
          </ToolButton>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <p id="ab-person" className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
            Trace a participant
          </p>
          <div role="group" aria-labelledby="ab-person" className="flex flex-wrap gap-1">
            {participants.map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={person === p}
                onClick={() => setPerson(person === p ? null : p)}
                className={`h-8 min-w-9 rounded-[3px] border px-1.5 font-mono text-[12px] transition-colors ${
                  person === p ? 'border-blue bg-blue text-white' : 'border-line text-ink-2 hover:border-ink'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Board */}
      <div className="relative bg-[radial-gradient(var(--color-line)_1px,transparent_1px)] [background-size:18px_18px] p-4 sm:p-6">
        <div ref={wrapRef} className="relative" style={{ height: layout ? layout.H : 480 }}>
          {layout && (
            <>
              {/* Cluster regions */}
              {layout.regions.map((r) => {
                const c = clusters[r.index]
                return (
                  <motion.button
                    key={r.index}
                    type="button"
                    onClick={() => setOpen(r.index)}
                    aria-label={`Open cluster ${r.index + 1}: ${c.title}, ${c.notes.length} notes`}
                    tabIndex={grouped ? 0 : -1}
                    className="group absolute flex flex-col items-start rounded-[2px] border border-dashed border-ink/15 bg-paper/50 p-2 text-left transition-colors hover:border-blue hover:bg-blue-soft/60 focus-visible:border-blue"
                    style={{ left: r.x - 6, top: r.y - 6, width: r.w + 12, height: r.h + 12, pointerEvents: grouped ? 'auto' : 'none' }}
                    initial={false}
                    animate={{ opacity: grouped ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: grouped ? 0.5 : 0 }}
                  >
                    <span className="font-mono text-[10px] text-blue">
                      {String(r.index + 1).padStart(2, '0')} · {c.notes.length} notes
                    </span>
                    <span className="mt-0.5 line-clamp-2 font-display text-[12px] font-bold leading-tight tracking-tight text-ink sm:text-[13px]">{c.title}</span>
                    <span className="absolute right-2 top-2 font-mono text-[10px] text-blue opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      Open ↗
                    </span>
                  </motion.button>
                )
              })}

              {/* Sticky notes */}
              {allNotes.map((n, s) => {
                const p = layout.positions[phase].get(n.id)!
                const dim = highlight && n.participant !== highlight
                const on = highlight && n.participant === highlight
                return (
                  <motion.div
                    key={n.id}
                    aria-hidden
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => grouped && setOpen(n.cluster)}
                    className={`absolute left-0 top-0 overflow-hidden rounded-[1px] p-[3px] shadow-[0_1px_2px_rgba(14,20,34,0.12),0_4px_8px_-4px_rgba(14,20,34,0.25)] transition-[background-color,opacity,box-shadow] duration-200 ${
                      on ? 'bg-[#fde08a] ring-2 ring-blue' : 'bg-[#fdeeb8]'
                    } ${dim ? 'opacity-25' : ''} ${grouped ? 'cursor-pointer' : ''}`}
                    style={{ width: layout.noteW, height: layout.noteH, zIndex: hover?.id === n.id ? 5 : 1 }}
                    initial={layout.positions.pile.get(n.id)}
                    animate={{ x: p.x, y: p.y, rotate: p.r }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : {
                            type: 'spring',
                            stiffness: phase === 'grouped' ? 90 : 60,
                            damping: phase === 'grouped' ? 17 : 13,
                            delay: phase === 'grouped' ? n.cluster * 0.06 + (s % 12) * 0.01 : phase === 'scatter' ? s * 0.004 : 0,
                          }
                    }
                  >
                    <span className="block h-[3px] w-full bg-black/5" />
                    <span className="mt-[2px] line-clamp-4 block text-[6.5px] leading-[1.2] text-ink/55">{n.text}</span>
                    <span className="absolute bottom-[2px] right-[3px] font-mono text-[6px] text-ink/40">{n.participant}</span>
                  </motion.div>
                )
              })}

              {/* Hover preview */}
              {hover && (
                <NotePreview note={hover} pos={layout.positions[phase].get(hover.id)!} W={layout.W} noteW={layout.noteW} noteH={layout.noteH} grouped={grouped} />
              )}

              {/* Phase caption */}
              {!grouped && (
                <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-[3px] bg-ink px-3 py-1.5 font-mono text-[11px] text-white">
                  {phase === 'pile' ? `${allNotes.length} codes from 8 interviews…` : 'Raw codes — before grouping'}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Accessible / quick index of clusters */}
      <div className="border-t border-line p-4 sm:p-6">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">Open a cluster</p>
        <ul className="flex flex-wrap gap-1.5">
          {clusters.map((c) => (
            <li key={c.index}>
              <button
                type="button"
                onClick={() => setOpen(c.index)}
                className="rounded-[3px] border border-line bg-paper px-2.5 py-1.5 text-left text-[13px] text-ink-2 transition-colors hover:border-blue hover:text-blue"
              >
                <span className="font-mono text-[11px] opacity-60">{String(c.index + 1).padStart(2, '0')}</span> {c.title}{' '}
                <span className="font-mono text-[11px] opacity-60">{c.notes.length}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-mono text-[11px] text-faint">
          Source · team coding table (P1–P4 coded by Yue, P5–P8 by Yao). Codes are reproduced verbatim.
        </p>
      </div>

      <ClusterViewer index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </div>
  )
}

function ToolButton({ pressed, onClick, icon, children }: { pressed: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`inline-flex h-9 items-center gap-1.5 rounded-[3px] border px-3 text-[13px] transition-colors ${
        pressed ? 'border-ink bg-ink text-white' : 'border-line bg-paper text-ink-2 hover:border-ink'
      }`}
    >
      {icon}
      {children}
    </button>
  )
}

function NotePreview({ note, pos, W, noteW, noteH, grouped }: { note: AffinityNote; pos: Pos; W: number; noteW: number; noteH: number; grouped: boolean }) {
  const w = Math.min(240, W - 8)
  const left = Math.max(0, Math.min(pos.x + noteW / 2 - w / 2, W - w))
  const above = pos.y > 120
  return (
    <div
      className="pointer-events-none absolute z-20 bg-ink p-3 text-[13px] leading-snug text-white shadow-lg"
      style={{ width: w, left, top: above ? undefined : pos.y + noteH + 8, bottom: above ? `calc(100% - ${pos.y - 8}px)` : undefined }}
    >
      <p>{note.text}</p>
      <p className="mt-2 font-mono text-[11px] text-white/60">
        {note.participant} · {clusters[note.cluster].title}
        {grouped && ' · click to open'}
      </p>
    </div>
  )
}
