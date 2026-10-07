import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import type { Route } from '../hooks/useHashRoute'

const LINKS = [
  { id: '/about', label: 'about' },
  { id: '/projects', label: 'projects' },
  { id: '/contact', label: 'contact' },
] as const

interface NavbarProps {
  route: Route
}

export default function Navbar({ route }: NavbarProps) {
  const [open, setOpen] = useState(false)

  const renderLink = (id: string, label: string) => {
    const isActive = route === id
    return (
      <span className="relative inline-block py-1">
        {label}
        <span
          aria-hidden="true"
          className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-matrix transition-transform duration-200 ease-out ${
            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}
        />
      </span>
    )
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <nav
        className="relative mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6"
        aria-label="Main navigation"
      >
        <a
          href="#/"
          className="group flex items-center gap-1.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text"
        >
          <span className="font-mono text-matrix">{'>'}</span>
          <span className="rounded-md border border-line px-1.5 py-0.5 font-mono text-sm font-extrabold tracking-tight transition-colors group-hover:border-matrix">
            KV
          </span>
        </a>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`group font-mono text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text ${
                route === link.id ? 'text-text' : 'text-muted hover:text-text'
              }`}
            >
              {renderLink(link.id, link.label)}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="rounded-md border border-line p-2 text-muted transition-colors hover:border-line-strong hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-line bg-bg md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className={`group rounded-md px-2 py-2 font-mono text-sm transition-colors ${
                    route === link.id ? 'text-text' : 'text-muted hover:text-text'
                  }`}
                >
                  {renderLink(link.id, link.label)}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
