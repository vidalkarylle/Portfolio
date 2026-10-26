import { motion } from 'framer-motion'
import { journey } from '../data/journey'

export default function Journey() {
  return (
    <ol className="relative flex flex-col gap-10 border-l border-matrix/50 pl-7">
      {journey.map((item, index) => (
        <motion.li
          key={item.id}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: index * 0.06 }}
          className="relative flex flex-col gap-2"
        >
          <span
            className="absolute top-1.5 -left-7 h-2.5 w-2.5 -translate-x-1/2 bg-matrix"
            aria-hidden="true"
          />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-matrix">
            {item.period}
          </p>
          <h2 className="text-xl font-medium text-[#f2f2f2] sm:text-2xl">
            {item.title}
          </h2>
          <p className="font-mono text-sm text-matrix/80">{item.place}</p>
          <p className="max-w-xl text-base leading-relaxed text-muted">
            {item.description}
          </p>
        </motion.li>
      ))}
    </ol>
  )
}
