import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue } from 'motion/react'
import { List, X } from 'lucide-react'
import { partByKey, parts, sections, type PartKey } from '../content/sections'
import { asset } from './ui'

/** Blocks between sections that should also update the breadcrumb. */
const landmarks: { id: string; part: PartKey; label: string }[] = [
  { id: 'contents', part: 'front', label: 'Contents' },
  { id: 'part-research', part: 'research', label: 'Part I · Research' },
  { id: 'part-design', part: 'design', label: 'Part II · Design' },
]
const LINE = 96 // px from the top of the viewport that counts as "reading here"

type Place = { id: string; part: PartKey; num: string; label: string; seg: number }

/** Works out which block is under the reading line and how far through its chapter the reader is. */
function useReadingPlace() {
  const [place, setPlace] = useState<Place>({ ...sections[0], seg: 0 })
  const segProgress = useMotionValue(0)

  useEffect(() => {
    const blocks = [
      ...sections.map((s, i) => ({ id: s.id, part: s.part as PartKey, num: s.num as string, label: s.label as string, seg: i, landmark: false })),
      ...landmarks.map((l) => ({ ...l, num: '', seg: -1, landmark: true })),
    ]
    let raf = 0
    const update = () => {
      raf = 0
      const tops = blocks.map((b) => ({ b, el: document.getElementById(b.id) })).filter((x) => x.el).map((x) => ({ ...x, top: x.el!.getBoundingClientRect().top }))
      tops.sort((a, c) => a.top - c.top)
      const current = [...tops].reverse().find((x) => x.top <= LINE) ?? tops[0]
      // Chapter progress: from this section's top to the next section's top.
      const secs = tops.filter((x) => !x.b.landmark)
      let k = 0
      secs.forEach((x, i) => {
        if (x.top <= LINE) k = i
      })
      const here = secs[k]
      const end = secs[k + 1]?.top ?? here.top + here.el!.offsetHeight - innerHeight + LINE
      segProgress.set(Math.min(1, Math.max(0, (LINE - here.top) / Math.max(1, end - here.top))))
      const seg = here.b.seg
      setPlace((prev) => (prev.id === current.b.id && prev.seg === seg ? prev : { id: current.b.id, part: current.b.part, num: current.b.num, label: current.b.label, seg }))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => {
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [segProgress])

  return { place, segProgress }
}

export function Nav() {
  const { place, segProgress } = useReadingPlace()
  const [open, setOpen] = useState(false)
  const dark = place.id === 'hmw' || place.id === 'conclusions'

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <a href="#main" className="sr-only z-[60] rounded bg-blue px-3 py-2 text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3">
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-colors duration-500 ${dark ? 'bg-blue-ink/85 text-white' : 'bg-canvas/90 text-ink'}`}
      >
        <div className="container-x flex h-14 items-center justify-between gap-4">
          <a href="#overview" className="flex shrink-0 items-center gap-3" aria-label="Day One — back to top">
            {/* Wordmark; turns white over the dark sections */}
            <img src={asset('assets/brand/dayone-logo.png')} alt="" className={`h-9 w-auto transition-[filter] duration-500 ${dark ? 'brightness-0 invert' : ''}`} />
            <span className={`hidden font-mono text-[12px] uppercase tracking-[0.14em] lg:inline ${dark ? 'text-white/50' : 'text-faint'}`}>Visual Report</span>
          </a>

          {/* Breadcrumb: part › chapter */}
          <div className="flex min-w-0 items-center gap-3">
            {/* Three levels: part (quiet) › chapter number (accent) › chapter name (strongest) */}
            <p className="flex min-w-0 items-center gap-2.5" aria-live="polite">
              <span className="sr-only">You are reading: </span>
              {partByKey[place.part].label !== place.label && (
                <>
                  <span className={`hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] md:inline ${dark ? 'text-white/45' : 'text-faint'}`}>{partByKey[place.part].label}</span>
                  <span aria-hidden className={`hidden h-4 w-px md:inline-block ${dark ? 'bg-white/25' : 'bg-line'}`} />
                </>
              )}
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={place.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex min-w-0 items-center gap-2"
                >
                  {place.num && (
                    <span className={`grid h-6 min-w-7 shrink-0 place-items-center rounded-[6px] px-1.5 font-mono text-[12px] font-semibold ${dark ? 'bg-sun/15 text-sun' : 'bg-blue-soft text-blue'}`}>{place.num}</span>
                  )}
                  <span className={`truncate font-display text-[16px] font-semibold tracking-tight ${dark ? 'text-white' : 'text-ink'}`}>{place.label}</span>
                </motion.span>
              </AnimatePresence>
            </p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="section-menu"
              className={`group flex h-9 shrink-0 items-center gap-2 pl-1 font-mono before:mr-1.5 before:block before:h-4 before:w-px before:content-[''] text-[12px] uppercase tracking-[0.14em] transition-colors sm:before:mr-2.5 ${dark ? 'text-white/70 before:bg-white/25 hover:text-sun' : 'text-muted before:bg-line hover:text-blue'}`}
            >
              <List size={15} aria-hidden className="transition-transform duration-200 group-hover:scale-110" />
              <span className="link-grow hidden sm:inline">Contents</span>
              <span className="sr-only sm:hidden">Contents</span>
            </button>
          </div>
        </div>

        {/* Chapter progress: one segment per section, grouped by part; the current one fills as you read */}
        <nav aria-label="Chapter progress" className="container-x">
          <ol className="flex h-3 items-end gap-[3px] pb-[3px]">
            {sections.map((s, i) => {
              const newPart = i > 0 && sections[i - 1].part !== s.part
              const state = i < place.seg ? 1 : i === place.seg ? segProgress : 0
              return (
                <li key={s.id} className={`group relative h-full flex-1 ${newPart ? 'ml-2' : ''}`}>
                  <a
                    href={`#${s.id}`}
                    aria-label={`${s.num ? s.num + ' ' : ''}${s.label}`}
                    aria-current={i === place.seg ? 'true' : undefined}
                    className="flex h-full items-end"
                  >
                    <span className={`relative block h-[3px] w-full overflow-hidden rounded-full transition-[height] group-hover:h-[5px] ${dark ? 'bg-white/15' : 'bg-ink/10'}`}>
                      <motion.span className={`absolute inset-0 origin-left ${dark ? 'bg-sun' : 'bg-blue'}`} style={{ scaleX: state }} />
                    </span>
                  </a>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-4 hidden -translate-x-1/2 whitespace-nowrap rounded-[3px] bg-ink px-2 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 md:block"
                  >
                    {s.num && `${s.num} · `}
                    {s.label}
                  </span>
                </li>
              )
            })}
          </ol>
        </nav>
      </header>

      {/* Contents sheet (all screen sizes) */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[70] bg-ink/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.nav
              id="section-menu"
              aria-label="Contents"
              role="dialog"
              aria-modal="true"
              className="absolute right-0 top-0 flex h-full w-[min(400px,90vw)] flex-col bg-canvas p-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="eyebrow">Contents</span>
                <button type="button" autoFocus onClick={() => setOpen(false)} aria-label="Close contents" className="grid h-9 w-9 place-items-center rounded-full border border-line">
                  <X size={18} aria-hidden />
                </button>
              </div>
              <div className="-mx-6 flex-1 overflow-y-auto px-6">
                {parts.map((p) => (
                  <div key={p.key} className="mb-6">
                    <p className={`font-mono text-[12px] uppercase tracking-[0.12em] ${p.key === place.part ? 'text-blue' : 'text-faint'}`}>{p.label}</p>
                    <p className="mb-2 font-serif text-[14px] italic text-muted">{p.story}</p>
                    <ol className="flex flex-col">
                      {sections
                        .filter((s) => s.part === p.key)
                        .map((s) => {
                          const current = sections[place.seg]?.id === s.id
                          return (
                            <li key={s.id} className="border-t border-line">
                              <a
                                href={`#${s.id}`}
                                onClick={() => setOpen(false)}
                                aria-current={current ? 'true' : undefined}
                                className={`relative grid grid-cols-[28px_1fr] items-baseline gap-2 py-2.5 ${current ? 'text-blue' : 'text-ink hover:text-blue'}`}
                              >
                                {current && <span aria-hidden className="absolute -left-3 top-3 bottom-3 w-[3px] rounded-full bg-blue" />}
                                <span className="font-mono text-[12px] text-faint">{s.num}</span>
                                <span>
                                  <span className="font-display text-[17px] font-semibold">{s.label}</span>
                                  <span className="block font-serif text-[15px] italic leading-snug text-muted">{s.question}</span>
                                </span>
                              </a>
                            </li>
                          )
                        })}
                    </ol>
                  </div>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
