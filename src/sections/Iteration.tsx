import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { ArrowRight, ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import { evolutionTrace, fidelityStages, hifiGroups, sketches, wireGroups, type FidelityStage, type Screen, type ScreenGroup } from '../content/iteration'
import { challenges } from '../content/challenges'
import { Lightbox, type LightboxItem } from '../components/Lightbox'
import { SectionHeader, SubHeader, asset } from '../components/ui'

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
          <SubHeader num="6.1" label="Fidelity explorer" title="Every screen, at every stage." />
          <Explorer onOpen={openBox} />
        </div>
      </div>
      <Lightbox items={box?.items ?? []} index={box?.index ?? null} onClose={() => setBox(null)} onIndex={(i) => setBox((b) => (b ? { ...b, index: i } : b))} />
    </section>
  )
}

/** One topic traced across the three fidelities: three equal stage cards that arrive in sequence, joined by arrows. */
function Trace({ onOpen }: { onOpen: (items: LightboxItem[], i: number) => void }) {
  const items = evolutionTrace.steps.map((s) => ({ src: s.src, alt: s.alt, caption: s.stage }))
  const view = { once: true, margin: '0px 0px -15% 0px' } as const
  return (
    <figure className="border border-line bg-canvas" aria-label="Iteration flow: low-fi, wireframe, initial hi-fi">
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
    </figure>
  )
}

/** 6.1 — fidelity explorer: stage tabs → feature row with prev/next → screens. */
function Explorer({ onOpen }: { onOpen: (items: LightboxItem[], i: number) => void }) {
  const [stage, setStage] = useState<FidelityStage['key']>('low')
  const k = fidelityStages.findIndex((s) => s.key === stage)
  const tabsId = useId()

  return (
    <div className="mt-8">
      {/* Stage tabs: centred labels, each on its own rule; the blue bar slides to the active stage */}
      <div role="tablist" aria-label="Fidelity stage" className="grid grid-cols-3 gap-3 sm:gap-6">
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
            className={`relative border-b-2 border-line pb-4 pt-2 text-center font-display text-[15px] font-semibold transition-colors sm:text-lg ${stage === s.key ? 'text-ink' : 'text-faint hover:text-ink-2'}`}
          >
            <span className="sm:hidden">{s.short}</span>
            <span className="hidden sm:inline">{s.label}</span>
            {stage === s.key && <motion.span layoutId={`${tabsId}-bar`} className="absolute inset-x-0 -bottom-[2px] h-[3px] bg-blue" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
          </button>
        ))}
      </div>

      <div id={`${tabsId}-panel`} role="tabpanel" aria-labelledby={`${tabsId}-tab-${stage}`} className="pt-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={stage} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease }}>
            <p className="mx-auto max-w-[60ch] text-center text-ink-2">{fidelityStages[k].summary}</p>
            {stage === 'low' ? <Sketches onOpen={onOpen} /> : <Groups groups={stage === 'wire' ? wireGroups : hifiGroups} stage={fidelityStages[k]} onOpen={onOpen} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function Sketches({ onOpen }: { onOpen: (items: LightboxItem[], i: number) => void }) {
  const items = sketches.map((s) => ({ src: s.src, alt: s.alt, caption: s.caption }))
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1.45fr]">
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
          <figcaption className="mt-3 text-center text-[14px] text-muted">{s.caption}</figcaption>
        </motion.figure>
      ))}
    </div>
  )
}

function Groups({ groups, stage, onOpen }: { groups: ScreenGroup[]; stage: FidelityStage; onOpen: (items: LightboxItem[], i: number) => void }) {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const rowId = useId()
  const g = groups[idx]
  const items = g.screens.map((s) => ({ src: s.src, alt: s.alt, caption: `${stage.label} · ${g.name}` }))
  const go = (n: number) => {
    const next = (n + groups.length) % groups.length
    setDir(n > idx ? 1 : -1)
    setIdx(next)
  }

  return (
    <div className="mt-8">
      {/* Feature row: plain text, the active one grows and gets an underline that glides between features */}
      <div className="flex flex-wrap items-end justify-center gap-x-6 gap-y-2 sm:gap-x-9" role="tablist" aria-label="Feature">
        {groups.map((x, i) => {
          const on = i === idx
          return (
            <button
              key={x.key}
              id={`${rowId}-${i}`}
              type="button"
              role="tab"
              aria-selected={on}
              tabIndex={on ? 0 : -1}
              onClick={() => go(i)}
              onKeyDown={(e) => {
                if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
                const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + groups.length) % groups.length
                go(e.key === 'ArrowRight' ? idx + 1 : idx - 1)
                document.getElementById(`${rowId}-${n}`)?.focus()
              }}
              className="relative px-1.5 pb-2"
            >
              <motion.span
                className={`block origin-bottom font-display font-semibold tracking-tight ${on ? 'text-ink' : 'text-faint hover:text-ink-2'}`}
                initial={false}
                animate={{ scale: on ? 1.1 : 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)' }}
              >
                {x.name}
              </motion.span>
              {on && <motion.span layoutId={`${rowId}-line`} className="absolute -bottom-0.5 left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
            </button>
          )
        })}
      </div>

      {/* Screens, flanked by prev / next */}
      <div className="relative mt-6 flex items-center gap-2 sm:gap-4">
        <NavArrow side="prev" label={`Previous feature: ${groups[(idx - 1 + groups.length) % groups.length].name}`} onClick={() => go(idx - 1)} />
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.div
              key={g.key}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 80, filter: 'blur(4px)' }),
                center: { opacity: 1, x: 0, filter: 'blur(0px)' },
                exit: (d: number) => ({ opacity: 0, x: d * -80, filter: 'blur(4px)' }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease }}
            >
              <ScreenCarousel screens={g.screens} label={g.name} onOpen={(i) => onOpen(items, i)} />
              <p className="mx-auto mt-2 max-w-[60ch] text-center text-[15px] text-muted">
                <span className="font-semibold text-ink">{g.name}</span>
                {g.note && <span className="text-faint"> ({g.note})</span>} · {g.intro}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <NavArrow side="next" label={`Next feature: ${groups[(idx + 1) % groups.length].name}`} onClick={() => go(idx + 1)} />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {g.addresses && (
          <motion.ul key={g.key} className={`mx-auto mt-8 grid max-w-[1000px] gap-4 ${g.addresses.length > 1 ? 'lg:grid-cols-2' : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            {g.addresses.map((a, i) => (
              <motion.li
                key={a.finding}
                className="rounded-[14px] border border-line bg-paper p-5 shadow-[0_18px_36px_-30px_rgba(14,20,34,0.4)] sm:p-6"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease, delay: 0.08 + i * 0.1 }}
              >
                <p className="flex items-center gap-3">
                  <a
                    href={`#challenge-${a.theme - 1}`}
                    className="grid h-7 min-w-9 place-items-center rounded-[6px] bg-blue px-2 font-mono text-[13px] text-white transition-colors hover:bg-blue-deep"
                    aria-label={`Theme ${a.theme}: ${challenges[a.theme - 1].short}`}
                  >
                    T{a.theme}
                  </a>
                  <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted">Research finding · {challenges[a.theme - 1].short}</span>
                </p>
                <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.1em] text-faint">User problem</p>
                <p className="mt-1 font-display text-[clamp(1.25rem,2vw,1.6rem)] font-semibold leading-[1.2] tracking-tight text-ink">{a.problem}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{a.detail}</p>
                <div className="mt-5 border-t border-line pt-4">
                  <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-blue">Design response · {g.name}</p>
                  <p className="mt-1 text-[15px] text-ink">{a.how}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Round prev/next button; the chevron nudges in its direction on hover. */
function NavArrow({ side, label, onClick }: { side: 'prev' | 'next'; label: string; onClick: () => void }) {
  const Icon = side === 'prev' ? ChevronLeft : ChevronRight
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-paper text-muted transition-colors hover:border-ink/40 hover:text-ink sm:h-12 sm:w-14"
      whileTap={{ scale: 0.92 }}
    >
      <Icon size={20} className={`transition-transform duration-200 ${side === 'prev' ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`} />
    </motion.button>
  )
}
const SPEED = 38 // px per second
const GAP = 16

const SHADOW_REST = '0 22px 36px -28px rgba(14,20,34,0.6)'
const SHADOW_LIFT = '0 36px 50px -26px rgba(14,20,34,0.5)'

/**
 * A screen card that lifts on hover/focus and tilts gently towards the pointer, with a soft light sheen.
 * Neighbours step back slightly so the focused screen reads first.
 */
function ScreenCard({ s, dim, decorative, onOpen, onHover, onLeave }: { s: Screen; dim: boolean; decorative: boolean; onOpen: () => void; onHover: () => void; onLeave: () => void }) {
  const reduce = useReducedMotion()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const gx = useMotionValue(50)
  const gy = useMotionValue(30)
  const rotateX = useSpring(rx, { stiffness: 220, damping: 22 })
  const rotateY = useSpring(ry, { stiffness: 220, damping: 22 })
  const sheen = useTransform([gx, gy], ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.4), transparent 55%)`)

  const track = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 14)
    rx.set((0.5 - py) * 10)
    gx.set(px * 100)
    gy.set(py * 100)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
    onLeave()
  }

  return (
    <motion.button
      type="button"
      tabIndex={decorative ? -1 : undefined}
      onClick={onOpen}
      onPointerMove={track}
      onPointerEnter={onHover}
      onPointerLeave={reset}
      onFocus={onHover}
      onBlur={onLeave}
      aria-label={`Enlarge: ${s.alt}`}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      initial={false}
      animate={{ scale: dim ? 0.96 : 1, y: 0, opacity: dim ? 0.55 : 1, boxShadow: SHADOW_REST }}
      whileHover={reduce ? undefined : { scale: 1.06, y: -12, opacity: 1, boxShadow: SHADOW_LIFT }}
      whileFocus={reduce ? undefined : { scale: 1.06, y: -12, opacity: 1, boxShadow: SHADOW_LIFT }}
      transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.8 }}
      className="group relative block w-[132px] shrink-0 overflow-hidden rounded-[14px] border-[3px] border-ink bg-white sm:w-[168px] sm:rounded-[16px] sm:border-[4px]"
    >
      <img src={asset(s.src)} alt={decorative ? '' : s.alt} loading="lazy" decoding="async" draggable={false} className="block aspect-[402/874] w-full rounded-[10px] object-cover object-top sm:rounded-[12px]" />
      {s.tall && (
        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex h-14 items-end justify-center bg-gradient-to-t from-white via-white/80 to-transparent pb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
          Long screen
        </span>
      )}
      {/* soft light that follows the pointer */}
      <motion.span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: sheen }} />
      <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-ink/70 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        <Expand size={14} aria-hidden />
      </span>
    </motion.button>
  )
}
/**
 * One-row screen carousel that drifts on its own, pauses while the pointer or focus is on it,
 * can be dragged, and falls back to a static row when everything fits or motion is reduced.
 */
function ScreenCarousel({ screens, label, onOpen }: { screens: Screen[]; label: string; onOpen: (i: number) => void }) {
  const reduce = useReducedMotion()
  const wrap = useRef<HTMLDivElement>(null)
  const firstSet = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [setW, setSetW] = useState(0)
  const [wrapW, setWrapW] = useState(0)
  const [hover, setHover] = useState<number | null>(null)
  const [held, setHeld] = useState(false) // pointer/focus inside, or dragging
  const inView = useInView(wrap, { margin: '100px' })
  const loop = !reduce && setW > 0 && setW > wrapW + 1

  useLayoutEffect(() => {
    const measure = () => {
      setSetW(firstSet.current?.offsetWidth ?? 0)
      setWrapW(wrap.current?.offsetWidth ?? 0)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (wrap.current) ro.observe(wrap.current)
    if (firstSet.current) ro.observe(firstSet.current)
    return () => ro.disconnect()
  }, [screens])

  useEffect(() => x.set(0), [screens, x])

  const wrapX = (v: number) => (setW ? (((v % setW) + setW) % setW) - setW : v)

  useAnimationFrame((_, dt) => {
    if (!loop || held || !inView || document.hidden) return
    x.set(wrapX(x.get() - (SPEED * Math.min(dt, 64)) / 1000))
  })

  const copies = loop ? 2 : 1
  return (
    <div className="mt-2">
      <div
        ref={wrap}
        role="region"
        aria-label={`${label} screens`}
        className={`relative flex overflow-hidden pb-5 pt-10 ${loop ? '' : 'justify-center '}${loop ? '[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]' : ''}`}
        onMouseEnter={() => setHeld(true)}
        onMouseLeave={() => {
          setHeld(false)
          setHover(null)
        }}
        onFocus={() => setHeld(true)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setHeld(false)}
      >
        <motion.div
          className={`flex touch-pan-y ${reduce ? 'w-full' : 'w-max'}`}
          style={{ x }}
          onPanStart={() => setHeld(true)}
          onPan={(_, info) => loop && x.set(wrapX(x.get() + info.delta.x))}
          onPanEnd={(e) => (e as PointerEvent).pointerType !== 'mouse' && setHeld(false)}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
        >
          {Array.from({ length: copies }, (_, c) => (
            <div key={c} ref={c === 0 ? firstSet : undefined} className={`flex ${reduce ? 'flex-wrap' : 'shrink-0'}`} style={{ gap: GAP, paddingRight: loop ? GAP : 0 }} aria-hidden={c > 0 || undefined}>
              {screens.map((s, i) => (
                <ScreenCard
                  key={s.src}
                  s={s}
                  decorative={c > 0}
                  dim={hover !== null && hover !== i}
                  onOpen={() => onOpen(i)}
                  onHover={() => setHover(i)}
                  onLeave={() => setHover((h) => (h === i ? null : h))}
                />
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
