import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { refinements } from '../content/evaluation'
import { asset } from './ui'

const ease = [0.22, 1, 0.36, 1] as const
const it = (p: string) => `assets/iteration/${p}`

/** One journey at each fidelity: Low-fi → Wireframe → Initial hi-fi. */
const frames = [
  { stage: 'Low-fi', src: it('lowfi/driver-licence-journey.jpg'), sketch: true },
  { stage: 'Wireframe', src: it('wireframe/driver-licence-1.jpg'), sketch: false },
  { stage: 'Initial hi-fi', src: it('hifi/journey-tree-driver-licence.jpg'), sketch: false },
]

/** Prototype stage: the three fidelities arrive one after another, once, and stay. */
export function IterationLoop() {
  const view = { once: true, margin: '0px 0px -15% 0px' } as const
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4" role="img" aria-label="Driver licence journey at three fidelities: low-fi sketch, wireframe, initial hi-fi">
      {frames.map((f, i) => (
        <div key={f.stage} className="flex items-center gap-2 sm:gap-4">
          {i > 0 && (
            <motion.span
              aria-hidden
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line bg-paper text-blue"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={view}
              transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.5 }}
            >
              <ArrowRight size={14} />
            </motion.span>
          )}
          <motion.div
            className="flex flex-col items-center will-change-transform"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={view}
            transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.5 }}
          >
            {f.sketch ? (
              <span className="block h-[150px] w-[104px] border border-line bg-white p-1 shadow-[0_14px_24px_-20px_rgba(14,20,34,0.6)] sm:h-[220px] sm:w-[150px]">
                <img src={asset(f.src)} alt="" className="h-full w-full object-cover object-left-top" />
              </span>
            ) : (
              <span className="block h-[150px] overflow-hidden rounded-[12px] border-[3px] border-ink bg-white shadow-[0_18px_28px_-22px_rgba(14,20,34,0.6)] sm:h-[220px] sm:rounded-[16px] sm:border-[4px]">
                <img src={asset(f.src)} alt="" className="block aspect-[402/874] h-full object-cover object-top" />
              </span>
            )}
            <span className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-faint">{f.stage}</span>
          </motion.div>
        </div>
      ))}
    </div>
  )
}

/** Evaluate stage: one tested screen wipes into its refined version and back, slowly. */
export function CompareLoop() {
  const r = refinements.find((x) => x.key === 'journey')!
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const split = useMotionValue(reduce ? 100 : 0)
  const clip = useTransform(split, (v) => `inset(0 ${100 - v}% 0 0)`)
  const lineX = useTransform(split, (v) => `${v}%`)
  const beforeO = useTransform(split, [20, 80], [1, 0.35])
  const afterO = useTransform(split, [20, 80], [0.35, 1])

  useEffect(() => {
    if (!inView || reduce) return
    const c = animate(split, [0, 0, 100, 100, 0], {
      duration: 8,
      times: [0, 0.1, 0.45, 0.65, 1],
      ease: 'easeInOut',
      repeat: Infinity,
    })
    return () => c.stop()
  }, [inView, reduce, split])

  return (
    <div ref={ref} className="flex items-center justify-center gap-5 sm:gap-8" role="img" aria-label={`${r.name}: tested design compared with the refined design`}>
      <motion.p className="whitespace-nowrap text-right font-mono text-[12px] uppercase tracking-[0.1em] text-problem" style={{ opacity: beforeO }}>
        Before
      </motion.p>
      <div className="relative h-[230px] overflow-hidden rounded-[18px] border-[4px] border-ink bg-white">
        <img src={asset(r.before)} alt="" className="block aspect-[402/874] h-full object-cover object-top" />
        <motion.img src={asset(r.after)} alt="" className="absolute inset-0 h-full w-full object-cover object-top" style={{ clipPath: clip }} />
        <motion.span aria-hidden className="absolute inset-y-0 w-[2px] -translate-x-1/2 bg-blue" style={{ left: lineX }} />
      </div>
      <motion.p className="whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.1em] text-solution" style={{ opacity: afterO }}>
        After
      </motion.p>
    </div>
  )
}
