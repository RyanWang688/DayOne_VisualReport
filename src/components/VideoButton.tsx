import { createPortal } from 'react-dom'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ExternalLink, Play, X } from 'lucide-react'

/** Extracts the video id from youtube.com/watch?v=…, youtu.be/…, or /embed/… links. */
export function youtubeId(url: string) {
  return url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/)?.[1] ?? null
}

/** A button that plays the project video in an in-page player (privacy-enhanced YouTube embed). */
export function VideoButton({ url, label = 'Watch the video', variant = 'primary' }: { url: string; label?: string; variant?: 'primary' | 'inline' }) {
  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)
  const id = youtubeId(url)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      trigger.current?.focus()
    }
  }, [open])

  if (!id)
    return (
      <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-blue underline underline-offset-4">
        {label} <ExternalLink size={14} aria-hidden />
      </a>
    )

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={
          variant === 'primary'
            ? 'group inline-flex h-12 items-center gap-3 rounded-full bg-blue pl-2 pr-5 text-[15px] font-semibold text-white shadow-[0_10px_24px_-12px_rgba(0,100,240,0.7)] hover:bg-blue-deep'
            : 'group inline-flex h-9 items-center gap-2 rounded-full border border-blue/30 bg-blue-soft pl-1 pr-3.5 text-[14px] font-semibold text-blue hover:border-blue'
        }
      >
        <span
          className={`grid place-items-center rounded-full transition-transform duration-200 group-hover:scale-110 ${
            variant === 'primary' ? 'h-8 w-8 bg-white text-blue' : 'h-7 w-7 bg-blue text-white'
          }`}
        >
          <Play size={variant === 'primary' ? 15 : 13} fill="currentColor" aria-hidden className="translate-x-[1px]" />
        </span>
        {label}
      </button>

      {createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Day One project video"
              className="w-full max-w-5xl"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between gap-3 text-white">
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/70">Day One · project video</p>
                <div className="flex items-center gap-2">
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/25 px-3 text-[13px] text-white/85 hover:border-white hover:text-white"
                  >
                    Open on YouTube <ExternalLink size={13} aria-hidden />
                  </a>
                  <button
                    type="button"
                    autoFocus
                    onClick={() => setOpen(false)}
                    aria-label="Close video"
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-white hover:border-white"
                  >
                    <X size={18} aria-hidden />
                  </button>
                </div>
              </div>
              <div className="relative aspect-video w-full overflow-hidden bg-black shadow-2xl">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
                  title="Day One project video"
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
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
