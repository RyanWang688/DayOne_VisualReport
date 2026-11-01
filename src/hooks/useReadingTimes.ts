import { useEffect, useState } from 'react'
import { sections } from '../content/sections'

const WORDS_PER_MINUTE = 200

/** Words a reader would actually read: skips aria-hidden subtrees (decorative notes, duplicated labels). */
function countWords(root: HTMLElement) {
  let words = 0
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.parentElement?.closest('[aria-hidden="true"]') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  })
  while (walker.nextNode()) words += (walker.currentNode.textContent ?? '').split(/\s+/).filter(Boolean).length
  return words
}

/** Estimated reading minutes per section, measured from the rendered page once it has loaded. */
export function useReadingTimes() {
  const [times, setTimes] = useState<Partial<Record<string, number>>>({})
  useEffect(() => {
    const measure = () => {
      const next: Record<string, number> = {}
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el) next[s.id] = Math.max(1, Math.round(countWords(el) / WORDS_PER_MINUTE))
      }
      setTimes(next)
    }
    const t = window.setTimeout(measure, 300)
    return () => window.clearTimeout(t)
  }, [])
  return times
}
