import { Lightbulb, MapPin, Quote as QuoteIcon } from 'lucide-react'
import { challenges, quoteNote, type Challenge } from '../content/challenges'
import { journeyMap } from '../content/appendix'
import { useActiveIndex } from '../hooks/useActiveSection'
import { Expandable, PBadge, Reveal, SectionHeader, SourceTag } from '../components/ui'

export function Challenges() {
  const active = useActiveIndex(challenges.length, 'challenge')
  return (
    <section id="challenges" className="border-t border-line bg-paper py-24 md:py-32">
      <div className="container-x">
        <SectionHeader
          id="challenges"
          title="Four themes from the interviews."
          intro="Thematic analysis of the ten clusters produced four themes. Each traces a different part of the gap between having information and acting on it."
        />

        <JourneyStrip />

        {/* Chapter index */}
        <nav aria-label="Themes" className="sticky top-[68px] z-30 -mx-4 mb-4 border-b border-line bg-paper/90 px-4 backdrop-blur sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
          <ol className="no-scrollbar flex gap-1 overflow-x-auto py-3">
            {challenges.map((c, i) => (
              <li key={c.num} className="shrink-0">
                <a
                  href={`#challenge-${i}`}
                  aria-current={active === i ? 'true' : undefined}
                  className={`flex items-center gap-2 rounded-[3px] px-3 py-1.5 text-[13px] transition-colors ${active === i ? 'bg-ink text-white' : 'text-muted hover:text-ink'}`}
                >
                  <span className="font-mono text-[12px] opacity-70">T{i + 1}</span>
                  {c.short}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {challenges.map((c, i) => (
          <Chapter key={c.num} c={c} index={i} active={active === i} />
        ))}
      </div>
    </section>
  )
}

function JourneyStrip() {
  return (
    <Reveal>
      <figure className="mb-20 overflow-hidden border border-line">
        <div className="grid grid-cols-1 sm:grid-cols-5">
          {journeyMap.map((j, i) => (
            <div key={j.stage} className={`relative p-4 ${i ? 'border-t border-line sm:border-l sm:border-t-0' : ''} ${i === 3 ? 'bg-sun-soft' : 'bg-canvas'}`}>
              <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-blue">
                {String(i + 1).padStart(2, '0')} {j.stage}
              </p>
              <p className="mt-3 font-serif text-[19px] italic leading-snug">“{j.voice}”</p>
              <p className="mt-3 text-[13px] text-muted">{j.pain}</p>
            </div>
          ))}
        </div>
        <figcaption className="border-t border-line bg-paper px-4 py-3 font-mono text-[12px] text-faint">
          Customer journey map from our A0 poster. Statements are journey-map voice summarising the stage, not participant quotes.
        </figcaption>
      </figure>
    </Reveal>
  )
}

function Chapter({ c, index, active }: { c: Challenge; index: number; active: boolean }) {
  return (
    <article id={`challenge-${index}`} data-index={index} className="scroll-mt-32 border-t border-line py-16 md:py-24" aria-labelledby={`ch-title-${index}`}>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-40">
            <Reveal>
              <p
                className={`font-display text-[clamp(2.25rem,3.6vw,3rem)] font-bold leading-[0.85] tracking-[-0.04em] transition-colors duration-500 ${active ? 'text-blue' : 'text-blue-soft'}`}
                aria-hidden
              >
                {c.num}
              </p>
              <p className="eyebrow mt-4 text-blue">Theme {index + 1}</p>
              <h3 id={`ch-title-${index}`} className="mt-2 text-[clamp(1.4rem,2.2vw,1.85rem)] font-semibold leading-[1.2]">
                {c.title}
              </h3>
              <p className="mt-5 text-muted">{c.explanation}</p>
            </Reveal>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-7">
          {/* Scenario */}
          <Reveal>
            <div className="relative overflow-hidden bg-ink p-6 text-white sm:p-8">
              <p className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-sun">
                <MapPin size={14} aria-hidden /> {c.scenario.label}
              </p>
              <p className="mt-4 font-display text-[clamp(1.15rem,1.8vw,1.35rem)] font-medium leading-snug">{c.scenario.text}</p>
              <p className="mt-4 font-mono text-[12px] text-white/50">Based on the experience of {c.scenario.participants.join(', ')}</p>
            </div>
          </Reveal>

          {/* Quotes */}
          {c.quotes.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {c.quotes.map((q, i) => (
                <Reveal key={q.text} delay={i * 0.05} className={c.quotes.length % 2 && i === c.quotes.length - 1 ? 'sm:col-span-2' : ''}>
                  <figure className="lift h-full border-l-2 border-blue bg-canvas p-5">
                    <QuoteIcon size={18} className="text-blue" aria-hidden />
                    <blockquote className="mt-2 font-serif text-[20px] italic leading-snug text-ink">“{q.text}”</blockquote>
                    <figcaption className="mt-3 flex flex-wrap items-center gap-2 text-[13px] text-muted">
                      <PBadge id={q.participant} />
                      {q.context}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
              <p className="font-mono text-[12px] text-faint sm:col-span-2">{quoteNote}</p>
            </div>
          )}

          {/* Evidence */}
          <Reveal>
            <div>
              <p className="eyebrow mb-1">Interview evidence</p>
              {c.subFindings.map((s, i) => (
                <Expandable
                  key={s.id}
                  defaultOpen={i === 0}
                  label={
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-mono text-[12px] text-blue">{s.id}</span>
                      <span>{s.title}</span>
                    </span>
                  }
                >
                  <p className="text-[15px] text-ink-2">{s.text}</p>
                  <p className="mt-3 flex flex-wrap items-center gap-1.5">
                    <span className="mr-1 font-mono text-[12px] text-faint">Participants</span>
                    {s.participants.map((p) => (
                      <PBadge key={p} id={p} />
                    ))}
                  </p>
                </Expandable>
              ))}
              <div className="border-t border-line pt-3">
                <SourceTag>Field report — Findings, Theme {index + 1}</SourceTag>
              </div>
            </div>
          </Reveal>

          {/* Implication */}
          <Reveal>
            <div className="flex gap-4 border border-blue/30 bg-blue-soft p-5 sm:p-6">
              <Lightbulb size={20} className="mt-0.5 shrink-0 text-blue" aria-hidden />
              <div>
                <p className="eyebrow text-blue">Research implication</p>
                <p className="mt-2 font-display text-lg font-semibold leading-snug text-blue-ink">{c.implication}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  )
}
