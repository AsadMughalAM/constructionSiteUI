import { useEffect, useRef } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { STATS } from '@/lib/site-data'
import { cn } from '@/lib/utils'

function Stat({ value, suffix, decimals = 0, label, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const reduce = useReducedMotion()
  const mv = useMotionValue(0)
  const text = useTransform(mv, (v) => v.toFixed(decimals))

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      mv.set(value)
      return
    }
    const controls = animate(mv, value, { duration: 1.8, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [inView, reduce, value, mv])

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { y: 28, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
      }}
      className={cn('flex flex-col gap-2 border-border px-6 py-10 md:px-10 md:py-14', className)}
    >
      <div className="font-mono text-4xl font-medium tracking-tight text-foreground md:text-5xl">
        <motion.span>{text}</motion.span>
        <span className="text-primary">{suffix}</span>
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </motion.div>
  )
}

export default function Stats() {
  const reduce = useReducedMotion()

  return (
    <section className="border-t border-border bg-card">
      <motion.div
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ staggerChildren: 0.08 }}
        className="mx-auto grid w-full max-w-[1400px] grid-cols-2 lg:grid-cols-4"
      >
        {STATS.map((stat, i) => (
          <Stat
            key={stat.label}
            {...stat}
            className={cn(
              /* hairlines that survive the 2x2 -> 1x4 collapse */
              i % 2 === 1 && 'border-l',
              i >= 2 && 'border-t lg:border-t-0',
              i > 0 && 'lg:border-l'
            )}
          />
        ))}
      </motion.div>
    </section>
  )
}
