import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { refinements } from '../content/evaluation'
import { asset } from './ui'

const ease = [0.22, 1, 0.36, 1] as const
const it = (p: string) => `assets/iteration/${p}`

/** Three features, each traced Low-fi → Wireframe → Initial hi-fi. */
const tracks = [
  { name: 'Driver licence journey', frames: [it('lowfi/driver-licence-journey.jpg'), it('wireframe/driver-licence-1.jpg'), it('hifi/journey-tree-driver-licence.jpg')] },
  { name: 'Explore', frames: [it('lowfi/map-journey-ar.jpg'), it('wireframe/explore-1.jpg'), it('hifi/explore-1.jpg')] },
  { name: 'AR scan', frames: [it('lowfi/map-journey-ar.jpg'), it('wireframe/ar-scan-1.jpg'), it('hifi/ar-scan-1.jpg')] },
]
const stages = ['Low-fi', 'Wireframe', 'Initial hi-fi']
const STEP_MS = 1500

/** Pause while hovered/focused, off-screen, or when motion is reduced. */
function useLoopControl() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const [held, setHeld] = useState(false)
  const bind = {
    ref,
    onMouseEnter: () => setHeld(true),
    onMouseLeave: () => setHeld(false),
    onFocus: () => setHeld(true),
    onBlur: () => setHeld(false),
  }
  return { bind, running: inView && !reduce && !held, reduce }
}

/** Prototype stage: the active fidelity lights up step by step, then the next feature rotates in. */
export function IterationLoop() {
  const { bind, running, reduce } = useLoopControl()
  const [track, setTrack] = useState(0)
  const [step, setStep] = useState(reduce ? 2 : 0)

  useEffect(() => {
    if (!running) return
    const id = window.setTimeout(() => {
      if (step < 2) setStep(step + 1)
      else {
        setTrack((t) => (t + 1) % tracks.length)
        setStep(0)
      }
    }, step === 2 ? STEP_MS * 1.6 : STEP_MS)
    return () => clearTimeout(id)
  }, [running, step, track])

  const t = tracks[track]
  return (
    <div {...bind} tabIndex={0} aria-label={`Iteration of ${t.name}: low-fi, wireframe, initial hi-fi`} className="outline-none">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={t.name} className="flex items-center justify-center gap-2 sm:gap-4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4, ease }}>
          {t.frames.map((src, i) => {
            const on = i <= step
            const current = i === step
            return (
              <div key={src + i} className="flex items-center gap-2 sm:gap-4">
                {i > 0 && (
                  <motion.span aria-hidden className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line bg-paper" animate={{ color: on ? '#1f4fd8' : '#c9cdd6', scale: current ? 1.12 : 1 }} transition={{ duration: 0.3 }}>
                    <ArrowRight size={14} />
                  </motion.span>
                )}
                <motion.div className="flex flex-col items-center" animate={{ opacity: on ? 1 : 0.28, y: current ? -6 : 0, scale: current ? 1.04 : 1 }} transition={{ type: 'spring', stiffness: 260, damping: 24 }}>
                  {i === 0 ? (
                    <span className="block h-[150px] w-[104px] border border-line bg-white p-1 shadow-[0_14px_24px_-20px_rgba(14,20,34,0.6)] sm:h-[220px] sm:w-[150px]">
                      <img src={asset(src)} alt="" className="h-full w-full object-cover object-left-top" />
                    </span>
                  ) : (
                    <span className="block h-[150px] overflow-hidden rounded-[12px] border-[3px] border-ink bg-white shadow-[0_18px_28px_-22px_rgba(14,20,34,0.6)] sm:h-[220px] sm:rounded-[16px] sm:border-[4px]">
                      <img src={asset(src)} alt="" className="block aspect-[402/874] h-full object-cover object-top" />
                    </span>
                  )}
                  <span className={`mt-2 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${current ? 'text-blue' : 'text-faint'}`}>{stages[i]}</span>
                </motion.div>
              </div>
            )
          })}
        </motion.div>
      </AnimatePresence>
      <Dots count={tracks.length} active={track} label={t.name} onPick={(i) => { setTrack(i); setStep(0) }} />
    </div>
  )
}

/** Evaluate stage: each tested screen wipes into its refined version, then the next feature rotates in. */
export function CompareLoop() {
  const { bind, running, reduce } = useLoopControl()
  const [k, setK] = useState(0)
  const split = useMotionValue(reduce ? 100 : 0)
  const clip = useTransform(split, (v) => `inset(0 ${100 - v}% 0 0)`)
  const left = useTransform(split, (v) => `${v}%`)
  const accent = useTransform(split, [0, 50, 100], ['#b42318', '#f4b63f', '#157a3c'])
  const ring = useTransform(accent, (c) => `0 0 0 3px ${c}`)
  const [phase, setPhase] = useState<'before' | 'after'>(reduce ? 'after' : 'before')

  useEffect(() => {
    if (!running) return
    split.set(0)
    setPhase('before')
    const wipe = animate(split, 100, { duration: 1.4, ease: 'easeInOut', delay: 0.9 })
    const done = window.setTimeout(() => setPhase('after'), 2300)
    const next = window.setTimeout(() => setK((x) => (x + 1) % refinements.length), 4200)
    return () => {
      wipe.stop()
      clearTimeout(done)
      clearTimeout(next)
    }
  }, [running, k, split])

  const r = refinements[k]
  return (
    <div {...bind} tabIndex={0} aria-label={`${r.name}: tested design and refined design`} className="flex flex-col items-center outline-none">
      <div className="flex items-center gap-5 sm:gap-8">
        <p className={`hidden whitespace-nowrap text-right font-mono text-[12px] uppercase tracking-[0.1em] transition-colors sm:block ${phase === 'before' ? 'text-problem' : 'text-faint'}`}>Before · tested</p>
        <motion.div className="relative h-[230px] overflow-hidden rounded-[18px] border-[4px] border-ink bg-white" style={{ boxShadow: ring }}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div key={r.key} className="relative h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <img src={asset(r.before)} alt="" className="block aspect-[402/874] h-full object-cover object-top" />
              <motion.img src={asset(r.after)} alt="" className="absolute inset-0 h-full w-full object-cover object-top" style={{ clipPath: clip }} />
            </motion.div>
          </AnimatePresence>
          <motion.span aria-hidden className="absolute inset-y-0 w-[2px] -translate-x-1/2" style={{ left, backgroundColor: accent }} />
        </motion.div>
        <p className={`hidden whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.1em] transition-colors sm:block ${phase === 'after' ? 'text-solution' : 'text-faint'}`}>After · refined</p>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p key={r.key} className="mt-3 font-display text-[15px] font-semibold" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
          {r.name}
          <span className={`ml-2 font-mono text-[11px] uppercase tracking-[0.1em] sm:hidden ${phase === 'after' ? 'text-solution' : 'text-problem'}`}>{phase === 'after' ? 'Refined' : 'Tested'}</span>
        </motion.p>
      </AnimatePresence>
      <Dots count={refinements.length} active={k} label={r.name} onPick={setK} />
    </div>
  )
}

function Dots({ count, active, label, onPick }: { count: number; active: number; label: string; onPick: (i: number) => void }) {
  return (
    <div className="mt-3 flex justify-center gap-1.5" role="group" aria-label={`Showing ${label}`}>
      {Array.from({ length: count }, (_, i) => (
        <button key={i} type="button" aria-label={`Show ${i + 1} of ${count}`} aria-pressed={i === active} onClick={() => onPick(i)} className="grid h-5 place-items-center">
          <motion.span className="block h-1.5 rounded-full" animate={{ width: i === active ? 20 : 6, backgroundColor: i === active ? '#0e1422' : '#d5d2c9' }} transition={{ duration: 0.3 }} />
        </button>
      ))}
    </div>
  )
}
