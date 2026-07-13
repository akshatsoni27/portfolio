import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

type ResumeTab = 'education' | 'experience' | 'skills'

const tabs: Array<{ id: ResumeTab; label: string; icon: JSX.Element }> = [
  {
    id: 'education',
    label: 'Education',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10 12 5 2 10l10 5 10-5Z" />
        <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
      </svg>
    ),
  },
  {
    id: 'experience',
    label: 'Work Experience',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6" />
      </svg>
    ),
  },
]

const education = {
  degree: 'Bachelor of Computer Science',
  school: 'University of California, Santa Cruz',
  date: 'Expected Graduation: March 2026',
  description:
    'Focused on building a strong foundation in computer science while exploring AI, machine learning, and modern software development.',
}

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

const skillGroups = [
  { name: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'C/C++', 'Java', 'SQL', 'Bash'] },
  { name: 'Frameworks', items: ['React', 'Node.js', 'Express', 'FastAPI', 'Flask', 'Next.js'] },
  { name: 'AI/ML', items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'HuggingFace', 'LangChain'] },
  { name: 'Tools', items: ['Git', 'Docker', 'AWS', 'Linux', 'PostgreSQL', 'MongoDB', 'Redis'] },
  { name: 'Other', items: ['REST APIs', 'GraphQL', 'WebSockets', 'CI/CD', 'Agile'] },
]

export default function ResumeSection() {
  const [activeTab, setActiveTab] = useState<ResumeTab>('education')

  const activeContent = useMemo(() => {
    switch (activeTab) {
      case 'education':
        return (
          <motion.div
            key="education"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-[28px] border border-stroke bg-surface p-6 md:p-8"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">Education</p>
                <h3 className="text-2xl font-semibold text-text-primary md:text-3xl">{education.degree}</h3>
                <p className="mt-2 text-lg text-muted">{education.school}</p>
              </div>
              <p className="text-sm font-medium text-[#4E85BF] md:text-right">{education.date}</p>
            </div>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted">{education.description}</p>
          </motion.div>
        )
      case 'experience':
        return (
          <motion.div
            key="experience"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            {experiences.map((experience, index) => (
              <article key={experience.company} className="rounded-[28px] border border-stroke bg-surface p-6 md:p-8">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-text-primary">{experience.company}</h3>
                    <p className="mt-1 text-lg text-muted">{experience.role}</p>
                  </div>
                  <p className="text-sm font-medium text-[#4E85BF]">{experience.date}</p>
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
                  {experience.bullets.map(bullet => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#4E85BF]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {experience.tags.map(tag => (
                    <span key={tag} className="rounded-full border border-stroke bg-bg px-3 py-1 text-xs text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </motion.div>
        )
      case 'skills':
        return (
          <motion.div
            key="skills"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-8"
          >
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {skillGroups.map(group => (
                <div key={group.name} className="rounded-[28px] border border-stroke bg-surface p-6">
                  <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">{group.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map(item => (
                      <span key={item} className="inline-flex items-center gap-2 rounded-full border border-stroke bg-bg px-4 py-2 text-sm text-text-primary">
                        <span className="h-2 w-2 rounded-full bg-[#4E85BF]" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="overflow-hidden rounded-[28px] border border-stroke bg-surface/40 py-4">
              <div className="marquee-track flex w-[200%] gap-3 px-4">
                {[...skillGroups.flatMap(group => group.items), ...skillGroups.flatMap(group => group.items)].map((item, index) => (
                  <span key={`${item}-${index}`} className="rounded-full border border-stroke bg-bg px-4 py-2 text-sm text-muted">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )
    }
  }, [activeTab])

  return (
    <section className="relative bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-muted">Resume</p>
          <h1 className="mt-4 text-5xl font-display font-semibold text-text-primary md:text-6xl">
            Resume
          </h1>
          <p className="mt-5 text-lg text-muted">Student &amp; Full Stack Developer</p>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-[#4E85BF] px-8 py-4 text-base font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#3f74aa]"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v12" />
              <path d="m8 11 4 4 4-4" />
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
            </svg>
            Download Resume
          </a>
        </div>

        <div className="mt-16 rounded-[28px] border border-stroke bg-surface/70 p-2 shadow-[0_20px_80px_rgba(0,0,0,0.18)] backdrop-blur-sm">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {tabs.map(tab => {
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-3 rounded-[20px] px-5 py-4 text-sm font-semibold transition-all duration-300 ${active
                    ? 'bg-[#4E85BF] text-white shadow-lg shadow-[#4E85BF]/25'
                    : 'text-muted hover:bg-bg/80 hover:text-text-primary'
                    }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-12">{activeContent}</div>
      </div>
    </section>
  )
}