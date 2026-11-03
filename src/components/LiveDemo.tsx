import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import { demoFeatures } from '../content/evaluation'
import { meta } from '../content/meta'
import { isPlaceholder } from '../content/types'
import { SubHeader } from './ui'

const ease = [0.22, 1, 0.36, 1] as const

/** The deployed prototype opened at one feature (?demo=key); the prototype keeps the visitor inside that feature. */
function demoUrl(key: string) {
  const u = new URL(meta.prototypeUrl as string)
  u.searchParams.set('demo', key)
  return u.toString()
}

/** 7.4 — the real prototype, one feature at a time: tabs on top, phone on the left, explanation on the right. */
export function LiveDemo() {
  const [k, setK] = useState(0)
  const [loaded, setLoaded] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  // Only load the (fairly heavy) prototype once the reader gets close to it.
  const near = useInView(ref, { once: true, margin: '600px 0px 600px 0px' })
  const tabsId = useId()
  const f = demoFeatures[k]
  const src = demoUrl(f.key)

  useEffect(() => setLoaded(null), [src])

  if (isPlaceholder(meta.prototypeUrl)) return null

  return (
    <div ref={ref} className="mt-24">
      <SubHeader
        num="7.4"
        label="Try Day One"
        title="The live prototype, one feature at a time."
      />

      {/* Feature tabs */}
      <div role="tablist" aria-label="Feature to try" className="flex flex-wrap gap-x-1 border-b border-line">
        {demoFeatures.map((x, i) => (
          <button
            key={x.key}
            id={`${tabsId}-${x.key}`}
            role="tab"
            type="button"
            aria-selected={i === k}
            aria-controls={`${tabsId}-panel`}
            tabIndex={i === k ? 0 : -1}
            onClick={() => setK(i)}
            onKeyDown={(e) => {
              if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
              const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + demoFeatures.length) % demoFeatures.length
              setK(n)
              document.getElementById(`${tabsId}-${demoFeatures[n].key}`)?.focus()
            }}
            className={`relative shrink-0 px-3 pb-3 pt-2 text-[15px] font-medium transition-colors ${i === k ? 'text-ink' : 'text-faint hover:text-ink'}`}
          >
            {x.name}
            {i === k && <motion.span layoutId={`${tabsId}-bar`} className="absolute inset-x-0 -bottom-px h-[3px] bg-blue" transition={{ duration: 0.35, ease }} />}
          </button>
        ))}
      </div>

      <div id={`${tabsId}-panel`} role="tabpanel" aria-labelledby={`${tabsId}-${f.key}`} className="mt-10 grid items-start gap-10 md:grid-cols-12">
        {/* Phone with the real app */}
        <div className="md:col-span-5 lg:col-span-4">
          <div className="relative mx-auto w-full max-w-[360px] overflow-hidden rounded-[40px] border-[10px] border-ink bg-ink shadow-[0_40px_70px_-36px_rgba(14,20,34,0.55)]">
            <div className="relative aspect-[390/780] w-full overflow-hidden rounded-[30px] bg-[#f6f7fb]">
              {near && (
                <iframe
                  key={src}
                  src={src}
                  title={`Day One prototype: ${f.name}`}
                  loading="lazy"
                  onLoad={() => setLoaded(src)}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="autoplay; clipboard-write"
                />
              )}
              <AnimatePresence>
                {loaded !== src && (
                  <motion.div
                    className="absolute inset-0 grid place-items-center bg-[#f6f7fb] text-muted"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    aria-hidden
                  >
                    <span className="flex flex-col items-center gap-3 font-mono text-[12px] uppercase tracking-[0.12em]">
                      <Loader2 size={22} className="animate-spin text-blue motion-reduce:animate-none" />
                      Opening {f.name}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <p className="mt-4 text-center">
            <a href={src} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 font-mono text-[12px] uppercase tracking-[0.12em] text-muted hover:text-blue">
              <span className="link-grow">Open full screen</span>
              <ArrowUpRight size={14} aria-hidden />
            </a>
          </p>
        </div>

        {/* What this feature is and what to try */}
        <div className="md:col-span-7 md:pt-6 lg:col-span-7 lg:col-start-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={f.key} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3, ease }}>
              <p className="font-mono text-[12px] text-blue">
                0{k + 1} / 0{demoFeatures.length}
              </p>
              <h4 className="mt-2 font-display text-[clamp(1.5rem,2.4vw,2rem)] font-semibold tracking-tight">{f.name}</h4>
              <p className="mt-3 max-w-[52ch] text-[17px] leading-relaxed text-ink-2">{f.summary}</p>

              <p className="eyebrow mt-8">Try this</p>
              <ol className="mt-3 border-t border-line">
                {f.tryThis.map((t, i) => (
                  <motion.li
                    key={t}
                    className="grid grid-cols-[36px_1fr] border-b border-line py-3 text-[15px]"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease, delay: 0.1 + i * 0.06 }}
                  >
                    <span className="font-mono text-[12px] text-blue">{i + 1}</span>
                    {t}
                  </motion.li>
                ))}
              </ol>

              <div className="mt-6 flex gap-3 border border-solution/25 bg-[#eef7f1] p-4">
                <span className="shrink-0 font-mono text-[12px] uppercase tracking-[0.1em] text-solution">Responds to</span>
                <p className="text-[14px] text-ink">{f.respondsTo}</p>
              </div>
              {f.note && <p className="mt-4 font-mono text-[12px] leading-relaxed text-faint">{f.note}</p>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
