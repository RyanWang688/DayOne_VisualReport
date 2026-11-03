import { references } from '../content/references'
import { Reveal } from '../components/ui'

export function References() {
  return (
    <section id="references" aria-labelledby="references-title" className="py-24 md:py-28">
      <div className="container-x grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-3">
          <p className="eyebrow">Sources</p>
          <h2 id="references-title" className="mt-3 text-3xl font-semibold">
            References
          </h2>
          <p className="mt-3 text-[14px] text-muted">APA 7th edition. {references.length} sources.</p>
        </Reveal>
        <ol className="md:col-span-9">
          {references.map((r) => (
            <li key={r.key} id={`ref-${r.key}`} className="scroll-mt-24 border-t border-line py-4 text-[15px] leading-relaxed text-ink-2 target:bg-sun-soft">
              <span className="pl-8 -indent-8 block">
                {r.apa}{' '}
                <a href={r.doi} target="_blank" rel="noreferrer" className="break-all text-blue underline underline-offset-2">
                  {r.doi}
                </a>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
