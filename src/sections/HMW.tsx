import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { meta } from '../content/meta'

/** Words to emphasise in the HMW question (matched case-insensitively, punctuation ignored). */
const emphasis = new Set(['use', 'information', 'real-life', 'situations'])

export function HMW() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const bg = useTransform(scrollYProgress, [0, 0.18], ['#f7f6f2', '#0b1b4d'])
  const outro = useTransform(scrollYProgress, [0.62, 0.78], [0, 1])
  const words = meta.researchQuestion.split(' ')

  return (
    <motion.section
      ref={ref}
      id="hmw"
      aria-labelledby="hmw-title"
      className={`relative ${reduce ? '' : 'h-[230vh] md:h-[260vh]'}`}
      style={{ backgroundColor: reduce ? '#0b1b4d' : bg }}
    >
      <div className={`flex min-h-[100svh] flex-col justify-center py-24 ${reduce ? '' : 'sticky top-0 h-[100svh]'}`}>
        <div className="container-x">
          <p className="mb-10 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.14em] text-white/60">
            <span className="text-sun">05</span>
            <span className="h-px w-8 bg-white/30" />
            How might we
          </p>
          <h2 id="hmw-title" className="max-w-[16ch] text-[clamp(2.4rem,7vw,6.4rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">
            <span className="sr-only">{meta.researchQuestion}</span>
            <span aria-hidden>
              {words.map((w, i) => (
                <Word key={i} word={w} i={i} n={words.length} progress={scrollYProgress} reduce={!!reduce} />
              ))}
            </span>
          </h2>
          <motion.div
            className="mt-14 grid max-w-3xl gap-6 text-white/70 sm:grid-cols-2"
            style={{ opacity: reduce ? 1 : outro }}
          >
            <p>
              Our research showed that students are rarely short of information. The design challenge is helping them <span className="text-white">apply</span> it — at the
              moment, and in the place, it matters.
            </p>
            <a href="#abstract" className="self-end font-mono text-[12px] uppercase tracking-[0.14em] text-sun hover:underline">
              Into the design phase ↓
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

function Word({ word, i, n, progress, reduce }: { word: string; i: number; n: number; progress: MotionValue<number>; reduce: boolean }) {
  const start = 0.14 + (i / n) * 0.45
  const opacity = useTransform(progress, [start, start + 0.06], [0.14, 1])
  const key = word.toLowerCase().replace(/[^a-z-]/g, '')
  const em = emphasis.has(key)
  const underline = useTransform(progress, [0.62, 0.72], [0, 1])
  return (
    <motion.span className={`relative mr-[0.22em] inline-block ${em ? 'text-sun' : 'text-white'}`} style={{ opacity: reduce ? 1 : opacity }}>
      {word}
      {em && (
        <motion.span
          aria-hidden
          className="absolute -bottom-[0.06em] left-0 h-[0.06em] w-full origin-left bg-sun"
          style={{ scaleX: reduce ? 1 : underline }}
        />
      )}
    </motion.span>
  )
}
