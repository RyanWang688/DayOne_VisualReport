import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { asset } from './ui'

// Source video is 1280×720; the logo is drawn inside this region (with a little margin).
const SRC = { w: 1280, h: 720 }
const CROP = { x: 350, y: 160, w: 590, h: 405 }

/** The animated "Day One" wordmark: plays once at 1.5× and rests on the last frame. */
export function IntroLogo({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const ready = () => {
      if (reduce) {
        v.pause()
        v.currentTime = Math.max(0, v.duration - 0.05) // show the finished wordmark
        return
      }
      v.playbackRate = 1.5
      v.play().catch(() => {
        v.currentTime = Math.max(0, v.duration - 0.05)
      })
    }
    if (v.readyState >= 1) ready()
    else v.addEventListener('loadedmetadata', ready, { once: true })
  }, [reduce])

  return (
    <div className={`relative isolate overflow-hidden bg-canvas ${className}`} style={{ aspectRatio: `${CROP.w} / ${CROP.h}` }}>
      <video
        ref={ref}
        src={asset('assets/brand/dayone-intro.mp4')}
        muted
        playsInline
        preload="auto"
        aria-hidden
        className="absolute max-w-none mix-blend-multiply"
        style={{
          width: `${(SRC.w / CROP.w) * 100}%`,
          left: `${(-CROP.x / CROP.w) * 100}%`,
          top: `${(-CROP.y / CROP.h) * 100}%`,
        }}
      />
    </div>
  )
}
