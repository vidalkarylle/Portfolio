import { journey } from '../data/journey'

export default function Journey() {
  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-center font-display text-3xl font-medium tracking-tight uppercase text-text sm:text-4xl">
        MY JOURNEY
      </h3>
      <div className="relative flex flex-col gap-10 border-l-2 border-line pl-7">
        {journey.map((item) => (
          <div key={item.id} className="relative flex flex-col gap-2.5">
            <span
              className="absolute -left-[35px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-matrix bg-bg"
              aria-hidden="true"
            />
            <p className="inline-block w-fit rounded-md border border-matrix/40 bg-matrix/10 px-3 py-1 font-mono text-xs font-bold text-matrix">
              {item.period}
            </p>
            <p className="text-xl font-bold text-text sm:text-2xl">
              {item.title}
            </p>
            <p className="font-mono text-sm font-bold text-matrix">
              {item.place}
            </p>
            <p className="max-w-xl text-base leading-relaxed text-muted">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
