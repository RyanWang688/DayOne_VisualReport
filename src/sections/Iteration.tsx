import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Expand, MoveRight } from 'lucide-react'
import { evolutionTrace, fidelityStages, hifiGroups, sketches, wireGroups, type FidelityStage, type ScreenGroup } from '../content/iteration'
import { Lightbox, type LightboxItem } from '../components/Lightbox'
import { NextChapter, Reveal, SectionHeader, SourceTag, asset } from '../components/ui'

const ease = [0.22, 1, 0.36, 1] as const

export function Iteration() {
  const [box, setBox] = useState<{ items: LightboxItem[]; index: number } | null>(null)
  const openBox = (items: LightboxItem[], index: number) => setBox({ items, index })

  return (
    <section id="iteration" className="border-t border-line bg-paper py-24 md:py-32">
      <div className="container-x">
        <SectionHeader
          id="iteration"
          title="From sketches to a testable prototype."
          intro="The concept was built up in three rounds. Sketches explored ideas quickly, wireframes fixed the flows, and the initial high-fidelity prototype was detailed enough to test with students."
        />

        <Trace onOpen={openBox} />

        <div className="mt-24">
          <Reveal>
            <p className="eyebrow text-blue">6.2 · Fidelity explorer</p>
            <h3 className="mt-2 text-[clamp(1.4rem,2.2vw,1.85rem)] font-semibold">Every screen, at every stage.</h3>
            <p className="mt-3 max-w-[60ch] text-[15px] text-muted">Switch stage, pick a feature, and open any screen to look closer.</p>
          </Reveal>
          <Explorer onOpen={openBox} />
        </div>

        <NextChapter from="iteration" />
      </div>
      <Lightbox items={box?.items ?? []} index={box?.index ?? null} onClose={() => setBox(null)} onIndex={(i) => setBox((b) => (b ? { ...b, index: i } : b))} />
    </section>
  )
}

/** 6.1 — one topic traced across the three fidelities; frames arrive one after another as a line draws between them. */
function Trace({ onOpen }: { onOpen: (items: LightboxItem[], i: number) => void }) {
  const items = evolutionTrace.steps.map((s) => ({ src: s.src, alt: s.alt, caption: `${s.stage} · ${evolutionTrace.topic}` }))
  return (
    <div>
      <Reveal>
        <p className="eyebrow text-blue">6.1 · One journey, three fidelities</p>
        <h3 className="mt-2 text-[clamp(1.4rem,2.2vw,1.85rem)] font-semibold">{evolutionTrace.topic}</h3>
      </Reveal>
      <div className="relative mt-10">
        {/* connector line draws across as the frames arrive */}
        <motion.span
          aria-hidden
          className="absolute left-[16%] right-[16%] top-1/2 hidden h-px origin-left bg-blue/40 md:block"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 1.2, ease, delay: 0.2 }}
        />
        <ol className="relative grid grid-cols-3 items-center gap-3 sm:gap-8">
          {evolutionTrace.steps.map((s, i) => (
            <motion.li
              key={s.stage}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 24, rotate: i === 0 ? -3 : 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: i === 0 ? -2 : 0 }}
              viewport={{ once: true, margin: '0px 0px -20% 0px' }}
              transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.35 }}
            >
              <button
                type="button"
                onClick={() => onOpen(items, i)}
                aria-label={`Enlarge: ${s.alt}`}
                className={`group relative block w-full overflow-hidden bg-white transition-transform duration-300 hover:-translate-y-1 ${
                  s.kind === 'sketch' ? 'max-w-[240px] border border-line p-2 shadow-[0_16px_30px_-24px_rgba(14,20,34,0.5)]' : 'max-w-[170px] rounded-[18px] border-[5px] border-ink shadow-[0_24px_40px_-28px_rgba(14,20,34,0.6)]'
                }`}
              >
                <img src={asset(s.src)} alt={s.alt} loading="lazy" decoding="async" className={`block w-full ${s.kind === 'sketch' ? 'aspect-square object-cover' : 'aspect-[402/874] rounded-[13px] object-cover object-top'}`} />
                <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-ink/70 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand size={14} aria-hidden />
                </span>
              </button>
              <p className="mt-4 flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.12em] text-blue">
                <span className="text-faint">0{i + 1}</span> {s.stage}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
      <p className="mt-6 max-w-[70ch] text-[14px] text-muted">{evolutionTrace.note}</p>
    </div>
  )
}

/** 6.2 — tabbed fidelity explorer: stages → feature groups → screens. */
function Explorer({ onOpen }: { onOpen: (items: LightboxItem[], i: number) => void }) {
  const [stage, setStage] = useState<FidelityStage['key']>('low')
  const k = fidelityStages.findIndex((s) => s.key === stage)
  const tabsId = useId()

  return (
    <div className="mt-8">
      {/* Stage tabs with a progress rail */}
      <div role="tablist" aria-label="Fidelity stage" className="relative grid grid-cols-3 border-b border-line">
        {fidelityStages.map((s, i) => (
          <button
            key={s.key}
            id={`${tabsId}-tab-${s.key}`}
            role="tab"
            type="button"
            aria-selected={stage === s.key}
            aria-controls={`${tabsId}-panel`}
            onClick={() => setStage(s.key)}
            onKeyDown={(e) => {
              if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
              const next = fidelityStages[(i + (e.key === 'ArrowRight' ? 1 : -1) + 3) % 3]
              setStage(next.key)
              document.getElementById(`${tabsId}-tab-${next.key}`)?.focus()
            }}
            tabIndex={stage === s.key ? 0 : -1}
            className={`relative flex flex-col items-start gap-1 px-1 pb-4 pt-2 text-left transition-colors sm:px-2 ${stage === s.key ? 'text-ink' : 'text-faint hover:text-ink'}`}
          >
            <span className="font-mono text-[12px] text-blue">0{i + 1}</span>
            <span className="font-display text-[15px] font-semibold sm:text-lg">
              <span className="sm:hidden">{s.short}</span>
              <span className="hidden sm:inline">{s.label}</span>
            </span>
            {stage === s.key && <motion.span layoutId={`${tabsId}-pill`} className="absolute inset-x-0 -bottom-px h-[3px] bg-blue" transition={{ duration: 0.35, ease }} />}
          </button>
        ))}
        {/* how far along the fidelity scale we are */}
        <motion.span aria-hidden className="pointer-events-none absolute -bottom-px left-0 h-px origin-left bg-blue/40" style={{ width: '100%' }} animate={{ scaleX: (k + 1) / 3 }} transition={{ duration: 0.5, ease }} />
      </div>

      <div id={`${tabsId}-panel`} role="tabpanel" aria-labelledby={`${tabsId}-tab-${stage}`} className="pt-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={stage} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease }}>
            <p className="max-w-[62ch] text-ink-2">{fidelityStages[k].summary}</p>
            {stage === 'low' ? <Sketches onOpen={onOpen} /> : <Groups groups={stage === 'wire' ? wireGroups : hifiGroups} stage={fidelityStages[k]} onOpen={onOpen} />}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-6">
        <SourceTag>Team design files — Low-fi, Wireframe and Initial High archives</SourceTag>
      </div>
    </div>
  )
}

function Sketches({ onOpen }: { onOpen: (items: LightboxItem[], i: number) => void }) {
  const items = sketches.map((s) => ({ src: s.src, alt: s.alt, caption: s.caption }))
  return (
    <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1.45fr]">
      {sketches.map((s, i) => (
        <motion.figure
          key={s.src}
          initial={{ opacity: 0, y: 20, rotate: i ? 1.5 : -1.5 }}
          animate={{ opacity: 1, y: 0, rotate: i ? 0.4 : -0.6 }}
          transition={{ duration: 0.5, ease, delay: 0.08 + i * 0.1 }}
        >
          <button type="button" onClick={() => onOpen(items, i)} aria-label={`Enlarge: ${s.alt}`} className="group block w-full border border-line bg-white p-2 shadow-[0_18px_34px_-28px_rgba(14,20,34,0.5)] transition-transform duration-300 hover:-translate-y-1">
            <img src={asset(s.src)} alt={s.alt} width={s.w} height={s.h} loading="lazy" decoding="async" className="block h-auto w-full" />
          </button>
          <figcaption className="mt-3 text-[14px] text-muted">{s.caption}</figcaption>
        </motion.figure>
      ))}
    </div>
  )
}

function Groups({ groups, stage, onOpen }: { groups: ScreenGroup[]; stage: FidelityStage; onOpen: (items: LightboxItem[], i: number) => void }) {
  const [key, setKey] = useState(groups[0].key)
  const g = groups.find((x) => x.key === key) ?? groups[0]
  const items = g.screens.map((s) => ({ src: s.src, alt: s.alt, caption: `${stage.label} · ${g.name}` }))
  const mid = (g.screens.length - 1) / 2

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Feature">
        {groups.map((x) => (
          <button
            key={x.key}
            type="button"
            aria-pressed={x.key === g.key}
            onClick={() => setKey(x.key)}
            className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[14px] transition-colors ${x.key === g.key ? 'border-ink bg-ink text-white' : 'border-line bg-canvas text-ink-2 hover:border-ink/40'}`}
          >
            {x.name}
            <span className={`font-mono text-[11px] ${x.key === g.key ? 'text-white/60' : 'text-faint'}`}>{x.screens.length}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={g.key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <p className="mt-5 max-w-[62ch] text-[15px] text-muted">
            {g.intro}
            {g.note && <span className="ml-2 font-mono text-[12px] uppercase tracking-[0.1em] text-faint">· {g.note}</span>}
          </p>
          {/* screens are "dealt" from a small pile into a row */}
          <ol className="-mx-4 mt-6 flex snap-x gap-4 overflow-x-auto px-4 pb-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 scroll-px-4 sm:scroll-px-8 lg:scroll-px-12" tabIndex={0} aria-label={`${g.name} screens, scroll horizontally`}>
            {g.screens.map((s, i) => (
              <motion.li
                key={s.src}
                className="w-[150px] shrink-0 snap-start sm:w-[176px]"
                initial={{ opacity: 0, x: (mid - i) * 60, y: 26, rotate: (i - mid) * 5 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                transition={{ duration: 0.55, ease, delay: i * 0.05 }}
              >
                <button
                  type="button"
                  onClick={() => onOpen(items, i)}
                  aria-label={`Enlarge: ${s.alt}`}
                  className="group relative block w-full overflow-hidden rounded-[16px] border-[4px] border-ink bg-white shadow-[0_22px_36px_-28px_rgba(14,20,34,0.6)] transition-transform duration-300 hover:-translate-y-1.5"
                >
                  <img src={asset(s.src)} alt={s.alt} loading="lazy" decoding="async" className="block aspect-[402/874] w-full rounded-[12px] object-cover object-top" />
                  {s.tall && (
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 flex h-14 items-end justify-center bg-gradient-to-t from-white via-white/80 to-transparent pb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                      Long screen
                    </span>
                  )}
                  <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-ink/70 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Expand size={14} aria-hidden />
                  </span>
                </button>
              </motion.li>
            ))}
          </ol>
          {g.screens.length > 3 && (
            <p className="flex items-center gap-2 font-mono text-[12px] text-faint sm:hidden">
              Swipe for more <MoveRight size={14} aria-hidden />
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
