import { projects } from '../data/projects'
import SectionHeader from '../components/SectionHeader'
import PageHeader from '../components/PageHeader'
import ProjectRow from '../components/ProjectRow'

export default function Projects() {
  return (
    <section className="relative min-h-screen px-4 pb-16 pt-[104px] sm:px-8 lg:px-[135px]">
      <div className="mx-auto max-w-[1640px]">
        <SectionHeader left="[02] WORK_ARCHIVE" right="SELECTED PROJECTS" />

        <div className="mt-[70px]">
          <PageHeader
            label="> PROJECT DATABASE"
            title="PROJECTS"
            description="A collection of digital experiences, interfaces, and experiments built through code, design, and curiosity."
          />
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
