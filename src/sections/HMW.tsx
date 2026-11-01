import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { meta } from '../content/meta'
import { hmwBridge } from '../content/hmw'

const words = meta.researchQuestion.split(' ')
/** Which bridge step (0–3) lights up each word, or -1 for connecting words. */
const wordStep = words.map((w) => hmwBridge.steps.findIndex((s) => s.keyword.includes(w.toLowerCase())))
const steps = hmwBridge.steps.length

/** Scroll windows (fractions of the section's scroll progress). */
const STEP_START = 0.1
const STEP_LEN = 0.14
const stepAt = (k: number) => STEP_START + k * STEP_LEN
const RESOLVE = stepAt(steps) + 0.02 // all words appear, cards recede
const OUTRO = RESOLVE + 0.1

export function HMW() {
  const reduce = useReducedMotion()
  if (reduce) return <StaticHMW />
  return <ScrollHMW />
}

function ScrollHMW() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const bg = useTransform(p, [0, 0.06], ['#f7f6f2', '#0b1b4d'])
  const cardsOpacity = useTransform(p, [0.04, 0.09, RESOLVE, RESOLVE + 0.06], [0, 1, 1, 0])
  const cardsY = useTransform(p, [RESOLVE, RESOLVE + 0.06], [0, -16])
  const outro = useTransform(p, [OUTRO, OUTRO + 0.06], [0, 1])
  const outroY = useTransform(p, [OUTRO, OUTRO + 0.06], [12, 0])

  return (
    <motion.section ref={ref} id="hmw" aria-labelledby="hmw-title" className="relative h-[420vh]" style={{ backgroundColor: bg }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-14">
        <div className="container-x">
          <Eyebrow />
          <h2 id="hmw-title" className="mt-6 max-w-[17ch] text-[clamp(2rem,6.2vw,5.6rem)] font-extrabold leading-[1] tracking-[-0.045em] sm:mt-8">
            <span className="sr-only">{meta.researchQuestion}</span>
            <span aria-hidden>
              {words.map((w, i) => (
                <Word key={i} word={w} step={wordStep[i]} p={p} />
              ))}
            </span>
          </h2>

          <div className="relative mt-8 sm:mt-12">
            <motion.ol className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4" style={{ opacity: cardsOpacity, y: cardsY }} aria-label="How each theme shapes the question">
              {hmwBridge.steps.map((s, k) => (
                <BridgeCard key={s.theme} step={s} k={k} p={p} />
              ))}
            </motion.ol>
            <motion.p className="mt-3 font-mono text-[12px] text-white/45" style={{ opacity: cardsOpacity }}>
              {hmwBridge.note}
            </motion.p>
            <motion.div className="absolute inset-x-0 top-0 grid gap-6 text-white/75 sm:grid-cols-2" style={{ opacity: outro, y: outroY }}>
              <p className="max-w-[48ch]">{hmwBridge.outro}</p>
              <a href="#abstract" className="self-end font-mono text-[12px] uppercase tracking-[0.14em] text-sun hover:underline">
                Into the design phase ↓
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

function Eyebrow() {
  return (
    <p className="flex items-start gap-3 font-mono text-[12px] uppercase tracking-[0.14em] text-white/60">
      <span className="text-sun">05</span>
      <span className="mt-[0.6em] h-px w-8 shrink-0 bg-white/30" />
      <span>How might we · {hmwBridge.eyebrow}</span>
    </p>
  )
}

function Word({ word, step, p }: { word: string; step: number; p: MotionValue<number> }) {
  const key = step >= 0
  const start = key ? stepAt(step) : RESOLVE
  const opacity = useTransform(p, [start, start + 0.04], [0.12, 1])
  const underline = useTransform(p, [start + 0.02, start + 0.07], [0, 1])
  const tag = useTransform(p, [start, start + 0.04, RESOLVE, RESOLVE + 0.05], [0, 1, 1, 0])
  return (
    <motion.span className={`relative mr-[0.22em] inline-block ${key ? 'text-sun' : 'text-white'}`} style={{ opacity }}>
      {word}
      {key && (
        <>
          <motion.span aria-hidden className="absolute -bottom-[0.06em] left-0 h-[0.06em] w-full origin-left bg-sun" style={{ scaleX: underline }} />
          {/* Theme tag sits above the first keyword of each step */}
          {hmwBridge.steps[step].keyword[0] === word.toLowerCase() && (
            <motion.span aria-hidden className="absolute -top-[0.9em] left-0 hidden font-mono text-[12px] font-medium tracking-[0.08em] text-sun sm:block" style={{ opacity: tag }}>
              {hmwBridge.steps[step].theme}
            </motion.span>
          )}
        </>
      )}
    </motion.span>
  )
}

function BridgeCard({ step, k, p }: { step: (typeof hmwBridge.steps)[number]; k: number; p: MotionValue<number> }) {
  const s = stepAt(k)
  // Dim until its step, full while active, then settle at a calm mid level.
  const opacity = useTransform(p, [s - 0.02, s, s + STEP_LEN - 0.02, s + STEP_LEN], [0.35, 1, 1, 0.7])
  const border = useTransform(p, [s - 0.02, s, s + STEP_LEN - 0.02, s + STEP_LEN], ['rgba(255,255,255,0.15)', '#f4b63f', '#f4b63f', 'rgba(255,255,255,0.15)'])
  return (
    <motion.li className="flex flex-col border bg-white/[0.04] p-3 sm:p-4" style={{ opacity, borderColor: border }}>
      <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-sun">
        {step.theme} · {step.short}
      </p>
      <p className="mt-1.5 font-display text-[15px] font-semibold text-white sm:text-[17px]">→ “{step.keyword.join(' ').replace('?', '')}”</p>
      <p className="mt-1.5 hidden text-[13px] leading-snug text-white/65 sm:block">{step.why}</p>
    </motion.li>
  )
}

/** Reduced-motion version: the same reasoning, fully visible, no scroll sequence. */
function StaticHMW() {
  return (
    <section id="hmw" aria-labelledby="hmw-title" className="bg-blue-ink py-24 text-white md:py-32">
      <div className="container-x">
        <Eyebrow />
        <h2 id="hmw-title" className="mt-8 max-w-[17ch] text-[clamp(2rem,6.2vw,5.6rem)] font-extrabold leading-[1] tracking-[-0.045em]">
          {words.map((w, i) => (
            <span key={i} className={`mr-[0.22em] inline-block ${wordStep[i] >= 0 ? 'text-sun underline decoration-[0.06em] underline-offset-[0.12em]' : ''}`}>
              {w}
            </span>
          ))}
        </h2>
        <ol className="mt-12 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {hmwBridge.steps.map((s) => (
            <li key={s.theme} className="border border-white/15 p-4">
              <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-sun">
                {s.theme} · {s.short}
              </p>
              <p className="mt-1.5 font-display text-[17px] font-semibold">→ “{s.keyword.join(' ').replace('?', '')}”</p>
              <p className="mt-1.5 text-[13px] leading-snug text-white/65">{s.why}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-[56ch] text-white/75">{hmwBridge.outro}</p>
        <p className="mt-4 font-mono text-[12px] text-white/45">{hmwBridge.note}</p>
      </div>
    </section>
  )
}
