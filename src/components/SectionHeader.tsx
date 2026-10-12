interface SectionHeaderProps {
  left: string
  right: string
}

export default function SectionHeader({ left, right }: SectionHeaderProps) {
  return (
    <div className="flex w-full items-center justify-between gap-4 border-b border-matrix/25 pb-7">
      <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-matrix sm:text-xs sm:tracking-[0.15em]">
        {left}
      </h2>
      <span className="hidden min-[380px]:inline font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-matrix sm:text-xs sm:tracking-[0.15em]">
        {right}
      </span>
    </div>
  )
}
