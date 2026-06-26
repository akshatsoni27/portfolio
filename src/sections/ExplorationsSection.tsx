import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GALLERY_ITEMS = [
  { image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&q=80', rotation: -3 },
  { image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', rotation: 2 },
  { image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&q=80', rotation: -2 },
  { image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80', rotation: 4 },
  { image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&q=80', rotation: -1 },
  { image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', rotation: 3 },
]

export default function ExplorationsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const col1Ref = useRef<HTMLDivElement>(null)
  const col2Ref = useRef<HTMLDivElement>(null)
  const [lightbox, setLightbox] = useState<string | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the center text
      if (contentRef.current && sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: contentRef.current,
          pinSpacing: false,
        })
      }

      // Parallax columns
      if (col1Ref.current) {
        gsap.to(col1Ref.current, {
          y: '-30%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      if (col2Ref.current) {
        gsap.to(col2Ref.current, {
          y: '20%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const col1 = GALLERY_ITEMS.slice(0, 3)
  const col2 = GALLERY_ITEMS.slice(3, 6)

  return (
    <section ref={sectionRef} id="explorations" className="relative min-h-[300vh] bg-bg overflow-hidden">
      {/* Pinned center content — z-10 */}
      <div
        ref={contentRef}
        className="relative z-10 h-screen flex items-center justify-center pointer-events-none"
      >
        <div className="text-center px-6 pointer-events-auto">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">Explorations</span>
            <span className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display text-text-primary mb-4">
            Visual <em className="italic">playground</em>
          </h2>
          <p className="text-sm text-muted font-body max-w-xs mx-auto mb-8">
            Experiments in form, color, and motion. The work that doesn't fit anywhere else.
          </p>
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-stroke px-6 py-3 text-sm text-muted hover:text-text-primary transition-all duration-300 font-body relative overflow-visible"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            View on Dribbble ↗
          </a>
        </div>
      </div>

      {/* Parallax columns — z-20, absolute */}
      <div className="absolute inset-0 z-20 flex items-start justify-center pointer-events-none">
        <div className="relative w-full max-w-[1400px] px-6 grid grid-cols-2 gap-12 md:gap-40 pt-32">
          {/* Column 1 */}
          <div ref={col1Ref} className="flex flex-col gap-8 pointer-events-auto">
            {col1.map((item, i) => (
              <div
                key={i}
                className="aspect-square max-w-[320px] rounded-2xl overflow-hidden cursor-pointer group"
                style={{ transform: `rotate(${item.rotation}deg)` }}
                onClick={() => setLightbox(item.image)}
              >
                <img
                  src={item.image}
                  alt={`Exploration ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div ref={col2Ref} className="flex flex-col gap-8 mt-40 pointer-events-auto">
            {col2.map((item, i) => (
              <div
                key={i}
                className="aspect-square max-w-[320px] ml-auto rounded-2xl overflow-hidden cursor-pointer group"
                style={{ transform: `rotate(${item.rotation}deg)` }}
                onClick={() => setLightbox(item.image)}
              >
                <img
                  src={item.image}
                  alt={`Exploration ${i + 4}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox}
              alt="Lightbox"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
