import { abstract } from '../content/abstract'
import { Reveal } from '../components/ui'

export function Abstract() {
  return (
    <section id="abstract" aria-labelledby="abstract-title" className="border-t border-line bg-canvas py-20 md:py-28">
      <div className="container-x grid gap-6 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-3">
          <h2 id="abstract-title" className="eyebrow text-blue">
            Abstract
          </h2>
        </Reveal>
        <div className="md:col-span-8">
          <Reveal>
            <div className="max-w-[66ch] space-y-5">
              {abstract.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className={i === 0 ? 'font-display text-[clamp(1.2rem,1.8vw,1.4rem)] font-medium leading-[1.55] text-ink' : 'text-[clamp(1.02rem,1.4vw,1.12rem)] leading-[1.75] text-ink-2'}
                >
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
