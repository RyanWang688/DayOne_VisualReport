import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { VideoButton } from '../components/VideoButton'
import { meta } from '../content/meta'
import { isPlaceholder } from '../content/types'
import { parts, sections } from '../content/sections'
import { Ph, Reveal } from '../components/ui'
import { HeroShowcase } from '../components/HeroShowcase'
import { IntroLogo } from '../components/IntroLogo'

const titleWords = meta.title.split(' ')

export function Overview() {
  return (
    <section id="overview" aria-labelledby="overview-title" className="relative overflow-x-clip pt-[68px]">
      <Hero />
      <TitleBlock />
    </section>
  )
}

function Hero() {
  const ease = [0.22, 1, 0.36, 1] as const
  const lead = (
    <div>
      <motion.p className="eyebrow mb-5 flex flex-wrap gap-x-3 gap-y-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <span>{meta.university}</span>
        <span className="text-sun">•</span>
        <span>INFO90009</span>
        <span className="text-sun">•</span>
        <span>{meta.semester}</span>
      </motion.p>
      <h1 id="overview-title" className="sr-only">
        {meta.projectName} — {meta.title}
      </h1>
      <IntroLogo className="-ml-[3%] w-[clamp(220px,24vw,360px)] [@media(max-height:760px)]:lg:w-[260px]" />
      <p aria-hidden className="mt-4 max-w-[20ch] font-display text-[clamp(1.35rem,2vw,1.8rem)] font-semibold leading-[1.12] tracking-[-0.02em]">
        {titleWords.map((w, i) => (
          <motion.span key={i} className="mr-[0.25em] inline-block" initial={{ opacity: 0, y: '0.5em' }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 + i * 0.05, ease }}>
            {w}
          </motion.span>
        ))}
      </p>
    </div>
  )
  const more = (
    <div className="pt-5 [@media(max-height:760px)]:lg:pt-3">
      <p className="max-w-[40ch] text-[17px] text-muted [@media(max-height:760px)]:lg:text-[15px]">
        Helping international students move from knowing what to do to <span className="mark-sun text-ink">confidently doing it.</span>
      </p>
      <a
        href="#hmw"
        className="group mt-5 flex max-w-xl items-start gap-4 border-l-2 border-blue bg-paper/90 py-3 pl-5 pr-4 shadow-[0_1px_0_var(--color-line)] transition-colors hover:bg-blue-soft [@media(max-height:760px)]:lg:mt-3"
      >
        <div>
          <span className="eyebrow text-blue">Research question</span>
          <span className="mt-1 block font-display text-[16px] font-semibold leading-snug [@media(max-height:760px)]:lg:text-[14px]">{meta.researchQuestion}</span>
        </div>
        <ArrowUpRight className="mt-1 shrink-0 text-blue transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={20} aria-hidden />
      </a>
      {!isPlaceholder(meta.videoUrl) && (
        <div className="mt-5 [@media(max-height:760px)]:lg:mt-3">
          <VideoButton url={meta.videoUrl} />
        </div>
      )}
    </div>
  )
  return <HeroShowcase lead={lead} more={more} />
}
function TitleBlock() {
  const rows: [string, React.ReactNode][] = [
    ['Report', meta.reportTitle],
    ['University', meta.university],
    ['Faculty', meta.faculty],
    ['Discipline', <Ph value={meta.discipline} />],
    ['Subject', `${meta.subject} · ${meta.semester}`],
    ['Supervisor', <Ph value={meta.supervisor} />],
    [
      'Students',
      <span className="flex flex-col">
        {meta.authors.map((a) => (
          <span key={a.name}>
            {a.name}
            {meta.showStudentIds && <span className="ml-2 font-mono text-[13px] text-faint">{a.studentId}</span>}
          </span>
        ))}
      </span>,
    ],
    ['Date', <Ph value={meta.date} />],
    [
      'Video',
      isPlaceholder(meta.videoUrl) ? (
        <Ph value={meta.videoUrl} />
      ) : (
        // Plain link here; the play button lives in the hero.
        <a href={meta.videoUrl} target="_blank" rel="noreferrer" className="break-all text-blue underline decoration-blue/30 underline-offset-4 hover:decoration-blue">
          {meta.videoUrl.replace(/^https?:\/\/(www\.)?/, '')}
        </a>
      ),
    ],
  ]
  return (
    <div id="title-block" className="container-x scroll-mt-20 pb-20">
      <Reveal>
        <div className="border-t-2 border-ink pt-4">
          <p className="eyebrow">Title block</p>
          {/* 3 × 3 grid of details; hairlines between cells come from the 1px gap over a line-coloured background */}
          <dl className="mt-4 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {rows.map(([k, v], i) => (
              <motion.div
                key={k}
                className={`bg-canvas px-5 py-4 transition-colors hover:bg-paper ${k === 'Report' ? 'sm:col-span-2' : ''} ${k === 'Video' ? 'lg:col-span-3' : ''}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                <dt className="font-mono text-[12px] uppercase tracking-[0.12em] text-faint">{k}</dt>
                <dd className={`mt-1.5 text-ink-2 ${k === 'Report' ? 'font-display text-[17px] font-semibold text-ink' : 'text-[15px]'}`}>{v}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </Reveal>
    </div>
  )
}

/** Project context plus a map of how the report is organised (sits after the abstract). */
export function ReportMap() {
  const mainParts = parts.filter((p) => p.key === 'research' || p.key === 'design')
  return (
    <section id="contents" aria-labelledby="map-title" className="border-t border-line bg-paper">
      <Context />
      <div className="container-x pb-20 md:pb-28">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-t-2 border-ink pt-5">
            <h2 id="map-title" className="text-2xl font-semibold">
              How this report reads
            </h2>
            <p className="font-mono text-[12px] text-muted">Each chapter answers one question</p>
          </div>
        </Reveal>
        <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">
          {mainParts.map((p, k) => (
            <Reveal key={p.key} delay={k * 0.06}>
              <p className="eyebrow text-blue">
                {p.label} · {p.story}
              </p>
              <p className="mt-1 text-[15px] text-muted">{p.summary}</p>
              <ol className="mt-4 border-t border-line">
                {sections
                  .filter((s) => s.part === p.key)
                  .map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="group grid grid-cols-[36px_1fr] items-baseline gap-3 border-b border-line py-2.5">
                        <span className="font-mono text-[12px] text-blue">{s.num}</span>
                        <span>
                          <span className="font-display font-semibold tracking-tight transition-colors group-hover:text-blue">{s.label}</span>
                          <span className="block font-serif text-[16px] italic leading-snug text-muted">{s.question}</span>
                        </span>
                      </a>
                    </li>
                  ))}
              </ol>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-[14px] text-muted">
          Start with <a href="#project-overview" className="link-grow text-ink">Project Overview</a> for the whole journey at a glance. Also:{' '}
          <a href="#abstract" className="link-grow text-ink">Abstract</a> · <a href="#references" className="link-grow text-ink">References</a> ·{' '}
          <a href="#appendix" className="link-grow text-ink">Appendix</a>
        </p>
      </div>
    </section>
  )
}

function Context() {
  const steps = [
    { k: 'The problem', v: 'Students often arrive with plenty of information, but still struggle to turn it into action in unfamiliar, real-world situations.' },
    { k: 'The research', v: 'Semi-structured interviews with eight international students, analysed through coding, affinity mapping and thematic analysis.' },
    { k: 'The response', v: 'Day One — a mobile prototype to explore, practise and act in context: guides, simulations, short trips and on-site tools.' },
  ]
  const facts = [
    ['8', 'interviews'],
    ['10', 'affinity clusters'],
    ['4', 'research themes'],
    ['6', 'feature concepts'],
  ]
  return (
    <div className="py-20 md:py-28">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <p className="eyebrow">Project context</p>
          <p className="mt-4 font-display text-[clamp(1.4rem,2.3vw,1.9rem)] font-semibold leading-[1.2]">{meta.introLead}</p>
          <p className="mt-6 text-muted">{meta.intro}</p>
        </Reveal>
        <div className="md:col-span-6 md:col-start-7">
          <ol className="flex flex-col">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.k} delay={i * 0.06} className="grid grid-cols-[48px_1fr] border-t border-line py-6">
                <span className="font-mono text-[12px] text-blue">0{i + 1}</span>
                <div>
                  <p className="font-display text-lg font-semibold">{s.k}</p>
                  <p className="mt-1 text-muted">{s.v}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 border-t-2 border-ink sm:grid-cols-4">
              {facts.map(([n, l]) => (
                <div key={l} className="py-5">
                  <dt className="sr-only">{l}</dt>
                  <dd>
                    <span className="block font-display text-4xl font-bold leading-none text-blue">{n}</span>
                    <span className="mt-3 block max-w-[12ch] font-mono text-[12px] uppercase leading-snug tracking-[0.08em] text-muted">{l}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
