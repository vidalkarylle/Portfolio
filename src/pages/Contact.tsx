import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import SectionHeading from '../components/SectionHeading'
import TerminalWindow from '../components/TerminalWindow'
import ContactForm from '../components/ContactForm'

export default function Contact() {
  return (
    <section className="flex min-h-screen items-center py-24">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className="flex justify-center">
          <SectionHeading title="contact.tsx" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-10"
        >
          <TerminalWindow title="contact.sh">
            <p className="font-mono text-sm">
              <span className="text-matrix">$</span> contact --send
            </p>
            <p className="mt-2 text-sm text-muted">
              Got a project in mind? Fill this in — my inbox is always open.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
            <p className="mt-6 font-mono text-xs text-faint">
              $ mail -s "hello"{' '}
              <a
                href={`mailto:${profile.email}`}
                className="text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
              >
                {profile.email}
              </a>
            </p>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  )
}
