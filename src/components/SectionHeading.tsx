interface SectionHeadingProps {
  title: string
  index?: string
}

export default function SectionHeading({ title, index }: SectionHeadingProps) {
  return (
    <h2 className="font-mono text-xl font-bold tracking-tight sm:text-2xl">
      {index ? (
        <>
          <span className="text-matrix">{index}_</span>
          {title}
        </>
      ) : (
        <>
          <span className="text-matrix">// </span>
          {title}
        </>
      )}
    </h2>
  )
}
