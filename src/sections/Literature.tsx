import { motion, useReducedMotion } from 'motion/react'
import { litContext, litFraming, litInsights, type LitInsight } from '../content/literature'
import { refByKey } from '../content/references'
import { Cite, Expandable, Reveal, SectionHeader } from '../components/ui'

export function Literature() {
  return (
    <section id="literature" className="border-t border-line bg-paper py-24 md:py-32">
      <div className="container-x">
        <SectionHeader
          id="literature"
          intro={
            <>
              {litFraming.text} <Cite refs={litFraming.refs} />
            </>
          }
        />

        <div className="flex flex-col">
          {litInsights.map((ins) => (
            <InsightBlock key={ins.num} ins={ins} />
          ))}
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-2">
          {litContext.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <div className="border-t-2 border-ink pt-5">
                <p className="eyebrow">Further context</p>
                <h3 className="mt-2 text-xl font-semibold">{c.title}</h3>
                <ul className="mt-4 space-y-3 text-[15px] text-ink-2">
                  {c.points.map((p) => (
                    <li key={p.text}>
                      {p.text} <Cite refs={p.refs} />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function InsightBlock({ ins }: { ins: LitInsight }) {
  const sources = [...new Set(ins.points.flatMap((p) => p.refs))]
  return (
    <article className="grid gap-8 border-t border-line py-14 md:grid-cols-12 md:py-20" aria-labelledby={`lit-${ins.num}`}>
      <Reveal className="-mb-5 md:col-span-1 md:mb-0 md:pt-2">
        <span className="font-mono text-[13px] text-blue">{ins.num}</span>
      </Reveal>
      <div className="md:col-span-6">
        <Reveal>
          <h3 id={`lit-${ins.num}`} className="text-[clamp(1.4rem,2.2vw,1.85rem)] font-semibold leading-[1.2]">
            {ins.title}
          </h3>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-5 max-w-[56ch] text-lg text-muted">{ins.summary}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mt-6 space-y-3">
            {ins.points.map((p) => (
              <li key={p.text} className="flex gap-3 text-[15px] text-ink-2">
                <span aria-hidden className="mt-[11px] h-px w-4 shrink-0 bg-blue" />
                <span>
                  {p.text} <Cite refs={p.refs} />
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Expandable label={`Source details (${sources.length})`}>
              <ul className="space-y-3 text-[14px] text-muted">
                {sources.map((k) => (
                  <li key={k}>
                    {refByKey[k].apa}{' '}
                    <a href={refByKey[k].doi} target="_blank" rel="noreferrer" className="break-all text-blue underline underline-offset-2">
                      {refByKey[k].doi}
                    </a>
                  </li>
                ))}
              </ul>
            </Expandable>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.12} className="md:col-span-5">
        <figure className="overflow-hidden rounded-[10px] border border-line bg-canvas p-3 sm:p-4">
          <Diagram kind={ins.diagram} />
          <figcaption className="mt-4 font-mono text-[12px] text-faint">Conceptual diagram — illustrates the argument, not data.</figcaption>
        </figure>
      </Reveal>
    </article>
  )
}

const view = { once: true, margin: '0px 0px -20% 0px' } as const
const easeOut = [0.22, 1, 0.36, 1] as const

function Diagram({ kind }: { kind: LitInsight['diagram'] }) {
  if (kind === 'gap') return <GapDiagram />
  if (kind === 'loop') return <SpiralDiagram />
  return <PaceDiagram />
}

/** 01 — Knowing on one cliff, doing on the other; the bridge of preparation stops short. */
function GapDiagram() {
  const planks = 6
  return (
    <svg viewBox="0 0 320 210" className="w-full" role="img" aria-label="Preparation builds a bridge from knowing towards doing, but it stops short of real situations">
      <defs>
        <linearGradient id="lit-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-blue-soft)" />
          <stop offset="1" stopColor="var(--color-canvas)" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="320" height="210" fill="url(#lit-sky)" rx="6" />
      {/* cliffs */}
      <path d="M0 132 H104 L112 210 H0 Z" fill="var(--color-ink)" opacity="0.9" />
      <path d="M216 132 H320 V210 H208 Z" fill="var(--color-ink)" opacity="0.9" />

      {/* knowing: a guide on a phone */}
      <g transform="translate(30 46)">
        <rect width="52" height="80" rx="8" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="2" />
        {[0, 1, 2].map((i) => (
          <motion.g key={i} initial={{ opacity: 0, x: -6 }} whileInView={{ opacity: 1, x: 0 }} viewport={view} transition={{ delay: 0.15 + i * 0.12, duration: 0.4 }}>
            <rect x="8" y={14 + i * 20} width="9" height="9" rx="2" fill="var(--color-blue)" />
            <path d={`M10 ${18.5 + i * 20} l2 2 4-4`} stroke="#fff" strokeWidth="1.6" fill="none" />
            <rect x="21" y={16 + i * 20} width={22 - i * 4} height="4" rx="2" fill="var(--color-ink)" opacity="0.35" />
          </motion.g>
        ))}
      </g>

      {/* doing: a real tram stop */}
      <g transform="translate(250 54)">
        <rect x="18" y="18" width="4" height="60" fill="var(--color-paper)" />
        <rect x="0" y="0" width="40" height="26" rx="4" fill="var(--color-sun)" />
        <rect x="9" y="6" width="22" height="12" rx="3" fill="var(--color-ink)" />
        <rect x="12" y="9" width="5" height="5" rx="1" fill="var(--color-sun)" />
        <rect x="23" y="9" width="5" height="5" rx="1" fill="var(--color-sun)" />
      </g>

      {/* the bridge of preparation, built plank by plank, missing its last pieces */}
      {Array.from({ length: planks }, (_, i) => {
        const missing = i >= planks - 2
        return (
          <motion.rect
            key={i}
            x={110 + i * 17}
            y="128"
            width="14"
            height="6"
            rx="1.5"
            fill={missing ? 'none' : 'var(--color-ink)'}
            stroke={missing ? 'var(--color-ink)' : 'none'}
            strokeDasharray={missing ? '2 2' : undefined}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: missing ? 0.7 : 1, y: 0 }}
            viewport={view}
            transition={{ delay: 0.5 + i * 0.12, duration: 0.35, ease: easeOut }}
          />
        )
      })}
      <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={view} transition={{ delay: 1.3 }}>
        <motion.g animate={{ y: [0, -5, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
          <circle cx="189" cy="104" r="13" fill="var(--color-sun-soft)" stroke="var(--color-sun)" strokeWidth="2" />
          <text x="189" y="109" textAnchor="middle" className="fill-[var(--color-ink)] font-display text-[15px] font-bold">?</text>
        </motion.g>
      </motion.g>

      <text x="56" y="160" textAnchor="middle" className="fill-white font-mono text-[10px] tracking-[0.14em]">KNOWING</text>
      <text x="264" y="160" textAnchor="middle" className="fill-white font-mono text-[10px] tracking-[0.14em]">DOING</text>
      <text x="160" y="28" textAnchor="middle" className="fill-[var(--color-muted)] font-mono text-[9px] tracking-[0.12em]">THE GAP SHOWS UP IN THE MOMENT</text>
    </svg>
  )
}

/** 02 — Each try → mistake → help → try again loop climbs a little higher: confidence grows with experience. */
function SpiralDiagram() {
  const reduce = useReducedMotion()
  const pts = Array.from({ length: 181 }, (_, i) => {
    const t = i / 180
    const a = t * 3 * 2 * Math.PI + Math.PI / 2
    const r = 24 - 8 * t
    return [58 + 200 * t + r * Math.cos(a) * 0.9, 162 - 112 * t + r * Math.sin(a)] as const
  })
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const keys = pts.filter((_, i) => i % 3 === 0)
  const tags: [string, number, number][] = [
    ['Try', 60, 196],
    ['Mistake', 104, 166],
    ['Help', 62, 128],
    ['Try again', 16, 166],
  ]
  return (
    <svg viewBox="0 0 320 210" className="w-full" role="img" aria-label="A rising spiral: try, make a mistake, get help, try again — each round climbs higher in confidence">
      <rect x="0" y="0" width="320" height="210" rx="6" fill="var(--color-paper)" />
      {/* axes */}
      <path d="M14 200 H306" stroke="var(--color-line)" strokeWidth="1.5" />
      <path d="M14 200 V14" stroke="var(--color-line)" strokeWidth="1.5" />
      <text x="306" y="194" textAnchor="end" className="fill-[var(--color-faint)] font-mono text-[9px] tracking-[0.12em]">EXPERIENCE →</text>
      <text x="20" y="22" className="fill-[var(--color-faint)] font-mono text-[9px] tracking-[0.12em]">CONFIDENCE ↑</text>

      <path d={d} fill="none" stroke="var(--color-line)" strokeWidth="3" strokeLinecap="round" />
      <motion.path d={d} fill="none" stroke="var(--color-blue)" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={view} transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.2 }} />

      {tags.map(([t, x, y], i) => (
        <motion.g key={t} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={view} transition={{ delay: 0.3 + i * 0.25, type: 'spring', stiffness: 300, damping: 20 }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <rect x={x - 2} y={y - 11} width={t.length * 6.4 + 12} height="16" rx="8" fill={i === 1 ? 'var(--color-sun-soft)' : 'var(--color-blue-soft)'} />
          <text x={x + 4} y={y + 1} className="fill-[var(--color-ink)] font-sans text-[10px] font-medium">
            {t}
          </text>
        </motion.g>
      ))}

      {/* end point: more confident */}
      <motion.g initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={view} transition={{ delay: 2.2, type: 'spring', stiffness: 260, damping: 16 }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        <circle cx="266" cy="40" r="13" fill="var(--color-blue)" />
        <path d="M260 40l4.5 4.5 8-9" stroke="#fff" strokeWidth="2.5" fill="none" />
      </motion.g>

      {/* a student travelling the loops */}
      {!reduce && (
        <motion.circle
          r="5.5"
          fill="var(--color-sun)"
          stroke="var(--color-ink)"
          strokeWidth="1.5"
          initial={{ cx: keys[0][0], cy: keys[0][1] }}
          animate={{ cx: keys.map((k) => k[0]), cy: keys.map((k) => k[1]) }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear', repeatDelay: 0.8, delay: 2.4 }}
        />
      )}
    </svg>
  )
}

/** 03 — Different parts of life settle at different speeds; most are still in progress. */
function PaceDiagram() {
  const rows: { label: string; to: number; done?: boolean }[] = [
    { label: 'Daily tasks', to: 0.62, done: true },
    { label: 'Language', to: 0.5 },
    { label: 'Study', to: 0.42 },
    { label: 'Social life', to: 0.3 },
  ]
  const x0 = 92
  const W = 214
  return (
    <svg viewBox="0 0 320 210" className="w-full" role="img" aria-label="Daily tasks settle early; language, study and social life keep developing over time">
      <rect x="0" y="0" width="320" height="210" rx="6" fill="var(--color-paper)" />
      {['Arrive', 'Weeks', 'Months'].map((s, i) => (
        <g key={s}>
          <path d={`M${x0 + (i * W) / 2} 30 V188`} stroke="var(--color-line)" strokeDasharray="2 3" />
          <text x={x0 + (i * W) / 2} y="22" textAnchor={i === 0 ? 'start' : i === 2 ? 'end' : 'middle'} className="fill-[var(--color-faint)] font-mono text-[9px] tracking-[0.1em]">
            {s.toUpperCase()}
          </text>
        </g>
      ))}
      {rows.map((r, i) => {
        const y = 50 + i * 36
        const end = x0 + W * r.to
        return (
          <g key={r.label}>
            <text x="10" y={y + 4} className="fill-[var(--color-ink-2)] font-sans text-[11px] font-medium">
              {r.label}
            </text>
            <rect x={x0} y={y - 4} width={W} height="8" rx="4" fill="var(--color-canvas)" />
            <motion.rect
              x={x0}
              y={y - 4}
              width={W * r.to}
              height="8"
              rx="4"
              fill="var(--color-blue)"
              opacity={r.done ? 1 : 0.55}
              style={{ transformBox: 'fill-box', transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={view}
              transition={{ duration: 1, delay: 0.2 + i * 0.18, ease: easeOut }}
            />
            {!r.done && <path d={`M${end + 8} ${y} H${x0 + W - 4}`} stroke="var(--color-blue)" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="3 4" />}
            <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={view} transition={{ delay: 1 + i * 0.18 }}>
              {r.done ? (
                <g>
                  <circle cx={end} cy={y} r="8" fill="var(--color-blue)" />
                  <path d={`M${end - 3.5} ${y}l2.5 2.5 4.5-5`} stroke="#fff" strokeWidth="1.8" fill="none" />
                </g>
              ) : (
                <motion.circle cx={end} cy={y} r="6" fill="var(--color-sun)" stroke="var(--color-ink)" strokeWidth="1.5" animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
              )}
            </motion.g>
          </g>
        )
      })}
      <g transform="translate(92 196)">
        <circle cx="4" cy="0" r="4" fill="var(--color-blue)" />
        <text x="12" y="3" className="fill-[var(--color-muted)] font-mono text-[9px]">SETTLED</text>
        <circle cx="76" cy="0" r="4" fill="var(--color-sun)" />
        <text x="84" y="3" className="fill-[var(--color-muted)] font-mono text-[9px]">STILL IN PROGRESS</text>
      </g>
    </svg>
  )
}
