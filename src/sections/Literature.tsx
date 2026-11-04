import { motion } from 'motion/react'
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
        <figure className="border-t-2 border-ink pt-6">
          <Diagram kind={ins.diagram} />
          <figcaption className="mt-4 font-mono text-[12px] text-faint">Conceptual diagram — illustrates the argument, not data.</figcaption>
        </figure>
      </Reveal>
    </article>
  )
}

const view = { once: true, margin: '0px 0px -20% 0px' } as const
const draw = (delay = 0.2, duration = 1.2) => ({
  initial: { pathLength: 0 },
  whileInView: { pathLength: 1 },
  viewport: view,
  transition: { duration, delay, ease: [0.22, 1, 0.36, 1] as const },
})
const label = 'fill-[var(--color-ink)] font-sans text-[12px] font-medium'
const note = 'fill-[var(--color-muted)] font-sans text-[10.5px]'
const ink = 'var(--color-ink)'
const blue = 'var(--color-blue)'
const rule = 'var(--color-line)'

function Diagram({ kind }: { kind: LitInsight['diagram'] }) {
  if (kind === 'gap') return <GapDiagram />
  if (kind === 'loop') return <ClimbDiagram />
  return <PaceDiagram />
}

/** 01 — Preparation carries students part of the way; the rest only shows up in the moment. */
function GapDiagram() {
  const y = 92
  return (
    <svg viewBox="0 0 320 170" className="w-full" role="img" aria-label="A line from knowing to doing: information covers the first part, the rest only shows up in the moment">
      <text x="20" y={y - 22} className={label}>Knowing</text>
      <text x="300" y={y - 22} textAnchor="end" className={label}>Doing</text>
      <circle cx="20" cy={y} r="3.5" fill={ink} />
      <motion.path d={`M20 ${y} H172`} fill="none" stroke={ink} strokeWidth="1.5" {...draw(0.2, 0.9)} />
      <motion.path d={`M172 ${y} H292`} fill="none" stroke={blue} strokeWidth="1.5" strokeDasharray="3 5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={view} transition={{ duration: 0.6, delay: 1 }} />
      <path d={`M292 ${y - 4} L300 ${y} L292 ${y + 4} Z`} fill={blue} />
      <text x="96" y={y + 24} textAnchor="middle" className={note}>information and guides</text>
      <text x="236" y={y + 24} textAnchor="middle" className="fill-[var(--color-blue)] font-sans text-[10.5px]">learned in the moment</text>
    </svg>
  )
}

/** 02 — Each try, mistake and bit of help ends a little higher: confidence grows with experience. */
function ClimbDiagram() {
  const pts = '24,148 76,104 100,126 158,76 182,98 240,48 262,66 296,30'
  return (
    <svg viewBox="0 0 320 170" className="w-full" role="img" aria-label="A rising line that dips after each mistake but ends higher each time: confidence grows with experience">
      <path d="M16 158 H304" stroke={rule} strokeWidth="1" />
      <text x="304" y="150" textAnchor="end" className={note}>experience</text>
      <text x="16" y="20" className={note}>confidence</text>
      <motion.polyline points={pts} fill="none" stroke={blue} strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" {...draw(0.2, 1.6)} />
      <text x="40" y="112" textAnchor="end" className={label}>try</text>
      <text x="100" y="142" textAnchor="middle" className={label}>mistake</text>
      <text x="136" y="116" className={label}>help, try again</text>
      <circle cx="296" cy="30" r="3.5" fill={blue} />
    </svg>
  )
}

/** 03 — Everyday tasks settle first; language, study and social life keep developing. */
function PaceDiagram() {
  const rows: [string, number][] = [
    ['Daily tasks', 0.72],
    ['Language', 0.5],
    ['Study', 0.42],
    ['Social life', 0.3],
  ]
  const x0 = 84
  const W = 220
  return (
    <svg viewBox="0 0 320 170" className="w-full" role="img" aria-label="Four lines over time: daily tasks settle first; language, study and social life are still developing">
      <text x={x0} y="20" className={note}>arrival</text>
      <text x={x0 + W} y="20" textAnchor="end" className={note}>over time</text>
      {rows.map(([name, to], i) => {
        const y = 48 + i * 32
        const end = x0 + W * to
        const first = i === 0
        return (
          <g key={name}>
            <text x="0" y={y + 4} className={label}>{name}</text>
            <path d={`M${end} ${y} H${x0 + W}`} stroke="var(--color-faint)" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="3 5" />
            <motion.path d={`M${x0} ${y} H${end}`} fill="none" stroke={first ? blue : ink} strokeWidth="1.5" {...draw(0.2 + i * 0.12, 1)} />
            <circle cx={end} cy={y} r="3" fill={first ? blue : ink} />
          </g>
        )
      })}
    </svg>
  )
}
