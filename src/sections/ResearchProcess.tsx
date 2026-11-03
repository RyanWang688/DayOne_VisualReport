import { useRef } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { processStages, type ProcessStage } from '../content/process'
import { clusters } from '../content/affinity'
import { useActiveIndex } from '../hooks/useActiveSection'
import { Expandable, Reveal, SectionHeader, SourceTag, asset } from '../components/ui'

export function ResearchProcess() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 50%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 200, damping: 40 })
  const active = useActiveIndex(processStages.length, 'stage')

  return (
    <section id="project-overview" className="border-t border-line py-24 md:py-32">
      <div className="container-x">
        <SectionHeader
          id="project-overview"
          title="A user-centred process, from listening to testing."
          intro="Each stage produced something the next one depended on: interviews became codes, codes became themes, themes became features, and features were tested with students."
        />

        <div ref={ref} className="relative grid gap-10 lg:grid-cols-12">
          {/* Sticky stage index with scroll-driven progress */}
          <nav aria-label="Process stages" className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <ol className="relative flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0 lg:pl-6">
                <span aria-hidden className="absolute bottom-3 left-[3px] top-3 hidden w-px bg-line lg:block" />
                <motion.span aria-hidden className="absolute left-[3px] top-3 hidden w-px origin-top bg-blue lg:block" style={{ scaleY: fill, bottom: 12 }} />
                {processStages.map((s, i) => (
                  <li key={s.key} className="shrink-0">
                    <a
                      href={`#stage-${i}`}
                      aria-current={active === i ? 'step' : undefined}
                      className={`relative flex items-baseline gap-3 rounded-[3px] border px-3 py-2 transition-colors duration-300 lg:border-0 lg:px-0 lg:py-1.5 ${
                        active === i ? 'border-blue bg-blue-soft text-ink lg:bg-transparent' : 'border-line text-faint hover:text-ink'
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`absolute -left-[27px] top-1/2 hidden h-[9px] w-[9px] -translate-y-1/2 rounded-full border-2 transition-colors lg:block ${
                          active >= i ? 'border-blue bg-blue' : 'border-line bg-canvas'
                        }`}
                      />
                      <span className="font-mono text-[12px]">0{i + 1}</span>
                      <span className={`font-display font-semibold tracking-tight lg:text-[1.2rem] ${active === i ? 'text-ink' : ''}`}>{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
              <div className="mt-6 hidden lg:block [@media(max-height:560px)]:hidden" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Evidence stage={processStages[active]} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </nav>

          <div className="flex flex-col gap-16 lg:col-span-8 lg:gap-28">
            {processStages.map((s, i) => (
              <StagePanel key={s.key} stage={s} index={i} active={active === i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StagePanel({ stage, index, active }: { stage: ProcessStage; index: number; active: boolean }) {
  return (
    <article id={`stage-${index}`} data-index={index} className="scroll-mt-28" aria-labelledby={`stage-title-${index}`}>
      <Reveal>
        <div
          className={`border bg-paper transition-[opacity,box-shadow,border-color] duration-500 ${
            active ? 'border-ink/20 shadow-[0_24px_48px_-32px_rgba(14,20,34,0.35)]' : 'border-line lg:opacity-55'
          }`}
        >
          <div className="border-b border-line bg-canvas/60 p-5 sm:p-8">
            <StageVisual stage={stage} />
          </div>
          <div className="p-5 sm:p-8">
            <p className="eyebrow text-blue">
              Stage 0{index + 1} · {stage.verb}
            </p>
            <h3 id={`stage-title-${index}`} className="mt-2 text-3xl font-bold">
              {stage.title}
            </h3>
            <p className="mt-3 max-w-[60ch] text-ink-2">{stage.summary}</p>
            <div className="mt-6 lg:hidden">
              <Evidence stage={stage} />
            </div>
            <div className="mt-6">
              <Expandable label="Details">
                <ul className="space-y-2 text-[15px] text-muted">
                  {stage.details.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 bg-blue" />
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <SourceTag>{stage.source}</SourceTag>
                </div>
              </Expandable>
            </div>
          </div>
        </div>
      </Reveal>
    </article>
  )
}

/** Key evidence for a stage — shown in the sticky column on desktop, inline on mobile. */
function Evidence({ stage }: { stage: ProcessStage }) {
  return (
    <div className="border-t-2 border-ink pt-3">
      <p className="eyebrow">Evidence · {stage.title}</p>
      <dl className="mt-3 grid grid-cols-3 gap-3">
        {stage.evidence.map((e) => (
          <div key={e.label}>
            <dt className="font-display text-[1.6rem] font-bold leading-none text-blue">{e.value}</dt>
            <dd className="mt-1 text-[13px] leading-tight text-muted">{e.label}</dd>
          </div>
        ))}
      </dl>
      {stage.anchor && (
        <figure className="mt-4 border-l-2 border-sun pl-3 [@media(max-height:760px)]:lg:hidden">
          <blockquote className="font-serif text-[16px] italic leading-snug text-ink">“{stage.anchor.text}”</blockquote>
          <figcaption className="mt-1 font-mono text-[12px] text-faint">{stage.anchor.by}</figcaption>
        </figure>
      )}
    </div>
  )
}

function StageVisual({ stage }: { stage: ProcessStage }) {
  const v = stage.visual
  if (v.kind === 'image')
    return (
      <figure>
        <img src={asset(v.src)} alt={v.alt} loading="lazy" className="mx-auto max-h-[300px] w-auto object-contain" />
        <figcaption className="mt-3 font-mono text-[12px] text-faint">{v.caption}</figcaption>
      </figure>
    )

  if (v.name === 'interviews')
    return (
      <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end" aria-label="Eight interview participants, P1 to P8, and four interview stages">
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="flex aspect-square flex-col justify-between border border-line bg-paper p-2 sm:p-3">
              <span className="font-mono text-[12px] text-faint">Interview</span>
              <span className="font-display text-xl font-bold text-blue sm:text-2xl">P{i + 1}</span>
            </div>
          ))}
        </div>
        <ol className="flex flex-col gap-1 font-mono text-[12px] text-muted">
          {['Before arrival', 'First arrival', 'Settling in', 'Daily life'].map((s, i) => (
            <li key={s}>
              <span className="text-blue">{i + 1}</span> {s}
            </li>
          ))}
        </ol>
      </div>
    )

  if (v.name === 'affinity')
    return (
      <div aria-label="Ten affinity clusters synthesised into four themes" className="grid gap-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
        <ul className="flex flex-wrap gap-1.5">
          {clusters.map((c) => (
            <li
              key={c.title}
              className="rotate-[-0.6deg] px-1.5 py-0.5 text-[12px] leading-tight text-ink-2 shadow-[1px_1px_0_rgba(0,0,0,0.06)] odd:rotate-[0.8deg] sm:px-2 sm:py-1 sm:text-[12px]"
              style={{ backgroundColor: c.color.note }}
            >
              {c.title}
            </li>
          ))}
        </ul>
        <span aria-hidden className="hidden font-mono text-blue sm:block">→</span>
        <ol className="grid grid-cols-2 gap-1.5 sm:grid-cols-1">
          {['Uncertain info', 'Knowing ≠ doing', 'Learning by doing', 'Not fully settled'].map((t, i) => (
            <li key={t} className="bg-blue px-2.5 py-1.5 text-[12px] font-medium text-white">
              T{i + 1} · {t}
            </li>
          ))}
        </ol>
      </div>
    )

  return (
    <ol aria-label="Six feature concepts" className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
      {stage.outputs.map((o, i) => (
        <li key={o} className="flex min-h-[72px] flex-col justify-between bg-paper p-3">
          <span className="font-mono text-[12px] text-blue">0{i + 1}</span>
          <span className="font-display text-[15px] font-semibold leading-tight">{o}</span>
        </li>
      ))}
    </ol>
  )
}
