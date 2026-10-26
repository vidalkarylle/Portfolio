import { motion } from 'framer-motion'

interface PageHeaderProps {
  label: string
  title: string
  description: string
}

export default function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-matrix">
        {label}
      </p>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mt-3 font-display text-[clamp(3rem,7vw,6.5rem)] font-light uppercase leading-[1] tracking-[0.02em] text-[#f2f2f2] [text-shadow:0_0_40px_rgb(242_242_242/0.15)]"
      >
        {title}
      </motion.h1>
      <p className="mt-4 max-w-[400px] font-mono text-sm leading-relaxed text-matrix/80">
        {description}
      </p>
    </div>
  )
}
