import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

const EASE = [0.16, 1, 0.3, 1]

/*
  Curtain reveal: the frame wipes open top-to-bottom while the image settles
  from an overscaled crop. The viewport observer sits on the outer (visible)
  frame: a clip-pathed element reports zero intersection and would deadlock.
  Do NOT use inside GSAP-pinned/transformed tracks; keep images eager there.
*/
export default function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  delay = 0,
  hoverZoom = false,
}) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const open = reduce || inView

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div
        initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
        animate={open ? { clipPath: 'inset(0 0 0% 0)' } : { clipPath: 'inset(0 0 100% 0)' }}
        transition={{ duration: 1, delay, ease: EASE }}
        className="h-full w-full"
      >
        <div
          className={cn(
            'h-full w-full',
            hoverZoom &&
              'transition-transform duration-700 ease-out group-hover:scale-[1.05]'
          )}
        >
          <motion.img
            src={src}
            alt={alt}
            initial={reduce ? false : { scale: 1.22 }}
            animate={open ? { scale: 1 } : { scale: 1.22 }}
            transition={{ duration: 1.3, delay, ease: EASE }}
            className={cn('h-full w-full object-cover', imgClassName)}
          />
        </div>
      </motion.div>
    </div>
  )
}
