import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import Magnetic from '@/components/site/Magnetic'

const EASE = [0.16, 1, 0.3, 1]

const HERO_IMG = '/images/hero-cranes-1600.jpg'

function MaskedLine({ children, delay = 0, reduce }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={reduce ? false : { y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  /* Copy exits upward faster than the background: depth on the way out. */
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -110])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100dvh] flex-col overflow-hidden">
      {/* Photography, oversized above the fold so the parallax travel never exposes an edge */}
      <motion.div
        style={reduce ? undefined : { y: bgY }}
        className="absolute inset-x-0 -top-[14%] bottom-0"
      >
        <motion.img
          src={HERO_IMG}
          srcSet="/images/hero-cranes-800.jpg 800w, /images/hero-cranes-1600.jpg 1600w"
          sizes="100vw"
          alt="Tower cranes working over a concrete high-rise frame at dusk"
          fetchPriority="high"
          initial={reduce ? false : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
          className="size-full object-cover brightness-[0.72] contrast-[1.08] dark:brightness-100 dark:contrast-100"
        />
      </motion.div>
      {/* Light mode: photo stays rich, so the theme wash is much lighter there. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-background/5 dark:via-background/40 dark:to-background/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/15 to-transparent dark:from-background/75 dark:via-background/20"
      />

      <motion.div
        style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
        className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-5 pt-24 md:px-8"
      >
        <h1 className="font-display max-w-5xl text-[clamp(1.5rem,5.8vw,5.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
          <MaskedLine delay={0.25} reduce={reduce}>
            We build what
          </MaskedLine>
          <MaskedLine delay={0.35} reduce={reduce}>
            outlasts us.
          </MaskedLine>
        </h1>

        <motion.p
          initial={reduce ? false : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
          className="mt-6 max-w-xl text-base leading-relaxed text-foreground/75 md:text-lg"
        >
          General contracting and structural engineering for commercial, civil and
          industrial projects, delivered end to end.
        </motion.p>

        <motion.div
          initial={reduce ? false : { y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.68, ease: EASE }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Magnetic strength={0.25}>
            <Button
              render={<a href="#contact" />}
            nativeButton={false}
              className="btn-sweep h-12 px-7 text-xs font-semibold uppercase tracking-wider hover:bg-primary"
            >
              Start a project
              <ArrowUpRight data-icon="inline-end" />
            </Button>
          </Magnetic>
          <Button
            variant="outline"
            render={<a href="#projects" />}
            nativeButton={false}
            className="h-12 border-white/25 bg-white/5 px-7 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm hover:bg-white/10 hover:text-foreground"
          >
            View projects
          </Button>
        </motion.div>
      </motion.div>

      {/* Brand wordmark, baseline cropped by the hero edge */}
      <div className="relative mt-10 overflow-hidden" aria-hidden="true">
        <motion.div
          initial={reduce ? false : { y: '105%' }}
          animate={{ y: '10%' }}
          transition={{ duration: 1.1, delay: 0.45, ease: EASE }}
          className="font-display select-none text-center text-[clamp(2.5rem,13vw,14rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.03em] whitespace-nowrap"
        >
          Meridian
        </motion.div>
      </div>
    </section>
  )
}
