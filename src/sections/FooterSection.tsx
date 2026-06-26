import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/[yourusername]' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/[yourprofile]' },
  { label: 'Twitter', href: 'https://twitter.com/[yourusername]' },
]

export default function FooterSection() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!marqueeRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 35,
        ease: 'none',
        repeat: -1,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <footer className="overflow-hidden bg-bg pb-10 pt-20 md:pb-14 md:pt-24">
      <div className="mb-16 overflow-hidden">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          {Array.from({ length: 12 }).map((_, index) => (
            <span key={index} className="mr-8 select-none font-display text-4xl italic text-text-primary/8 md:text-6xl lg:text-7xl">
              LET&apos;S BUILD SOMETHING GREAT • 
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">Get in Touch</p>
          <h2 className="mb-6 text-5xl font-display italic text-text-primary md:text-6xl">Let&apos;s talk.</h2>
          <p className="mx-auto mb-10 max-w-sm text-sm text-muted">
            I&apos;m currently open to new opportunities. Whether you have a question, a project idea, or just want to say hi, my inbox is always open.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="mailto:your@email.com"
              className="group relative inline-flex items-center justify-center rounded-full border border-stroke px-6 py-3 text-sm text-text-primary transition-all duration-300 hover:scale-105"
            >
              <span className="absolute inset-[-2px] -z-10 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 accent-gradient" />
              hello@yourdomain.com ↗
            </a>
            <a
              href="https://linkedin.com/in/[yourprofile]"
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center justify-center rounded-full border border-stroke px-6 py-3 text-sm text-text-primary transition-all duration-300 hover:scale-105"
            >
              <span className="absolute inset-[-2px] -z-10 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 accent-gradient" />
              Connect on LinkedIn ↗
            </a>
          </div>
        </div>

        <div className="mt-16 border-t border-stroke pt-8">
          <div className="grid gap-6 md:grid-cols-3 md:items-center">
            <div className="flex items-center gap-3 text-xs text-muted">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-stroke bg-surface font-display italic text-text-primary">AI</div>
              <span>Built with React &amp; ♥</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-xs text-muted">
              <Link to="/" className="hover:text-text-primary">Home</Link>
              <Link to="/projects" className="hover:text-text-primary">Projects</Link>
              <Link to="/resume" className="hover:text-text-primary">Resume</Link>
              <Link to="/contact" className="hover:text-text-primary">Contact</Link>
            </div>

            <div className="flex items-center justify-center gap-4 md:justify-end">
              {SOCIAL_LINKS.map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="text-xs text-muted transition-colors hover:text-text-primary">
                  {link.label}
                </a>
              ))}
              <span className="flex items-center gap-2 text-xs text-muted">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Available for work
              </span>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted/40">© 2026 [YOUR NAME]. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
