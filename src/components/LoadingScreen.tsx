import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

const WORDS = ['Build.', 'Create.', 'Ship.', 'Innovate.']
const DURATION_MS = 2700

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const startTime = useRef<number | null>(null)
  const rafRef = useRef<number>(0)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const animate = (ts: number) => {
      if (!startTime.current) startTime.current = ts
      const elapsed = ts - startTime.current
      const progress = Math.min(elapsed / DURATION_MS, 1)
      const current = Math.floor(progress * 100)
      setCount(current)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        timeoutRef.current = window.setTimeout(() => onComplete(), 400)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(rafRef.current)
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [onComplete])

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % WORDS.length)
    }, 900)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-8 md:p-12"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
    >
      <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">Initializing...</span>

      {/* Center word */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80 select-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col gap-4">
        {/* Counter */}
        <div className="flex justify-end">
          <span className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums leading-none select-none">
            {String(count).padStart(3, '0')}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-[3px] bg-stroke/50 rounded-full overflow-hidden w-full">
          <div
            className="h-full accent-gradient rounded-full origin-left transition-transform"
            style={{
              transform: `scaleX(${count / 100})`,
              boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
