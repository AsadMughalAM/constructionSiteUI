import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

/*
  Masked line reveal for section headings, same motion language as the hero.
  The viewport observer sits on the OUTER tag: the inner span starts fully
  clipped by overflow-hidden, so observing it directly would never fire
  (IntersectionObserver reports zero intersection for clipped elements).
*/
export default function RevealHeading({ as: Tag = 'h2', children, className, delay = 0 }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <Tag ref={ref} className={cn('overflow-hidden', className)}>
      <motion.span
        className="block"
        initial={reduce ? false : { y: '110%' }}
        animate={reduce || inView ? { y: 0 } : { y: '110%' }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </Tag>
  )
}
