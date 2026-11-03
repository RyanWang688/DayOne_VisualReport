import { parts, sections, type PartKey } from '../content/sections'
import { Reveal } from './ui'

/** Editorial band that opens a part of the report: where the story is going and the questions it answers. */
export function PartDivider({ part }: { part: Extract<PartKey, 'research' | 'design'> }) {
  const p = parts.find((x) => x.key === part)!
  const items = sections.filter((s) => s.part === part)
  const [label, title] = p.label.split(' · ')
  return (
    <div id={`part-${part}`} className="border-t-2 border-ink bg-canvas">
      <div className="container-x grid gap-8 py-14 md:grid-cols-12 md:py-20">
        <Reveal className="md:col-span-5">
          <p className="eyebrow text-blue">
            {label} · {p.story}
          </p>
          <p className="mt-3 font-display text-[clamp(1.9rem,3.2vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.03em]">{title}</p>
          <p className="mt-4 max-w-[40ch] text-muted">{p.summary}</p>
        </Reveal>
        <Reveal delay={0.08} className="md:col-span-6 md:col-start-7">
          <p className="eyebrow mb-3">In this part</p>
          <ol className="border-t border-line">
            {items.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="group grid grid-cols-[40px_1fr] items-baseline gap-3 border-b border-line py-3">
                  <span className="font-mono text-[12px] text-blue">{s.num}</span>
                  <span>
                    <span className="font-display text-[17px] font-semibold tracking-tight transition-colors group-hover:text-blue">{s.label}</span>
                    <span className="mt-0.5 block font-serif text-[16px] italic leading-snug text-ink-2">{s.question}</span>
                    <span className="mt-0.5 block text-[14px] leading-snug text-muted">{s.takeaway}</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </div>
  )
}
