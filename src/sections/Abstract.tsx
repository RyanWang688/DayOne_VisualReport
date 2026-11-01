import { abstract } from '../content/abstract'
import { Expandable, Reveal } from '../components/ui'
import { CircleDashed } from 'lucide-react'

const wordCount = (s: string) => s.trim().split(/\s+/).length

export function Abstract() {
  return (
    <section id="abstract" aria-labelledby="abstract-title" className="border-b border-line bg-paper py-24 md:py-32">
      <div className="container-x grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-3">
          <div className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
            <span className="text-blue">06</span>
            <span className="h-px w-8 bg-line" />
            <span>Abstract</span>
          </div>
          <dl className="mt-8 space-y-4 text-[14px]">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">Length</dt>
              <dd>{wordCount(abstract.text)} words</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">Keywords</dt>
              <dd className="text-muted">{abstract.keywords.join(' · ')}</dd>
            </div>
          </dl>
        </Reveal>
        <div className="md:col-span-8">
          <Reveal>
            <h2 id="abstract-title" className="sr-only">
              Abstract
            </h2>
            {abstract.status === 'draft' && (
              <p className="mb-6 inline-flex items-center gap-2 rounded-[3px] border border-dashed border-sun bg-sun-soft px-2.5 py-1 font-mono text-[12px] text-ink-2">
                <CircleDashed size={12} aria-hidden /> Draft — condensed from the field report abstract, awaiting team approval
              </p>
            )}
            <p className="font-serif text-[clamp(1.25rem,2.1vw,1.6rem)] leading-[1.55] text-ink first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-[3.4em] first-letter:font-extrabold first-letter:leading-[0.85] first-letter:text-blue">
              {abstract.text}
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-10 max-w-[70ch]">
              <Expandable label={`Original field report abstract (${wordCount(abstract.original)} words)`}>
                <p className="text-[15px] text-muted">{abstract.original}</p>
              </Expandable>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
