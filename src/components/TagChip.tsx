interface TagChipProps {
  label: string
}

export default function TagChip({ label }: TagChipProps) {
  return (
    <span className="border border-matrix/50 bg-matrix/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-matrix transition-colors duration-200 group-hover:border-matrix group-hover:bg-matrix/25">
      {label}
    </span>
  )
}
