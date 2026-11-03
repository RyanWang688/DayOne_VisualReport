import { evaluationGuide, interviewGuide } from '../content/appendix'
import { Expandable, Reveal, asset } from '../components/ui'

const evalCount = evaluationGuide.parts.reduce((n, p) => n + p.tasks.reduce((m, t) => m + t.questions.length, 0), 0)

export function Appendix() {
  let q = 0
  let e = 0
  return (
    <section id="appendix" aria-labelledby="appendix-title" className="border-t border-line bg-paper py-24 md:py-28">
      <div className="container-x grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-3">
          <p className="eyebrow">Sources</p>
          <h2 id="appendix-title" className="mt-3 text-3xl font-semibold">
            Appendices
          </h2>
        </Reveal>
        <div className="md:col-span-9">
          <Expandable label="A1 · Interview questions (11 core questions)">
            <p className="mb-4 text-[14px] text-muted">{interviewGuide.duration}</p>
            <div className="space-y-5">
              {interviewGuide.parts.map((p, i) => (
                <div key={p.part}>
                  <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-blue">
                    {i + 1}. {p.part}
                  </p>
                  <ol className="mt-2 space-y-2">
                    {p.questions.map((text) => {
                      q += 1
                      return (
                        <li key={text} className="grid grid-cols-[40px_1fr] text-[15px] text-ink-2">
                          <span className="font-mono text-[12px] text-faint">Q{q}</span>
                          {text}
                        </li>
                      )
                    })}
                  </ol>
                </div>
              ))}
            </div>
          </Expandable>
          <Expandable label={`A2 · Evaluation questions (${evalCount} questions)`}>
            <p className="mb-4 text-[14px] text-muted">{evaluationGuide.duration}</p>
            <div className="mb-6 space-y-2 border-l-2 border-blue/30 pl-4 text-[14px] text-muted">
              {evaluationGuide.intro.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            <div className="space-y-7">
              {evaluationGuide.parts.map((p, i) => (
                <div key={p.part}>
                  <p className="flex flex-wrap items-baseline gap-x-3 font-mono text-[12px] uppercase tracking-[0.12em] text-blue">
                    <span>
                      Part {i + 1} · {p.part}
                    </span>
                    <span className="text-faint normal-case tracking-normal">{p.time}</span>
                  </p>
                  {p.scenario && <p className="mt-2 rounded-[6px] bg-blue-soft/60 px-3 py-2 text-[14px] text-ink-2"><span className="font-semibold">Scenario · </span>{p.scenario}</p>}
                  <div className="mt-3 space-y-4">
                    {p.tasks.map((t) => (
                      <div key={t.title || p.part}>
                        {t.title && <p className="text-[15px] font-semibold text-ink">{t.title}</p>}
                        {t.scenario && <p className="mt-1 rounded-[6px] bg-blue-soft/60 px-3 py-2 text-[14px] text-ink-2"><span className="font-semibold">Scenario · </span>{t.scenario}</p>}
                        {t.prompt && <p className="mt-1 text-[14px] italic text-muted">{t.prompt}</p>}
                        <ol className="mt-2 space-y-2">
                          {t.questions.map((text) => {
                            e += 1
                            return (
                              <li key={text} className="grid grid-cols-[40px_1fr] text-[15px] text-ink-2">
                                <span className="font-mono text-[12px] text-faint">E{e}</span>
                                {text}
                              </li>
                            )
                          })}
                        </ol>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[14px] text-muted">{evaluationGuide.thanks}</p>
          </Expandable>
          <Expandable label="A3 · Day One A0 poster">
            <a href={asset('assets/poster/dayone-poster-a0.jpg')} target="_blank" rel="noreferrer" className="block border border-line">
              <img src={asset('assets/poster/dayone-poster-a0.jpg')} alt="Day One A0 poster: project details, research overview (problem, data collection, method, key findings), student journey map, user experience flow and six core app features" loading="lazy" className="w-full" />
            </a>
            <p className="mt-2 font-mono text-[12px] text-faint">Open full size in a new tab.</p>
          </Expandable>
        </div>
      </div>
    </section>
  )
}
