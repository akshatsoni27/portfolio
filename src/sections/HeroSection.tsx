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
    <section ref={sectionRef} className="relative flex min-h-screen w-full items-center overflow-hidden pt-28 md:pt-32">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/25 via-bg/10 to-bg" />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, rgba(73, 120, 203, 0.14) 0, rgba(73, 120, 203, 0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col gap-12 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="max-w-[620px] lg:pt-8">
          <div className="blur-in mb-5 text-xs font-medium uppercase tracking-[0.28em] text-[#4E85BF]">
            Software Engineer | AI Researcher
          </div>

          <h1 className="name-reveal text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-text-primary sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Code. Innovate.
            <span className="block text-[#4E85BF]">Impact.</span>
          </h1>

          <p
            className="blur-in mt-7 max-w-xl text-[20px] font-medium leading-7 text-[rgb(229,231,235)]"
            style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"' }}
          >
            Passionate about building AI-powered products and solving complex problems with clean, efficient code.
          </p>

          <div className="blur-in mt-8 flex flex-wrap gap-4">
            <div className="rounded-full border border-[#2f4c86]/70 bg-[#0b1020]/80 px-5 py-3 text-sm text-[#d1d5db] shadow-[0_0_0_1px_rgba(78,133,191,0.15),0_0_20px_rgba(78,133,191,0.08)]">
              20+ Projects Built
            </div>
            <div className="rounded-full border border-[#1f2937] bg-black/40 px-5 py-3 text-sm text-[#d1d5db]">
              15+ Technologies
            </div>
          </div>

          <div className="blur-in mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              to="/resume"
              className="inline-flex items-center justify-center rounded-full border border-[#2f4c86] bg-transparent px-8 py-4 text-[16px] font-medium text-[#e5e7eb] transition-all duration-300 hover:border-[#4E85BF] hover:bg-[#0b1020]"
            >
              Download Resume <span className="ml-2 text-[#4E85BF]">↓</span>
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
        </div>

        <div className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:ml-auto lg:mr-0">
          <div className="relative overflow-hidden rounded-[32px] border border-[#2f4c86]/80 bg-[#060b17] p-4 shadow-[0_0_0_1px_rgba(78,133,191,0.18),0_20px_80px_rgba(0,0,0,0.55)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4E85BF]/10 via-transparent to-transparent" />
            <div className="absolute right-4 top-4 h-24 w-24 rounded-full bg-[#4E85BF]/10 blur-2xl" />
            <div className="grid place-items-center rounded-[24px] border border-[#2f4c86]/60 bg-[radial-gradient(circle_at_top,rgba(78,133,191,0.12),transparent_52%)] p-3">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[28px] border border-[#4E85BF]/80 bg-[#0a0f19]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.08),transparent_45%)]" />
                <div className="absolute inset-y-6 right-3 w-2 rounded-full bg-[#4E85BF]/70" />
                <div className="absolute inset-0 flex items-end justify-center p-6">
                  <div className="relative h-[88%] w-[82%] rounded-[40px] bg-gradient-to-b from-white/10 via-white/5 to-transparent backdrop-blur-sm">
                    <div className="absolute inset-x-0 bottom-0 top-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))]" />
                    <div className="absolute left-1/2 top-10 h-[75%] w-[78%] -translate-x-1/2 rounded-[48px] bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.25),rgba(255,255,255,0.05)_25%,rgba(0,0,0,0.0)_55%),linear-gradient(180deg,rgba(255,255,255,0.18),rgba(0,0,0,0.0))] opacity-90" />
                    <div className="absolute left-1/2 top-8 h-[86%] w-[72%] -translate-x-1/2 rounded-[52px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.15),rgba(0,0,0,0.05))] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]" />
                    <div className="absolute bottom-8 left-1/2 h-16 w-44 -translate-x-1/2 rounded-full bg-black/55 blur-xl" />
                  </div>
                </div>
                <div className="absolute inset-0 border border-[#4E85BF]/30" />
              </div>
            </div>
            <div className="absolute -right-6 top-6 hidden h-40 w-40 rounded-full border border-[#4E85BF]/25 md:block" />
            <div className="absolute -left-4 top-12 hidden grid-cols-6 gap-2 md:grid">
              {Array.from({ length: 36 }).map((_, index) => (
                <span key={index} className="h-1.5 w-1.5 rounded-sm bg-[#4E85BF]/80 shadow-[0_0_8px_rgba(78,133,191,0.55)]" />
              ))}
            </div>
          </div>

          <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-[#2f4c86]/70 bg-[#0b1020]/95 px-5 py-3 text-sm text-[#d1d5db] shadow-[0_0_0_1px_rgba(78,133,191,0.12)] backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <span>Akshat Soni · Open to work</span>
          </div>
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