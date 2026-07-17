import { motion, useReducedMotion } from 'framer-motion'
import { QUOTE } from '@/lib/site-data'

export default function Testimonial() {
  const reduce = useReducedMotion()

  return (
    <section className="border-t border-border bg-card py-24 md:py-36">
      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-8">
        <motion.figure
          initial={reduce ? false : { y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <blockquote className="text-2xl font-medium leading-snug text-foreground md:text-4xl">
            {'“'}
            {QUOTE.text}
            {'”'}
          </blockquote>
          <figcaption className="mt-8">
            <span className="block text-sm font-semibold text-foreground">{QUOTE.name}</span>
            <span className="mt-1 block text-sm text-muted-foreground">{QUOTE.role}</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
