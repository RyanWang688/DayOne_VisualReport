import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { outcomeMap, outcomeSummary } from '../content/outcome'
import { Reveal, SectionHeader, SubHeader } from '../components/ui'

export function Outcome() {
  const [hover, setHover] = useState<number | null>(null)
  return (
    <section id="outcome" className="border-t border-line py-24 md:py-32">
      <div className="container-x">
        <SectionHeader id="outcome" intro={outcomeSummary} />

        {/* Finding → Opportunity → Feature */}
        <SubHeader num="5.1" label="Findings to features" title="Each finding, answered by a feature." />
        <Reveal>
          <div className="hidden grid-cols-[1fr_32px_1fr_32px_1.2fr] gap-0 border-b-2 border-ink pb-3 font-mono text-[12px] uppercase tracking-[0.12em] text-faint md:grid">
            <span>Research finding</span>
            <span />
            <span>Design opportunity</span>
            <span />
            <span>Proposed feature</span>
          </div>
        </Reveal>
        <ol>
          {outcomeMap.map((row, i) => (
            <Reveal as="li" key={row.findingNum} delay={i * 0.05}>
              <div
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className={`grid gap-3 border-b border-line py-6 transition-opacity duration-300 md:grid-cols-[1fr_32px_1fr_32px_1.2fr] md:items-start md:gap-0 ${hover !== null && hover !== i ? 'md:opacity-40' : ''}`}
              >
                <div className="md:pr-4">
                  <p className="font-mono text-[12px] text-blue md:hidden">Finding</p>
                  <p className="flex gap-3 font-display text-lg font-semibold leading-snug">
                    <span className="font-mono text-[12px] font-normal text-blue">T{i + 1}</span>
                    {row.finding}
                  </p>
                </div>
                <ArrowRight aria-hidden size={18} className={`mt-1 hidden transition-colors md:block ${hover === i ? 'text-blue' : 'text-line'}`} />
                <div className="md:pr-4">
                  <p className="font-mono text-[12px] text-blue md:hidden">Opportunity</p>
                  <p className="text-ink-2">{row.opportunity}</p>
                </div>
                <ArrowRight aria-hidden size={18} className={`mt-1 hidden transition-colors md:block ${hover === i ? 'text-blue' : 'text-line'}`} />
                <ul className="flex flex-col gap-2">
                  <li className="font-mono text-[12px] text-blue md:hidden">Feature</li>
                  {row.features.map((f) => (
                    <li key={f.name} className={`border p-3 transition-colors ${hover === i ? 'border-blue bg-blue-soft' : 'border-line bg-paper'}`}>
                      <p className="font-semibold">{f.name}</p>
                      <p className="text-[14px] text-muted">{f.how}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
