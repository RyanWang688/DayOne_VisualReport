import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { hmwBridge, hmwQuestion, hmwText } from '../content/hmw'
import { sectionById } from '../content/sections'

/** The question as words, each knowing which phrase (step) it belongs to and its position in it. */
type Token = { w: string; step: number; i: number; n: number; suffix?: string }
const words = hmwQuestion
  .flatMap((seg): Token[] => {
    const parts = seg.text.split(/\s+/).filter(Boolean)
    return parts.map((w, i) => ({ w, step: seg.step ?? -1, i, n: parts.length }))
  })
  // Punctuation hangs off the previous word (no space before it, not underlined).
  .reduce<Token[]>((acc, t) => {
    if (/^[,.?!]+$/.test(t.w) && acc.length) acc[acc.length - 1] = { ...acc[acc.length - 1], suffix: t.w }
    else acc.push(t)
    return acc
  }, [])
const steps = hmwBridge.steps.length

/** Scroll windows, as fractions of the section's (smoothed) scroll progress. */
const INTRO = 0.06
const STEP_START = 0.1
const STEP_LEN = 0.15
const stepStart = (k: number) => STEP_START + k * STEP_LEN
const RESOLVE = stepStart(steps) + 0.02
const OUTRO = RESOLVE + 0.1

export function HMW() {
  const reduce = useReducedMotion()
  return reduce ? <StaticHMW /> : <ScrollHMW />
}

function ScrollHMW() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // Smooth the raw scroll value so word reveals glide instead of stepping with the wheel.
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.35, restDelta: 0.0005 })

  const bg = useTransform(scrollYProgress, [0, INTRO], ['#f7f6f2', '#06204f'])
  const sceneIn = useTransform(p, [0.01, INTRO], [0, 1])
  const cardsOpacity = useTransform(p, [INTRO - 0.02, INTRO + 0.02, RESOLVE + 0.02, RESOLVE + 0.07], [0, 1, 1, 0])
  const cardsY = useTransform(p, [INTRO - 0.02, INTRO + 0.02, RESOLVE + 0.02, RESOLVE + 0.07], [24, 0, 0, -24])
  const outro = useTransform(p, [OUTRO, OUTRO + 0.06], [0, 1])
  const outroY = useTransform(p, [OUTRO, OUTRO + 0.06], [16, 0])

  return (
    <motion.section ref={ref} id="hmw" aria-labelledby="hmw-title" className="relative h-[400vh]" style={{ backgroundColor: bg }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-[68px]">
        <motion.div className="container-x" style={{ opacity: sceneIn }}>
          <Eyebrow />
          <h2 id="hmw-title" className="mt-6 max-w-[22ch] text-[clamp(1.75rem,3.6vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.04em] sm:mt-8">
            <span className="sr-only">{hmwText}</span>
            <span aria-hidden>
              {words.map((t, i) => (
                <Word key={i} t={t} p={p} />
              ))}
            </span>
          </h2>

          <div className="relative mt-8 sm:mt-12">
            <motion.ol className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4" style={{ opacity: cardsOpacity, y: cardsY }} aria-label="How each theme shapes the question">
              {hmwBridge.steps.map((s, k) => (
                <BridgeCard key={s.theme} step={s} k={k} p={p} />
              ))}
            </motion.ol>
            <motion.p className="mt-3 font-mono text-[12px] text-white/50" style={{ opacity: cardsOpacity }}>
              {hmwBridge.note}
            </motion.p>
            <motion.div className="absolute inset-x-0 top-0 grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end" style={{ opacity: outro, y: outroY }}>
              <p className="max-w-[56ch] text-white/80">{hmwBridge.outro}</p>
              <a href="#outcome" className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-sun">
                <span className="link-grow">Into the design phase</span>
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-y-0.5">↓</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

function Eyebrow() {
  return (
    <p className="flex items-start gap-3 font-mono text-[12px] uppercase tracking-[0.14em] text-white/60">
      <span className="text-sun">{sectionById.hmw.num}</span>
      <span className="mt-[0.6em] h-px w-8 shrink-0 bg-white/30" />
      <span>How might we · {hmwBridge.eyebrow}</span>
    </p>
  )
}

function Word({ t, p }: { t: Token; p: MotionValue<number> }) {
  const key = t.step >= 0
  // Phrase words light up in sequence across their step; connecting words fade in together at the end.
  const start = key ? stepStart(t.step) + 0.015 + t.i * 0.018 : RESOLVE
  const end = start + 0.04
  const opacity = useTransform(p, [start, end], [0.2, 1])
  const y = useTransform(p, [start, end], ['0.12em', '0em'])
  const underline = useTransform(p, [start + 0.01, end + 0.015], [0, 1])
  return (
    <motion.span className="mr-[0.24em] inline-block" style={{ opacity, y }}>
      <span className={`relative ${key ? 'text-sun' : 'text-white'}`}>
        {t.w}
        {key && (
          // Extend the underline across the word gap so the phrase reads as one stroke.
          <motion.span
            aria-hidden
            className={`absolute -bottom-[0.04em] left-0 h-[0.055em] origin-left bg-sun ${t.i < t.n - 1 ? 'w-[calc(100%+0.24em)]' : 'w-full'}`}
            style={{ scaleX: underline }}
          />
        )}
      </span>
      {t.suffix && <span className="text-white">{t.suffix}</span>}
    </motion.span>
  )
}

function BridgeCard({ step, k, p }: { step: (typeof hmwBridge.steps)[number]; k: number; p: MotionValue<number> }) {
  const s = stepStart(k)
  const e = s + STEP_LEN
  const opacity = useTransform(p, [s - 0.03, s, e - 0.01, e + 0.02], [0.38, 1, 1, 0.72])
  const y = useTransform(p, [s - 0.03, s, e - 0.01, e + 0.02], [0, -6, -6, 0])
  const fill = useTransform(p, [s, e], [0, 1])
  return (
    <motion.li className="relative flex flex-col overflow-hidden border border-white/15 bg-white/[0.04] p-3 pt-4 sm:p-4 sm:pt-5" style={{ opacity, y }}>
      {/* Step progress: fills while this theme's phrase is being revealed */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-white/10" />
      <motion.span aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left bg-sun" style={{ scaleX: fill }} />
      <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-sun">
        {step.theme} · {step.short}
      </p>
      <p className="mt-1.5 font-display text-[15px] font-semibold leading-snug text-white sm:text-[17px]">→ “{step.phrase}”</p>
      <p className="mt-1.5 hidden text-[13px] leading-snug text-white/70 sm:block">{step.why}</p>
    </motion.li>
  )
}

/** Reduced-motion version: the same reasoning, fully visible, no scroll sequence. */
function StaticHMW() {
  return (
    <section id="hmw" aria-labelledby="hmw-title" className="bg-blue-ink py-24 text-white md:py-32">
      <div className="container-x">
        <Eyebrow />
        <h2 id="hmw-title" className="mt-8 max-w-[22ch] text-[clamp(1.75rem,3.6vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.04em]">
          {hmwQuestion.map((s, i) =>
            s.step !== undefined ? (
              <span key={i} className="text-sun underline decoration-[0.055em] underline-offset-[0.12em]">
                {s.text}
              </span>
            ) : (
              <span key={i}>{s.text}</span>
            ),
          )}
        </h2>
        <ol className="mt-12 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {hmwBridge.steps.map((s) => (
            <li key={s.theme} className="border border-white/15 p-4">
              <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-sun">
                {s.theme} · {s.short}
              </p>
              <p className="mt-1.5 font-display text-[17px] font-semibold">→ “{s.phrase}”</p>
              <p className="mt-1.5 text-[13px] leading-snug text-white/70">{s.why}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-[56ch] text-white/80">{hmwBridge.outro}</p>
        <p className="mt-4 font-mono text-[12px] text-white/50">{hmwBridge.note}</p>
      </div>
    </section>
  )
}
