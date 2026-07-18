import { useDocumentTitle } from '../hooks/useDocumentTitle'
import ContactForm from '../components/ContactForm'
import Iridescence from '../components/Iridescence'

export default function ContactPage() {
  useDocumentTitle('Contact | Akshat Soni')

  return (
    <>
      {/* ── Hero — same pattern as Resume page ── */}
      <section className="relative bg-bg pt-20 pb-8 md:pt-28 md:pb-10 overflow-hidden flex flex-col justify-center items-center">
        {/* Iridescent animated background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Iridescence
            color={[0.8, 0.9, 1.2]}
            mouseReact={true}
            amplitude={0.15}
            speed={0.8}
          />
        </div>
        {/* Gradient overlay: fades to bg at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-bg/60 to-bg z-0 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1100px] px-6 md:px-10 lg:px-16 w-full text-center">
          <div className="mx-auto max-w-3xl mb-6">
            <h1 className="text-5xl font-display font-semibold text-text-primary md:text-6xl">
              GET IN TOUCH
            </h1>
            <p className="mt-5 text-xl text-muted">
              Open to new opportunities&nbsp;•&nbsp;Seeking full-time positions&nbsp;•&nbsp;Ready to make an impact
            </p>
          </div>
        </div>
      </section>

      {/* ── Main content — dark background ── */}
      <section className="bg-bg pt-8 pb-24 md:pt-10 md:pb-32">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

            {/* ── Left column ── */}
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-bold text-text-primary">Let's Start a Conversation</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Looking for exciting career opportunities where I can contribute my skills and grow
                  professionally. I'm eager to connect with{' '}
                  <span className="text-[#2563EB]">recruiters</span>, hiring managers, and industry
                  professionals. Let's discuss how I can{' '}
                  <span className="text-[#2563EB]">add value</span> to your team.
                </p>
              </div>

              {/* Contact info cards */}
              <div className="grid grid-cols-2 gap-3">
                {/* Email */}
                <a
                  href="mailto:akshatsoni0427@gmail.com"
                  className="flex items-center gap-3 rounded-xl border border-stroke bg-surface/50 p-4 transition hover:border-stroke/80 hover:bg-surface"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-[#2563EB]">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-text-primary">Email Address</p>
                    <p className="mt-0.5 break-all text-[11px] text-muted">akshatsoni0427@gmail.com</p>
                  </div>
                </a>

                {/* Phone */}
                <div className="flex items-center gap-3 rounded-xl border border-stroke bg-surface/50 p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-[#2563EB]">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12 19.79 19.79 0 0 1 1.65 3.1 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.96-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-text-primary">Phone Number</p>
                    <p className="mt-0.5 text-[11px] text-muted">+91 99999 99999</p>
                  </div>
                </div>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/akshat-soni-/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-stroke bg-surface/50 p-4 transition hover:border-stroke/80 hover:bg-surface"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-[#2563EB]">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-text-primary">LinkedIn</p>
                    <p className="mt-0.5 text-[11px] text-muted">Akshat Soni</p>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/akshat-soni"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-stroke bg-surface/50 p-4 transition hover:border-stroke/80 hover:bg-surface"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-[#2563EB]">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-text-primary">GitHub</p>
                    <p className="mt-0.5 text-[11px] text-muted">@akshat-soni</p>
                  </div>
                </a>

                {/* Location — centred, spans both columns */}
                <div className="col-span-2 flex justify-center">
                  <div className="flex w-1/2 items-center gap-3 rounded-xl border border-stroke bg-surface/50 p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-[#2563EB]">
                      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-text-primary">Location</p>
                      <p className="mt-0.5 text-[11px] text-muted">Indore, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connect With Me icons */}
              <div>
                <p className="mb-3 text-sm font-semibold text-text-primary">Connect With Me</p>
                <div className="flex items-center gap-3">
                  <a href="mailto:akshatsoni0427@gmail.com" aria-label="Email"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-stroke bg-surface/50 text-red-400 transition hover:bg-surface">
                    <svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </a>
                  <a href="tel:+919999999999" aria-label="Phone"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-stroke bg-surface/50 text-green-400 transition hover:bg-surface">
                    <svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12 19.79 19.79 0 0 1 1.65 3.1 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.96-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/akshat-soni-/" target="_blank" rel="noreferrer" aria-label="LinkedIn"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-stroke bg-surface/50 text-[#2563EB] transition hover:bg-surface">
                    <svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <a href="https://github.com/akshat-soni" target="_blank" rel="noreferrer" aria-label="GitHub"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-stroke bg-surface/50 text-purple-400 transition hover:bg-surface">
                    <svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </a>
                  <a href="/Deloitte Certification.pdf" target="_blank" rel="noreferrer" aria-label="Resume"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-stroke bg-surface/50 text-yellow-400 transition hover:bg-surface">
                    <svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* ── Right column — form ── */}
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
