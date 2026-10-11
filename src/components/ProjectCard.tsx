import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group clip-corner flex h-full flex-col border-2 border-line bg-panel transition-all duration-200 hover:-translate-y-2 hover:border-matrix hover:shadow-[0_0_30px_rgb(0_180_216/0.15)]">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="ml-2 font-mono text-xs text-muted">
          $ ./{project.id}
        </span>
        <span className="ml-auto font-mono text-xs text-faint">
          {project.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-mono text-lg font-bold text-text">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border border-matrix/40 bg-matrix/10 px-2 py-0.5 font-mono text-xs text-matrix"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-5 font-mono text-xs">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-matrix focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
            >
              source
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-matrix focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
            >
              live_demo
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
