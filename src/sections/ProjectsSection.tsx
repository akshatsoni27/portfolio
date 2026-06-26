import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Vision Assistant',
    category: 'AI/ML',
    description: 'An assistant that combines computer vision and language models to help users inspect and summarize visual scenes in real time.',
    tags: ['Python', 'PyTorch', 'FastAPI', 'React'],
    github: 'https://github.com/[yourusername]',
    live: 'https://example.com',
  },
  {
    title: 'Workflow Studio',
    category: 'Full-Stack',
    description: 'A collaborative platform for building, tracking, and shipping product workflows with a clean operational dashboard.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com/[yourusername]',
    live: 'https://example.com',
  },
  {
    title: 'System Monitor',
    category: 'Systems',
    description: 'A lightweight observability tool for capturing process health, logs, and performance signals on Linux environments.',
    tags: ['C', 'Linux', 'Multithreading'],
    github: 'https://github.com/[yourusername]',
    live: 'https://example.com',
  },
  {
    title: 'NLP Playground',
    category: 'NLP',
    description: 'A set of semantic search and prompt tooling experiments for rapid prototyping of language interfaces.',
    tags: ['Python', 'HuggingFace', 'LangChain'],
    github: 'https://github.com/[yourusername]',
    live: 'https://example.com',
  },
  {
    title: 'Game AI Lab',
    category: 'Game AI',
    description: 'A collection of reinforcement learning experiments and simulation toys used to test simple decision agents.',
    tags: ['Python', 'Q-Learning', 'Pygame'],
    github: 'https://github.com/[yourusername]',
    live: 'https://example.com',
  },
  {
    title: 'Forecast Engine',
    category: 'Data',
    description: 'A forecasting toolkit for analyzing time-series trends and presenting them in a compact, visual workflow.',
    tags: ['Python', 'ARIMA', 'Pandas', 'Matplotlib'],
    github: 'https://github.com/[yourusername]',
    live: 'https://example.com',
  },
]

export default function ProjectsSection() {
  return (
    <section className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-stroke" />
              <span className="text-xs uppercase tracking-[0.3em] text-muted">Work</span>
            </div>
            <h2 className="mb-3 text-4xl md:text-5xl font-display text-text-primary">
              Things I&apos;ve <em className="italic">built</em>
            </h2>
            <p className="text-sm text-muted">A few selected projects that mix product thinking, engineering, and experimentation.</p>
          </div>

          <a href="https://github.com/[yourusername]" target="_blank" rel="noreferrer" className="hidden rounded-full border border-stroke px-5 py-2.5 text-sm text-muted transition-colors hover:text-text-primary md:inline-flex">
            View all on GitHub →
          </a>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.08 }}
              viewport={{ once: true, margin: '-80px' }}
              className="group flex cursor-pointer flex-col rounded-2xl border border-stroke bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-[0_0_0_1px_rgba(137,170,204,0.7)]"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div className="flex gap-3 normal-case tracking-normal">
                  <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-text-primary">GitHub ↗</a>
                  <a href={project.live} target="_blank" rel="noreferrer" className="hover:text-text-primary">Live ↗</a>
                </div>
              </div>

              <div className="mt-5 flex h-10 w-10 items-center justify-center rounded-xl bg-stroke/50 text-lg">
                <span>📁</span>
              </div>

              <h3 className="mt-4 text-lg font-medium text-text-primary">{project.title}</h3>
              <p className="mb-5 mt-2 flex-1 text-sm leading-relaxed text-muted">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map(tag => (
                  <span key={tag} className="rounded-full border border-stroke px-3 py-1 text-xs text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}