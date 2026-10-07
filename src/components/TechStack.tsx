import { skills } from '../data/skills'
import type { SkillCategory } from '../types'

const CATEGORIES: { category: SkillCategory; cmd: string }[] = [
  { category: 'Frontend', cmd: 'frontend' },
  { category: 'Backend', cmd: 'backend' },
  { category: 'Tools', cmd: 'tools' },
]

function SkillChip({ name }: { name: string }) {
  return (
    <span className="border border-matrix/50 bg-matrix/10 px-3 py-1.5 font-mono text-sm text-matrix">
      {name}
    </span>
  )
}

export default function TechStack() {
  return (
    <div className="mt-16 flex flex-col gap-8">
      <h3 className="font-mono text-2xl font-bold tracking-tight sm:text-3xl">
        <span className="text-matrix">//</span> TECH STACK
      </h3>
      <div className="grid gap-5 sm:grid-cols-3">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.category}
            className="clip-corner flex aspect-square flex-col border-2 border-line bg-panel p-6 transition-colors hover:border-matrix"
          >
            <p className="font-mono text-xl font-bold text-matrix">
              {cat.cmd}
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {skills
                .filter((s) => s.category === cat.category)
                .map((s) => (
                  <SkillChip key={s.name} name={s.name} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
