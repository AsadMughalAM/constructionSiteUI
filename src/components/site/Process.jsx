import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROCESS } from '@/lib/site-data'
import RevealHeading from '@/components/site/RevealHeading'

gsap.registerPlugin(ScrollTrigger)

/*
  Sticky stack: cards pin via CSS sticky, GSAP scrubs the previous card down
  (scale + fade) as the next one arrives. Transform and opacity only.
*/
export default function Process() {
  const ref = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray('.process-card')
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return
          gsap.to(card.querySelector('.process-card-inner'), {
            scale: 0.93,
            opacity: 0.45,
            ease: 'none',
            scrollTrigger: {
              trigger: cards[i + 1],
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            },
          })
        })
      }, ref)
      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="process" ref={ref} className="scroll-mt-20 border-t border-border">
      <div className="mx-auto w-full max-w-[1400px] px-5 pt-24 md:px-8 md:pt-36">
        <RevealHeading className="font-display text-4xl font-extrabold uppercase tracking-tight md:text-6xl">
          How we deliver
        </RevealHeading>
      </div>

      <div className="relative pb-24">
        {PROCESS.map((step, i) => (
          <div
            key={step.title}
            className="process-card sticky top-0 flex min-h-[100dvh] items-center"
          >
            <div className="process-card-inner mx-auto w-full max-w-[1400px] px-5 md:px-8">
              <div
                className={`relative flex min-h-[62vh] flex-col justify-between gap-10 border border-border p-7 md:p-14 ${
                  i % 2 === 0 ? 'bg-card' : 'bg-secondary'
                }`}
              >
                <span
                  aria-hidden="true"
                  className="font-display pointer-events-none absolute right-4 top-2 text-[clamp(4rem,18vw,16rem)] font-extrabold leading-none text-foreground/[0.06] md:right-10"
                >
                  {step.digit}
                </span>
                <span aria-hidden="true" className="size-3 bg-primary" />
                <div className="relative max-w-2xl">
                  <h3 className="font-display break-words text-[clamp(1.125rem,5vw,1.875rem)] font-extrabold uppercase tracking-tight md:text-5xl">
                    {step.title}
                  </h3>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                    {step.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
