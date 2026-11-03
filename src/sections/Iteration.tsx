import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Expand } from 'lucide-react'
import { evolutionTrace, fidelityStages, hifiGroups, sketches, wireGroups, type FidelityStage, type ScreenGroup } from '../content/iteration'
import { challenges } from '../content/challenges'
import { Lightbox, type LightboxItem } from '../components/Lightbox'
import { SectionHeader, SourceTag, SubHeader, asset } from '../components/ui'

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
          <SubHeader num="6.1" label="Fidelity explorer" title="Every screen, at every stage." lead="Switch stage, pick a feature, and open any screen to look closer." />
          <Explorer onOpen={openBox} />
        </div>
      </div>
      <Lightbox items={box?.items ?? []} index={box?.index ?? null} onClose={() => setBox(null)} onIndex={(i) => setBox((b) => (b ? { ...b, index: i } : b))} />
    </section>
  )
}

/** One topic traced across the three fidelities: three equal stage cards that arrive in sequence, joined by arrows. */
function Trace({ onOpen }: { onOpen: (items: LightboxItem[], i: number) => void }) {
  const items = evolutionTrace.steps.map((s) => ({ src: s.src, alt: s.alt, caption: `${s.stage} · ${evolutionTrace.topic}` }))
  const view = { once: true, margin: '0px 0px -15% 0px' } as const
  return (
    <figure className="border border-line bg-canvas">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line px-5 py-4 sm:px-8">
        <span className="font-display text-lg font-semibold tracking-tight">{evolutionTrace.topic}</span>
        <span className="font-mono text-[12px] text-faint">One journey · three fidelities</span>
      </figcaption>

      <ol className="grid grid-cols-3 gap-2 p-3 sm:gap-0 sm:p-0 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {evolutionTrace.steps.flatMap((s, i) => {
          const card = (
            <motion.li
              key={s.stage}
              className="flex flex-col sm:p-6 lg:p-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={view}
              transition={{ duration: 0.6, ease, delay: 0.1 + i * 0.3 }}
            >
              <p className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.12em]">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue text-[11px] text-white">{i + 1}</span>
                <span className="text-ink">{s.stage}</span>
              </p>
              {/* equal-height stage so the three frames line up */}
              <button
                type="button"
                onClick={() => onOpen(items, i)}
                aria-label={`Enlarge: ${s.alt}`}
                className="group relative mt-4 flex h-[200px] items-center justify-center sm:h-[300px] lg:h-[360px]"
              >
                {s.kind === 'sketch' ? (
                  <span className="block w-full max-w-[280px] -rotate-2 border border-line bg-white p-1.5 shadow-[0_18px_30px_-22px_rgba(14,20,34,0.55)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-0 sm:p-2">
                    <img src={asset(s.src)} alt={s.alt} loading="lazy" decoding="async" className="block aspect-square w-full object-cover" />
                  </span>
                ) : (
                  <span className="block h-full overflow-hidden rounded-[14px] border-[4px] border-ink bg-white shadow-[0_24px_40px_-28px_rgba(14,20,34,0.6)] transition-transform duration-300 group-hover:-translate-y-1 sm:rounded-[20px] sm:border-[6px]">
                    <img src={asset(s.src)} alt={s.alt} loading="lazy" decoding="async" className="block aspect-[402/874] h-full rounded-[10px] object-cover object-top sm:rounded-[14px]" />
                  </span>
                )}
                <span className="absolute right-1 top-1 hidden h-7 w-7 place-items-center rounded-full bg-ink/70 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:grid">
                  <Expand size={14} aria-hidden />
                </span>
              </button>
              <p className="mt-5 hidden text-[14px] leading-snug text-muted sm:block">{s.caption}</p>
            </motion.li>
          )
          if (i === evolutionTrace.steps.length - 1) return [card]
          return [
            card,
            <motion.li
              key={`arrow-${i}`}
              aria-hidden
              className="hidden items-center md:flex"
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={view}
              transition={{ duration: 0.4, ease, delay: 0.35 + i * 0.3 }}
            >
              <span className="grid h-10 w-10 place-items-center rounded-full border border-line bg-paper text-blue">
                <ArrowRight size={18} />
              </span>
            </motion.li>,
          ]
        })}
      </ol>
      <p className="border-t border-line px-5 py-3 text-[13px] text-faint sm:px-8">{evolutionTrace.note}</p>
    </figure>
  )
}

/** 6.1 — tabbed fidelity explorer: stages → feature groups → screens. */
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
          {g.addresses && (
            <div className="mt-5 border border-line bg-canvas p-4 sm:p-5">
              <p className="eyebrow">Designed to address · interview challenges</p>
              <ul className="mt-3 grid gap-3 md:grid-cols-2">
                {g.addresses.map((a, i) => (
                  <motion.li
                    key={a.finding}
                    className="flex gap-3"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease, delay: 0.1 + i * 0.08 }}
                  >
                    <a
                      href={`#challenge-${a.theme - 1}`}
                      className="h-fit shrink-0 rounded-[3px] bg-blue px-1.5 py-0.5 font-mono text-[12px] text-white transition-colors hover:bg-blue-deep"
                      aria-label={`Theme ${a.theme}: ${challenges[a.theme - 1].short}`}
                    >
                      T{a.theme}
                    </a>
                    <span className="text-[14px] leading-snug">
                      <span className="font-semibold text-ink">{challenges[a.theme - 1].short}</span>
                      <span className="text-faint"> · {a.finding}</span>
                      <span className="mt-0.5 block text-muted">{a.how}</span>
                    </span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-3 font-mono text-[11px] text-faint">Mapping follows 5.1 (field-report findings → poster features).</p>
            </div>
          )}
          {/* screens are "dealt" from a small pile into a wrapping grid — no horizontal scrolling */}
          <ol className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6" aria-label={`${g.name} screens`}>
            {g.screens.map((s, i) => (
              <motion.li
                key={s.src}
                className="min-w-0"
                initial={{ opacity: 0, x: (mid - i) * 24, y: 26, rotate: (i - mid) * 4 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                transition={{ duration: 0.55, ease, delay: i * 0.05 }}
              >
                <button
                  type="button"
                  onClick={() => onOpen(items, i)}
                  aria-label={`Enlarge: ${s.alt}`}
                  className="group relative block w-full overflow-hidden rounded-[12px] border-[3px] border-ink bg-white sm:rounded-[16px] sm:border-[4px] shadow-[0_22px_36px_-28px_rgba(14,20,34,0.6)] transition-transform duration-300 hover:-translate-y-1.5"
                >
                  <img src={asset(s.src)} alt={s.alt} loading="lazy" decoding="async" className="block aspect-[402/874] w-full rounded-[9px] object-cover object-top sm:rounded-[12px]" />
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
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
