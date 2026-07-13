import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Silk from '../components/Silk'

const projects = [
  {
  title: 'SONAR Rock vs Mine Prediction',
  category: 'MACHINE LEARNING',
  description: 'A machine learning application that classifies sonar signals as rocks or underwater mines using Logistic Regression with real-time predictions through Streamlit.',
  tags: ['Python', 'Streamlit', 'Scikit-learn', 'Logistic Regression'],
  github: 'https://github.com/akshatsoni27/SONAR-Mine-vs-Rock'
},
  {
  title: 'Diabetes Risk Prediction',
  category: 'HEALTHCARE AI',
  description: 'An end-to-end ML application that predicts diabetes risk using Support Vector Machines and delivers instant health assessments through a modern Streamlit interface.',
  tags: ['Python', 'SVM', 'Streamlit', 'Scikit-learn'],
  github: 'https://github.com/akshatsoni27/Diabetes_Prediction'
},
  {
  title: 'AI Fake News Detector',
  category: 'NATURAL LANGUAGE PROCESSING',
  description: 'An NLP-powered web application that detects fake news using TF-IDF vectorization, Logistic Regression, and real-time text classification.',
  tags: ['Python', 'NLTK', 'Scikit-learn', 'Streamlit'],
  github: 'https://github.com/akshatsoni27/Fake-News-Detector'
},
  // {
  //   title: 'NLP Playground',
  //   category: 'NLP',
  //   description: 'A set of semantic search and prompt tooling experiments for rapid prototyping of language interfaces.',
  //   tags: ['Python', 'HuggingFace', 'LangChain'],
  //   github: 'https://github.com/akshatsoni27',
  //   live: 'https://example.com',
  // },
  // {
  //   title: 'Game AI Lab',
  //   category: 'Game AI',
  //   description: 'A collection of reinforcement learning experiments and simulation toys used to test simple decision agents.',
  //   tags: ['Python', 'Q-Learning', 'Pygame'],
  //   github: 'https://github.com/akshatsoni27',
  //   live: 'https://example.com',
  // },
  // {
  //   title: 'Forecast Engine',
  //   category: 'Data',
  //   description: 'A forecasting toolkit for analyzing time-series trends and presenting them in a compact, visual workflow.',
  //   tags: ['Python', 'ARIMA', 'Pandas', 'Matplotlib'],
  //   github: 'https://github.com/akshatsoni27',
  //   live: 'https://example.com',
  // },
]

const designs = [
  {
  title: 'Gerado',
  category: 'STARTUP',
  description: 'An AI-first startup focused on building intelligent digital products that combine modern web technologies, automation, and large language models to solve real-world problems.',
  image: 'Gerado.png',
  tags: ['AI', 'Startup', 'React', 'Node.js', 'LLMs']
},
  {
  title: 'AI Financial Research Agent',
  category: 'AGENTIC AI',
  description: 'An autonomous AI agent that retrieves live financial data, analyzes market trends, and delivers contextual insights using LLM-powered tool calling.',
  image: 'AI_Finance.png',
  tags: ['Agno', 'Groq', 'Yahoo Finance', 'Python', 'LLMs']
},
 {
  title: 'Credit Risk Analysis System',
  category: 'MACHINE LEARNING',
  description: 'A production-ready machine learning pipeline that predicts credit risk using XGBoost and serves real-time insights through an interactive Streamlit dashboard.',
  image: 'Credit_risk.png',
  tags: ['Python', 'XGBoost', 'Streamlit', 'scikit-learn', 'ML']
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
            PROJECT SHOWCASE
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

        {/* SECTION 1: UI/UX & Creative Designs */}
        <div className="mt-20">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-stroke" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted">Visual Experiments</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-sans font-bold tracking-tight text-text-primary">
                RECENT PROJECTS
              </h3>
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-muted hidden md:inline">
              Agentic AI · Machine Learning · Artificial Intelligence
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

        {/* Spacer / Section Divider */}
        <hr className="my-20 border-stroke" />

        {/* SECTION 2: Web Applications & Software */}
        <div>
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-stroke" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted">Web Apps & Systems</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-sans font-bold tracking-tight text-text-primary">
                MORE PROJECTS
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
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-text-primary">GitHub ↗</a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer" className="hover:text-text-primary">Live ↗</a>
                    )}
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

      </div>
    </section>
  )
}