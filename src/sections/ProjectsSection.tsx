import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Silk from '../components/Silk'



export default function ProjectsSection() {
  const [isLight, setIsLight] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('light')
    }
    return false
  })

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent
      setIsLight(customEvent.detail === 'light')
    }
    window.addEventListener('themechange', handleThemeChange)
    return () => window.removeEventListener('themechange', handleThemeChange)
  }, [])

  return (
    <section className="relative bg-bg py-20 md:py-28 overflow-hidden">

      {/* Silk shader background (restricted to header area) */}
      <div className="absolute top-0 left-0 right-0 h-[500px] md:h-[580px] pointer-events-none z-0 opacity-70 dark:opacity-55 transition-opacity duration-300 overflow-hidden">
        <Silk
          speed={2.2}
          scale={1.4}
          color={isLight ? '#00a3ff' : '#6366f1'}
          noiseIntensity={0.5}
        />
        {/* Soft fading mask to merge into the page body background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/40 to-bg" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">

        {/* Boxed Header Container with Corner Crosshairs */}
        <div className="relative border border-stroke/70 px-8 py-10 md:py-16 max-w-4xl mx-auto flex items-center justify-center bg-surface/20 backdrop-blur-sm rounded-lg mb-8">
          {/* Corner L-brackets */}
          {/* Top-Left */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-600 -translate-x-[1.5px] -translate-y-[1.5px]" />
          {/* Top-Right */}
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-600 translate-x-[1.5px] -translate-y-[1.5px]" />
          {/* Bottom-Left */}
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-600 -translate-x-[1.5px] translate-y-[1.5px]" />
          {/* Bottom-Right */}
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-600 translate-x-[1.5px] translate-y-[1.5px]" />

          <h2 className="text-4xl md:text-6xl font-sans font-black tracking-tight text-text-primary text-center">
            Project Showcase
          </h2>
        </div>

        {/* Placeholder Message: Projects Will Be Updated Soon */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-16 max-w-2xl mx-auto text-center border border-stroke/70 bg-surface/30 backdrop-blur-sm rounded-3xl p-10 md:p-16 flex flex-col items-center gap-6 shadow-[0_20px_80px_rgba(0,0,0,0.1)] relative"
        >
          {/* L-brackets inside card for consistency */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blue-600/60 -translate-x-[0.5px] -translate-y-[0.5px] rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blue-600/60 translate-x-[0.5px] -translate-y-[0.5px] rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blue-600/60 -translate-x-[0.5px] translate-y-[0.5px] rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blue-600/60 translate-x-[0.5px] translate-y-[0.5px] rounded-br-lg" />

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600 dark:text-blue-500 text-3xl animate-pulse">
            <span>🚀</span>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl md:text-3xl font-display font-semibold text-text-primary">
              Projects Will Be Updated Soon
            </h3>
            <p className="text-sm md:text-base text-muted leading-relaxed max-w-md mx-auto font-body">
              I'm currently polishing some exciting new projects. Please stay tuned for updates!
            </p>
          </div>
          <a
            href="https://github.com/akshatsoni27"
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center gap-2.5 rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.45)]"
          >
            <span>Checkout GitHub</span>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  )
}