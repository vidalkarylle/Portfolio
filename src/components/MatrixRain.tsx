import { useEffect, useRef } from 'react'

const CHARS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモ0123456789ABCDEF$#<>[]{}'

function parseRgb(color: string): [number, number, number] {
  const m = color.match(/\d+(\.\d+)?/g)
  if (!m || m.length < 3) return [10, 10, 10]
  return [Number(m[0]), Number(m[1]), Number(m[2])]
}

export default function MatrixRain({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const fontSize = 14
    let raf = 0
    let last = 0
    let frame = 0
    let drops: number[] = []
    let columns = 0
    let bg: [number, number, number] = [10, 10, 10]

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = parent.clientWidth
      const h = parent.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      columns = Math.ceil(w / fontSize)
      drops = Array.from({ length: columns }, () =>
        Math.floor(Math.random() * -60),
      )
      bg = parseRgb(getComputedStyle(canvas).backgroundColor)
      ctx.fillStyle = `rgb(${bg[0]}, ${bg[1]}, ${bg[2]})`
      ctx.fillRect(0, 0, w, h)
    }

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw)
      if (t - last < 50) return
      last = t
      frame++
      if (frame % 60 === 0) {
        bg = parseRgb(getComputedStyle(canvas).backgroundColor)
      }
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.fillStyle = `rgba(${bg[0]}, ${bg[1]}, ${bg[2]}, 0.09)`
      ctx.fillRect(0, 0, w, h)
      ctx.font = `${fontSize}px "JetBrains Variable Mono", monospace`
      for (let i = 0; i < columns; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize
        ctx.fillStyle = Math.random() > 0.92 ? '#b8ffc8' : '#00ff41'
        ctx.fillText(char, x, y)
        if (y > h && Math.random() > 0.985) drops[i] = 0
        drops[i]++
      }
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
