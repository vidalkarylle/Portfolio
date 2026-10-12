import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

const CONFIG = {
  rainOpacity: 0.3,
  fontSize: 15,
  fps: 30,
  noiseOpacity: 0.09,
  glitchIntervalMin: 3000,
  glitchIntervalMax: 6000,
  glitchDurationMin: 150,
  glitchDurationMax: 300,
  stripCountMin: 2,
  stripCountMax: 4,
  shiftMin: 10,
  shiftMax: 100,
  dropoutCountMin: 1,
  dropoutCountMax: 2,
  rgbSplit: 3,
  cursorRadius: 140,
  mobileColumnFactor: 0.5,
}

const CHARS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789<>/{}=#+*'

interface Column {
  y: number
  speed: number
}

interface GlitchState {
  burstEnd: number
}

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

function useGlitchMatrix(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  burst: number,
) {
  const stateRef = useRef<GlitchState>({ burstEnd: 0 })

  useEffect(() => {
    if (burst > 0) {
      stateRef.current.burstEnd = performance.now() + 500
    }
  }, [burst])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      drawStatic(ctx, canvas)
      return
    }

    let raf = 0
    let running = true
    let last = 0
    let frame = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let columns: Column[] = []
    const cursor = { x: -99999, y: -99999 }
    let glitchEnd = 0
    let nextGlitch = performance.now() + rand(CONFIG.glitchIntervalMin, CONFIG.glitchIntervalMax)
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const fontSize = CONFIG.fontSize

    const colCount = () => {
      const density = w < 640 ? CONFIG.mobileColumnFactor : 1
      return Math.max(8, Math.ceil((w / fontSize) * density))
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = colCount()
      columns = Array.from({ length: n }, () => ({
        y: Math.floor(Math.random() * -80),
        speed: rand(0.4, 1.6),
      }))
    }

    const drawNoise = () => {
      const count = Math.min(2200, Math.floor((w * h) / 800))
      for (let i = 0; i < count; i++) {
        ctx.fillStyle = `rgba(0,255,65,${(CONFIG.noiseOpacity * Math.random()).toFixed(3)})`
        ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1)
      }
    }

    const drawGlitch = (t: number) => {
      const burst = t < stateRef.current.burstEnd
      const strips = Math.floor(rand(CONFIG.stripCountMin, CONFIG.stripCountMax)) + (burst ? 3 : 0)
      for (let i = 0; i < strips; i++) {
        const sy = Math.random() * h
        const sh = rand(8, burst ? 44 : 28)
        const shift = rand(CONFIG.shiftMin, CONFIG.shiftMax) * (Math.random() > 0.5 ? 1 : -1) * (burst ? 1.8 : 1)
        ctx.drawImage(canvas, 0, sy * dpr, canvas.width, sh * dpr, shift, sy, w, sh)
        ctx.fillStyle = 'rgba(255,60,60,0.07)'
        ctx.fillRect(shift - CONFIG.rgbSplit, sy, 2, sh)
        ctx.fillStyle = 'rgba(60,255,255,0.07)'
        ctx.fillRect(shift + CONFIG.rgbSplit, sy, 2, sh)
      }
      const drops = Math.floor(rand(CONFIG.dropoutCountMin, CONFIG.dropoutCountMax)) + (burst ? 2 : 0)
      for (let i = 0; i < drops; i++) {
        ctx.fillStyle = 'rgba(0,0,0,0.55)'
        ctx.fillRect(Math.random() * w, Math.random() * h, rand(40, 180), rand(8, 24))
      }
    }

    const drawRain = (t: number) => {
      ctx.fillStyle = 'rgba(5,5,5,0.14)'
      ctx.fillRect(0, 0, w, h)
      if (frame % 2 === 0) drawNoise()
      ctx.font = `${fontSize}px "Courier New", monospace`
      for (let i = 0; i < columns.length; i++) {
        const col = columns[i]
        const x = i * fontSize
        const y = col.y * fontSize
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)]
        const near = !isTouch && Math.abs(x - cursor.x) < CONFIG.cursorRadius
        ctx.fillStyle = near ? '#eaffea' : '#b8ffc8'
        ctx.globalAlpha = near ? CONFIG.rainOpacity + 0.25 : CONFIG.rainOpacity
        ctx.fillText(ch, x, y)
        ctx.globalAlpha = 1
        col.y += col.speed
        if (y > h && Math.random() > 0.985) col.y = Math.floor(Math.random() * -40)
      }
      if (t > nextGlitch || t < stateRef.current.burstEnd) {
        if (t > glitchEnd) {
          glitchEnd = t + rand(CONFIG.glitchDurationMin, CONFIG.glitchDurationMax)
          if (t >= nextGlitch) nextGlitch = t + rand(CONFIG.glitchIntervalMin, CONFIG.glitchIntervalMax)
        }
        drawGlitch(t)
      }
    }

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop)
      if (!running) return
      if (t - last < 1000 / CONFIG.fps) return
      last = t
      frame++
      drawRain(t)
    }

    const start = () => {
      if (!raf) raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
      raf = 0
    }

    const onMouse = (e: MouseEvent) => {
      cursor.x = e.clientX
      cursor.y = e.clientY
    }
    const onVis = () => {
      if (document.hidden) stop()
      else start()
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => (en.isIntersecting ? start() : stop()))
    })

    resize()
    window.addEventListener('resize', resize)
    if (!isTouch) window.addEventListener('mousemove', onMouse)
    document.addEventListener('visibilitychange', onVis)
    io.observe(canvas)
    start()

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      document.removeEventListener('visibilitychange', onVis)
      io.disconnect()
    }
  }, [canvasRef])
}

function drawStatic(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = canvas.clientWidth
  const h = canvas.clientHeight
  canvas.width = Math.floor(w * dpr)
  canvas.height = Math.floor(h * dpr)
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.fillStyle = '#050505'
  ctx.fillRect(0, 0, w, h)
  ctx.font = `${CONFIG.fontSize}px "Courier New", monospace`
  const n = Math.max(8, Math.ceil(w / CONFIG.fontSize))
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = 'rgba(0,255,65,0.12)'
    ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * CONFIG.fontSize, Math.random() * h)
  }
}

interface GlitchMatrixBackgroundProps {
  burst: number
}

export default function GlitchMatrixBackground({ burst }: GlitchMatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useGlitchMatrix(canvasRef, burst)

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-bg [background-image:linear-gradient(rgb(0_255_65/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(0_255_65/0.05)_1px,transparent_1px)] [background-size:50px_50px]" />
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="matrix-warp">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.05"
              numOctaves="1"
              seed="2"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="10s"
                values="0.012 0.05;0.02 0.08;0.012 0.05"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="6"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-90 [filter:url(#matrix-warp)]"
      />
      <div className="absolute inset-0 bg-scanlines opacity-60" />
      <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.75)_100%)]" />
      <div className="absolute left-1/2 top-1/2 h-[55%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/50 blur-3xl" />
    </div>
  )
}
