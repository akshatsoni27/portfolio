import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })

      tl.fromTo('.grid-bg', { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 0)
      tl.fromTo('.hero-title-1', { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power4.out' }, 0.15)
      tl.fromTo('.hero-title-2', { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power4.out' }, 0.28)
      tl.fromTo('.photo-card', { opacity: 0, scale: 0.96, y: 35 }, { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power3.out' }, 0.42)
      tl.fromTo('.roles-box', { opacity: 0, x: -25 }, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, 0.58)
      tl.fromTo('.detail-fade', { opacity: 0, filter: 'blur(4px)' }, { opacity: 1, filter: 'blur(0px)', duration: 0.7, stagger: 0.08 }, 0.72)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-bg pt-20 md:pt-24"
    >
      <div className="grid-bg absolute inset-0 pointer-events-none opacity-40 dark:opacity-[0.45]" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/5 via-transparent to-bg pointer-events-none" />

      <div className="relative z-10 mx-auto min-h-[calc(100vh-5rem)] w-full max-w-[1536px] px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 select-none">

        <div className="relative mx-auto w-full pt-8 sm:pt-10 md:pt-8 lg:pt-10">

          {/* COMPUTATIONAL */}
          <div className="overflow-hidden text-center">
            <h1 className="hero-title-1 whitespace-nowrap font-sans text-[13vw] sm:text-[11vw] md:text-[10.8vw] lg:text-[9.8vw] xl:text-[9.3rem] font-extrabold uppercase leading-[0.82] tracking-[-0.055em] text-blue-500 dark:text-[#5fa4f9]">
              Building
            </h1>
          </div>

          {/* THINKER */}
          <div className="relative z-20 mt-[3vw] md:mt-[2.8vw] lg:mt-[2.4rem] overflow-hidden text-center">
            <h1 className="hero-title-2 whitespace-nowrap font-sans text-[9.2vw] sm:text-[8.8vw] md:text-[7.2vw] lg:text-[6.5vw] xl:text-[7.5rem] font-extrabold uppercase leading-[0.78] tracking-[-0.055em] text-blue-500 dark:text-[#5fa4f9]">
              Thinking Systems
            </h1>
          </div>

          {/* Desktop composition */}
          <div className="relative mx-auto hidden md:block h-[430px] lg:h-[500px] xl:h-[540px] w-full">

            {/* Roles box */}
            <div className="roles-box absolute left-[25.5%] top-[92px] lg:left-[27.2%] lg:top-[105px] xl:left-[27.5%] xl:top-[110px] z-10 flex h-[150px] lg:h-[170px] xl:h-[188px] w-[325px] lg:w-[370px] xl:w-[405px] items-center border border-stroke bg-surface/80 dark:bg-black/75 backdrop-blur-sm">
              <ul className="ml-10 lg:ml-12 flex flex-col gap-2 font-sans text-sm lg:text-base xl:text-lg font-bold tracking-[-0.02em] text-text-primary">
                <li><span className="mr-2 text-blue-500 dark:text-[#5fa4f9]">/</span> MACHINE LEARNING</li>
                <li><span className="mr-2 text-blue-500 dark:text-[#5fa4f9]">/</span> AGENTIC AI</li>
                <li><span className="mr-2 text-blue-500 dark:text-[#5fa4f9]">/</span> WEB ENGINEERING</li>
              </ul>
            </div>

            {/* Portrait */}
            <div className="photo-card absolute left-[52.2%] top-[-30px] lg:left-[52.5%] lg:top-[-34px] xl:left-[52.5%] xl:top-[-38px] z-30">
              <div className="relative h-[430px] lg:h-[500px] xl:h-[540px] w-[285px] lg:w-[330px] xl:w-[360px] border border-stroke bg-surface">
                <img
                  src="/portrait.png"
                  alt="Portrait of Akshat Soni"
                  className="h-full w-full object-cover grayscale contrast-[1.08]"
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/5 pointer-events-none" />

                <div className="detail-fade absolute left-[32%] top-[7%] z-40">
                  <h3 className="whitespace-nowrap font-sans text-xl lg:text-2xl xl:text-[2rem] font-light uppercase tracking-[0.28em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    AKSHAT SONI
                  </h3>
                </div>

                <div className="detail-fade absolute -right-[29px] bottom-[3%] z-40">
                  <span
                    style={{ writingMode: 'vertical-rl' }}
                    className="rotate-180 whitespace-nowrap font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.18em] text-text-primary"
                  >
                    BASED IN INDIA
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile composition */}
          <div className="relative z-30 mt-7 flex flex-col items-center md:hidden">
            <div className="detail-fade mb-4 text-center text-xs font-semibold uppercase tracking-[0.35em] text-text-primary">
              AKSHAT SONI
            </div>

            <div className="photo-card relative h-[390px] w-[260px] border border-stroke bg-surface">
              <img
                src="/portrait.png"
                alt="Portrait of Akshat Soni"
                className="h-full w-full object-cover grayscale contrast-[1.08]"
              />
              <div className="absolute -right-7 bottom-4">
                <span
                  style={{ writingMode: 'vertical-rl' }}
                  className="rotate-180 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.18em] text-text-primary"
                >
                  BASED IN INDIA
                </span>
              </div>
            </div>

            <div className="roles-box relative -mt-4 z-40 w-[290px] border border-stroke bg-surface/90 dark:bg-black/85 p-5 backdrop-blur-md">
              <ul className="flex flex-col gap-2 font-sans text-xs font-bold tracking-wider text-text-primary">
                <li><span className="mr-2 text-blue-500 dark:text-[#5fa4f9]">/</span> MACHINE LEARNING</li>
                <li><span className="mr-2 text-blue-500 dark:text-[#5fa4f9]">/</span> AGENTIC AI</li>
                <li><span className="mr-2 text-blue-500 dark:text-[#5fa4f9]">/</span> WEB ENGINEERING</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
