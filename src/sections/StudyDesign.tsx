import { study } from '../content/study'
import { totalNotes, clusters } from '../content/affinity'
import { sectionById } from '../content/sections'
import { Reveal, SectionHeader, asset } from '../components/ui'
import { AffinityBoard } from '../components/AffinityBoard'
import { ShieldCheck } from 'lucide-react'

export function StudyDesign() {
  return (
    <section id="study-design" className="border-t border-line py-24 md:py-32">
      <div className="container-x">
        <SectionHeader num={sectionById['study-design'].num} label="Study Design" title="Eight conversations, coded note by note." intro={study.approach} />

        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="eyebrow mb-4 text-blue">2.1 · Participants and method</p>
            <dl className="grid grid-cols-3 border-y-2 border-ink">
              {study.facts.map((f, i) => (
                <div key={f.label} className={`py-5 ${i ? 'border-l border-line pl-4 sm:pl-5' : 'pr-4'}`}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <span className="block font-display text-[clamp(1.8rem,3.4vw,2.4rem)] font-bold leading-none">{f.value}</span>
                    <span className="mt-2 block text-[13px] text-muted">{f.label}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              <p className="eyebrow">Study level</p>
              <div className="mt-3 flex h-11 w-full gap-[3px]" role="img" aria-label={study.levels.map((l) => `${l.count} ${l.label}`).join(', ')}>
                {study.levels.map((l, i) => (
                  <div
                    key={l.label}
                    style={{ flex: l.count }}
                    className={`flex items-center justify-between px-3 font-display text-lg font-bold ${['bg-blue-soft text-blue-ink', 'bg-blue/70 text-white', 'bg-blue text-white'][i]}`}
                  >
                    {l.count}
                  </div>
                ))}
              </div>
              <ul className="mt-2 flex gap-[3px] text-[13px] leading-tight text-muted" aria-hidden>
                {study.levels.map((l) => (
                  <li key={l.label} style={{ flex: l.count }} className="min-w-0 px-1">
                    {l.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <p className="eyebrow">Countries of origin</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {study.origins.map((o) => (
                  <li key={o.country} className="flex items-center gap-2 border border-line bg-paper py-1.5 pl-1.5 pr-3 text-[14px] text-ink-2">
                    <img src={asset(o.flag)} alt="" className="h-[18px] w-6 object-cover shadow-[0_0_0_1px_rgba(14,20,34,0.08)]" />
                    {o.country}
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
                <p className="eyebrow text-blue">2.2 · Interactive affinity map</p>
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
