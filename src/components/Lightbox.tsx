import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { asset } from './ui'

export type LightboxItem = { src: string; alt: string; caption?: string }

/** Full-screen image viewer: ←/→ to move, Esc to close, focus returns to the opener. */
export function Lightbox({ items, index, onClose, onIndex }: { items: LightboxItem[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const opener = useRef<Element | null>(null)
  const open = index !== null

  useEffect(() => {
    if (!open) return
    opener.current = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
      ;(opener.current as HTMLElement | null)?.focus?.()
    }
  }, [open])

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onIndex((index + 1) % items.length)
      if (e.key === 'ArrowLeft') onIndex((index - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, items.length, onClose, onIndex])

  const item = index !== null ? items[index] : null
  const many = items.length > 1

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
          className="fixed inset-0 z-[80] flex flex-col bg-ink/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-white/60" aria-live="polite">
              {many ? `${index! + 1} / ${items.length}` : ''}
            </p>
            <button type="button" autoFocus onClick={onClose} aria-label="Close viewer" className="grid h-10 w-10 place-items-center rounded-full border border-white/25 hover:bg-white/10">
              <X size={18} aria-hidden />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-16" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={item.src}
                className="flex max-h-full flex-col items-center"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <img src={asset(item.src)} alt={item.alt} className="max-h-[calc(100svh-150px)] max-w-full rounded-[6px] bg-white object-contain shadow-2xl" />
                {item.caption && <figcaption className="mt-3 max-w-[60ch] text-center text-[14px] text-white/75">{item.caption}</figcaption>}
              </motion.figure>
            </AnimatePresence>
            {many && (
              <>
                <button
                  type="button"
                  onClick={() => onIndex((index! - 1 + items.length) % items.length)}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-4"
                >
                  <ChevronLeft size={20} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => onIndex((index! + 1) % items.length)}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-4"
                >
                  <ChevronRight size={20} aria-hidden />
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
