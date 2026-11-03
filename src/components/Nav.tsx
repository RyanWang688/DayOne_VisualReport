import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { parts, sections } from '../content/sections'
import { useActiveSection } from '../hooks/useActiveSection'
import { asset } from './ui'

/** Blocks between sections that should also update the "Now reading" indicator. */
const landmarks = [
  { id: 'contents', num: '', label: 'Contents' },
  { id: 'part-research', num: '', label: 'Part I · Research' },
  { id: 'part-design', num: '', label: 'Part II · Design' },
]
const ids = [...sections.map((s) => s.id), ...landmarks.map((l) => l.id)]

export function Nav() {
  const active = useActiveSection(ids)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 })
  const [open, setOpen] = useState(false)
  const current: { id: string; num: string; label: string } = sections.find((s) => s.id === active) ?? landmarks.find((l) => l.id === active) ?? sections[0]
  const dark = active === 'hmw' || active === 'conclusions'

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
        className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-500 ${dark ? 'border-white/10 bg-blue-ink/80 text-white' : 'border-line/70 bg-canvas/85 text-ink'}`}
      >
        <div className="container-x flex h-14 items-center justify-between gap-4">
          <a href="#overview" className="flex items-center gap-3" aria-label="Day One — back to top">
            {/* Wordmark; turns white over the dark sections */}
            <img
              src={asset('assets/brand/dayone-logo.png')}
              alt=""
              className={`h-9 w-auto transition-[filter] duration-500 ${dark ? 'brightness-0 invert' : ''}`}
            />
            <span className={`hidden font-mono text-[12px] uppercase tracking-[0.14em] sm:inline ${dark ? 'text-white/50' : 'text-faint'}`}>Visual Report</span>
          </a>

          {/* Active section indicator */}
          <div className="flex min-w-0 items-center gap-3" aria-live="polite">
            <span className={`hidden font-mono text-[12px] md:inline ${dark ? 'text-white/50' : 'text-faint'}`}>Now reading</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={current.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="truncate font-mono text-[12px] uppercase tracking-[0.12em]"
              >
                {current.num && <span className={dark ? 'text-sun' : 'text-blue'}>{current.num} </span>}
                {current.label}
              </motion.span>
            </AnimatePresence>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open section menu"
              aria-expanded={open}
              aria-controls="section-menu"
              className={`ml-1 grid h-9 w-9 place-items-center rounded-full border transition-colors xl:hidden ${dark ? 'border-white/20 hover:bg-white/10' : 'border-line hover:bg-paper'}`}
            >
              <Menu size={18} aria-hidden />
            </button>
          </div>
        </div>
        <motion.div aria-hidden className="h-[2px] origin-left bg-blue" style={{ scaleX: progress }} />
      </header>

      {/* Desktop side rail */}
      <nav aria-label="Sections" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
        <ol className="flex flex-col gap-1">
          {sections.map((s, i) => {
            const isActive = s.id === active
            const newPart = i > 0 && sections[i - 1].part !== s.part
            return (
              <li key={s.id} className={newPart ? 'mt-3' : ''}>
                <a
                  href={`#${s.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className="group flex items-center justify-end gap-3 py-1"
                >
                  <span
                    className={`rounded-[3px] px-1.5 py-0.5 font-mono text-[12px] uppercase tracking-[0.1em] transition-all duration-300 ${
                      'translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 ' +
                      (dark ? 'bg-blue-ink text-white' : 'bg-paper shadow-sm ' + (isActive ? 'text-ink' : 'text-muted'))
                    }`}
                  >
                    {s.label}
                  </span>
                  <span
                    className={`block h-[2px] transition-all duration-300 ${isActive ? 'w-7 ' + (dark ? 'bg-sun' : 'bg-blue') : 'w-3 ' + (dark ? 'bg-white/30' : 'bg-ink/20') + ' group-hover:w-5'}`}
                  />
                </a>
              </li>
            )
          })}
        </ol>
      </nav>

      {/* Mobile / tablet sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] bg-ink/40 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.nav
              id="section-menu"
              aria-label="Sections"
              role="dialog"
              aria-modal="true"
              className="absolute right-0 top-0 flex h-full w-[min(360px,88vw)] flex-col bg-canvas p-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="eyebrow">Contents</span>
                <button type="button" autoFocus onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-9 w-9 place-items-center rounded-full border border-line">
                  <X size={18} aria-hidden />
                </button>
              </div>
              <div className="-mx-6 flex-1 overflow-y-auto px-6">
                {parts.map((p) => (
                  <div key={p.key} className="mb-5">
                    <p className="mb-1 font-mono text-[12px] uppercase tracking-[0.14em] text-faint">{p.label}</p>
                    <ol className="flex flex-col">
                      {sections
                        .filter((s) => s.part === p.key)
                        .map((s) => (
                          <li key={s.id} className="border-t border-line">
                            <a
                              href={`#${s.id}`}
                              onClick={() => setOpen(false)}
                              aria-current={s.id === active ? 'true' : undefined}
                              className={`flex items-baseline gap-4 py-2.5 font-display text-lg font-semibold ${s.id === active ? 'text-blue' : 'text-ink'}`}
                            >
                              <span className="w-6 font-mono text-[12px] font-normal text-faint">{s.num}</span>
                              <span className="flex-1">{s.label}</span>
                            </a>
                          </li>
                        ))}
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
