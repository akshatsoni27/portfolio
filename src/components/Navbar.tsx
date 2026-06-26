import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Resume', to: '/resume' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
        <div
          className={`inline-flex items-center gap-1 rounded-full border border-white/10 bg-surface/95 px-2 py-2 backdrop-blur-md transition-shadow duration-300 ${
            scrolled ? 'shadow-md shadow-black/20' : ''
          }`}
        >
          {/* <Link to="/" className="group relative flex h-9 w-9 items-center justify-center rounded-full" aria-label="Home" onClick={() => setMenuOpen(false)}>
            <span className="absolute inset-0 rounded-full accent-gradient transition-transform duration-300 group-hover:scale-110" />
            <span className="relative z-10 flex h-[calc(100%-2px)] w-[calc(100%-2px)] items-center justify-center rounded-full bg-bg font-display text-[13px] italic leading-none text-text-primary">
              AI
            </span>
          </Link> */}

          <span className="hidden h-5 w-px bg-stroke md:block" />

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
                    isActive ? 'bg-stroke/50 text-text-primary' : 'text-muted hover:bg-stroke/50 hover:text-text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <span className="hidden h-5 w-px bg-stroke md:block" />

          <Link to="/resume" onClick={() => setMenuOpen(false)} className="group relative hidden overflow-visible rounded-full px-4 py-2 text-sm text-text-primary md:inline-flex">
            <span className="absolute inset-[-2px] -z-10 rounded-full bg-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 accent-gradient" />
            <span className="relative z-10 flex items-center gap-1 rounded-full bg-surface px-4 py-2">
              Resume <span className="text-muted">↗</span>
            </span>
          </Link>

          <button
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-stroke text-muted md:hidden"
            onClick={() => setMenuOpen(open => !open)}
            aria-label="Open menu"
          >
            <span className="flex flex-col gap-1.5">
              <span className="h-px w-4 bg-current" />
              <span className="h-px w-4 bg-current" />
            </span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-bg/95 px-6 pt-24 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-md flex-col gap-3">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl border px-5 py-4 text-left text-lg transition-colors ${
                    isActive ? 'border-stroke bg-surface text-text-primary' : 'border-stroke bg-bg text-muted'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  )
}