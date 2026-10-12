export default function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="absolute inset-0 [background-image:linear-gradient(rgb(0_255_65/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(0_255_65/0.05)_1px,transparent_1px)] [background-size:50px_50px]" />
    </div>
  )
}
