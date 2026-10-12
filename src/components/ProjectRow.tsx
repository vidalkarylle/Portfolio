import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../types'
import TagChip from './TagChip'

interface ProjectRowProps {
  project: Project
  index: number
}

export default function ProjectRow({ project, index }: ProjectRowProps) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative flex items-center gap-6 border-b border-matrix/30 py-10 transition-all duration-200 hover:border-matrix hover:bg-matrix/5 hover:shadow-[0_-1px_0_0_rgb(0_255_65/0.7),0_0_24px_rgb(0_255_65/0.15)] sm:gap-10"
    >
      <span className="flex-shrink-0 font-mono text-sm text-matrix/50 transition-colors duration-200 group-hover:text-matrix">
        {String(index + 1).padStart(3, '0')}
      </span>

      <div className="min-w-0 flex-1 sm:pl-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.2em] text-matrix/60 transition-colors duration-200 group-hover:text-matrix">
          <span>{project.category}</span>
          <span className="text-matrix/40 transition-colors duration-200 group-hover:text-matrix/80">
            {project.year}
          </span>
        </div>

        <h3 className="mt-3 font-display text-3xl font-normal uppercase leading-none tracking-wide text-[#f2f2f2] [text-shadow:0_0_18px_rgb(242_242_242/0.12)] transition-all duration-200 group-hover:text-matrix group-hover:[text-shadow:0_0_24px_rgb(0_255_65/0.4)] sm:text-5xl">
          {project.title}
        </h3>

        <p className="mt-3 max-w-xl font-mono text-sm leading-relaxed text-matrix/70 transition-colors duration-200 group-hover:text-matrix/90">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
        </div>
      </div>

      <ArrowUpRight
        className="h-6 w-6 flex-shrink-0 text-matrix/50 transition-all duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-matrix sm:h-7 sm:w-7"
        aria-hidden="true"
      />
    </motion.a>
  )
}
