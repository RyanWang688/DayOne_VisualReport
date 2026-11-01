import { conclusions } from '../content/conclusions'
import { Reveal } from '../components/ui'

export function Conclusions() {
  const cols = [
    { title: 'Research limitations', items: conclusions.limitations },
    { title: 'Design implications', items: conclusions.implications },
    { title: 'Future opportunities', items: conclusions.future },
  ]
  return (
    <section id="conclusions" aria-labelledby="conclusions-title" className="bg-ink py-24 text-white md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.14em] text-white/60">
            <span className="text-sun">08</span>
            <span className="h-px w-8 bg-white/30" />
            <span>Conclusions & key findings</span>
          </div>
        </Reveal>
        <Reveal>
          <h2 id="conclusions-title" className="mt-10 max-w-[20ch] text-[clamp(2.2rem,5.4vw,4.8rem)] font-extrabold leading-[1]">
            {conclusions.lead}
          </h2>
        </Reveal>

        <ol className="mt-20 grid gap-px bg-white/10 md:grid-cols-3">
          {conclusions.insights.map((x, i) => (
            <Reveal as="li" key={x.title} delay={i * 0.06} className="bg-ink p-6 md:p-8">
              <span className="font-mono text-[12px] text-sun">0{i + 1}</span>
              <h3 className="mt-4 text-2xl font-bold">{x.title}</h3>
              <p className="mt-3 text-white/70">{x.text}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <div className="mt-20 grid gap-6 border-y border-white/15 py-10 md:grid-cols-12">
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-sun md:col-span-3">The importance of practical experience</p>
            <p className="font-serif text-[clamp(1.3rem,2.4vw,1.9rem)] italic leading-snug md:col-span-9">{conclusions.practicalExperience}</p>
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
