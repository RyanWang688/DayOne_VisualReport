import { study } from '../content/study'
import { totalNotes, clusters } from '../content/affinity'
import { Reveal, SectionHeader } from '../components/ui'
import { AffinityBoard } from '../components/AffinityBoard'
import { ShieldCheck } from 'lucide-react'

export function StudyDesign() {
  return (
    <section id="study-design" className="border-t border-line py-24 md:py-32">
      <div className="container-x">
        <SectionHeader num="03" label="Study Design" title="Eight conversations, coded note by note." intro={study.approach} />

        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <dl className="grid grid-cols-2 border-t-2 border-ink">
              {study.facts.map((f, i) => (
                <div key={f.label} className={`border-b border-line py-5 ${i % 2 ? 'pl-5' : 'border-r pr-5'}`}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <span className="block font-display text-4xl font-bold">{f.value}</span>
                    <span className="mt-1 block text-[14px] text-muted">{f.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <p className="eyebrow">Participants by country of origin</p>
              <div className="mt-4 flex h-10 w-full overflow-hidden" role="img" aria-label="6 from China, 1 from Malaysia, 1 from Indonesia">
                {study.origins.map((o, i) => (
                  <div key={o.country} style={{ flex: o.count }} className={`flex items-center px-3 text-[13px] font-medium ${i === 0 ? 'bg-blue text-white' : i === 1 ? 'bg-blue-soft text-blue-ink' : 'bg-sun-soft text-ink'} ${i ? 'border-l-2 border-canvas' : ''}`}>
                    {o.count}
                  </div>
                ))}
              </div>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[14px] text-muted">
                {study.origins.map((o, i) => (
                  <li key={o.country} className="flex items-center gap-2">
                    <span aria-hidden className={`h-2.5 w-2.5 ${i === 0 ? 'bg-blue' : i === 1 ? 'bg-blue-soft ring-1 ring-blue/30' : 'bg-sun-soft ring-1 ring-sun'}`} />
                    {o.country} · {o.count}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex gap-3 border border-line bg-paper p-5 text-[14px] text-muted">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-blue" aria-hidden />
              <p>{study.ethics}</p>
            </div>
          </Reveal>

          <ol className="md:col-span-6 md:col-start-7">
            {study.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.05} className="grid grid-cols-[48px_1fr] border-t border-line py-6 last:border-b">
                <span className="font-mono text-[12px] text-blue">0{i + 1}</span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-1 text-[15px] text-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="mt-24">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow text-blue">Interactive affinity map</p>
                <h3 className="mt-2 max-w-[22ch] text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold">
                  {totalNotes} coded observations in {clusters.length} clusters.
                </h3>
              </div>
              <p className="max-w-[44ch] text-[15px] text-muted">
                Every sticky note is a real code from our coding table. Watch the raw codes settle into clusters, trace a participant across the board, and open any cluster to read its notes.
              </p>
            </div>
          </Reveal>
          <AffinityBoard />
        </div>
      </div>
    </section>
  )
}
