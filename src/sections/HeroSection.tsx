import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import { useTypewriter } from '../hooks/useTypewriter'

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

    const resize = () => {
      const rect = section.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)

      if (particlesRef.current.length === 0) {
        particlesRef.current = Array.from({ length: particleCount }).map(() => ({
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

    let raf = 0

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
            context.strokeStyle = `hsla(0, 0%, 12%, ${1 - distance / 120})`
            context.beginPath()
            context.moveTo(first.x, first.y)
            context.lineTo(second.x, second.y)
            context.stroke()
          }
        }
      }

      for (const particle of particles) {
        context.fillStyle = 'hsla(0, 0%, 12%, 0.9)'
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
    <section ref={sectionRef} className="relative flex min-h-screen w-full items-center justify-center overflow-hidden pt-28 md:pt-32">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-bg/10 to-bg" />

      <div className="absolute left-6 top-28 z-10 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted md:left-10 md:top-32">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
        </span>
        Available for opportunities
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="blur-in mb-6 text-lg text-white uppercase tracking-[0.3em] text-muted">I'm</p>

        <h1 className="name-reveal mb-4 font-display text-6xl italic leading-[0.9] tracking-tight text-text-primary md:text-8xl lg:text-9xl">
          Akshat Soni
        </h1>

        <p className="blur-in mb-10 text-base text-muted md:text-lg">
          I&apos;m a <span className="font-display italic text-text-primary/90">{roleText || 'Software Engineer'}</span><span className="ml-1 inline-block h-[1em] w-[1px] translate-y-[2px] bg-text-primary/70 animate-blink" />
        </p>

        <p className="blur-in mx-auto mb-12 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          Building intelligent systems and elegant interfaces — where performance meets purpose.
        </p>

        <div className="blur-in flex flex-wrap justify-center gap-5 sm:gap-6">
          <Link
            to="/projects"
            className="group relative overflow-visible rounded-full bg-text-primary px-7 py-3.5 text-sm font-medium text-bg transition-all duration-300 hover:scale-105"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10 rounded-full bg-text-primary px-7 py-3.5 text-bg transition-colors duration-300 group-hover:bg-bg group-hover:text-text-primary">
              View Projects
            </span>
          </Link>

          <Link
            to="/contact"
            className="group relative overflow-visible rounded-full border-2 border-stroke px-7 py-3.5 text-sm font-medium text-text-primary transition-all duration-300 hover:scale-105"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10">Get in touch</span>
          </Link>
        </div>

        <div className="blur-in mt-14 flex justify-center gap-8 text-muted">
          <a href="https://github.com/[yourusername]" target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-text-primary">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M12 .5C5.7.5.7 5.6.7 11.9c0 5 3.2 9.2 7.7 10.7.6.1.8-.2.8-.6v-2.1c-3.1.7-3.8-1.3-3.8-1.3-.5-1.2-1.3-1.6-1.3-1.6-1-.7.1-.7.1-.7 1.1.1 1.6 1.2 1.6 1.2 1 .1 1.6.7 2 .9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.3-5.1-5.8 0-1.3.4-2.3 1.1-3.1-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3.1 1.1.9-.2 1.8-.3 2.7-.3s1.8.1 2.7.3c2.2-1.5 3.1-1.1 3.1-1.1.6 1.6.2 2.8.1 3.1.7.8 1.1 1.8 1.1 3.1 0 4.5-2.6 5.5-5.1 5.8.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6 4.5-1.5 7.7-5.7 7.7-10.7C23.3 5.6 18.3.5 12 .5Z" />
            </svg>
          </a>
          <a href="https://linkedin.com/in/[yourprofile]" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-text-primary">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
              <path d="M4.8 3.9c0 1.1-.9 2-2.1 2-1.1 0-2-.9-2-2s.9-2 2-2c1.2 0 2.1.9 2.1 2ZM.9 8h3.8v12H.9V8Zm6 0h3.7v1.6h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.6 4.7 6V20h-3.8v-5.5c0-1.3 0-3-1.8-3-1.9 0-2.2 1.5-2.2 2.9V20H6.9V8Z" />
            </svg>
          </a>
          
        </div>
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