import { parts, sections, type PartKey } from '../content/sections'
import { useReadingTimes } from '../hooks/useReadingTimes'
import { Reveal } from './ui'

/** Editorial band that opens a part of the report and lists what it contains. */
export function PartDivider({ part }: { part: Extract<PartKey, 'research' | 'design'> }) {
  const p = parts.find((x) => x.key === part)!
  const items = sections.filter((s) => s.part === part)
  const times = useReadingTimes()
  const total = items.reduce((n, s) => n + (times[s.id] ?? 0), 0)
  const [label, title] = p.label.split(' · ')
  return (
    <div id={`part-${part}`} className="border-t-2 border-ink bg-canvas">
      <div className="container-x grid gap-8 py-14 md:grid-cols-12 md:py-20">
        <Reveal className="md:col-span-5">
          <p className="eyebrow text-blue">
            {label}
            {total > 0 && <span className="text-muted"> · about {total} min</span>}
          </p>
          <p className="mt-3 font-display text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">{title}</p>
          <p className="mt-4 max-w-[40ch] text-muted">{p.summary}</p>
        </Reveal>
        <Reveal delay={0.08} className="md:col-span-6 md:col-start-7">
          <ol className="border-t border-line">
            {items.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="group grid grid-cols-[40px_1fr_auto] items-baseline gap-3 border-b border-line py-3">
                  <span className="font-mono text-[12px] text-blue">{s.num}</span>
                  <span>
                    <span className="font-display text-lg font-semibold tracking-tight transition-colors group-hover:text-blue">{s.label}</span>
                    <span className="mt-0.5 block text-[14px] leading-snug text-muted">{s.takeaway}</span>
                  </span>
                  <span className="font-mono text-[12px] text-faint">{times[s.id] ? `${times[s.id]} min` : ''}</span>
                </a>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </div>
  )
}
