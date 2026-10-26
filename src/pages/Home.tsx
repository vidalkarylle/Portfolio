import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { profile } from '../data/profile'
import { useTypewriter } from '../hooks/useTypewriter'
import GlitchMatrixBackground from '../components/GlitchMatrixBackground'

const NAME = profile.name

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Home() {
  const { charIndex } = useTypewriter([NAME], 80, 1400, true)
  const typed = NAME.slice(0, charIndex)
  const [burst, setBurst] = useState(0)

  const handleEnter = (e: React.MouseEvent) => {
    e.preventDefault()
    setBurst((b) => b + 1)
    window.setTimeout(() => {
      window.location.hash = '#/projects'
    }, 350)
  }

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      <GlitchMatrixBackground burst={burst} />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 py-32 sm:px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-7"
        >
          <motion.p
            variants={item}
            className="font-mono text-sm tracking-[0.25em] text-matrix"
          >
            WEB DEVELOPER + DESIGNER
          </motion.p>

          <motion.h1
            variants={item}
            className="max-w-[620px] font-display text-[clamp(60px,10vw,140px)] font-bold uppercase leading-[0.9] tracking-[-0.04em] text-[#f2f2f2] [text-shadow:0_0_30px_rgb(0_255_65/0.15)]"
          >
            {typed}
            <span
              className="animate-blink ml-1 inline-block h-[0.8em] w-[0.07em] bg-matrix"
              aria-hidden="true"
            />
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-md font-mono text-sm leading-relaxed text-muted"
          >
            I BUILD DIGITAL EXPERIENCES
            <br />
            THROUGH CODE, DESIGN, AND CURIOSITY.
          </motion.p>

          <motion.div variants={item}>
            <a
              href="#/projects"
              onClick={handleEnter}
              className="group inline-flex items-center gap-3 border-2 border-matrix px-7 py-3.5 font-mono text-sm tracking-[0.2em] text-matrix transition-all duration-200 hover:bg-matrix hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-matrix"
            >
              ENTER SYSTEM
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center px-4 pb-8 sm:px-6">
        <span className="font-mono text-xs tracking-[0.2em] text-muted">
          STATUS: AVAILABLE
        </span>
      </div>
    </section>
  )
}
