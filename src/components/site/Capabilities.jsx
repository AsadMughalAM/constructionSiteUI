import { useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import { CAPABILITIES } from '@/lib/site-data'
import RevealHeading from '@/components/site/RevealHeading'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'

const EASE = [0.16, 1, 0.3, 1]

export default function Capabilities() {
  const listRef = useRef(null)
  const [active, setActive] = useState(null)
  const reduce = useReducedMotion()
  /* The floating preview needs a real pointer; touch devices get thumbnails. */
  const finePointer = useMediaQuery('(pointer: fine)')

  /* Cursor-following preview, driven by motion values (no re-renders). */
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 24 })
  const sy = useSpring(y, { stiffness: 180, damping: 24 })
  /* Preview leans with cursor speed. */
  const vx = useVelocity(sx)
  const rotate = useTransform(vx, [-1400, 1400], [-7, 7], { clamp: true })

  function onMove(e) {
    if (!listRef.current) return
    const rect = listRef.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - 176)
    y.set(e.clientY - rect.top - 128)
  }

  return (
    <section id="capabilities" className="scroll-mt-20 py-24 md:py-36">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-8">
        <RevealHeading className="font-display text-4xl font-extrabold uppercase tracking-tight md:text-6xl">
          What we build
        </RevealHeading>
      </div>

      <div
        ref={listRef}
        onMouseMove={onMove}
        onMouseLeave={() => setActive(null)}
        className="relative mt-12 border-t border-border md:mt-16"
      >
        {CAPABILITIES.map((cap, i) => (
          <motion.div
            key={cap.title}
            initial={reduce ? false : { y: 32, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
            onMouseEnter={() => setActive(i)}
            className="group border-b border-border"
          >
            <div className="mx-auto flex w-full max-w-[1400px] items-center gap-5 px-5 py-7 md:gap-10 md:px-8 md:py-10">
              <img
                src={cap.image}
                alt={cap.alt}
                loading="lazy"
                className={cn(
                  'h-14 w-20 shrink-0 object-cover sm:h-16 sm:w-24',
                  finePointer && 'lg:hidden'
                )}
              />
              <h3 className="font-display min-w-0 flex-1 break-words text-[clamp(1rem,5.2vw,1.5rem)] font-bold uppercase tracking-tight text-muted-foreground transition-all duration-300 group-hover:translate-x-2 group-hover:text-foreground md:text-4xl lg:text-5xl">
                {cap.title}
              </h3>
              <p className="hidden max-w-xs text-sm leading-relaxed text-muted-foreground md:block">
                {cap.body}
              </p>
              <ArrowRight
                aria-hidden="true"
                className="hidden size-6 shrink-0 -translate-x-2 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block"
              />
            </div>
            <p className="mx-auto -mt-3 w-full max-w-[1400px] px-5 pb-6 text-sm leading-relaxed text-muted-foreground md:hidden">
              {cap.body}
            </p>
          </motion.div>
        ))}

        {/* Floating preview, desktop pointer only */}
        {!reduce && finePointer && (
          <motion.div
            style={{ x: sx, y: sy, rotate }}
            className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block"
            aria-hidden="true"
          >
            <AnimatePresence>
              {active !== null && (
                <motion.img
                  key={active}
                  src={CAPABILITIES[active].image}
                  alt=""
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="absolute h-64 w-88 max-w-none object-cover shadow-2xl shadow-black/50"
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  )
}
