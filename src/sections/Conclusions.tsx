import { conclusions } from '../content/conclusions'
import { ChapterLabel, Reveal } from '../components/ui'
import { sectionById } from '../content/sections'

export function Conclusions() {
  const cols = [
    { title: 'Research limitations', items: conclusions.limitations },
    { title: 'Design implications', items: conclusions.implications },
    { title: 'Future opportunities', items: conclusions.future },
  ]
  return (
    <section id="conclusions" aria-labelledby="conclusions-title" className="bg-ink py-24 text-white md:py-32">
      <div className="container-x">
        <div className="grid gap-5 md:grid-cols-12">
          <Reveal className="md:col-span-3 md:pt-1">
            <ChapterLabel id="conclusions" tone="dark" />
          </Reveal>
          <Reveal className="md:col-span-9">
            <p className="font-serif text-[1.25rem] italic leading-snug text-sun">{sectionById.conclusions.question}</p>
            <h2 id="conclusions-title" className="mt-2 max-w-[34ch] text-[clamp(1.5rem,2.5vw,2.1rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              {conclusions.lead}
            </h2>
          </Reveal>
        </div>

        <ol className="mt-20 grid gap-px bg-white/10 md:grid-cols-3">
          {conclusions.insights.map((x, i) => (
            <Reveal as="li" key={x.title} delay={i * 0.06} className="bg-ink p-6 md:p-8">
              <span className="font-mono text-[12px] text-sun">0{i + 1}</span>
              <h3 className="mt-4 text-xl font-semibold">{x.title}</h3>
              <p className="mt-3 text-white/70">{x.text}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <div className="mt-20 grid gap-6 border-y border-white/15 py-10 md:grid-cols-12">
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-sun md:col-span-3">The importance of practical experience</p>
            <p className="font-serif text-[clamp(1.2rem,2vw,1.55rem)] italic leading-snug md:col-span-9">{conclusions.practicalExperience}</p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {cols.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <h3 className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/60">{c.title}</h3>
              <ul className="mt-5 space-y-4">
                {c.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[15px] text-white/85">
                    <span aria-hidden className="mt-[11px] h-px w-3 shrink-0 bg-sun" />
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-20 max-w-[70ch] border-l-2 border-sun pl-5 text-white/70">
            <span className="font-semibold text-white">Contribution. </span>
            {conclusions.contribution}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
