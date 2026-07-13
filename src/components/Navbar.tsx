import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Resume', to: '/resume' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  // Theme state: defaults to dark mode
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme
    return 'dark'
  })

  const navContainerRef = useRef<HTMLDivElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Sync theme with document class and localStorage
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
    } else {
      root.classList.remove('light')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark'
      window.dispatchEvent(new CustomEvent('themechange', { detail: next }))
      return next
    })
  }

  // Calculate sliding indicator styles
  useEffect(() => {
    const updateIndicator = () => {
      if (!navContainerRef.current) return
      const activeLink = navContainerRef.current.querySelector('.nav-link-active') as HTMLElement
      if (activeLink) {
        const containerRect = navContainerRef.current.getBoundingClientRect()
        const linkRect = activeLink.getBoundingClientRect()
        setIndicatorStyle({
          left: linkRect.left - containerRect.left,
          width: linkRect.width,
          opacity: 1,
        })
      } else {
        setIndicatorStyle(prev => ({ ...prev, opacity: 0 }))
      }
    }

    const timer = setTimeout(updateIndicator, 50)
    window.addEventListener('resize', updateIndicator)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateIndicator)
    }
  }, [location.pathname])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <div
        ref={navContainerRef}
        className={`relative inline-flex items-center gap-1 rounded-full border p-1.5 backdrop-blur-md transition-all duration-300 ${theme === 'dark'
            ? 'border-white/10 bg-black/40 shadow-black/35'
            : 'border-black/10 bg-white/40 shadow-black/10'
          } ${scrolled ? 'shadow-lg' : ''}`}
      >
        {/* Sliding background indicator */}
        <div
          className={`absolute top-1.5 bottom-1.5 rounded-full border transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] -z-10 ${theme === 'dark'
              ? 'bg-white/10 border-white/5 shadow-inner'
              : 'bg-black/5 border-black/5 shadow-sm'
            }`}
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
            opacity: indicatorStyle.opacity,
          }}
        />

        {/* Sliding top active marker */}
        <div
          className={`absolute -top-[1.5px] h-[3px] w-8 rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] -translate-x-1/2 ${theme === 'dark'
              ? 'bg-white shadow-[0_0_8px_#fff,0_0_12px_#3b82f6]'
              : 'bg-[#4E85BF] shadow-[0_0_8px_#4E85BF]'
            }`}
          style={{
            left: `${indicatorStyle.left + indicatorStyle.width / 2}px`,
            opacity: indicatorStyle.opacity,
          }}
        />

        {/* Sliding bottom active glow (only in dark mode) */}
        <div
          className="absolute -bottom-1 h-3 rounded-full bg-blue-500/30 blur-md transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] -z-20"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
            opacity: theme === 'dark' ? indicatorStyle.opacity : 0,
          }}
        />

        {NAV_LINKS.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `relative z-10 rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors duration-300 select-none ${isActive
                ? 'text-text-primary nav-link-active'
                : 'text-muted hover:text-text-primary'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}

        <span className={`h-5 w-px mx-1 ${theme === 'dark' ? 'bg-white/15' : 'bg-black/15'}`} />

        <button
          onClick={toggleTheme}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 ${theme === 'dark' ? 'text-muted hover:text-white' : 'text-muted hover:text-black'
            }`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-4.5 w-4.5">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}