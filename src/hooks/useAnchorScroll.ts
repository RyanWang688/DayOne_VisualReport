import { useEffect } from 'react'
import { animate } from 'motion/react'

const HEADER = 80 // matches html { scroll-padding-top }

function targetY(el: HTMLElement) {
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0
  const max = document.documentElement.scrollHeight - window.innerHeight
  return Math.min(max, Math.max(0, el.getBoundingClientRect().top + window.scrollY - HEADER - margin))
}

/**
 * Drives in-page anchor jumps. The browser's native smooth scroll is cancelled by layout changes along the way
 * (the hero's intro expands as it is passed), which left a click stopped inside the hero and needing a second click.
 */
export function useAnchorScroll() {
  useEffect(() => {
    let stop: (() => void) | null = null

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null
      const hash = a?.getAttribute('href')
      if (!hash || hash === '#' || hash === '#main') return
      const el = document.getElementById(hash.slice(1))
      if (!el) return
      e.preventDefault()
      stop?.()
      history.pushState(null, '', hash)

      const jump = (y: number) => window.scrollTo({ top: y, behavior: 'instant' })
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        jump(targetY(el))
        return
      }
      const from = window.scrollY
      const distance = Math.abs(targetY(el) - from)
      const controls = animate(0, 1, {
        duration: Math.min(1.1, 0.45 + distance / 12000),
        ease: [0.45, 0, 0.15, 1],
        // Re-measure every frame so anything that changes height on the way cannot throw the landing off.
        onUpdate: (t) => jump(from + (targetY(el) - from) * t),
      })
      const cancel = () => {
        controls.stop()
        removeEventListener('wheel', cancel)
        removeEventListener('touchstart', cancel)
        stop = null
      }
      stop = cancel
      addEventListener('wheel', cancel, { passive: true })
      addEventListener('touchstart', cancel, { passive: true })
      controls.then(() => {
        removeEventListener('wheel', cancel)
        removeEventListener('touchstart', cancel)
        stop = null
        if (e.detail === 0) {
          // keyboard activation: move focus too, as a native anchor would
          el.setAttribute('tabindex', '-1')
          el.style.outline = 'none'
          el.focus({ preventScroll: true })
        }
      })
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}
