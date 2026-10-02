import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'
import SectionHeading from '../components/SectionHeading'
import TerminalWindow from '../components/TerminalWindow'

export default function Projects() {
  return (
    <section className="flex min-h-screen items-center py-24">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className="flex justify-center">
          <SectionHeading title="projects" index="01" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-10"
        >
          <TerminalWindow title="projects.sh">
            <p className="font-mono text-sm">
              <span className="text-matrix">$</span> ls ./projects
            </p>
            <div className="mt-6 flex flex-col gap-8">
              {projects.map((project) => (
                <div key={project.id} className="flex flex-col gap-1.5">
                  <p className="font-mono text-sm font-bold">
                    {project.title}
                    <span className="font-normal text-faint">
                      {' '}
                      — {project.year}
                    </span>
                  </p>
                  <p className="text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>
                  <p className="font-mono text-xs text-faint">
                    └ {project.tags.join(' · ')}
                  </p>
                  <div className="flex items-center gap-5 font-mono text-xs">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
                      >
                        source
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
                      >
                        live_demo
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  )
}
