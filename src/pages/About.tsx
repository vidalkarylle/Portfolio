import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import TechStack from '../components/TechStack'
import Journey from '../components/Journey'

function AboutBox() {
  return (
    <div className="clip-corner border-2 border-line bg-panel">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <span className="font-mono text-base font-bold text-matrix">
          &gt; whoami
        </span>
        <span className="font-mono text-xs font-bold text-faint">
          KARYLLE VIDAL
        </span>
      </div>
      <div className="p-5 sm:p-7">
        <p className="text-base leading-relaxed text-text">{profile.bio}</p>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section className="min-h-screen py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <AboutBox />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Journey />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <TechStack />
        </motion.div>
      </div>
    </section>
  )
}
