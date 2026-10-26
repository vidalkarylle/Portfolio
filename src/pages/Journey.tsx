import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import Timeline from '../components/Journey'

export default function JourneyPage() {
  return (
    <section className="relative min-h-screen px-4 pb-16 pt-[104px] sm:px-8 lg:px-[135px]">
      <div className="mx-auto max-w-[1640px]">
        <div className="border-t border-matrix/50 pt-8">
          <PageHeader
            label="> MY JOURNEY"
            title="MY JOURNEY"
            description="School, training, and the work that got me here — one step at a time."
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-10 max-w-3xl border-t border-matrix/50 pt-10"
        >
          <Timeline />
        </motion.div>
      </div>
    </section>
  )
}
