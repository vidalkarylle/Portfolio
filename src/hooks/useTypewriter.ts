import { useEffect, useRef, useState } from 'react'

type Phase = 'typing' | 'holding' | 'deleting' | 'done'

interface TypewriterState {
  lineIndex: number
  charIndex: number
  phase: Phase
}

export function useTypewriter(
  lines: readonly string[],
  typeSpeed = 70,
  holdTime = 1400,
  loop = false,
) {
  const [state, setState] = useState<TypewriterState>(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return {
        lineIndex: lines.length - 1,
        charIndex: lines[lines.length - 1]?.length ?? 0,
        phase: 'done',
      }
    }
    return { lineIndex: 0, charIndex: 0, phase: 'typing' }
  })

  const stateRef = useRef(state)

  useEffect(() => {
    stateRef.current = state
  }, [state])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    let timer = 0

    const step = () => {
      if (cancelled) return
      const s = stateRef.current
      const current = lines[s.lineIndex]
      if (!current) return
      const isLast = s.lineIndex === lines.length - 1

      let next: TypewriterState
      let delay = typeSpeed

      if (s.phase === 'typing') {
        if (s.charIndex < current.length) {
          next = { ...s, charIndex: s.charIndex + 1 }
        } else {
          next = { ...s, phase: 'holding' }
          delay = holdTime
        }
      } else if (s.phase === 'holding') {
        next =
          loop || !isLast
            ? { ...s, phase: 'deleting' }
            : { ...s, phase: 'done' }
      } else if (s.phase === 'deleting') {
        if (s.charIndex > 0) {
          next = { ...s, charIndex: s.charIndex - 1 }
          delay = Math.max(18, typeSpeed / 2.5)
        } else {
          next = {
            ...s,
            lineIndex: loop
              ? (s.lineIndex + 1) % lines.length
              : s.lineIndex + 1,
            charIndex: 0,
            phase: 'typing',
          }
          delay = loop ? 350 : typeSpeed
        }
      } else {
        return
      }

      setState(next)
      timer = window.setTimeout(step, delay)
    }

    timer = window.setTimeout(step, typeSpeed)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [lines, typeSpeed, holdTime, loop])

  return {
    lineIndex: state.lineIndex,
    charIndex: state.charIndex,
    done: state.phase === 'done',
  }
}
