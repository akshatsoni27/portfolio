import { useDocumentTitle } from '../hooks/useDocumentTitle'
import ContactForm from '../components/ContactForm'

export default function ContactPage() {
  useDocumentTitle('Contact | Akshat Soni')

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-start px-6 pt-32 pb-16 md:px-10 lg:px-16">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(73, 120, 203, 0.14) 0, rgba(73, 120, 203, 0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-[1100px]">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#4E85BF]">Contact</span>
          <h1 className="text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl md:text-6xl font-display">
            Let&apos;s build something <em className="italic">great</em>.
          </h1>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Contact details */}
          <div className="flex flex-col justify-between gap-8 lg:col-span-5">
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-medium text-text-primary">Contact Details</h2>
              <p className="text-base leading-relaxed text-muted">
                Have an exciting project idea, a job opportunity, or just want to chat about AI and backend engineering? Send a message here or connect through these channels.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:akshatsoni0427@gmail.com"
                  className="flex items-center gap-4 rounded-2xl border border-stroke bg-surface/30 p-4 transition-all duration-300 hover:bg-surface hover:border-text-primary/10"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stroke/50 text-[#4E85BF]">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-muted font-medium">Email</span>
                    <span className="text-sm font-medium text-text-primary">akshatsoni0427@gmail.com</span>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/akshat-soni-/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-stroke bg-surface/30 p-4 transition-all duration-300 hover:bg-surface hover:border-text-primary/10"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stroke/50 text-[#4E85BF]">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-muted font-medium">LinkedIn</span>
                    <span className="text-sm font-medium text-text-primary">linkedin.com/in/akshat-soni-</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 rounded-2xl border border-stroke bg-surface/30 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stroke/50 text-[#4E85BF]">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-muted font-medium">Location</span>
                    <span className="text-sm font-medium text-text-primary">Indore, India</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block text-xs text-muted/60">
              <p>Typically replies within 24 hours.</p>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}