import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { Expand } from 'lucide-react'
import { Lightbox } from './Lightbox'
import { asset } from './ui'

const shot = (n: string) => `assets/hero/${n}.jpg`
const RATIO = 909 / 420 // screenshot height / width
const TILT = -14

/** Real screens captured from the final Day One prototype, laid out as a tilted wall (7 columns × 4 rows). */
const pool = ['journey', 'place', 'summary', 'plan', 'route-studio', 'scenario', 'navigation', 'ask', 'home', 'ar']
const COLS = 7
const ROWS = 4

/** Featured screens sit *inside* the wall at these slots, then lift out and line up. */
const featured = [
  { key: 'home', name: 'Home', text: 'Your starting point: everyday tools, a suggested Short Trip and small local discoveries.', slot: [2, 1] },
  { key: 'ar', name: 'AR Lens', text: 'Scan a myki reader to see what you can tap with, and how the two-hour fare works.', slot: [3, 1] },
  { key: 'ask', name: 'Ask This Place', text: 'Ask about the place you are in, confirm where you are, and get help that fits it.', slot: [4, 2] },
] as const

type Size = { w: number; h: number }

function useSize<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [size, setSize] = useState<Size>({ w: 0, h: 0 })
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }))
    ro.observe(el)
    setSize({ w: el.clientWidth, h: el.clientHeight })
    return () => ro.disconnect()
  }, [])
  return [ref, size] as const
}

function useMedia(q: string) {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useLayoutEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setM(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [q])
  return m
}

/** Geometry of the wall and of the final row, from the stage size. */
function layout({ w, h }: Size) {
  const cw = Math.max(90, Math.min(h * 0.19, w * 0.2))
  const ch = cw * RATIO
  const gx = cw * 0.2
  const gy = cw * 0.2
  const cx = w / 2
  const cy = h / 2
  const t = (TILT * Math.PI) / 180
  const pos = (c: number, r: number) => {
    const ux = (c - (COLS - 1) / 2) * (cw + gx)
    const uy = (r - (ROWS - 1) / 2) * (ch + gy) + (c % 2 ? ch * 0.45 : 0)
    return { x: cx + ux * Math.cos(t) - uy * Math.sin(t), y: cy + ux * Math.sin(t) + uy * Math.cos(t) }
  }
  // Final row: three phones that always fit, with room for a caption below.
  const ew = Math.min(w / 3.7, (h * 0.66) / RATIO, 250)
  const eh = ew * RATIO
  const ey = cy - h * 0.04
  const end = [0, 1, 2].map((i) => ({ x: cx + (i - 1) * ew * 1.24, y: ey }))
  return { cw, ch, pos, ew, eh, end, capY: ey + eh / 2 + 26 }
}

/**
 * Hero: a short intro on the left and a tilted wall of real Day One screens on the right.
 * Scrolling (desktop) lifts three screens out of the wall and lines them up while the rest of the wall
 * fades into a Melbourne map, and the remaining intro text appears.
 */
export function HeroShowcase({ lead, more }: { lead: ReactNode; more: ReactNode }) {
  const reduce = useReducedMotion()
  const lg = useMedia('(min-width: 1024px)')
  const story = lg && !reduce
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 130, damping: 30, restDelta: 0.0005 })
  const [expanded, setExpanded] = useState(false)
  const [box, setBox] = useState<number | null>(null)
  useMotionValueEvent(p, 'change', (v) => setExpanded(v > 0.1))

  const items = featured.map((f) => ({ src: shot(f.key), alt: `Day One ${f.name} screen`, caption: `${f.name} — ${f.text}` }))

  if (!story) {
    return (
      <div className="container-x pb-12 pt-10">
        {lead}
        {more}
        <StaticRow onOpen={setBox} />
        <Lightbox items={items} index={box} onClose={() => setBox(null)} onIndex={setBox} />
      </div>
    )
  }

  return (
    <div ref={ref} className="relative h-[240vh]">
      <div className="sticky top-[68px] flex h-[calc(100svh-68px)] overflow-hidden">
        {/* Left: intro — starts short, grows as you scroll */}
        <div className="relative z-10 flex w-[calc(max(1rem,(100vw-1240px)/2+3rem)+min(31vw,440px))] shrink-0 flex-col justify-center pb-20 pl-[max(1rem,calc((100vw-1240px)/2+3rem))] pr-8">
          <motion.div layout transition={{ layout: { type: 'spring', stiffness: 220, damping: 30 } }}>
            {lead}
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  key="more"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  {more}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <ScrollCue p={p} />
        </div>

        {/* Right: the wall */}
        <Stage p={p} onOpen={setBox} />
      </div>
      <Lightbox items={items} index={box} onClose={() => setBox(null)} onIndex={setBox} />
    </div>
  )
}

function ScrollCue({ p }: { p: MotionValue<number> }) {
  const o = useTransform(p, [0, 0.07], [1, 0])
  return (
    <motion.a
      href="#title-block"
      style={{ opacity: o }}
      className="absolute bottom-7 left-[max(1rem,calc((100vw-1240px)/2+3rem))] flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.16em] text-muted hover:text-blue"
    >
      <span className="relative block h-9 w-[22px] rounded-full border-2 border-current">
        <motion.span
          className="absolute left-1/2 top-1.5 -ml-[1.5px] block h-2 w-[3px] rounded-full bg-blue"
          animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </span>
      Scroll to explore
    </motion.a>
  )
}

function Stage({ p, onOpen }: { p: MotionValue<number>; onOpen: (i: number) => void }) {
  const [ref, size] = useSize<HTMLDivElement>()
  const L = size.w ? layout(size) : null
  const taken = new Set(featured.map((f) => f.slot.join(',')))
  const wallO = useTransform(p, [0.12, 0.45], [1, 0.1])
  const wallY = useTransform(p, [0, 1], [0, -60])
  const mapO = useTransform(p, [0.2, 0.6], [0, 0.35])
  const capO = useTransform(p, [0.72, 0.88], [0, 1])

  return (
    <div className="relative min-w-0 flex-1 overflow-hidden" role="group" aria-label="Screens from the final Day One prototype">
      <motion.img aria-hidden src={asset('assets/hero/melbourne-map.jpg')} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover" style={{ opacity: mapO }} />
      {/* soft edge so the wall never runs under the intro */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-[3] w-24 bg-gradient-to-r from-canvas to-transparent" />
      {/* layout box: keeps the final row inside the page's right margin */}
      <div ref={ref} className="absolute inset-y-0 left-0 right-[max(1rem,calc((100vw-1240px)/2+3rem))]">
      {L && (
        <>
          <motion.div aria-hidden className="absolute inset-0" style={{ opacity: wallO, y: wallY }}>
            {Array.from({ length: COLS * ROWS }, (_, k) => {
              const c = k % COLS
              const r = Math.floor(k / COLS)
              if (taken.has(`${c},${r}`)) return null
              const { x, y } = L.pos(c, r)
              return (
                <motion.img
                  key={k}
                  src={asset(shot(pool[(c * 3 + r * 5) % pool.length]))}
                  alt=""
                  decoding="async"
                  className="absolute max-w-none rounded-[18px] border border-line bg-white shadow-[0_10px_24px_-16px_rgba(14,20,34,0.45)]"
                  style={{ left: x, top: y, width: L.cw, x: '-50%', y: '-50%', rotate: TILT }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.15 + ((c + r) % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                />
              )
            })}
          </motion.div>
          {featured.map((f, i) => (
            <FeaturedCard key={f.key} f={f} i={i} p={p} L={L} onOpen={() => onOpen(i)} />
          ))}
          <motion.p
            className="pointer-events-none absolute left-0 right-0 z-[4] text-center font-mono text-[12px] uppercase tracking-[0.14em] text-ink-2"
            style={{ top: L.capY, opacity: capO }}
          >
            Final prototype · Home / AR Lens / Ask This Place
          </motion.p>
        </>
      )}
      </div>
    </div>
  )
}

function FeaturedCard({ f, i, p, L, onOpen }: { f: (typeof featured)[number]; i: number; p: MotionValue<number>; L: ReturnType<typeof layout>; onOpen: () => void }) {
  const start = L.pos(f.slot[0], f.slot[1])
  const end = L.end[i]
  const a = 0.2 + i * 0.03
  const b = 0.7 + i * 0.03
  const left = useTransform(p, [a, b], [start.x, end.x])
  const top = useTransform(p, [0, a, b], [start.y, start.y - 14, end.y])
  const width = useTransform(p, [a, b], [L.cw, L.ew])
  const rotate = useTransform(p, [a, b], [TILT, 0])
  const lift = useTransform(p, [0.02, 0.16], [0, 1])
  const scale = useTransform(lift, [0, 1], [1, 1.04])
  const bezel = useTransform(p, [a + 0.1, b], [0, 1])
  const shadow = useTransform(() => {
    const l = lift.get()
    const z = bezel.get()
    return `0 0 0 ${z * 6}px #0e1422, 0 ${10 + 26 * l}px ${24 + 34 * l}px -16px rgba(14,20,34,${0.45 + 0.15 * l})`
  })
  const radius = useTransform(bezel, [0, 1], [18, 24])
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`Open ${f.name} screen`}
      className="group absolute z-[5] block overflow-hidden bg-white"
      style={{ left, top, width, rotate, scale, x: '-50%', y: '-50%', boxShadow: shadow, borderRadius: radius }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.3 + i * 0.08 }}
    >
      <img src={asset(shot(f.key))} alt={`Day One ${f.name} screen`} className="block w-full" />
      <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-ink/70 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        <Expand size={14} aria-hidden />
      </span>
    </motion.button>
  )
}

/** Phones and reduced motion: the three featured screens, straight, on the map. */
function StaticRow({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <div className="relative mt-10 overflow-hidden rounded-[12px] border border-line">
      <img aria-hidden src={asset('assets/hero/melbourne-map.jpg')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="relative grid grid-cols-3 gap-3 p-4 sm:gap-6 sm:p-8">
        {featured.map((f, i) => (
          <button key={f.key} type="button" onClick={() => onOpen(i)} aria-label={`Open ${f.name} screen`} className="group">
            <span className="block overflow-hidden rounded-[14px] border-[4px] border-ink bg-white shadow-[0_18px_30px_-20px_rgba(14,20,34,0.6)] transition-transform group-hover:-translate-y-1 sm:rounded-[22px] sm:border-[6px]">
              <img src={asset(shot(f.key))} alt={`Day One ${f.name} screen`} className="block w-full" />
            </span>
            <span className="mt-2 block text-center font-mono text-[11px] uppercase tracking-[0.1em] text-ink-2">{f.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
