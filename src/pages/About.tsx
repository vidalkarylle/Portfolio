import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import PageHeader from '../components/PageHeader'
import TechStack from '../components/TechStack'

function AboutBox() {
  return (
    <div className="clip-corner border-2 border-line bg-panel px-6 py-8 sm:px-8 sm:py-10">
      <p className="text-lg leading-relaxed text-text">{profile.bio}</p>
    </div>
  )
}

export default function About() {
  return (
    <section className="relative min-h-screen px-4 pb-16 pt-[104px] sm:px-8 lg:px-[135px]">
      <div className="mx-auto flex max-w-[1640px] flex-col gap-14">
        <div className="border-t border-matrix/50 pt-8">
          <PageHeader
            label="> ABOUT ME"
            title="ABOUT"
            description="A little about who I am, what I build, and what drives me."
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl border-t border-matrix/50 pt-10"
        >
          <AboutBox />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="max-w-4xl"
        >
          <TechStack />
        </motion.div>
      </div>
    </section>
  )
}
