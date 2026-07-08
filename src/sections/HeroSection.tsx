import { motion } from 'framer-motion'

// Configuration for Rajat Maheshwari portfolio content (exactly as shown in reference photos)
const HERO_CONTENT = {
  heading: ['CRAFTING', 'DIGITAL INTELLIGENCE'],
  name: 'Akshat Soni',
  location: 'BASED IN Indore, India',
  skills: [
    '/ AGENTIC AI DEVELOPER',
    '/ FULL STACK ENGINEER',
    '/ BUILDING SOFTWARE THAT THINKS'
  ],
  description: [
    "I'M A COMPUTER SCIENCE STUDENT",
    "BUILDING AI-POWERED APPLICATIONS,",
    "MODERN WEB EXPERIENCES, AND INTELLIGENT SYSTEMS",
    "THAT SOLVE REAL-WORLD PROBLEMS."
  ],
  socials: [
    {
      type: 'email',
      href: 'mailto:rajat@example.com', // Replace with user's email if needed
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      )
    },
    {
      type: 'phone',
      href: 'tel:+1234567890', // Replace with user's phone if needed
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      )
    },
    {
      type: 'linkedin',
      href: 'https://linkedin.com/in/rajat-maheshwari', // Replace with user's linkedin if needed
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      )
    },
    {
      type: 'github',
      href: 'https://github.com/rajat-maheshwari', // Replace with user's github if needed
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
        </svg>
      )
    },
    {
      type: 'resume',
      href: '/resume.pdf', // Replace with user's resume path if needed
      icon: (
        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
      )
    }
  ]
}

export default function HeroSection() {
  // Staggered load animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section className="relative min-h-screen w-full bg-bg text-text-primary flex flex-col justify-start pt-28 pb-16 overflow-y-auto transition-colors duration-300">
      {/* Background decoration grid */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex flex-col items-center"
      >
        {/* Giant Blue Main Title */}
        <motion.div variants={fadeUpVariants} className="w-full text-center px-4">
          <h1 className="text-blue-600 dark:text-blue-500 font-sans font-black tracking-tight leading-[0.88] uppercase text-3xl sm:text-5xl md:text-7xl lg:text-[6.5vw] select-none">
            {HERO_CONTENT.heading[0]} <br />
            {HERO_CONTENT.heading[1]}
          </h1>
        </motion.div>

        {/* Main Grid: Box on Left, Name & Image on Right */}
        <div className="w-full max-w-5xl mx-auto px-6 mt-10 md:mt-12 flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-0">
          
          {/* Left Column: Bullet Box (appears below image on mobile via order-2) */}
          <motion.div 
            variants={fadeUpVariants}
            className="w-full max-w-[320px] sm:max-w-[360px] mx-auto md:max-w-none md:mx-0 md:w-[45%] md:mt-24 md:-mr-10 lg:-mr-12 z-20 order-2 md:order-1"
          >
            <div className="border border-stroke bg-surface p-6 md:p-8 rounded-sm shadow-md flex flex-col gap-4 font-sans font-bold text-xs sm:text-sm md:text-base tracking-wider text-left text-text-primary">
              {HERO_CONTENT.skills.map((skill, idx) => (
                <div key={idx}>{skill}</div>
              ))}
            </div>
          </motion.div>
          
          {/* Right Column: Name & Image (appears first on mobile via order-1) */}
          <motion.div 
            variants={fadeUpVariants}
            className="w-full md:w-[50%] flex flex-col items-center md:items-start z-10 order-1 md:order-2"
          >
            {/* Name */}
            <div className="text-center md:text-left tracking-[0.35em] md:tracking-[0.45em] font-sans font-semibold text-xs sm:text-sm text-text-primary uppercase mb-4 md:pl-2 select-none">
              {HERO_CONTENT.name}
            </div>
            
            {/* Image Card */}
            <div className="group flex bg-surface border border-stroke p-2 shadow-lg rounded-sm w-full max-w-[320px] sm:max-w-[360px] aspect-[4/5] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:border-zinc-400 dark:hover:border-zinc-700 cursor-pointer">
              <img 
                src="/AkkiNEW.PNG" 
                className="w-[85%] h-full object-cover grayscale contrast-110 transition-all duration-500 ease-out group-hover:grayscale-0" 
                alt="Profile" 
              />
              <div className="w-[15%] flex items-center justify-center border-l border-stroke">
                <span className="[writing-mode:vertical-rl] rotate-180 uppercase tracking-[0.15em] text-[8px] md:text-[9px] font-mono text-muted font-bold py-4 select-none whitespace-nowrap">
                  {HERO_CONTENT.location}
                </span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Description Paragraph */}
        <motion.div 
          variants={fadeUpVariants}
          className="w-full max-w-2xl mx-auto px-6 mt-10 md:mt-16 text-center select-none"
        >
          <p className="text-[10px] sm:text-xs md:text-sm font-sans font-normal tracking-[0.18em] leading-relaxed text-text-primary uppercase">
            {HERO_CONTENT.description.map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))}
          </p>
        </motion.div>

        {/* Social Links Row */}
        <motion.div 
          variants={fadeUpVariants}
          className="w-full flex justify-center items-center gap-6 sm:gap-8 mt-8 md:mt-10 mb-8 text-blue-600 dark:text-blue-500"
        >
          {HERO_CONTENT.socials.map((social) => (
            <a 
              key={social.type}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200"
              aria-label={social.type}
            >
              {social.icon}
            </a>
          ))}
        </motion.div>

      </motion.div>
    </section>
  )
}
