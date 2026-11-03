import { MotionConfig } from 'motion/react'
import { Nav } from './components/Nav'
import { Overview, ReportMap } from './sections/Overview'
import { PartDivider } from './components/PartDivider'
import { ResearchProcess } from './sections/ResearchProcess'
import { Literature } from './sections/Literature'
import { StudyDesign } from './sections/StudyDesign'
import { Challenges } from './sections/Challenges'
import { HMW } from './sections/HMW'
import { Abstract } from './sections/Abstract'
import { Outcome } from './sections/Outcome'
import { Iteration } from './sections/Iteration'
import { Evaluation } from './sections/Evaluation'
import { Conclusions } from './sections/Conclusions'
import { References } from './sections/References'
import { Appendix } from './sections/Appendix'
import { Footer } from './sections/Footer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main id="main">
        {/* Front matter */}
        <Overview />
        <Abstract />
        <ReportMap />
        <ResearchProcess />

        <PartDivider part="research" />
        <Literature />
        <StudyDesign />
        <Challenges />

        <PartDivider part="design" />
        <HMW />
        <Outcome />
        <Iteration />
        <Evaluation />
        <Conclusions />
        <References />
        <Appendix />
      </main>
      <Footer />
    </MotionConfig>
  )
}
