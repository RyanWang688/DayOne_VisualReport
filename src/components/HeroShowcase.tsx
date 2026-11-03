import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { ArrowDown, Expand } from 'lucide-react'
import { Lightbox } from './Lightbox'
import { asset } from './ui'

const shot = (n: string) => `assets/hero/${n}.jpg`

/** Real screens captured from the final Day One prototype. */
const wall: string[][] = [
  ['journey', 'place', 'summary', 'plan'],
  ['route-studio', 'scenario', 'home', 'navigation'],
  ['ask', 'plan', 'journey', 'ar'],
  ['navigation', 'home', 'scenario', 'route-studio'],
  ['summary', 'ar', 'place', 'ask'],
]

const featured = [
  { key: 'home', name: 'Home', text: 'Your starting point: everyday tools, a suggested Short Trip and small local discoveries.', from: [26, 36], to: [20, 50] },
  { key: 'ar', name: 'AR Lens', text: 'Scan a myki reader to see what you can tap with, and how the two-hour fare works.', from: [52, 52], to: [50, 50] },
  { key: 'ask', name: 'Ask This Place', text: 'Ask about the place you are in, confirm where you are, and get help that fits it.', from: [78, 66], to: [80, 50] },
] as const

function useIsDesktop() {
  const [lg, setLg] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches)
  useEffect(() => {
    const m = window.matchMedia('(min-width: 1024px)')
    const on = () => setLg(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return lg
}

/**
 * Hero showcase: the intro on the left (~30%), a tilted wall of real Day One screens on the right.
 * On desktop, scrolling through the hero settles the wall onto a Melbourne map and lines up
 * three featured screens; any featured screen opens in a viewer.
 */
export function HeroShowcase({ intro }: { intro: ReactNode }) {
  const reduce = useReducedMotion()
  const lg = useIsDesktop()
  const story = lg && !reduce
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })
  const [box, setBox] = useState<number | null>(null)

  const wallO = useTransform(p, [0.1, 0.55], [1, story ? 0.08 : 1])
  const wallS = useTransform(p, [0, 0.6], [1, story ? 1.08 : 1])
  const mapO = useTransform(p, [0.25, 0.7], [0, story ? 0.32 : 0])
  const capO = useTransform(p, [0.7, 0.9], [0, story ? 1 : 0])
  const cueO = useTransform(p, [0, 0.12], [1, 0])

  const items = featured.map((f) => ({ src: shot(f.key), alt: `Day One ${f.name} screen`, caption: `${f.name} — ${f.text}` }))

  return (
    <div ref={ref} className={story ? 'relative h-[210vh]' : 'relative'}>
      <div className={story ? 'sticky top-[68px] h-[calc(100svh-68px)] overflow-hidden' : 'relative'}>
        {/* Melbourne map revealed as the wall settles */}
        <motion.img aria-hidden src={asset('assets/hero/melbourne-map.jpg')} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover" style={{ opacity: mapO }} />

        <div className={story ? 'relative h-full' : 'flex flex-col'}>
          {/* Left: the intro (about 30%) */}
          <div className={`z-20 ${story ? 'absolute inset-y-0 left-0 flex w-[34%] min-w-[380px] max-w-[520px] items-center' : 'container-x relative pt-10'}`}>
            {story && <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 -right-24 bg-gradient-to-r from-canvas via-canvas/95 to-transparent" />}
            <div className={`relative ${story ? 'pl-[max(1rem,calc((100vw-1240px)/2+3rem))] pr-6' : ''}`}>{intro}</div>
          </div>

          {/* Right: wall of real screens + featured phones */}
          <div
            className={story ? 'absolute inset-y-0 right-0 left-[30%]' : 'relative mt-10 h-[520px] overflow-hidden sm:h-[600px]'}
            aria-label="Screens from the final Day One prototype"
            role="group"
          >
            <div aria-hidden className={`absolute inset-0 overflow-hidden ${story ? '[mask-image:linear-gradient(to_right,transparent,black_16%)]' : ''}`}>
              <motion.div aria-hidden className="absolute left-1/2 top-1/2 flex w-max gap-5 sm:gap-6" style={{ opacity: wallO, scale: wallS, x: '-50%', y: '-50%', rotate: -14 }}>
                {wall.map((col, c) => (
                  <div key={c} className="hero-col h-[1500px] shrink-0 overflow-hidden sm:h-[1800px]">
                    <div className={`flex flex-col gap-5 sm:gap-6 ${reduce ? '' : c % 2 ? 'hero-drift-down' : 'hero-drift-up'}`} style={{ animationDuration: `${70 + c * 9}s` }}>
                      {[...col, ...col].map((n, i) => (
                        <img key={i} src={asset(shot(n))} alt="" decoding="async" className="block w-[120px] max-w-none rounded-[18px] border border-line bg-white shadow-[0_10px_24px_-16px_rgba(14,20,34,0.5)] sm:w-[170px] sm:rounded-[22px]" />
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {featured.map((f, i) => (
              <Featured key={f.key} f={f} i={i} p={p} story={story} onOpen={() => setBox(i)} />
            ))}

            <motion.p className="pointer-events-none absolute bottom-6 left-0 right-0 text-center font-mono text-[12px] uppercase tracking-[0.14em] text-ink-2" style={{ opacity: capO }}>
              Final prototype · Home / AR Lens / Ask This Place
            </motion.p>
          </div>
        </div>

        {story && (
          <motion.a
            href="#title-block"
            style={{ opacity: cueO }}
            className="absolute bottom-6 left-[max(1rem,calc((100vw-1240px)/2+3rem))] z-20 flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.16em] text-faint hover:text-blue"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-blue text-white">
              <ArrowDown size={16} aria-hidden />
            </span>
            Scroll to explore
          </motion.a>
        )}
      </div>
      <Lightbox items={items} index={box} onClose={() => setBox(null)} onIndex={setBox} />
    </div>
  )
}

function Featured({ f, i, p, story, onOpen }: { f: (typeof featured)[number]; i: number; p: MotionValue<number>; story: boolean; onOpen: () => void }) {
  const reduce = useReducedMotion()
  const a = 0.2 + i * 0.04
  const b = 0.78 + i * 0.03
  const left = useTransform(p, [a, b], story ? [`${f.from[0]}%`, `${f.to[0]}%`] : [`${f.from[0]}%`, `${f.from[0]}%`])
  const top = useTransform(p, [a, b], story ? [`${f.from[1]}%`, `${f.to[1]}%`] : [`${f.from[1]}%`, `${f.from[1]}%`])
  const rotate = useTransform(p, [a, b], [-14, story ? 0 : -14])
  const scale = useTransform(p, [0, 0.12, a, b], story ? [1, 1.06, 1.06, 1.12] : [1, 1, 1, 1])
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${f.name} screen`}
      className="group absolute z-10 w-[118px] -translate-x-1/2 -translate-y-1/2 sm:w-[168px] xl:w-[190px]"
      style={{ left, top, rotate, scale }}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-2">
        <span className="block overflow-hidden rounded-[22px] border-[5px] border-ink bg-ink shadow-[0_30px_50px_-24px_rgba(14,20,34,0.6)] sm:rounded-[28px] sm:border-[7px]">
          <img src={asset(shot(f.key))} alt={`Day One ${f.name} screen`} className="block w-full rounded-[17px] sm:rounded-[21px]" />
        </span>
        <span className="mt-2 flex items-center justify-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Expand size={12} aria-hidden /> {f.name}
        </span>
      </span>
    </motion.button>
  )
}
