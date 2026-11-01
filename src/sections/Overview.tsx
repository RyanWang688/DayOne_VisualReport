import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight, PlayCircle } from 'lucide-react'
import { meta } from '../content/meta'
import { isPlaceholder } from '../content/types'
import { PhoneFrame, Ph, Reveal } from '../components/ui'

const titleWords = meta.title.split(' ')

export function Overview() {
  return (
    <section id="overview" aria-labelledby="overview-title" className="relative overflow-hidden pt-14">
      <Hero />
      <TitleBlock />
      <Context />
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
      </div>

      {/* Interactive hero composition — real prototype screens */}
      <div
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
        <span className="absolute -bottom-2 left-6 font-mono text-[11px] text-faint">Prototype · Healthcare Journey / Short Trip / Explore</span>
      </div>

      <a href="#title-block" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint hover:text-blue md:flex" aria-label="Scroll to title block">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em]">Scroll</span>
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
    ['Degree', <Ph value={meta.degree} />],
    ['Subject', `${meta.subject} · ${meta.semester}`],
    ['Supervisor', <Ph value={meta.supervisor} />],
    [
      'Authors',
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
        <a href={meta.videoUrl} className="inline-flex items-center gap-1.5 text-blue underline underline-offset-4" target="_blank" rel="noreferrer">
          <PlayCircle size={16} aria-hidden /> Watch the video
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
            <a href="#abstract" className="mt-5 inline-flex items-center gap-1 text-[15px] font-medium text-blue hover:underline">
              Read the abstract <ArrowUpRight size={16} aria-hidden />
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
    <div className="border-t border-line bg-paper py-20 md:py-28">
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
            <dl className="mt-6 grid grid-cols-2 border-t-2 border-ink sm:grid-cols-4">
              {facts.map(([n, l]) => (
                <div key={l} className="py-5">
                  <dt className="sr-only">{l}</dt>
                  <dd>
                    <span className="block font-display text-4xl font-bold text-blue">{n}</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{l}</span>
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
