import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Silk from '../components/Silk'

const projects = [
  {
    title: 'Vision Assistant',
    category: 'AI/ML',
    description: 'An assistant that combines computer vision and language models to help users inspect and summarize visual scenes in real time.',
    tags: ['Python', 'PyTorch', 'FastAPI', 'React'],
    github: 'https://github.com/akshatsoni27',
    live: 'https://example.com',
  },
  {
    title: 'Workflow Studio',
    category: 'Full-Stack',
    description: 'A collaborative platform for building, tracking, and shipping product workflows with a clean operational dashboard.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com/akshatsoni27',
    live: 'https://example.com',
  },
  {
    title: 'System Monitor',
    category: 'Systems',
    description: 'A lightweight observability tool for capturing process health, logs, and performance signals on Linux environments.',
    tags: ['C', 'Linux', 'Multithreading'],
    github: 'https://github.com/akshatsoni27',
    live: 'https://example.com',
  },
  {
    title: 'NLP Playground',
    category: 'NLP',
    description: 'A set of semantic search and prompt tooling experiments for rapid prototyping of language interfaces.',
    tags: ['Python', 'HuggingFace', 'LangChain'],
    github: 'https://github.com/akshatsoni27',
    live: 'https://example.com',
  },
  {
    title: 'Game AI Lab',
    category: 'Game AI',
    description: 'A collection of reinforcement learning experiments and simulation toys used to test simple decision agents.',
    tags: ['Python', 'Q-Learning', 'Pygame'],
    github: 'https://github.com/akshatsoni27',
    live: 'https://example.com',
  },
  {
    title: 'Forecast Engine',
    category: 'Data',
    description: 'A forecasting toolkit for analyzing time-series trends and presenting them in a compact, visual workflow.',
    tags: ['Python', 'ARIMA', 'Pandas', 'Matplotlib'],
    github: 'https://github.com/akshatsoni27',
    live: 'https://example.com',
  },
]

const designs = [
  {
    title: 'AI Analytics Dashboard UI',
    category: 'UI/UX Design',
    description: 'A dark-themed dashboard concept for tracking LLM tokens, cost distribution, and agent throughput with clean data charts.',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&q=80',
    tags: ['Figma', 'UI Design', 'Data Viz'],
  },
  {
    title: 'Cognitive OS Brand Identity',
    category: 'Brand Identity',
    description: 'A complete branding package for an AI automation startup, featuring a fluid vector logo, custom iconography, and visual design assets.',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&q=80',
    tags: ['Illustrator', 'Branding', 'Typography'],
  },
  {
    title: 'Neumorphic Mobile Music Player',
    category: 'Mobile UX',
    description: 'A retro-modern iOS design experiment utilizing soft drop shadows, interactive dials, and smooth physical-feeling controls.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    tags: ['Figma', 'iOS', 'Interaction Design'],
  },
  {
    title: '3D Spatial Assistant Render',
    category: '3D/Motion',
    description: 'A conceptual 3D scene modeling an AI desktop orb companion, focusing on metallic finishes, glassmorphism, and neon lighting.',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80',
    tags: ['Blender', 'Spline 3D', 'KeyShot'],
  },
]

export default function ProjectsSection() {
  const [isLight, setIsLight] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('light')
    }
    return false
  })

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent
      setIsLight(customEvent.detail === 'light')
    }
    window.addEventListener('themechange', handleThemeChange)
    return () => window.removeEventListener('themechange', handleThemeChange)
  }, [])

  return (
    <section className="relative bg-bg py-20 md:py-28 overflow-hidden">
      
      {/* Silk shader background (restricted to header area) */}
      <div className="absolute top-0 left-0 right-0 h-[500px] md:h-[580px] pointer-events-none z-0 opacity-70 dark:opacity-55 transition-opacity duration-300 overflow-hidden">
        <Silk 
          speed={2.2} 
          scale={1.4} 
          color={isLight ? '#00a3ff' : '#6366f1'} 
          noiseIntensity={0.5} 
        />
        {/* Soft fading mask to merge into the page body background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/40 to-bg" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        
        {/* Boxed Header Container with Corner Crosshairs */}
        <div className="relative border border-stroke/70 px-8 py-10 md:py-16 max-w-4xl mx-auto flex items-center justify-center bg-surface/20 backdrop-blur-sm rounded-lg mb-8">
          {/* Corner L-brackets */}
          {/* Top-Left */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-600 -translate-x-[1.5px] -translate-y-[1.5px]" />
          {/* Top-Right */}
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-600 translate-x-[1.5px] -translate-y-[1.5px]" />
          {/* Bottom-Left */}
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-600 -translate-x-[1.5px] translate-y-[1.5px]" />
          {/* Bottom-Right */}
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-600 translate-x-[1.5px] translate-y-[1.5px]" />

          <h2 className="text-4xl md:text-6xl font-sans font-black tracking-tight text-text-primary text-center">
            Project Showcase
          </h2>
        </div>

        {/* Subtitle description */}
        <p className="text-sm md:text-base text-muted max-w-2xl mx-auto text-center mt-6 leading-relaxed font-body">
          Explore my portfolio of cutting-edge web applications, innovative designs, and transformative digital solutions.
        </p>

        {/* Button: View on GitHub */}
        <div className="mt-8 flex justify-center">
          <a
            href="https://github.com/akshatsoni27"
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.45)]"
          >
            View on GitHub
          </a>
        </div>

        {/* SECTION 1: Web Applications & Software */}
        <div className="mt-20">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-stroke" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted">Web Apps & Systems</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-display text-text-primary">
                Engineering <em className="italic">Portfolio</em>
              </h3>
            </div>

            <a 
              href="https://github.com/akshatsoni27" 
              target="_blank" 
              rel="noreferrer" 
              className="hidden rounded-full border border-stroke px-5 py-2.5 text-sm text-muted transition-colors hover:text-text-primary md:inline-flex"
            >
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
                className="group flex cursor-pointer flex-col rounded-2xl border border-stroke bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_0_0_1.5px_rgba(37,99,235,0.4)]"
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

                <h4 className="mt-4 text-lg font-medium text-text-primary">{project.title}</h4>
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

        {/* Spacer / Section Divider */}
        <hr className="my-20 border-stroke" />

        {/* SECTION 2: UI/UX & Creative Designs (As requested by user) */}
        <div>
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-stroke" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted">Visual Experiments</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-display text-text-primary">
                Design & <em className="italic">Explorations</em>
              </h3>
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted hidden md:inline">
              Figma · Blender · Brand Identity
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {designs.map((design, index) => (
              <motion.article
                key={design.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-80px' }}
                className="group relative flex flex-col rounded-3xl border border-stroke bg-surface overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_0_0_1.5px_rgba(6,182,212,0.4)]"
              >
                {/* Image Showcase Wrapper */}
                <div className="aspect-[16/10] w-full overflow-hidden bg-bg relative">
                  <img 
                    src={design.image} 
                    alt={design.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 rounded-full bg-bg/85 backdrop-blur-md border border-stroke px-3 py-1 text-xs text-text-primary font-medium tracking-wide">
                    {design.category}
                  </span>
                </div>

                {/* Description details */}
                <div className="p-6 flex flex-col flex-1">
                  <h4 className="text-xl font-bold text-text-primary group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors duration-200">
                    {design.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted flex-1">
                    {design.description}
                  </p>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {design.tags.map(tag => (
                      <span key={tag} className="rounded-full border border-stroke px-3 py-1 text-xs text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}