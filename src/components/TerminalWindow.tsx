import type { ReactNode } from 'react'

interface TerminalWindowProps {
  title: string
  children: ReactNode
  className?: string
}

export default function TerminalWindow({
  title,
  children,
  className = '',
}: TerminalWindowProps) {
  return (
    <div
      className={`overflow-hidden rounded-md border border-line bg-panel ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        <span className="ml-2 font-mono text-xs text-muted">{title}</span>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  )
}
