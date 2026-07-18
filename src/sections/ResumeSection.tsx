import { useMemo, useState, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Iridescence from '../components/Iridescence'

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

interface Education {
  degree: string
  school: string
  years: string
  date: string
  description?: string
  gpa?: string
  awards?: string
  coursework?: string
}

const education: Education = {
  degree: 'Bachelor of Technology',
  school: 'Acropolis Institute of Technology & Research, Indore',
  years: '2022 - 2026',
  date: 'Graduation: June 2026',
  // coursework: 'Data Structures, Analysis of Algorithms, Database Management Systems, Software Engineering, Machine Learning, Web Technologies',
  description:
    'Building a strong foundation in computer science, software engineering, artificial intelligence, machine learning, and full-stack development. Actively developing AI-powered applications, LLM-based solutions, and scalable web technologies through academic and personal projects.',
}

const experiences = [
  {
    company: 'Gerado',
    role: 'Co-Founder & AI Engineer',
    date: '2026 - Present',
    bullets: [
      'Built production UI systems and internal tools with a focus on performance and clarity.',
      'Shipped AI-assisted features that reduced manual workflow time across the team.',
      'Partnered with design and product to tighten release quality and developer experience.',
    ],
    tags: ['React', 'TypeScript', 'Python'],
  },
  {
    company: 'IEEE Computational Intelligence Society (CIS)',
    role: 'Chair',
    date: 'Jan 2024 - Dec 2025',
    bullets: [
      ' Spearheaded 10+ workshops & hackathons, leading a 5–8 member team and boosting participation by 35%+',
      ' Organized 8+ industry sessions, engaging 500+ students and strengthening industry exposure',
      ' Optimized operational workflows, accelerating event execution speed by ~25% and minimizing delays',
      ' Improved cross-device compatibility, reducing UI issues by ~40% through responsive design practices',
    ],
    tags: ['Leadership', 'Communication', 'Event Management', 'Teamwork'],
  },
  {
    company: 'TechFest 2024 & TechFest 2025',
    role: 'Event Lead',
    date: '2024 - 2025',
    bullets: [
      'Launched a responsive event platform serving 3000+ users, ensuring seamless access and navigation',
      'Enhanced cross-device performance, cutting UI issues by ~40% through responsive design optimization',
      'Architected 3+ core modules (registration, scheduling, sponsors), handling 1000+ user interactions.',
    ],
    tags: ['Web Developer', 'Event Head'],
  },
]

const skillGroups = [
  { name: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'C/C++', 'SQL'] },
  { name: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Vite'] },
  { name: 'Backend', items: ['Node.js', 'Express.js', 'FastAPI'] },
  { name: 'AI / ML', items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Hugging Face', 'LangChain', 'LangGraph', 'Agno', 'RAG', 'Prompt Engineering', 'LLMs', 'Fine-Tuning'] },
  { name: 'Databases', items: ['MongoDB', 'PostgreSQL'] },
  { name: 'Cloud & DevOps', items: ['Git', 'GitHub', 'Vercel', 'CI/CD'] },
  { name: 'Other', items: ['REST APIs', 'JWT', 'Agile', 'GitHub Actions'] },
]

const certifications = [
  {
    title: 'Google AI Professional Certificate',
    issuer: 'Google',
    date: 'May 2026',
    description: 'Mastered AI fundamentals, prompt engineering, AI-assisted development, and practical AI workflows.',
    link: 'https://www.coursera.org/account/accomplishments/professional-cert/JFY57A0LIDXK',
  },
  {
    title: 'Fundamentals of Deep Learning',
    issuer: 'NVIDIA',
    date: 'Nov 2025',
    description: 'Learned neural networks, deep learning fundamentals, and GPU-accelerated AI model development.',
    link: 'https://learn.nvidia.com/certificates?id=9fHFKxjvSJufcT9bn12pzg',
  },
  {
    title: 'Deloitte Australia Data Analytics Job Simulation',
    issuer: 'Forage',
    date: 'July 2025',
    description: 'Solved real-world business cases using data analysis and forensic technology techniques.',
    link: '/Deloitte Certification.pdf',
  },
  {
    title: 'Python for Data Science',
    issuer: 'NPTEL',
    date: 'July 2025',
    description: 'Built a strong foundation in Python programming for data analysis and machine learning.',
    link: '/NPTEL Python for Data Science.pdf',
  },
]
export default function ResumeSection() {
  const [activeTab, setActiveTab] = useState<ResumeTab>('education')

  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end 80%'],
  })
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  const arrowY = useTransform(scrollYProgress, [0, 1], ['80px', '100%'])

  const activeContent = useMemo(() => {
    switch (activeTab) {
      case 'education':
        return (
          <motion.div
            key="education"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full"
          >
            {/* Header above card */}
            <div className="flex items-center justify-center gap-3 mb-8 text-2xl md:text-3xl font-semibold text-text-primary font-display">
              <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-[#2563EB]">
                <path d="M22 10 12 5 2 10l10 5 10-5Z" />
                <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
              </svg>
              <span>Education</span>
            </div>

            {/* Content Card */}
            <div className="rounded-[28px] border border-stroke bg-surface/85 backdrop-blur-sm p-6 md:p-8 shadow-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-text-primary font-display">{education.degree}</h3>
                  <div className="mt-1.5 text-sm md:text-base font-semibold text-[#2563EB]">{education.school} | {education.years}</div>
                </div>
                <div className="text-sm font-semibold text-[#2563EB] sm:text-right whitespace-nowrap">{education.date}</div>
              </div>

              <div className="mt-6 space-y-2.5 text-sm md:text-base leading-relaxed text-text-primary">
                {education.gpa && (
                  <p><span className="font-semibold">GPA:</span> {education.gpa}</p>
                )}
                {education.awards && (
                  <p><span className="font-semibold">Awards:</span> {education.awards}</p>
                )}
                {education.coursework && (
                  <p><span className="font-semibold">Relevant Coursework:</span> {education.coursework}</p>
                )}
                {education.description && (
                  <p className="mt-4 text-sm md:text-base italic text-muted font-body">{education.description}</p>
                )}
              </div>
            </div>

            {/* Certifications Subsection */}
            <div className="mt-16 border-t border-stroke/30 pt-12">
              {/* Section Header */}
              <div className="flex items-center justify-center gap-3 mb-10 text-2xl md:text-3xl font-semibold text-text-primary font-display">
                <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-[#2563EB]">
                  <circle cx="12" cy="8" r="7" />
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
                <span>Certifications</span>
              </div>

              {/* Certifications Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
                {certifications.map((cert) => (
                  <div
                    key={cert.title}
                    className="rounded-[24px] border border-stroke bg-surface/40 p-6 hover:border-[#2563EB]/30 transition-all duration-300 shadow-sm flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] bg-[#2563EB]/10 rounded-full px-3 py-1">
                          {cert.issuer}
                        </span>
                        <div className="text-xs text-muted font-medium">{cert.date}</div>
                      </div>
                      <h3 className="text-lg font-bold text-text-primary group-hover:text-[#2563EB] transition-colors duration-300 font-display">
                        {cert.title}
                      </h3>
                      {cert.description && (
                        <div className="mt-3 text-xs text-muted leading-relaxed font-body">
                          {cert.description}
                        </div>
                      )}
                    </div>

                    {cert.link && (
                      <div className="mt-6 pt-4 border-t border-stroke/30 flex justify-center">
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full inline-flex items-center justify-center rounded-xl bg-[#2563EB] py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1d4ed8] shadow-md shadow-[#2563EB]/15"
                        >
                          VIEW
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )
      case 'experience':
        return (
          <motion.div
            key="experience"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative w-full"
            ref={timelineRef}
          >
            {/* Header above timeline */}
            <div className="flex items-center justify-center gap-3 mb-10 text-2xl md:text-3xl font-semibold text-text-primary font-display">
              <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-[#2563EB]">
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              <span>Work Experience</span>
            </div>

            {/* Timeline track line */}
            <div className="absolute left-3 top-20 bottom-4 w-px bg-stroke md:left-6" />

            {/* Scroll-drawing progress line with gradient and glow */}
            <motion.div
              style={{ scaleY, transformOrigin: 'top' }}
              className="absolute left-3 top-20 bottom-4 w-[3px] bg-gradient-to-b from-[#89AACC] to-[#2563EB] -translate-x-[1px] md:left-6 origin-top shadow-[0_0_10px_rgba(37,99,235,0.5)]"
            />

            {/* Bouncing Arrow moving with scroll progress */}
            <motion.div
              style={{ top: arrowY }}
              className="absolute left-3 md:left-6 -translate-x-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-[#89AACC] to-[#2563EB] text-white shadow-[0_0_15px_rgba(37,99,235,0.6)] hover:scale-110 transition-transform duration-200"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce mt-[1px]">
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </motion.div>

            <div className="space-y-8 md:space-y-12">
              {experiences.map((experience, index) => {
                return (
                  <motion.article
                    key={experience.company}
                    className="relative w-full group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {/* Node on the timeline */}
                    <span className="absolute left-3 md:left-6 top-8 z-10 h-3.5 w-3.5 rounded-full border-2 border-bg bg-stroke -translate-x-1/2 group-hover:bg-[#2563EB] group-hover:border-[#89AACC] transition-all duration-300 shadow-[0_0_8px_transparent] group-hover:shadow-[#2563EB]/50" />

                    {/* Content Card container (on the right) */}
                    <div className="w-full pl-10 md:pl-16">
                      <div className="rounded-[28px] border border-stroke bg-surface/85 backdrop-blur-sm p-6 md:p-8 hover:border-[#2563EB]/40 transition-colors duration-300 shadow-md">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="text-2xl font-semibold text-text-primary font-display">{experience.company}</h3>
                            <p className="mt-1 text-lg text-muted">{experience.role}</p>
                          </div>
                          <div className="text-sm font-medium text-[#2563EB] whitespace-nowrap">{experience.date}</div>
                        </div>
                        <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
                          {experience.bullets.map(bullet => (
                            <li key={bullet} className="flex gap-3">
                              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[#2563EB]" />
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
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </motion.div>
        )
      case 'skills':
        return (
          <motion.div
            key="skills"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full"
          >
            {/* Header above skills */}
            <div className="flex items-center justify-center gap-3 mb-8 text-2xl md:text-3xl font-semibold text-text-primary font-display">
              <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-[#2563EB]">
                <path d="m18 16 4-4-4-4" />
                <path d="m6 8-4 4 4 4" />
                <path d="m14.5 4-5 16" />
              </svg>
              <span>Skills</span>
            </div>

            <div className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {skillGroups.map(group => (
                  <div key={group.name} className="rounded-[28px] border border-stroke bg-surface p-6">
                    <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">{group.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map(item => (
                        <span key={item} className="inline-flex items-center gap-2 rounded-full border border-stroke bg-bg px-4 py-2 text-sm text-text-primary">
                          <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )
    }
  }, [activeTab, scaleY, arrowY])

  return (
    <>
      <section className="relative bg-bg pt-20 pb-8 md:pt-28 md:pb-10 overflow-hidden flex flex-col justify-center items-center">
        {/* Dynamic Iridescence background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Iridescence
            color={[0.8, 0.9, 1.2]}
            mouseReact={true}
            amplitude={0.15}
            speed={0.8}
          />
        </div>
        {/* Background overlay: fades out towards the bottom of the header */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-bg/60 to-bg z-0 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-[1100px] px-6 md:px-10 lg:px-16 w-full text-center">
          {/* Title and Subtitle */}
          <div className="mx-auto max-w-3xl mb-10">
            <h1 className="text-5xl font-display font-semibold text-text-primary md:text-6xl">
              RESUME
            </h1>
            <p className="mt-5 text-xl text-muted">
              Student &amp; Full Stack Developer
            </p>
          </div>

          {/* Download Button */}
          <div className="flex justify-center">
            <a
              href="/Resume_Akshat-soni.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-2xl bg-[#2563EB] px-8 py-4 text-base font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#1d4ed8] shadow-lg shadow-[#2563EB]/20"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v12" />
                <path d="m8 11 4 4 4-4" />
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* Section 2: Details and Tabs (no Iridescence background, clean dark background) */}
      <section className="bg-bg pt-8 pb-24 md:pt-10 md:pb-32 relative">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10 lg:px-16">
          {/* Tab Selector */}
          <div className="rounded-[28px] border border-stroke bg-surface/70 p-2 shadow-[0_20px_80px_rgba(0,0,0,0.18)] backdrop-blur-sm">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              {tabs.map(tab => {
                const active = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-center gap-3 rounded-[20px] px-5 py-4 text-sm font-semibold transition-all duration-300 ${active
                      ? 'bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/25'
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

          {/* Tab Content */}
          <div className="mt-12">{activeContent}</div>
        </div>
      </section>
    </>
  )
}