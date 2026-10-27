import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navigateTo, type Route } from '../hooks/useRoute'

const LINKS = [
  { id: '/projects', label: 'Projects' },
  { id: '/about', label: 'About' },
  { id: '/journey', label: 'Journey' },
  { id: '/contact', label: 'Contact' },
] as const

interface NavbarProps {
  route: Route
}

export default function Navbar({ route }: NavbarProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-matrix/25 bg-bg/80 backdrop-blur-md">
      <nav
        className="relative mx-auto flex h-16 max-w-[1640px] items-center justify-between px-4 sm:px-8 lg:px-[135px]"
        aria-label="Main navigation"
      >
        <a
          href="/"
          onClick={(e) => navigateTo('/', e)}
          className="font-mono text-lg font-bold tracking-tight text-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-matrix"
        >
          KV
        </a>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 lg:gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={link.id}
              onClick={(e) => navigateTo(link.id, e)}
              className={`font-mono text-[11px] uppercase tracking-[0.25em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-matrix ${
                route === link.id ? 'text-matrix' : 'text-muted hover:text-matrix'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-matrix md:flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-matrix" />
          SYSTEM ONLINE
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="rounded-md border border-line p-2 text-muted transition-colors hover:border-line-strong hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-matrix md:hidden"
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
            className="overflow-hidden border-b border-matrix/25 bg-bg md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.id}
                  onClick={(e) => {
                    navigateTo(link.id, e)
                    setOpen(false)
                  }}
                  className={`rounded-md px-2 py-2 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors ${
                    route === link.id ? 'text-matrix' : 'text-muted hover:text-matrix'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
