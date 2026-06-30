import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function ContactPage() {
  useDocumentTitle('Contact | Akshat Soni')

  return (
    <section className="relative flex min-h-[65vh] w-full flex-col items-center justify-center px-6 pt-32 pb-16">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(73, 120, 203, 0.14) 0, rgba(73, 120, 203, 0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#4E85BF]">Contact</span>
        <h1 className="mb-6 text-5xl font-semibold tracking-tight text-text-primary sm:text-6xl">
          Let&apos;s build something <span className="text-[#4E85BF]">great</span>.
        </h1>
        <p className="mx-auto max-w-lg text-lg text-muted">
          I&apos;m currently open to new opportunities, research collaborations, or just a friendly chat. Feel free to reach out via any of the channels in the footer below!
        </p>
      </div>
    </section>
  )
}