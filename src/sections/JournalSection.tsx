import { motion } from 'framer-motion'

const ENTRIES = [
  {
    title: 'The Art of Visual Storytelling in Motion Design',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80',
    readTime: '5 min read',
    date: 'Jan 12, 2026',
  },
  {
    title: 'Why Typography is the Backbone of Every Great Brand',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=200&q=80',
    readTime: '4 min read',
    date: 'Dec 28, 2025',
  },
  {
    title: 'Building Micro-interactions That Users Actually Notice',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=200&q=80',
    readTime: '6 min read',
    date: 'Nov 15, 2025',
  },
  {
    title: 'From Brief to Build: My Design-to-Code Workflow',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&q=80',
    readTime: '8 min read',
    date: 'Oct 3, 2025',
  },
]

const inViewVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function JournalSection() {
  return (
    <section id="journal" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-10 md:mb-14"
          variants={inViewVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">Journal</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-text-primary mb-2">
              Recent <em className="italic">thoughts</em>
            </h2>
            <p className="text-sm text-muted font-body max-w-sm mt-2">
              Reflections on design, technology, and the creative process.
            </p>
          </div>

          <a
            href="#"
            className="group hidden md:inline-flex items-center gap-2 rounded-full border border-stroke px-5 py-2.5 text-sm text-muted hover:text-text-primary transition-colors duration-300 font-body relative overflow-visible"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            View all <span>→</span>
          </a>
        </motion.div>

        {/* Entries */}
        <div className="flex flex-col gap-3">
          {ENTRIES.map((entry, i) => (
            <motion.a
              key={entry.title}
              href="#"
              className="group flex items-center gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full transition-colors duration-300"
              variants={inViewVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              {/* Image */}
              <img
                src={entry.image}
                alt={entry.title}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />

              {/* Title */}
              <p className="flex-1 text-sm md:text-base text-text-primary font-body group-hover:text-text-primary/80 transition-colors line-clamp-1">
                {entry.title}
              </p>

              {/* Meta */}
              <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
                <span className="text-xs text-muted font-body">{entry.readTime}</span>
                <span className="w-px h-3 bg-stroke" />
                <span className="text-xs text-muted font-body">{entry.date}</span>
              </div>

              {/* Arrow */}
              <span className="text-muted group-hover:text-text-primary transition-colors ml-2">↗</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
