interface SkillBadgeProps {
  name: string
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <span className="inline-block rounded-md border border-line bg-code-bg px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-line-strong hover:text-text">
      {name}
    </span>
  )
}
