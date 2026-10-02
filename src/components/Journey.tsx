import { journey } from '../data/journey'

export default function Journey() {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-mono text-2xl font-bold tracking-tight sm:text-3xl">
        <span className="text-matrix">//</span> JOURNEY
      </h3>
      <div className="flex flex-col gap-6">
        {journey.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-1.5 border-l-2 border-line pl-5"
          >
            <p className="font-mono text-sm font-bold text-matrix">
              {item.period}
            </p>
            <p className="font-mono text-sm text-text">
              {item.title}
              <span className="text-faint"> @ </span>
              <span className="text-muted">{item.place}</span>
            </p>
            <p className="text-sm leading-relaxed text-muted">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
