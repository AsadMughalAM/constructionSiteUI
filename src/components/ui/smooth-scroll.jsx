import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/*
  Vengeance UI smooth-scroll, adapted: drives Lenis from the GSAP ticker so
  ScrollTrigger pins stay in sync, and disables itself under reduced motion.
*/
export function SmoothScroll({ children }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ lerp: 0.12 })
    lenis.on('scroll', ScrollTrigger.update)

    const update = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}

export default SmoothScroll
