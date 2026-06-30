import { motion } from 'framer-motion'

const PROJECTS = [
  {
    title: 'Automotive Motion',
    tags: ['Film', 'Direction'],
    span: 7,
    aspect: 'aspect-[4/3]',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80',
  },
  {
    title: 'Urban Architecture',
    tags: ['Photography', 'Design'],
    span: 5,
    aspect: 'aspect-[3/4]',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  },
  {
    title: 'Human Perspective',
    tags: ['Portrait', 'Campaign'],
    span: 5,
    aspect: 'aspect-[3/4]',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
  },
  {
    title: 'Brand Identity',
    tags: ['Branding', 'Strategy'],
    span: 7,
    aspect: 'aspect-[4/3]',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  },
]

const inViewVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function WorksSection() {
  return (
    <section id="work" className="bg-bg py-12 md:py-16">
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
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">Selected Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-text-primary mb-2">
              Featured <em className="italic">projects</em>
            </h2>
            <p className="text-sm text-muted font-body max-w-sm mt-2">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>

          <a
            href="#"
            className="group hidden md:inline-flex items-center gap-2 rounded-full border border-stroke px-5 py-2.5 text-sm text-muted hover:text-text-primary transition-colors duration-300 font-body relative overflow-visible"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            View all work <span>→</span>
          </a>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              className={`md:col-span-${project.span} group relative rounded-3xl overflow-hidden bg-surface border border-stroke cursor-pointer ${project.aspect}`}
              variants={inViewVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Halftone overlay */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-multiply"
                style={{
                  backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                  backgroundSize: '4px 4px',
                }}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 transition-opacity duration-400 backdrop-blur-sm" />

              {/* Hover label */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="relative rounded-full overflow-visible">
                  <span className="absolute inset-[-2px] rounded-full accent-gradient -z-10" />
                  <div className="bg-text-primary rounded-full px-5 py-2.5 text-sm font-body text-bg">
                    View — <em className="font-display italic">{project.title}</em>
                  </div>
                </div>
              </div>

              {/* Bottom tags */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs text-muted/80 bg-bg/60 rounded-full px-2.5 py-1 font-body backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
