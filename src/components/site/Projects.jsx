import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS } from '@/lib/site-data'
import RevealHeading from '@/components/site/RevealHeading'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const wrap = useRef(null)
  const track = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => track.current.scrollWidth - window.innerWidth

      /* Cards lean into the scroll: skew follows velocity, settles back to 0. */
      const skewSetter = gsap.quickSetter('.project-card', 'skewX', 'deg')
      const clampSkew = gsap.utils.clamp(-4, 4)
      const proxy = { skew: 0 }

      gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const skew = clampSkew(self.getVelocity() / -600)
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
              proxy.skew = skew
              gsap.to(proxy, {
                skew: 0,
                duration: 0.7,
                ease: 'power3',
                overwrite: true,
                onUpdate: () => skewSetter(proxy.skew),
              })
            }
          },
        },
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={wrap}
      className="scroll-mt-20 overflow-hidden border-t border-border"
    >
      <div className="flex flex-col justify-center gap-10 py-24 md:min-h-[100dvh] md:gap-14 md:py-24">
        <div className="mx-auto w-full max-w-[1400px] px-5 md:px-8">
          <div className="flex items-end justify-between gap-6">
            <RevealHeading className="font-display text-4xl font-extrabold uppercase tracking-tight md:text-6xl">
              Selected work
            </RevealHeading>
            <span className="hidden shrink-0 font-mono text-xs text-muted-foreground md:block">
              2022 to 2025
            </span>
          </div>
        </div>

        <div
          ref={track}
          className="flex w-full flex-col gap-14 px-5 md:w-max md:flex-row md:items-stretch md:gap-[6vw] md:px-[10vw]"
        >
          {PROJECTS.map((p) => (
            <article
              key={p.name}
              className="project-card group w-full shrink-0 md:w-[56vw] lg:w-[44vw]"
            >
              {/*
                Inside the pinned track, images are moved by transforms, which
                native lazy-loading and IntersectionObserver-based reveals do
                not track (they read layout position). Eager img, no IO reveal.
              */}
              <div className="overflow-hidden bg-card">
                <img
                  src={p.image}
                  alt={p.alt}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-border pt-4">
                <h3 className="font-display relative w-fit text-xl font-bold uppercase tracking-tight after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-500 after:ease-out group-hover:after:origin-left group-hover:after:scale-x-100 md:text-2xl">
                  {p.name}
                </h3>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">{p.year}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {p.sector}, {p.city}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
