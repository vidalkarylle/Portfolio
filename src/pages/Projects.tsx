import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import SectionHeader from '../components/SectionHeader'
import ProjectRow from '../components/ProjectRow'

export default function Projects() {
  return (
    <section className="relative min-h-screen px-4 pb-16 pt-[104px] sm:px-8 lg:px-[135px]">
      <div className="mx-auto max-w-[1640px]">
        <SectionHeader left="[02] WORK_ARCHIVE" right="SELECTED PROJECTS" />

        <div className="mt-[70px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-matrix">
            &gt; PROJECT DATABASE
          </p>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-3 font-display text-[clamp(3rem,7vw,6.5rem)] font-light uppercase leading-[1] tracking-[0.02em] whitespace-nowrap text-[#f2f2f2] [text-shadow:0_0_40px_rgb(242_242_242/0.15)]"
          >
            PROJECTS
          </motion.h1>
          <p className="mt-4 max-w-[440px] font-mono text-sm leading-relaxed text-matrix/80">
            A collection of digital experiences, interfaces, and experiments built
            through code, design, and curiosity.
          </p>
        </div>

        <div className="mt-10 border-t border-matrix/50">
          {projects.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
