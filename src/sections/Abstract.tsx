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
            <p className="max-w-[62ch] text-[clamp(1.1rem,1.6vw,1.3rem)] leading-[1.7] text-ink first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-display first-letter:text-[3.2em] first-letter:font-extrabold first-letter:leading-[0.8] first-letter:text-blue">
              {abstract.text}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
