import { useRef } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { MANIFESTO, MANIFESTO_IMAGE } from '@/lib/site-data'

function Word({ children, progress, range, reduce }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  return (
    <motion.span style={reduce ? undefined : { opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  )
}

export default function Manifesto() {
  const ref = useRef(null)
  const imgRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.45'],
  })
  /* Image drifts inside its frame while it crosses the viewport. */
  const { scrollYProgress: imgProgress } = useScroll({
    target: imgRef,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(imgProgress, [0, 1], ['-8%', '8%'])
  /* Observe the (visible) container: the clipped element itself never intersects. */
  const imgInView = useInView(imgRef, { once: true, amount: 0.3 })

  const words = MANIFESTO.split(' ')

  return (
    <section id="about" ref={ref} className="scroll-mt-20 border-t border-border py-28 md:py-40">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-8">
        <p className="font-display max-w-5xl text-3xl font-bold uppercase leading-[1.1] tracking-tight md:text-5xl">
          {words.map((word, i) => (
            <Word
              key={`${word}-${i}`}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
              reduce={reduce}
            >
              {word}
            </Word>
          ))}
        </p>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12 md:gap-8">
          <motion.div
            initial={reduce ? false : { y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-end md:col-span-4"
          >
            <div className="border-t border-border pt-6">
              <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
                We are engineers first. The poetry stays on this page. On site it
                becomes method statements, load calculations and a finish
                schedule that holds.
              </p>
              <p className="mt-8 text-sm font-semibold text-foreground">Imran Hashmi</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Managing Director, Meridian
              </p>
            </div>
          </motion.div>

          <div ref={imgRef} className="md:col-span-8">
            <motion.div
              initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
              animate={
                reduce || imgInView
                  ? { clipPath: 'inset(0 0 0% 0)' }
                  : { clipPath: 'inset(0 0 100% 0)' }
              }
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <motion.img
                src={MANIFESTO_IMAGE.src}
                alt={MANIFESTO_IMAGE.alt}
                loading="lazy"
                style={reduce ? undefined : { y: imgY, scale: 1.12 }}
                className="aspect-[4/3] w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
