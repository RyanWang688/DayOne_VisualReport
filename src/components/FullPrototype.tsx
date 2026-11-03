import { createPortal } from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Loader2, Smartphone, X } from 'lucide-react'

export const FULL_PROTOTYPE_URL = 'https://ryanwang688.github.io/day-one-mobile/'

/** Button that opens the complete prototype in an in-page phone window, so the reader never leaves the report. */
export function FullPrototypeButton() {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const btn = useRef<HTMLButtonElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      btn.current?.focus()
    }
  }, [open])

  return (
    <>
      <motion.button
        ref={btn}
        type="button"
        onClick={() => {
          setLoaded(false)
          setOpen(true)
        }}
        aria-haspopup="dialog"
        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-[12px] bg-ink py-3 pl-3 pr-5 text-left text-white shadow-[0_18px_30px_-18px_rgba(14,20,34,0.7)]"
        whileHover={reduce ? undefined : { y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 26 }}
      >
        {/* soft light that sweeps across on hover */}
        <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-white/10 transition-transform duration-700 ease-out group-hover:translate-x-[320%]" />
        <span className="grid h-10 w-10 place-items-center rounded-[9px] bg-white/10">
          <Smartphone size={20} aria-hidden />
        </span>
        <span>
          <span className="block text-[15px] font-semibold leading-tight">Try the full prototype</span>
          <span className="block font-mono text-[11px] uppercase tracking-[0.1em] text-white/55">Every feature · opens here</span>
        </span>
        <ArrowUpRight size={18} aria-hidden className="ml-1 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </motion.button>

      {createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Day One full prototype"
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/70 p-3 backdrop-blur-md sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative flex max-h-full flex-col items-center"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex w-full items-center justify-between gap-4 text-white">
                <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-white/70">Day One · full prototype</p>
                <div className="flex items-center gap-2">
                  <a
                    href={FULL_PROTOTYPE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden items-center gap-1 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:inline-flex"
                  >
                    New tab <ArrowUpRight size={13} aria-hidden />
                  </a>
                  <button type="button" autoFocus onClick={() => setOpen(false)} aria-label="Close prototype" className="grid h-10 w-10 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white/10">
                    <X size={18} aria-hidden />
                  </button>
                </div>
              </div>
              {/* Phone-sized window; shrinks to fit short screens */}
              <div
                className="relative overflow-hidden rounded-[38px] border-[10px] border-[#0b0f19] bg-[#0b0f19] shadow-[0_50px_90px_-40px_rgba(0,0,0,0.8)]"
                style={{ width: 'min(390px, calc(100vw - 24px), calc((100svh - 90px) * 390 / 844))' }}
              >
                <div className="relative aspect-[390/844] w-full overflow-hidden rounded-[28px] bg-[#f6f7fb]">
                  <iframe src={FULL_PROTOTYPE_URL} title="Day One full prototype" onLoad={() => setLoaded(true)} className="absolute inset-0 h-full w-full border-0" allow="autoplay; clipboard-write" />
                  <AnimatePresence>
                    {!loaded && (
                      <motion.div className="absolute inset-0 grid place-items-center bg-[#f6f7fb]" exit={{ opacity: 0 }} transition={{ duration: 0.35 }} aria-hidden>
                        <span className="flex flex-col items-center gap-3 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">
                          <Loader2 size={22} className="animate-spin text-blue motion-reduce:animate-none" />
                          Opening Day One
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
