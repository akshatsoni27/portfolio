import { motion } from 'framer-motion'

const experiences = [
  {
    company: 'Company Name',
    role: 'Software Engineer',
    date: '2024 - Present',
    bullets: [
      'Built production UI systems and internal tools with a focus on performance and clarity.',
      'Shipped AI-assisted features that reduced manual workflow time across the team.',
      'Partnered with design and product to tighten release quality and developer experience.',
    ],
    tags: ['React', 'TypeScript', 'Python'],
  },
  {
    company: 'University Lab',
    role: 'Research Assistant',
    date: '2023 - 2024',
    bullets: [
      'Worked on applied machine learning experiments and model evaluation pipelines.',
      'Improved reproducibility with cleaner data processing and experiment tracking.',
      'Presented findings to peers and faculty in concise technical writeups.',
    ],
    tags: ['PyTorch', 'NLP', 'Data'],
  },
  {
    company: 'Product Internship',
    role: 'Full-Stack Developer',
    date: '2022 - 2023',
    bullets: [
      'Delivered features across the stack, from API design to polished frontend states.',
      'Optimized application flow and reduced friction in onboarding and usage.',
      'Collaborated in agile cycles with a strong emphasis on maintainability.',
    ],
    tags: ['Node.js', 'PostgreSQL', 'AWS'],
  },
]

export default function ExperienceSection() {
  return (
    <section className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 lg:px-16">
        <div className="mb-12">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-stroke" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted">Career</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display text-text-primary">
            Where I&apos;ve <em className="italic">worked</em>
          </h2>
        </div>

        <div className="relative pl-10 md:pl-0">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-stroke md:left-1/2" />
          <div className="space-y-10 md:space-y-14">
            {experiences.map((experience, index) => {
              const isEven = index % 2 === 0
              return (
                <motion.article
                  key={experience.company}
                  className={`relative md:flex ${isEven ? 'md:justify-start' : 'md:justify-end'}`}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  <span className="absolute left-4 top-6 z-10 h-3 w-3 rounded-full border-2 border-bg bg-stroke md:left-1/2 md:-translate-x-1/2" />
                  <div className={`w-full md:w-[calc(50%-2rem)] ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className="rounded-2xl border border-stroke bg-surface p-6">
                      <p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted">{experience.date}</p>
                      <h3 className="text-lg font-medium text-text-primary">{experience.company}</h3>
                      <p className="mb-3 font-display italic text-muted">{experience.role}</p>
                      <ul className="space-y-2 text-sm leading-relaxed text-muted">
                        {experience.bullets.map(bullet => (
                          <li key={bullet} className="flex gap-2">
                            <span className="mt-2 h-1 w-1 flex-none rounded-full bg-muted" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {experience.tags.map(tag => (
                          <span key={tag} className="rounded-full border border-stroke px-3 py-1 text-xs text-muted">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}