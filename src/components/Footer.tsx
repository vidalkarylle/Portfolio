import { Mail } from 'lucide-react'
import { profile } from '../data/profile'
import { GithubIcon, LinkedinIcon } from './icons'

const SOCIALS = [
  { href: profile.github, label: 'GitHub', Icon: GithubIcon },
  { href: profile.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
  { href: `mailto:${profile.email}`, label: 'Email', Icon: Mail },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-black">
      <div
        className="h-px w-full bg-matrix"
        aria-hidden="true"
      />
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-7 px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {SOCIALS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              className="group flex items-center gap-2 rounded-md border border-line px-4 py-2.5 font-mono text-xs text-muted transition-colors hover:border-matrix hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
            >
              <Icon className="h-4 w-4 transition-colors group-hover:text-matrix" />
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-faint">© 2026</span>
          <span className="text-text">{profile.name}</span>
          <span className="text-faint">— All rights reserved</span>
        </div>
      </div>
    </footer>
  )
}
