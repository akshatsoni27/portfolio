import { motion } from 'framer-motion'

const stats = [
  { value: '20+', label: 'Projects Built' },
  { value: '15+', label: 'Technologies' },
]

export default function AboutSection() {
  return (
    <section className="bg-bg py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-[1100px] px-6 md:px-10 lg:px-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-stroke" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted">About Me</span>
            </div>
            <h2 className="mb-5 text-4xl md:text-5xl font-display text-text-primary">
              Who I <em className="italic">am</em>
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-muted md:text-base">
              I&apos;m a Software Engineer / AI Researcher based in Santa Cruz, CA, passionate about building things that live at the intersection of AI and software engineering. Currently pursuing my degree at the University of California, Santa Cruz (UCSC), I work on applied machine learning and product-focused systems. I love writing clean, efficient code and thinking carefully about system design and user experience. Outside of tech, I&apos;m into photography, reading, and long walks.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {stats.map(stat => (
                <span key={stat.label} className="rounded-full border border-stroke px-4 py-2 text-sm text-muted">
                  {stat.value} {stat.label}
                </span>
              ))}
            </div>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex rounded-full border border-stroke px-6 py-3 text-sm text-muted transition-colors hover:text-text-primary"
            >
              <span className="absolute inset-[-2px] -z-10 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 accent-gradient" />
              Download Resume
            </a>
          </div>

          <div className="relative mx-auto w-full max-w-[280px]">
            <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-stroke bg-surface">
              <img src="/profile.jpg" alt="Profile" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-text-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-stroke bg-bg/80 px-3 py-1.5 text-xs backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Rajat Maheshwari · Open to work
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}