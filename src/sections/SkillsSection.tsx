import { motion } from 'framer-motion'

const categories = [
  { name: 'Languages', items: ['Python', 'JavaScript', 'TypeScript','C/C++', 'SQL'] },
  { name: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS','Vite'] },
  { name: 'Backend', items: ['Node.js', 'Express.js', 'FastAPI'] },
  { name: 'AI / ML', items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Hugging Face', 'LangChain', 'LangGraph', 'Agno', 'RAG', 'Prompt Engineering', 'LLMs','Fine-Tuning'] },
  { name: 'Databases', items: ['MongoDB', 'PostgreSQL'] },
  { name: 'Cloud & DevOps', items: ['Git', 'GitHub','Vercel','CI/CD'] },
  { name: 'Other', items: ['REST APIs','JWT', 'Agile', 'GitHub Actions'] },
]

export default function SkillsSection() {
  return (
    <section className="bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 lg:px-16">
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-stroke" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted">Tech Stack</span>
          </div>
          <h2 className="mb-3 text-4xl md:text-5xl font-display text-text-primary">
            What I <em className="italic">work with</em>
          </h2>
          <p className="text-sm text-muted">Tools and technologies I use to build things.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">{category.name}</p>
              <div className="flex flex-wrap gap-2">
                {category.items.map(item => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full border border-stroke bg-surface/50 px-4 py-2 text-sm text-text-primary transition-all duration-300 hover:border-transparent hover:accent-gradient">
                    <span className="h-2 w-2 rounded-full bg-[#89AACC]" />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}