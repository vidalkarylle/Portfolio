import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { useTypewriter } from '../hooks/useTypewriter'
import MatrixRain from '../components/MatrixRain'

const NAME = profile.name
const LINES = [NAME] as const

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

export default function Home() {
  const { charIndex } = useTypewriter(LINES, 90, 1200, true)
  const typed = NAME.slice(0, charIndex)

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <MatrixRain className="absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0 bg-scanlines"
        aria-hidden="true"
      />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative flex flex-col items-center gap-5 px-4 text-center"
      >
        <motion.p
          variants={item}
          className="font-mono text-lg text-muted sm:text-xl"
        >
          i am
        </motion.p>

        <motion.h1
          variants={item}
          className="text-glow break-words font-display text-5xl font-extrabold leading-none tracking-tight sm:text-7xl"
        >
          {typed}
          <span
            className="animate-blink ml-1 inline-block h-[0.8em] w-[0.07em] bg-matrix"
            aria-hidden="true"
          />
        </motion.h1>
      </motion.div>
    </section>
  )
}
