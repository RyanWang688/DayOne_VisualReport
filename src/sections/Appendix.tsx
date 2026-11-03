import { interviewGuide } from '../content/appendix'
import { Expandable, Reveal, asset } from '../components/ui'

export function Appendix() {
  let q = 0
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
          <Expandable label="A2 · Day One A0 poster">
            <a href={asset('assets/poster/dayone-poster-a0.jpg')} target="_blank" rel="noreferrer" className="block border border-line">
              <img src={asset('assets/poster/dayone-poster-a0.jpg')} alt="Day One A0 landscape poster: problem, solution, research and design process, student journey and expected design value" loading="lazy" className="w-full" />
            </a>
            <p className="mt-2 font-mono text-[12px] text-faint">Open full size in a new tab.</p>
          </Expandable>
        </div>
      </div>
    </section>
  )
}
