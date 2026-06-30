import { Link } from 'react-router-dom'

export default function FooterSection() {
  return (
    <footer className="w-full bg-[#050505] border-t border-stroke">
      <div className="mx-auto max-w-[1200px] px-6 pt-12 pb-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-20">
          {/* Column 1: Intro */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xl font-semibold text-text-primary">Akshat Soni</h3>
            <p className="text-base leading-relaxed text-muted">
              Computer Science senior at UCSC passionate about AI, LLMs, and backend engineering. Currently seeking <strong className="font-semibold text-text-primary">full-time opportunities</strong> in software engineering and AI research.
            </p>
            <div className="flex flex-wrap gap-3 mt-1">
              <a
                href="mailto:akshatsoni0427@gmail.com"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0d0d0d] text-muted transition-all duration-300 hover:border-white/25 hover:bg-[#151515] hover:text-text-primary"
                aria-label="Email"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
              <a
                href="tel:+18313468559"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0d0d0d] text-muted transition-all duration-300 hover:border-white/25 hover:bg-[#151515] hover:text-text-primary"
                aria-label="Phone"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/akshatsoni27"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0d0d0d] text-muted transition-all duration-300 hover:border-white/25 hover:bg-[#151515] hover:text-text-primary"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://github.com/akshatsoni27"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0d0d0d] text-muted transition-all duration-300 hover:border-white/25 hover:bg-[#151515] hover:text-text-primary"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0d0d0d] text-muted transition-all duration-300 hover:border-white/25 hover:bg-[#151515] hover:text-text-primary"
                aria-label="Resume"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10,9 9,9 8,9" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xl font-semibold text-text-primary">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/" className="text-base text-muted transition-colors duration-200 hover:text-text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-base text-muted transition-colors duration-200 hover:text-text-primary">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/resume" className="text-base text-muted transition-colors duration-200 hover:text-text-primary">
                  Resume
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-muted transition-colors duration-200 hover:text-text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Get In Touch */}
          <div className="flex flex-col gap-5">
            <h3 className="text-xl font-semibold text-text-primary">Get In Touch</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="mailto:akshatsoni0427@gmail.com" className="flex items-center gap-3 text-base text-muted transition-colors duration-200 hover:text-text-primary">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] flex-shrink-0 text-[#4E85BF]">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>akshatsoni0427@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+18313468559" className="flex items-center gap-3 text-base text-muted transition-colors duration-200 hover:text-text-primary">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] flex-shrink-0 text-[#4E85BF]">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>+1 (831) 346-8559</span>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/akshatsoni27" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-base text-muted transition-colors duration-200 hover:text-text-primary">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] flex-shrink-0 text-[#4E85BF]">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <span>linkedin.com/in/akshatsoni27</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/akshatsoni27" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-base text-muted transition-colors duration-200 hover:text-text-primary">
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] flex-shrink-0 text-[#4E85BF]">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  <span>github.com/akshatsoni27</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-base text-muted">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] flex-shrink-0 text-[#4E85BF]">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Santa Cruz, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-6 text-center text-xs text-muted/40">
          <p>© 2026 Akshat Soni. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
