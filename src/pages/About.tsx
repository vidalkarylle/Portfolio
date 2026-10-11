import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import TechStack from '../components/TechStack'
import Journey from '../components/Journey'

function AboutBox() {
  return (
    <div className="clip-corner border-2 border-line bg-panel">
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <span className="font-mono text-base font-bold text-matrix">
          &gt; whoami
        </span>
        <span className="font-mono text-xs font-bold tracking-widest text-faint">
          KARYLLE VIDAL
        </span>
      </div>
      <div className="p-6 sm:p-8">
        <p className="text-lg leading-relaxed text-text">{profile.bio}</p>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm">
          <span className="text-muted">
            <span className="text-matrix">role:</span> Web Developer
          </span>
          <span className="text-muted">
            <span className="text-matrix">focus:</span> Web &amp; Mobile
          </span>
          <span className="text-muted">
            <span className="text-matrix">based:</span> Philippines
          </span>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section className="min-h-screen py-20">
      <div className="mx-auto flex max-w-4xl flex-col gap-14 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <AboutBox />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Journey />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <TechStack />
        </motion.div>
      </div>
    </section>
  )
}
