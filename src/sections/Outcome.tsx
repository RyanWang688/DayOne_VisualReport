import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { evaluation, outcomeMap, outcomeSummary, prototypeScreens } from '../content/outcome'
import { Expandable, PhoneFrame, Reveal, SectionHeader, SourceTag } from '../components/ui'
import { sectionById } from '../content/sections'

export function Outcome() {
  const [hover, setHover] = useState<number | null>(null)
  return (
    <section id="outcome" className="border-t border-line py-24 md:py-32">
      <div className="container-x">
        <SectionHeader num={sectionById.outcome.num} label="Outcome" title="From findings to features." intro={outcomeSummary} />

        {/* Finding → Opportunity → Feature */}
        <Reveal>
          <p className="eyebrow mb-4 text-blue">6.1 · Findings to features</p>
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
        <div className="mt-4">
          <SourceTag>Findings — field report · Features — A0 poster · Opportunities — team design interpretation</SourceTag>
        </div>

        {/* Prototype screens */}
        <div className="mt-24">
          <Reveal>
            <p className="eyebrow text-blue">6.2 · The prototype</p>
            <h3 className="mt-2 text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold">Day One, as built.</h3>
          </Reveal>
          <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12" tabIndex={0} aria-label="Prototype screens, scroll horizontally">
            {prototypeScreens.map((s, i) => (
              <Reveal key={s.src} delay={i * 0.05} className="w-[220px] shrink-0 snap-start sm:w-[250px]">
                <figure className="group">
                  <PhoneFrame src={s.src} alt={`Day One prototype: ${s.title}`} className="aspect-[1/2]" />
                  <figcaption className="mt-4">
                    <p className="font-semibold">{s.title}</p>
                    <p className="text-[14px] text-muted">{s.caption}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <SourceTag>Screens captured from the current prototype build, 2 Nov 2026. Photos inside the app are credited in the prototype’s PHOTO-CREDITS.</SourceTag>
        </div>

        {/* Evaluation */}
        <div className="mt-24 border-t-2 border-ink pt-10">
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <p className="eyebrow text-blue">6.3 · {evaluation.label}</p>
              <h3 className="mt-2 text-3xl font-bold">What testing told us.</h3>
              <p className="mt-4 text-[15px] text-muted">{evaluation.method}</p>
              <ul className="mt-6 space-y-3 text-[14px]">
                {evaluation.questions.map((q) => (
                  <li key={q.id} className="grid grid-cols-[44px_1fr]">
                    <span className="font-mono text-[12px] text-blue">{q.id}</span>
                    <span>
                      <span className="font-semibold">{q.feature}.</span> <span className="text-muted">{q.q}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className="md:col-span-8">
              <ul className="grid gap-px border border-line bg-line sm:grid-cols-2">
                {evaluation.findings.map((f, i) => (
                  <Reveal as="li" key={f.title} delay={i * 0.05} className="lift relative bg-paper p-5 hover:z-10">
                    <p className="font-display text-4xl font-bold text-blue">{f.fraction}</p>
                    <p className="mt-2 font-semibold leading-snug">{f.title}</p>
                    <p className="mt-1 text-[14px] text-muted">{f.text}</p>
                  </Reveal>
                ))}
              </ul>
              <p className="mt-3 font-mono text-[12px] text-faint">{evaluation.fractionNote}</p>

              <div className="mt-8">
                <Expandable label="Usability problems (U1–U4) and recommendations (R1–R3)">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <ul className="space-y-3 text-[14px]">
                      {evaluation.problems.map((p) => (
                        <li key={p.id} className="grid grid-cols-[36px_1fr]">
                          <span className="font-mono text-[12px] text-blue">{p.id}</span>
                          <span>
                            {p.text}{' '}
                            <span className="text-faint">
                              ({p.who} · severity {p.severity})
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-3 text-[14px]">
                      {evaluation.recommendations.map((r) => (
                        <li key={r.id} className="grid grid-cols-[36px_1fr]">
                          <span className="font-mono text-[12px] text-blue">{r.id}</span>
                          <span>
                            {r.text} <span className="text-faint">(from {r.from} · {r.priority} priority)</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="mt-4 text-[13px] text-faint">Severity uses Nielsen’s 0–4 scale (high = 3, medium = 2).</p>
                </Expandable>
                <Expandable label="Evaluation limitations and next round">
                  <div className="grid gap-6 text-[14px] text-muted sm:grid-cols-2">
                    <ul className="list-disc space-y-1 pl-5">
                      {evaluation.limitations.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                    <ul className="list-disc space-y-1 pl-5">
                      {evaluation.nextRound.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  </div>
                </Expandable>
                <div className="border-t border-line pt-3">
                  <SourceTag>Usability evaluation deck (Oct 2026)</SourceTag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
