import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import { useTypewriter } from '../hooks/useTypewriter'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const ROLES = ['Software Engineer', 'AI Researcher', 'Full-Stack Developer', 'ML Engineer']

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const pointerRef = useRef({ x: 0, y: 0, active: false })
  const roleText = useTypewriter(ROLES, { startDelay: 300 })

  // Mouse position motion values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth springs for mouse movement
  const springConfig = { damping: 25, stiffness: 120, mass: 0.4 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  // Map mouse values to translation / rotation offsets
  const cardX = useTransform(smoothMouseX, [-0.5, 0.5], [20, -20])
  const cardY = useTransform(smoothMouseY, [-0.5, 0.5], [20, -20])
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [16, -16]) // y-axis movements map to x-axis rotation
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-16, 16]) // x-axis movements map to y-axis rotation

  // Glare sheen reflection offsets
  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], ['-50%', '50%'])
  const glareY = useTransform(smoothMouseY, [-0.5, 0.5], ['-50%', '50%'])

  // Text shifts (subtle parallax)
  const textX = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8])
  const textY = useTransform(smoothMouseY, [-0.5, 0.5], [-8, 8])

  // Background canvas shift
  const canvasX = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12])
  const canvasY = useTransform(smoothMouseY, [-0.5, 0.5], [-12, 12])

  // Glow shifts
  const glow1X = useTransform(smoothMouseX, [-0.5, 0.5], [50, -50])
  const glow1Y = useTransform(smoothMouseY, [-0.5, 0.5], [50, -50])
  const glow2X = useTransform(smoothMouseX, [-0.5, 0.5], [-60, 60])
  const glow2Y = useTransform(smoothMouseY, [-0.5, 0.5], [-60, 60])

  // Micro star glows
  const glow3X = useTransform(smoothMouseX, [-0.5, 0.5], [-35, 35])
  const glow3Y = useTransform(smoothMouseY, [-0.5, 0.5], [-35, 35])
  const glow4X = useTransform(smoothMouseX, [-0.5, 0.5], [25, -25])
  const glow4Y = useTransform(smoothMouseY, [-0.5, 0.5], [25, -25])

  useEffect(() => {
    const handleMouseMove = (event: PointerEvent) => {
      const { clientX, clientY } = event
      const width = window.innerWidth
      const height = window.innerHeight
      // Normalize to range [-0.5, 0.5] from screen center
      const x = (clientX / width) - 0.5
      const y = (clientY / height) - 0.5
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('pointermove', handleMouseMove)
    return () => {
      window.removeEventListener('pointermove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.fromTo('.name-reveal', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 0.1)
      tl.fromTo('.blur-in', { opacity: 0, filter: 'blur(10px)', y: 20 }, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.12, ease: 'power3.out' }, 0.4)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const particleCount = 80
    let raf = 0

    const resize = () => {
      const rect = section.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)

      if (particlesRef.current.length === 0) {
        particlesRef.current = Array.from({ length: particleCount }, () => ({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: 1 + Math.random() * 0.5,
        }))
      }
    }

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      }
    }

    const onLeave = () => {
      pointerRef.current.active = false
    }

    const draw = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const particles = particlesRef.current

      context.clearRect(0, 0, width, height)

      for (const particle of particles) {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > width) particle.vx *= -1
        if (particle.y < 0 || particle.y > height) particle.vy *= -1

        if (pointerRef.current.active) {
          const dx = particle.x - pointerRef.current.x
          const dy = particle.y - pointerRef.current.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const force = (100 - distance) / 100
            particle.x += (dx / (distance || 1)) * force * 2
            particle.y += (dy / (distance || 1)) * force * 2
          }
        }
      }

      context.lineWidth = 0.6
      for (let i = 0; i < particles.length; i += 1) {
        const first = particles[i]
        for (let j = i + 1; j < particles.length; j += 1) {
          const second = particles[j]
          const dx = first.x - second.x
          const dy = first.y - second.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            context.strokeStyle = `rgba(78, 133, 191, ${0.18 * (1 - distance / 120)})`
            context.beginPath()
            context.moveTo(first.x, first.y)
            context.lineTo(second.x, second.y)
            context.stroke()
          }
        }
      }

      for (const particle of particles) {
        context.fillStyle = 'rgba(137, 170, 204, 0.7)'
        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fill()
      }

      raf = window.requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative flex min-h-screen w-full items-center overflow-x-hidden pt-28 md:pt-32">
      {/* Background Interactive Canvas (Translated with mouse position for subtle depth) */}
      <motion.div
        style={{ x: canvasX, y: canvasY }}
        className="absolute inset-0 h-full w-full opacity-80 scale-105 pointer-events-none"
      >
        <canvas ref={canvasRef} className="h-full w-full pointer-events-auto" />
      </motion.div>

      {/* Background Parallax Ambient Glows */}
      <motion.div
        style={{ x: glow1X, y: glow1Y }}
        className="absolute left-[8%] top-[15%] -z-10 h-80 w-80 rounded-full bg-[#4E85BF]/15 blur-[95px] pointer-events-none"
      />
      <motion.div
        style={{ x: glow2X, y: glow2Y }}
        className="absolute right-[12%] bottom-[15%] -z-10 h-[400px] w-[400px] rounded-full bg-[#89AACC]/12 blur-[115px] pointer-events-none"
      />

      {/* Parallax micro star glows */}
      <motion.div 
        style={{ x: glow3X, y: glow3Y }}
        className="absolute left-[30%] top-[40%] h-3 w-3 rounded-full bg-[#4E85BF] opacity-40 blur-[2px] pointer-events-none"
      />
      <motion.div 
        style={{ x: glow4X, y: glow4Y }}
        className="absolute right-[40%] top-[60%] h-2 w-2 rounded-full bg-[#89AACC] opacity-35 blur-[1px] pointer-events-none"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-bg/25 via-bg/10 to-bg pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.22] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, rgba(73, 120, 203, 0.14) 0, rgba(73, 120, 203, 0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col gap-12 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        {/* Left Side Content - Subtle translation with mouse */}
        <motion.div
          style={{ x: textX, y: textY }}
          className="max-w-[620px] lg:pt-8"
        >
          {/* Role text with Typewriter animation */}
          <div className="blur-in mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#4E85BF] min-h-[20px] flex items-center">
            <span>{roleText || 'Software Engineer | AI Researcher'}</span>
            <span className="ml-1 h-3.5 w-0.5 bg-[#4E85BF] animate-blink" />
          </div>

          <h1 className="name-reveal text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-text-primary sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Code. Innovate.
            <span className="block bg-gradient-to-r from-[#4E85BF] to-[#89AACC] bg-clip-text text-transparent">Impact.</span>
          </h1>

          <p
            className="blur-in mt-7 max-w-xl text-[20px] font-medium leading-7 text-text-primary/80"
            style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"' }}
          >
            Passionate about building AI-powered products and solving complex problems with clean, efficient code.
          </p>

          <div className="blur-in mt-8 flex flex-wrap gap-4">
            <div className="rounded-full border border-stroke bg-surface px-5 py-3 text-sm text-muted">
              20+ Projects Built
            </div>
            <div className="rounded-full border border-stroke bg-surface px-5 py-3 text-sm text-muted">
              15+ Technologies
            </div>
          </div>

          <div className="blur-in mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              to="/resume"
              className="group relative inline-flex items-center justify-center rounded-full border border-stroke bg-surface/40 backdrop-blur-sm px-8 py-4 text-[16px] font-medium text-text-primary transition-all duration-300 hover:border-[#4E85BF]/85 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#4E85BF]/10 to-[#89AACC]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              Download Resume <span className="ml-2 text-[#4E85BF] transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </Link>
          </div>

          <div className="blur-in mt-12 flex items-center gap-8 text-muted">
            <a href="https://github.com/akshatsoni27" target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-text-primary">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M12 .5C5.7.5.7 5.6.7 11.9c0 5 3.2 9.2 7.7 10.7.6.1.8-.2.8-.6v-2.1c-3.1.7-3.8-1.3-3.8-1.3-.5-1.2-1.3-1.6-1.3-1.6-1-.7.1-.7.1-.7 1.1.1 1.6 1.2 1.6 1.2 1 .1 1.6.7 2 .9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.3-5.1-5.8 0-1.3.4-2.3 1.1-3.1-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3.1 1.1.9-.2 1.8-.3 2.7-.3s1.8.1 2.7.3c2.2-1.5 3.1-1.1 3.1-1.1.6 1.6.2 2.8.1 3.1.7.8 1.1 1.8 1.1 3.1 0 4.5-2.6 5.5-5.1 5.8.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6 4.5-1.5 7.7-5.7 7.7-10.7C23.3 5.6 18.3.5 12 .5Z" />
              </svg>
            </a>
            <a href="https://linkedin.com/in/akshatsoni27" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-text-primary">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M4.8 3.9c0 1.1-.9 2-2.1 2-1.1 0-2-.9-2-2s.9-2 2-2c1.2 0 2.1.9 2.1 2ZM.9 8h3.8v12H.9V8Zm6 0h3.7v1.6h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V20h-3.8v-5.5c0-1.3 0-3-1.8-3-1.9 0-2.2 1.5-2.2 2.9V20H6.9V8Z" />
              </svg>
            </a>
            <a href="https://twitter.com/akshatsoni27" target="_blank" rel="noreferrer" aria-label="Twitter" className="transition-colors hover:text-text-primary">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M18.9 2H22l-6.8 7.7L23.1 22h-6.6l-5.2-6.4L5.7 22H2.6l7.4-8.4L.9 2h6.7l4.8 5.8L18.9 2Zm-1.2 18h1.7L6.6 3.9H4.8L17.7 20Z" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Right Side 3D Parallax Card Stack */}
        <motion.div 
          style={{ 
            x: cardX, 
            y: cardY,
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: 'preserve-3d',
            perspective: 1200,
          }}
          className="relative mx-auto w-full max-w-[340px] sm:max-w-[480px] aspect-[1.1] lg:mx-0 lg:ml-auto lg:mr-0 rounded-[32px] cursor-grab active:cursor-grabbing"
        >
          {/* Layer 1: Main Panel (Base, translateZ(0px)) */}
          <div 
            style={{ 
              transform: 'translateZ(0px)',
              transformStyle: 'preserve-3d'
            }}
            className="absolute left-[7%] top-[5%] w-[85%] h-[80%] rounded-[28px] border border-white/10 bg-surface/60 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5),_0_0_30px_rgba(78,133,191,0.15)] backdrop-blur-md overflow-hidden"
          >
            {/* Glare Sheen Overlay */}
            <motion.div 
              style={{ 
                x: glareX, 
                y: glareY,
                background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 65%)',
                transform: 'translateZ(1px)',
              }}
              className="absolute -inset-[50%] pointer-events-none rounded-[28px] mix-blend-overlay"
            />

            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#4E85BF]/10 via-transparent to-transparent rounded-[28px] pointer-events-none" />
            
            {/* Header bar inside main card */}
            <div className="flex items-center justify-between mb-4 border-b border-stroke/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-wider text-muted font-semibold">Engine Core v2.0</span>
              </div>
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-stroke" />
                <span className="h-1.5 w-1.5 rounded-full bg-stroke" />
                <span className="h-1.5 w-1.5 rounded-full bg-stroke" />
              </div>
            </div>

            {/* Glowing SVG Wave/Graph Backdrop */}
            <div className="relative w-full h-[70%] overflow-hidden rounded-xl border border-stroke/40 bg-bg/50 flex items-center justify-center">
              <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
              
              <svg viewBox="0 0 300 120" className="w-full h-full px-2 text-[#4E85BF] opacity-80">
                <defs>
                  <linearGradient id="area-glow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4E85BF" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#4E85BF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                <line x1="0" y1="30" x2="300" y2="30" stroke="currentColor" strokeWidth="0.2" strokeDasharray="3 3" opacity="0.3" />
                <line x1="0" y1="60" x2="300" y2="60" stroke="currentColor" strokeWidth="0.2" strokeDasharray="3 3" opacity="0.3" />
                <line x1="0" y1="90" x2="300" y2="90" stroke="currentColor" strokeWidth="0.2" strokeDasharray="3 3" opacity="0.3" />
                
                {/* Wavy glowing chart line */}
                <path 
                  d="M 0 90 Q 30 70 60 85 T 120 40 T 180 75 T 240 30 T 300 50 L 300 120 L 0 120 Z" 
                  fill="url(#area-glow)" 
                />
                <path 
                  d="M 0 90 Q 30 70 60 85 T 120 40 T 180 75 T 240 30 T 300 50" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round"
                />
                
                {/* Chart handle dots */}
                <circle cx="120" cy="40" r="3.5" fill="#E5C07B" className="animate-ping" />
                <circle cx="120" cy="40" r="2.5" fill="#4E85BF" />
                <circle cx="240" cy="30" r="2.5" fill="#4E85BF" />
              </svg>
              
              <div className="absolute right-4 top-4 flex flex-col items-end text-[10px] text-muted">
                <span className="font-mono text-green-500 font-bold">● ONLINE</span>
                <span className="text-[8px] uppercase opacity-70">Loss: 0.021</span>
              </div>
            </div>
          </div>

          {/* Layer 2: Floating Code Console (translateZ(45px)) */}
          <div 
            style={{ 
              transform: 'translateZ(45px)',
            }}
            className="absolute left-0 bottom-[6%] w-[62%] rounded-2xl border border-white/10 bg-bg/90 p-4 shadow-[0_15px_35px_rgba(0,0,0,0.6),_0_0_20px_rgba(78,133,191,0.08)] backdrop-blur-xl font-mono text-[9px] sm:text-[10px] leading-relaxed text-muted"
          >
            {/* Window header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-stroke/60">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-[#FF5F56]" />
                <span className="h-2 w-2 rounded-full bg-[#FFBD2E]" />
                <span className="h-2 w-2 rounded-full bg-[#27C93F]" />
              </div>
              <span className="text-[9px] opacity-75 font-sans">optimizer.py</span>
            </div>
            
            {/* Editor Content */}
            <div className="space-y-1 select-none text-left">
              <div>
                <span className="text-[#C678DD]">def</span>{' '}
                <span className="text-[#61AFEF]">train</span><span>(mesh, steps):</span>
              </div>
              <div className="pl-3">
                <span className="text-[#C678DD]">for</span> step{' '}
                <span className="text-[#C678DD]">in</span>{' '}
                <span className="text-[#56B6C2]">range</span>(steps):
              </div>
              <div className="pl-6">
                mesh.adjust_weights()
              </div>
              <div className="pl-6 text-[#98C379]">
                # Optimize gradient flow
              </div>
              <div className="pl-6">
                mesh.tilt_x = <span className="text-[#D19A66]">12.0</span>
              </div>
              <div className="pl-3">
                <span className="text-[#C678DD]">return</span> mesh.loss
              </div>
            </div>
          </div>

          {/* Layer 3: Floating System Monitor (translateZ(80px)) */}
          <div 
            style={{ 
              transform: 'translateZ(80px)',
            }}
            className="absolute right-[2%] top-[10%] w-[42%] rounded-2xl border border-white/10 bg-surface/95 p-4 shadow-[0_15px_35px_rgba(0,0,0,0.5),_0_0_25px_rgba(137,170,204,0.08)] backdrop-blur-xl flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-bold text-muted/60 tracking-wider">SYSTEM STATUS</span>
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            
            <div className="text-left mt-1">
              <span className="text-2xl font-bold font-display text-text-primary tracking-tight">99.8%</span>
              <span className="block text-[8px] text-[#4E85BF] font-semibold uppercase mt-0.5">Model Accuracy</span>
            </div>

            <div className="w-full h-1 bg-stroke rounded-full overflow-hidden mt-1">
              <div className="h-full w-[99.8%] bg-[#4E85BF] shadow-[0_0_8px_#4E85BF]" />
            </div>

            <div className="flex justify-between items-center text-[8px] text-muted/70 mt-1">
              <span>Epoch 42</span>
              <span>142 tok/s</span>
            </div>
          </div>

          {/* Layer 4: Floating Tech Badges (translateZ(105px)) - Hidden on mobile */}
          {/* Badge 1: React */}
          <motion.div
            style={{ transform: 'translateZ(105px) translate3d(-35px, 20px, 0)' }}
            className="absolute -left-8 top-[35%] hidden sm:flex items-center gap-1.5 rounded-full border border-[#61DAFB]/40 bg-surface/90 px-3 py-1.5 text-[10px] font-medium text-[#61DAFB] shadow-xl backdrop-blur-md hover:border-[#61DAFB]/80 transition-colors"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#61DAFB] animate-pulse" />
            React
          </motion.div>

          {/* Badge 2: PyTorch */}
          <motion.div
            style={{ transform: 'translateZ(95px) translate3d(20px, -45px, 0)' }}
            className="absolute right-16 -top-2 hidden sm:flex items-center gap-1.5 rounded-full border border-[#EE4C2C]/40 bg-surface/90 px-3 py-1.5 text-[10px] font-medium text-[#EE4C2C] shadow-xl backdrop-blur-md hover:border-[#EE4C2C]/80 transition-colors"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#EE4C2C]" />
            PyTorch
          </motion.div>

          {/* Badge 3: AI Agents */}
          <motion.div
            style={{ transform: 'translateZ(110px) translate3d(35px, 30px, 0)' }}
            className="absolute -right-6 bottom-[25%] hidden sm:flex items-center gap-1.5 rounded-full border border-[#A855F7]/40 bg-surface/90 px-3 py-1.5 text-[10px] font-medium text-[#A855F7] shadow-xl backdrop-blur-md hover:border-[#A855F7]/80 transition-colors"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7] animate-pulse" />
            AI Agents
          </motion.div>

          {/* Floating Status Badge (translateZ(115px)) */}
          <motion.div 
            style={{ transform: 'translateZ(115px) translate3d(-50%, 15px, 0)' }}
            className="absolute -bottom-2 left-1/2 flex items-center gap-2.5 rounded-full border border-stroke bg-surface/95 px-4.5 py-2.5 text-xs font-medium text-text-primary shadow-2xl backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span>Akshat Soni · Open to work</span>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">SCROLL</span>
        <div className="relative h-10 w-px overflow-hidden bg-stroke">
          <div className="absolute inset-x-0 top-0 h-1/2 animate-scroll-down accent-gradient" />
        </div>
      </div>
    </section>
  )
}