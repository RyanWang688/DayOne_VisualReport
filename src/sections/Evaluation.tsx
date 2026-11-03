import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from 'motion/react'
import { ChevronDown, ChevronsLeftRight, Quote as QuoteIcon } from 'lucide-react'
import { evalMethod, featureOrder, problems, refinements, type UsabilityProblem } from '../content/evaluation'
import { LiveDemo } from '../components/LiveDemo'
import { Expandable, Reveal, SectionHeader, SubHeader, asset } from '../components/ui'

const ease = [0.22, 1, 0.36, 1] as const

export function Evaluation() {
  return (
    <section id="evaluation" className="border-t border-line py-24 md:py-32">
      <div className="container-x">
        <SectionHeader id="evaluation" title="What testing showed, and what we changed." intro={evalMethod.overall} />
        <Method />
        <Problems />
        <Refinements />
        <LiveDemo />
      </div>
    </section>
  )
}

/* 7.1 ─────────────────────────────────────────────────────────────── */

function Method() {
  return (
    <div>
    <SubHeader num="7.1" label="Method" title="How we tested the prototype." />
    <div className="grid gap-10 md:grid-cols-12">
      <Reveal className="md:col-span-5">
        <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-faint">Research aim</p>
        <p className="mt-1 font-serif text-[1.3rem] italic leading-snug text-ink-2">{evalMethod.aim}</p>
        <dl className="mt-6 grid grid-cols-3 border-y-2 border-ink">
          {evalMethod.facts.map((f, i) => (
            <div key={f.label} className={`py-5 ${i ? 'border-l border-line pl-4' : 'pr-4'}`}>
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="block font-display text-[clamp(1.5rem,2.4vw,1.9rem)] font-bold leading-none">{f.value}</span>
                <span className="mt-2 block text-[13px] leading-snug text-muted">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
      <div className="md:col-span-6 md:col-start-7">
        <ol>
          {evalMethod.steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.05} className="grid grid-cols-[48px_1fr] border-t border-line py-5">
              <span className="font-mono text-[12px] text-blue">0{i + 1}</span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-1 text-[15px] text-muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <Expandable label="Limitations of this evaluation">
          <ul className="list-disc space-y-1 pl-5 text-[14px] text-muted">
            {evalMethod.limitations.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </Expandable>
      </div>
    </div>
    </div>
  )
}

/* 7.2 ─────────────────────────────────────────────────────────────── */

function Problems() {
  const features = featureOrder.filter((f) => problems.some((x) => x.feature === f))
  const first = problems.findIndex((x) => x.feature === features[0])
  const [open, setOpen] = useState<number | null>(null)
  const [shown, setShown] = useState(first) // last problem opened; drives the annotated screen
  const [touched, setTouched] = useState(false) // stop the hint once the reader has clicked
  const p = problems[shown]
  const high = problems.filter((x) => x.severity === 'High').length
  const toggle = (i: number) => {
    setTouched(true)
    setShown(i)
    setOpen((o) => (o === i ? null : i))
  }

  return (
    <div className="mt-24">
      <SubHeader
        num="7.2"
        label="Key usability problems"
        title="Eight problems, mapped to the screens where they appeared."
        aside={<SeverityBar high={high} medium={problems.length - high} />}
      />

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {features.map((f) => (
            <div key={f} className="mb-6">
              <p className="mb-2 font-mono text-[12px] uppercase tracking-[0.12em] text-faint">{f}</p>
              <ul className="border-t border-line">
                {problems.map((x, i) =>
                  x.feature !== f ? null : (
                    <li key={x.id} className="border-b border-line">
                      <button
                        type="button"
                        aria-expanded={open === i}
                        onClick={() => toggle(i)}
                        className={`group flex w-full items-center gap-3 py-3.5 text-left transition-colors ${open === i ? 'text-ink' : 'text-ink-2 hover:text-blue'}`}
                      >
                        <span className="flex-1 font-display text-[17px] font-semibold tracking-tight">{x.title}</span>
                        <SeverityTag s={x.severity} />
                        <Chevron open={open === i} hint={!touched && i === first} />
                      </button>
                      <AnimatePresence initial={false}>
                        {open === i && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease }} className="overflow-hidden">
                            <ProblemDetail p={x} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Sticky annotated screen (desktop) */}
        <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
          <div className="sticky top-24">
            <AnnotatedScreen p={p} />
          </div>
        </div>
      </div>
    </div>
  )
}

/** Row chevron: turns when the row opens; the first one nudges downwards until the reader clicks something. */
function Chevron({ open, hint }: { open: boolean; hint: boolean }) {
  const reduce = useReducedMotion()
  return (
    <motion.span
      aria-hidden
      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors ${open ? 'border-ink bg-ink text-white' : 'border-line text-muted group-hover:border-blue group-hover:text-blue'}`}
      animate={{ rotate: open ? 180 : 0, y: hint && !reduce ? [0, 4, 0, 3, 0] : 0 }}
      transition={{
        rotate: { type: 'spring', stiffness: 300, damping: 22 },
        y: hint && !reduce ? { duration: 1.4, repeat: Infinity, repeatDelay: 0.8, ease: 'easeInOut' } : { duration: 0.2 },
      }}
    >
      <ChevronDown size={16} />
    </motion.span>
  )
}

function ProblemDetail({ p }: { p: UsabilityProblem }) {
  return (
    <div className="grid gap-5 pb-6 pl-11 sm:grid-cols-[1fr_auto]">
      <div>
        <p className="text-[15px] text-ink-2">{p.evidence}</p>
        <p className="mt-3 font-mono text-[12px] text-muted">
          <span className="text-faint">Heuristic · </span>
          {p.heuristic}
          <span className="text-faint"> · Raised by </span>
          {p.who}
        </p>
        {p.quote && (
          <figure className="mt-4 border-l-2 border-blue bg-canvas px-4 py-3">
            <QuoteIcon size={16} className="text-blue" aria-hidden />
            <blockquote className="mt-1 font-serif text-[18px] italic leading-snug">“{p.quote.text}”</blockquote>
            <figcaption className="mt-1 font-mono text-[12px] text-faint">{p.quote.by}</figcaption>
          </figure>
        )}
        <div className="mt-4 flex gap-3 border border-blue/25 bg-blue-soft/60 p-3.5">
          <span className="shrink-0 font-mono text-[12px] uppercase tracking-[0.08em] text-blue">Fix →</span>
          <p className="text-[14px] text-ink">
            {p.recommendation.text}
            {p.recommendation.priority && <span className="ml-1 text-faint">({p.recommendation.priority} priority)</span>}
          </p>
        </div>
        <div className="mt-5 lg:hidden">
          <div className="mx-auto max-w-[220px]">
            <AnnotatedScreen p={p} />
          </div>
        </div>
      </div>
      {p.count !== undefined && <Ring n={p.count} />}
    </div>
  )
}

/** Initial screen with an animated highlight box on the region the problem concerns. */
function AnnotatedScreen({ p }: { p: UsabilityProblem }) {
  const [x, y, w, h] = p.screen.box
  return (
    <figure className="mx-auto" style={{ maxWidth: 'min(100%, calc((100svh - 190px) * 402 / 874))' }}>
      <div className="relative overflow-hidden rounded-[26px] border-[6px] border-ink bg-white shadow-[0_30px_60px_-30px_rgba(14,20,34,0.45)]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={p.screen.src}
            src={asset(p.screen.src)}
            alt={p.screen.alt}
            className="block aspect-[402/874] w-full object-cover object-top"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
        <motion.span
          aria-hidden
          className="pointer-events-none absolute rounded-[8px] border-2 border-sun shadow-[0_0_0_9999px_rgba(14,20,34,0.32)]"
          initial={false}
          animate={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}
          transition={{ duration: 0.55, ease }}
        />
      </div>
      <figcaption className="mt-3 flex items-center justify-between gap-3 text-[13px]">
        <span className="font-mono uppercase tracking-[0.1em] text-faint">{p.feature}</span>
        <span className="text-muted">{p.screen.region}</span>
      </figcaption>
    </figure>
  )
}

function SeverityTag({ s }: { s: 'High' | 'Medium' }) {
  return <span className={`shrink-0 rounded-[3px] px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] ${s === 'High' ? 'bg-sun-soft text-ink' : 'bg-canvas text-muted'}`}>{s}</span>
}

function SeverityBar({ high, medium }: { high: number; medium: number }) {
  const total = high + medium
  return (
    <div className="w-full max-w-[280px]" role="img" aria-label={`${high} high-severity and ${medium} medium-severity problems`}>
      <div className="flex h-2.5 gap-[3px] overflow-hidden rounded-full">
        {[
          { n: high, cls: 'bg-sun' },
          { n: medium, cls: 'bg-blue/70' },
        ].map((seg, i) => (
          <motion.span
            key={i}
            className={`block h-full origin-left ${seg.cls}`}
            style={{ flex: seg.n }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.2 + i * 0.25 }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[12px] text-muted" aria-hidden>
        <span>
          <span className="text-ink">{high}</span> High
        </span>
        <span>
          <span className="text-ink">{medium}</span> Medium · {total} total
        </span>
      </div>
    </div>
  )
}

/** "n of 6 participants" ring that draws itself when shown. */
function Ring({ n }: { n: number }) {
  return (
    <figure className="flex w-[84px] shrink-0 flex-col items-center" role="img" aria-label={`${n} of 6 participants`}>
      <svg viewBox="0 0 80 80" className="h-[76px] w-[76px]" aria-hidden>
        <circle cx="40" cy="40" r="31" fill="none" stroke="var(--color-line)" strokeWidth="7" />
        <motion.circle
          cx="40"
          cy="40"
          r="31"
          fill="none"
          stroke="var(--color-blue)"
          strokeWidth="7"
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: n / 6 }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
        />
        <text x="40" y="46" textAnchor="middle" className="fill-[var(--color-ink)] font-display text-[17px] font-bold">
          {n}/6
        </text>
      </svg>
      <figcaption className="mt-1 font-mono text-[11px] text-faint" aria-hidden>
        participants
      </figcaption>
    </figure>
  )
}

/* 7.3 ─────────────────────────────────────────────────────────────── */

/** Feature tabs for 7.3: Short Trip groups its two views (planning, route). */
const refineTabs = [
  { label: 'Homepage', keys: ['home'] },
  { label: 'Short Trip', sub: ['Planning', 'Route'], keys: ['plan', 'route'] },
  { label: 'Journey Tree', keys: ['journey'] },
  { label: 'AR Lens', keys: ['ar'] },
  { label: 'Ask This Place', keys: ['ask'] },
] as const

function Refinements() {
  const [tab, setTab] = useState(0)
  const [view, setView] = useState(0)
  const [dir, setDir] = useState(1)
  const tabsId = useId()
  const key = refineTabs[tab].keys[Math.min(view, refineTabs[tab].keys.length - 1)]
  const r = refinements.find((x) => x.key === key)!
  // Position along the whole sequence, so content slides in from the side you moved towards.
  const order = refineTabs.flatMap((t) => t.keys as readonly string[])
  const go = (t: number, v = 0) => {
    const next = refineTabs[t].keys[v]
    setDir(order.indexOf(next) >= order.indexOf(key) ? 1 : -1)
    setTab(t)
    setView(v)
  }

  return (
    <div className="mt-24">
      <SubHeader num="7.3" label="From problem to refinement" title="Before and after, feature by feature." />

      <div role="tablist" aria-label="Refined feature" className="grid grid-cols-2 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
        {refineTabs.map((t, i) => {
          const active = i === tab
          return (
            <div key={t.label} className={`relative px-3 lg:px-5 ${i ? 'lg:border-l lg:border-line' : 'lg:pl-0'}`}>
              <button
                id={`${tabsId}-${i}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`${tabsId}-panel`}
                tabIndex={active ? 0 : -1}
                onClick={() => go(i)}
                onKeyDown={(e) => {
                  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
                  const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + refineTabs.length) % refineTabs.length
                  go(n)
                  document.getElementById(`${tabsId}-${n}`)?.focus()
                }}
                className="group block text-left"
              >
                <motion.span
                  className="block font-mono text-[12px]"
                  animate={{ color: active ? '#b42318' : '#687080' }}
                  transition={{ duration: 0.3 }}
                >
                  0{i + 1}
                </motion.span>
                <motion.span
                  className={`relative mt-1 inline-block origin-left font-display font-semibold tracking-tight ${active ? 'text-ink' : 'text-faint group-hover:text-ink-2'}`}
                  animate={{ scale: active ? 1 : 0.8 }}
                  initial={false}
                  transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                  style={{ fontSize: 'clamp(1.25rem, 2vw, 1.6rem)' }}
                >
                  {t.label}
                  {active && <motion.span layoutId={`${tabsId}-bar`} className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-ink" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                </motion.span>
              </button>
              {'sub' in t && (
                <div className="mt-3 flex gap-3 font-mono text-[12px]" role="group" aria-label={`${t.label} view`}>
                  {t.sub.map((s, v) => {
                    const on = active && v === view
                    return (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={on}
                        onClick={() => go(i, v)}
                        className={`relative uppercase tracking-[0.08em] transition-colors ${on ? 'text-ink' : 'text-faint hover:text-ink-2'}`}
                      >
                        {s}
                        {on && <motion.span layoutId={`${tabsId}-sub`} className="absolute -bottom-1 left-0 right-0 h-px bg-ink" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div id={`${tabsId}-panel`} role="tabpanel" aria-labelledby={`${tabsId}-${tab}`} className="relative mt-10 overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={r.key}
            custom={dir}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d * 70 }),
              center: { opacity: 1, x: 0 },
              exit: (d: number) => ({ opacity: 0, x: d * -70 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease }}
          >
            <Compare r={r} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function Compare({ r }: { r: (typeof refinements)[number] }) {
  const split = useMotionValue(0)
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -25% 0px' })
  const reduce = useReducedMotion()
  const clip = useTransform(split, (v) => `inset(0 ${100 - v}% 0 0)`)
  const left = useTransform(split, (v) => `${v}%`)
  const solutionO = useTransform(split, [20, 80], [0.35, 1])
  const problemO = useTransform(split, [20, 80], [1, 0.35])
  // Red when the tested screen dominates, green when the refined one does.
  const accent = useTransform(split, [0, 50, 100], ['#b42318', '#f4b63f', '#157a3c'])
  const ring = useTransform(accent, (c) => `0 0 0 3px ${c}, 0 30px 60px -30px rgba(14,20,34,0.45)`)
  const state = val <= 35 ? 'before' : val >= 65 ? 'after' : 'mixed'
  useMotionValueEvent(split, 'change', (v) => setVal(Math.round(v)))

  // On first view, sweep the handle across once to show what changes, then rest in the middle.
  useEffect(() => {
    if (!inView) return
    if (reduce) {
      split.set(50)
      return
    }
    const c = animate(split, [0, 100, 50], { duration: 2.4, ease: 'easeInOut', delay: 0.3 })
    return () => c.stop()
  }, [inView, reduce, split])

  const dragTo = (clientX: number) => {
    const b = ref.current?.getBoundingClientRect()
    if (!b) return
    split.set(Math.min(100, Math.max(0, ((clientX - b.left) / b.width) * 100)))
  }

  return (
    <div className="grid items-center gap-10 md:grid-cols-12">
      <motion.div className="md:col-span-4" style={{ opacity: problemO }}>
        <p className="font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-problem">Problem</p>
        <ul className="mt-3 space-y-3">
          {r.problems.map((t) => (
            <li key={t} className="flex gap-3 text-[16px] text-ink-2">
              <span aria-hidden className="mt-[11px] h-px w-4 shrink-0 bg-problem/50" />
              {t}
            </li>
          ))}
        </ul>
      </motion.div>

      <div className="mx-auto w-full max-w-[290px] md:col-span-4">
        {/* The frame, divider and labels shift from red (before) to green (after) as the handle moves. */}
        <motion.div
          ref={ref}
          className="relative cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[28px] border-[6px] border-ink bg-white has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-blue"
          style={{ boxShadow: ring }}
          onPointerDown={(e) => {
            ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
            dragTo(e.clientX)
          }}
          onPointerMove={(e) => e.buttons && dragTo(e.clientX)}
        >
          <img src={asset(r.before)} alt={`${r.name}: tested initial design`} draggable={false} className="block aspect-[402/874] w-full object-cover object-top" />
          <motion.img
            src={asset(r.after)}
            alt={`${r.name}: refined design`}
            draggable={false}
            className="absolute inset-0 block h-full w-full object-cover object-top"
            style={{ clipPath: clip }}
          />
          <motion.span aria-hidden className="pointer-events-none absolute inset-y-0 w-[2px] -translate-x-1/2" style={{ left, backgroundColor: accent }}>
            <motion.span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-white shadow-md" style={{ backgroundColor: accent }}>
              <ChevronsLeftRight size={18} />
            </motion.span>
          </motion.span>
          <input
            type="range"
            min={0}
            max={100}
            value={val}
            onChange={(e) => split.set(+e.target.value)}
            aria-label={`Compare ${r.name}: before and after`}
            aria-valuetext={`${val}% refined design shown`}
            className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
          />
        </motion.div>
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => animate(split, 0, { duration: reduce ? 0 : 0.5, ease: 'easeInOut' })}
            aria-pressed={state === 'before'}
            className={`rounded-full border px-3 py-1 font-mono text-[12px] uppercase tracking-[0.08em] transition-colors ${state === 'before' ? 'border-problem bg-problem text-white' : 'border-line bg-paper text-muted hover:border-problem/50 hover:text-problem'}`}
          >
            Before
          </button>
          <span aria-live="polite" className={`w-[86px] text-center font-mono text-[11px] uppercase tracking-[0.08em] transition-colors ${state === 'before' ? 'text-problem' : state === 'after' ? 'text-solution' : 'text-faint'}`}>
            {state === 'before' ? '← Tested' : state === 'after' ? 'Refined →' : 'Comparing'}
          </span>
          <button
            type="button"
            onClick={() => animate(split, 100, { duration: reduce ? 0 : 0.5, ease: 'easeInOut' })}
            aria-pressed={state === 'after'}
            className={`rounded-full border px-3 py-1 font-mono text-[12px] uppercase tracking-[0.08em] transition-colors ${state === 'after' ? 'border-solution bg-solution text-white' : 'border-line bg-paper text-muted hover:border-solution/50 hover:text-solution'}`}
          >
            After
          </button>
        </div>
      </div>

      <motion.div className="md:col-span-4" style={{ opacity: solutionO }}>
        <p className="font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-solution">Solution</p>
        <ul className="mt-3 space-y-3">
          {r.solutions.map((t) => (
            <li key={t} className="flex gap-3 text-[16px] font-medium text-ink">
              <span aria-hidden className="mt-[11px] h-px w-4 shrink-0 bg-solution" />
              {t}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}
