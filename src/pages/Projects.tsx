import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'

export default function Projects() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgb(0_180_216/0.15)_1px,transparent_1px),linear-gradient(90deg,rgb(0_180_216/0.15)_1px,transparent_1px)] [background-size:40px_40px] [transform:perspective(1200px)_rotateX(12deg)]" />
        <div className="absolute inset-0 bg-scanlines" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex justify-center">
          <h2 className="text-center font-mono text-4xl font-bold tracking-tight sm:text-6xl">
            <span className="text-matrix">01_</span>projects
          </h2>
        </div>

        <div className="mt-16 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={i % 2 === 1 ? 'lg:mt-16' : ''}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
