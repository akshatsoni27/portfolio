import { motion } from 'framer-motion'



export default function AboutSection() {
  return (
    <section className="bg-bg pt-10 pb-20 md:pt-12 md:pb-28 border-t border-stroke">
      <motion.div
        className="mx-auto max-w-[1100px] px-6 md:px-10 lg:px-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Centered Container */}
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
          
          {/* Section Heading */}
          <h2 className="mb-10 text-3xl md:text-4xl font-sans font-black tracking-wide uppercase text-center text-text-primary">
            ABOUT ME
          </h2>

          {/* Left-Aligned Paragraphs Content */}
          <div className="flex flex-col gap-6 text-left text-base leading-relaxed text-text-primary md:text-lg max-w-5xl">
            <p>
              I&apos;m a <strong className="font-bold text-text-primary">Computer Science student</strong> passionate about <strong className="font-bold text-text-primary">Artificial Intelligence, Machine Learning, Agentic AI, and Full-Stack Development</strong>. I enjoy building intelligent software that combines <strong className="font-bold text-text-primary">modern web technologies with AI</strong> to solve meaningful real-world problems. My interests lie at the intersection of <strong className="font-bold text-text-primary">software engineering, automation, and data-driven decision-making</strong>, where technology can create lasting impact.
            </p>
            <p>
              Currently, I&apos;m expanding my expertise in <strong className="font-bold text-text-primary">Machine Learning, Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), and AI agents</strong>, while strengthening my foundation in <strong className="font-bold text-text-primary">scalable backend systems and modern frontend development</strong>. I believe great software is built by combining <strong className="font-bold text-text-primary">thoughtful design, efficient engineering, and continuous learning</strong>.
            </p>
            <p>
              Beyond academics, I serve as the <strong className="font-bold text-text-primary">Chair of the IEEE Computational Intelligence Society (CIS)</strong> at my university, where I organize technical events, lead collaborative initiatives, and foster a community passionate about emerging technologies. These experiences have strengthened my <strong className="font-bold text-text-primary">leadership, communication, and problem-solving skills</strong> while allowing me to contribute to the growth of aspiring engineers.
            </p>
            <p>
              Over the past few years, I&apos;ve built projects ranging from <strong className="font-bold text-text-primary">AI-powered applications and machine learning systems to full-stack web platforms</strong>, continuously exploring how intelligent technologies can simplify complex workflows and improve everyday experiences. Whether it&apos;s developing <strong className="font-bold text-text-primary">scalable web applications, experimenting with AI models, or creating intuitive user interfaces</strong>, I enjoy turning ideas into impactful products.
            </p>
            <p>
              My long-term goal is to become a <strong className="font-bold text-text-primary">Software Engineer specializing in AI systems</strong>, building intelligent products that are <strong className="font-bold text-text-primary">scalable, reliable, and designed to solve real-world challenges</strong>. I&apos;m always excited to learn <strong className="font-bold text-text-primary">emerging technologies</strong>, collaborate with talented people, and contribute to projects that push the boundaries of innovation.
            </p>
          </div>

         
            

        </div>
      </motion.div>
    </section>
  )
}