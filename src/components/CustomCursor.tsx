import { useEffect, useRef, useState } from 'react'

function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const hoverRef = useRef(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)')
    if (!mediaQuery.matches) {
      return
    }

    let raf = 0

    const updateHoverState = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null
      hoverRef.current = Boolean(target?.closest('a, button, input, textarea, select, label, [role="button"]'))
    }

    const moveCursor = (event: PointerEvent) => {
      positionRef.current.targetX = event.clientX
      positionRef.current.targetY = event.clientY
      updateHoverState(event)
      if (!isVisible) {
        setIsVisible(true)
      }
    }

    const render = () => {
      const position = positionRef.current
      position.x = lerp(position.x, position.targetX, 0.18)
      position.y = lerp(position.y, position.targetY, 0.18)

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${hoverRef.current ? 2 : 1})`
      }

      raf = window.requestAnimationFrame(render)
    }

    document.addEventListener('pointermove', moveCursor)
    raf = window.requestAnimationFrame(render)

    return () => {
      document.removeEventListener('pointermove', moveCursor)
      window.cancelAnimationFrame(raf)
    }
  }, [isVisible])

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed left-0 top-0 z-[9998] hidden h-4 w-4 rounded-full border border-text-primary/40 bg-text-primary/20 transition-opacity duration-300 md:block ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    />
  )
}