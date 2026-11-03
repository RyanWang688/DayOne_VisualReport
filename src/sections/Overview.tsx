import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { VideoButton } from '../components/VideoButton'
import { meta } from '../content/meta'
import { isPlaceholder } from '../content/types'
import { parts, sections } from '../content/sections'
import { PhoneFrame, Ph, Reveal } from '../components/ui'

const titleWords = meta.title.split(' ')

export function Overview() {
  return (
    <section id="overview" aria-labelledby="overview-title" className="relative overflow-hidden pt-14">
      <Hero />
      <TitleBlock />
    </section>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 80, damping: 20 })
  const sy = useSpring(my, { stiffness: 80, damping: 20 })
  const back = { x: useTransform(sx, (v) => v * -10), y: useTransform(sy, (v) => v * -8) }
  const front = { x: useTransform(sx, (v) => v * 14), y: useTransform(sy, (v) => v * 10) }
  // Composition drifts up and fades slightly as the page scrolls past the hero.
  const { scrollY } = useScroll()
  const driftY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -70])
  const driftO = useTransform(scrollY, [0, 700], [1, reduce ? 1 : 0.4])

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <div className="container-x relative grid min-h-[calc(100svh-56px)] items-center gap-12 py-12 lg:grid-cols-12 lg:py-16">
      <div className="lg:col-span-7">
        <motion.p
          className="eyebrow mb-8 flex flex-wrap gap-x-3 gap-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span>{meta.university}</span>
          <span className="text-sun">•</span>
          <span>INFO90009</span>
          <span className="text-sun">•</span>
          <span>{meta.semester}</span>
        </motion.p>

        <h1 id="overview-title" className="sr-only">
          {meta.projectName} — {meta.title}
        </h1>
        <motion.p
          aria-hidden
          className="font-display text-[clamp(4.5rem,15vw,11rem)] font-extrabold leading-[0.82] tracking-[-0.055em] text-blue"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Day One
        </motion.p>
        <p aria-hidden className="mt-6 max-w-[18ch] font-display text-[clamp(1.75rem,3.6vw,3rem)] font-bold leading-[1.04] tracking-[-0.03em]">
          {titleWords.map((w, i) => (
            <motion.span
              key={i}
              className="mr-[0.25em] inline-block"
              initial={{ opacity: 0, y: '0.5em' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {w}
            </motion.span>
          ))}
        </p>
        <motion.p
          className="mt-6 max-w-[46ch] text-lg text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Helping international students move from knowing what to do to <span className="mark-sun text-ink">confidently doing it.</span>
        </motion.p>

        <motion.a
          href="#hmw"
          className="group mt-10 flex max-w-xl items-start gap-4 border-l-2 border-blue bg-paper py-4 pl-5 pr-4 shadow-[0_1px_0_var(--color-line)] transition-colors hover:bg-blue-soft"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
        >
          <div>
            <span className="eyebrow text-blue">Research question</span>
            <span className="mt-1 block font-display text-[19px] font-semibold leading-snug">{meta.researchQuestion}</span>
          </div>
          <ArrowUpRight className="mt-1 shrink-0 text-blue transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" size={20} aria-hidden />
        </motion.a>

        {!isPlaceholder(meta.videoUrl) && (
          <motion.div className="mt-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1 }}>
            <VideoButton url={meta.videoUrl} />
          </motion.div>
        )}
      </div>

      {/* Interactive hero composition — real prototype screens */}
      <motion.div
        style={{ y: driftY, opacity: driftO }}
        className="relative mx-auto h-[440px] w-full max-w-[460px] sm:h-[540px] lg:col-span-5 lg:h-[620px]"
        onPointerMove={onMove}
        onPointerLeave={() => {
          mx.set(0)
          my.set(0)
        }}
        aria-label="Screens from the Day One prototype"
        role="img"
      >
        <div aria-hidden className="absolute inset-x-6 bottom-6 top-10 rounded-[2px] bg-blue-soft" />
        <motion.div style={back} className="absolute left-0 top-4 w-[46%] -rotate-[5deg]">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <PhoneFrame src="assets/prototype/healthcare-journey.jpg" alt="" className="aspect-[1/2]" />
          </motion.div>
        </motion.div>
        <motion.div style={back} className="absolute right-0 top-10 w-[46%] rotate-[5deg]">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
            <PhoneFrame src="assets/prototype/explore-stop.jpg" alt="" className="aspect-[1/2]" />
          </motion.div>
        </motion.div>
        <motion.div style={front} className="absolute left-1/2 top-16 w-[52%] -translate-x-1/2">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <PhoneFrame src="assets/prototype/short-trip-builder.jpg" alt="" className="aspect-[1/2]" />
          </motion.div>
        </motion.div>
        <span className="absolute -bottom-2 left-6 font-mono text-[12px] text-faint">Prototype · Healthcare Journey / Short Trip / Explore</span>
      </motion.div>

      <a href="#title-block" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint hover:text-blue md:flex" aria-label="Scroll to title block">
        <span className="font-mono text-[12px] uppercase tracking-[0.16em]">Scroll</span>
        <span className="scroll-cue relative block h-10 w-px overflow-hidden bg-line" />
        <ArrowDown size={14} aria-hidden className="sr-only" />
      </a>
    </div>
  )
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
        <div className="grid border-y-2 border-ink md:grid-cols-12">
          <div className="border-b border-line py-6 md:col-span-4 md:border-b-0 md:border-r md:pr-8">
            <p className="eyebrow">Title block</p>
            <p className="mt-3 font-display text-2xl font-bold leading-tight">{meta.reportTitle}</p>
            <p className="mt-3 text-[15px] text-muted">{meta.title}</p>
            <a href="#abstract" className="group mt-5 inline-flex items-center gap-1 text-[15px] font-medium text-blue">
              <span className="link-grow">Read the abstract</span>
              <ArrowUpRight size={16} aria-hidden className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
          <dl className="md:col-span-8 md:pl-8">
            {rows.map(([k, v], i) => (
              <div key={k} className={`grid grid-cols-[110px_1fr] gap-4 py-3 text-[15px] sm:grid-cols-[140px_1fr] ${i ? 'border-t border-line' : ''}`}>
                <dt className="font-mono text-[12px] uppercase tracking-[0.12em] text-faint">{k}</dt>
                <dd className="text-ink-2">{v}</dd>
              </div>
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
            <h2 id="map-title" className="text-2xl font-bold">
              How this report reads
            </h2>
            <p className="font-mono text-[12px] text-muted">Each part can be read on its own</p>
          </div>
        </Reveal>
        <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">
          {mainParts.map((p, k) => (
            <Reveal key={p.key} delay={k * 0.06}>
              <p className="eyebrow text-blue">{p.label}</p>
              <p className="mt-1 text-[15px] text-muted">{p.summary}</p>
              <ol className="mt-4 border-t border-line">
                {sections
                  .filter((s) => s.part === p.key)
                  .map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="group grid grid-cols-[36px_1fr] items-baseline gap-3 border-b border-line py-2.5">
                        <span className="font-mono text-[12px] text-blue">{s.num}</span>
                        <span className="font-display font-semibold tracking-tight transition-colors group-hover:text-blue">{s.label}</span>
                      </a>
                    </li>
                  ))}
              </ol>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-[14px] text-muted">
          Also: <a href="#abstract" className="link-grow text-ink">Abstract</a> · <a href="#references" className="link-grow text-ink">References</a> ·{' '}
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
          <p className="mt-4 font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.15]">{meta.introLead}</p>
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
