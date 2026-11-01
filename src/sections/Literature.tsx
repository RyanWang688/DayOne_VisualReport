import { motion } from 'motion/react'
import { litContext, litFraming, litInsights, type LitInsight } from '../content/literature'
import { refByKey } from '../content/references'
import { Cite, Expandable, Reveal, SectionHeader } from '../components/ui'

export function Literature() {
  return (
    <section id="literature" className="border-t border-line bg-paper py-24 md:py-32">
      <div className="container-x">
        <SectionHeader
          num="02"
          label="Literature Review"
          title="What earlier research told us to look for."
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
                <h3 className="mt-2 text-2xl font-bold">{c.title}</h3>
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
      <Reveal className="md:col-span-1">
        <span className="font-display text-5xl font-extrabold text-blue md:text-6xl">{ins.num}</span>
      </Reveal>
      <div className="md:col-span-6">
        <Reveal>
          <h3 id={`lit-${ins.num}`} className="text-[clamp(1.8rem,3.4vw,2.8rem)] font-bold">
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
        <figure className="border border-line bg-canvas p-6">
          <Diagram kind={ins.diagram} />
          <figcaption className="mt-4 font-mono text-[11px] text-faint">Conceptual diagram — illustrates the argument, not data.</figcaption>
        </figure>
      </Reveal>
    </article>
  )
}

function Diagram({ kind }: { kind: LitInsight['diagram'] }) {
  if (kind === 'gap')
    return (
      <svg viewBox="0 0 320 180" className="w-full" role="img" aria-label="Information on one side, action on the other, with a gap between them">
        <rect x="8" y="50" width="110" height="80" fill="var(--color-paper)" stroke="var(--color-line)" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="22" y={66 + i * 14} width={80 - i * 12} height="5" fill="var(--color-ink)" opacity={0.25 + i * 0.1} />
        ))}
        <text x="63" y="150" textAnchor="middle" className="fill-[var(--color-muted)] font-mono text-[10px]">INFORMATION</text>
        <rect x="202" y="50" width="110" height="80" fill="var(--color-blue)" />
        <path d="M232 92l14 14 30-30" stroke="#fff" strokeWidth="5" fill="none" />
        <text x="257" y="150" textAnchor="middle" className="fill-[var(--color-muted)] font-mono text-[10px]">ACTION</text>
        <motion.rect
          x="124"
          y="89"
          width="72"
          height="2"
          fill="var(--color-ink)"
          opacity={0.5}
          style={{ transformBox: 'fill-box', transformOrigin: 'left' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
        <rect x="140" y="72" width="40" height="36" fill="var(--color-sun-soft)" stroke="var(--color-sun)" />
        <text x="160" y="96" textAnchor="middle" className="fill-[var(--color-ink)] font-display text-[18px] font-bold">?</text>
      </svg>
    )
  if (kind === 'loop')
    return (
      <svg viewBox="0 0 320 200" className="w-full" role="img" aria-label="A loop: try, mistake, feedback or help, try again">
        <circle cx="160" cy="100" r="66" fill="none" stroke="var(--color-line)" strokeWidth="2" />
        <motion.path
          d="M160 34 A66 66 0 1 1 94 100"
          fill="none"
          stroke="var(--color-blue)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
        {[
          ['Try', 160, 26],
          ['Mistake', 252, 104],
          ['Feedback · help', 160, 186],
          ['Try again', 66, 104],
        ].map(([t, x, y]) => (
          <g key={t as string}>
            <rect x={(x as number) - 46} y={(y as number) - 13} width="92" height="22" fill="var(--color-paper)" stroke="var(--color-ink)" />
            <text x={x as number} y={(y as number) + 2} textAnchor="middle" className="fill-[var(--color-ink)] font-sans text-[11px] font-medium">
              {t}
            </text>
          </g>
        ))}
      </svg>
    )
  return (
    <svg viewBox="0 0 320 190" className="w-full" role="img" aria-label="Different areas of life settle at different paces over time">
      {['Daily tasks', 'Language', 'Social life', 'Study'].map((l, i) => {
        const w = [230, 150, 100, 125][i]
        return (
          <g key={l} transform={`translate(0 ${18 + i * 40})`}>
            <text x="0" y="12" className="fill-[var(--color-muted)] font-mono text-[10px]">
              {l.toUpperCase()}
            </text>
            <rect x="88" y="2" width="224" height="14" fill="var(--color-paper)" stroke="var(--color-line)" />
            <motion.rect
              x="88"
              y="2"
              width={w * 0.97}
              height="14"
              fill="var(--color-blue)"
              opacity={i === 0 ? 1 : 0.45}
              style={{ transformBox: 'fill-box', transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '0px 0px -20% 0px' }}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            />
          </g>
        )
      })}
      <text x="312" y="186" textAnchor="end" className="fill-[var(--color-faint)] font-mono text-[10px]">
        TIME →
      </text>
    </svg>
  )
}
