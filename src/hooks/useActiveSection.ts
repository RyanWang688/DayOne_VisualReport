import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently crossing a reading line
 * placed ~35% down the viewport.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-35% 0px -64% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}

/** Same idea for arbitrary items inside a section (timeline stages, chapters). */
export function useActiveIndex(count: number, prefix: string) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const els = Array.from({ length: count }, (_, i) => document.getElementById(`${prefix}-${i}`)).filter(
      (el): el is HTMLElement => !!el,
    )
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
      },
      { rootMargin: '-45% 0px -54% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [count, prefix])
  return active
}
