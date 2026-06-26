import { motion } from 'framer-motion'

const STATS = [
  { value: '20+', label: 'Repositories' },
  { value: '1.5k+', label: 'Commits' },
  { value: '40+', label: 'Stars Earned' },
]

function buildHeatmap() {
  return Array.from({ length: 52 * 7 }, () => Math.floor(Math.random() * 5))
}

const heatmap = buildHeatmap()

const colors = ['bg-stroke/30', 'bg-[#0e4429]', 'bg-[#006d32]', 'bg-[#26a641]', 'bg-[#39d353]']

export default function StatsSection() {
  return (
    <section className="bg-bg py-16 md:py-20">
      <div className="mx-auto max-w-[900px] px-6 md:px-10 lg:px-16">
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-stroke" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted">Activity</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display text-text-primary">
            GitHub <em className="italic">presence</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {STATS.map(stat => (
            <motion.div
              key={stat.label}
              className="rounded-2xl border border-stroke bg-surface p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="mb-2 text-5xl font-display italic text-text-primary">{stat.value}</div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-stroke bg-surface p-4">
          <div className="grid grid-cols-[auto_1fr] gap-4">
            <div className="flex flex-col justify-between py-1 text-[10px] uppercase tracking-[0.2em] text-muted">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            <div>
              <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-hidden">
                {heatmap.map((cell, index) => (
                  <span key={index} className={`h-3 w-3 rounded-sm ${colors[cell]}`} />
                ))}
              </div>
              <div className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.2em] text-muted">
                <span>Jan</span>
                <span>Mar</span>
                <span>May</span>
                <span>Jul</span>
                <span>Sep</span>
                <span>Nov</span>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <img
              src="https://github-readme-stats.vercel.app/api?username=YOUR_USERNAME&theme=dark&bg_color=0a0a0a&border_color=1f1f1f&title_color=f5f5f5&text_color=878787&icon_color=4E85BF&hide_border=false"
              alt="GitHub stats"
              className="w-full rounded-xl border border-stroke"
            />
            <img
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=YOUR_USERNAME&theme=dark&bg_color=0a0a0a&border_color=1f1f1f&title_color=f5f5f5&text_color=878787&layout=compact"
              alt="Top languages"
              className="w-full rounded-xl border border-stroke"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
