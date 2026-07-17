import { lazy, Suspense } from 'react'
import { useReducedMotion } from 'framer-motion'
import RevealHeading from '@/components/site/RevealHeading'
/* Web-sized copies (1920w): the originals are 5-6k px and would allocate
   ~90MB of GPU texture in the WebGL scene. */
import beforeImg from '@/assets/before-web.jpg'
import afterImg from '@/assets/after-web.jpg'

/* three.js loads only when this section is actually rendered. */
const ScrollDissolveReveal = lazy(() =>
  import('@/components/ui/scroll-dissolve-reveal').then((m) => ({
    default: m.ScrollDissolveReveal,
  }))
)

/*
  Scroll story: the crew on the open rebar deck (before) dissolves into the
  finished skyline at dusk (after).
  Under reduced motion the WebGL scene is skipped for a static image.
*/
export default function GroundToSkyline() {
  const reduce = useReducedMotion()

  const staticFallback = (
    <img
      src={beforeImg}
      alt="Crew in hard hats surveying an open rebar deck from a finished slab"
      loading="lazy"
      className="h-[70vh] w-full object-cover"
    />
  )

  return (
    <section className="border-t border-border">
      <div className="mx-auto w-full max-w-[1400px] px-5 pt-24 md:px-8 md:pt-36">
        <RevealHeading className="font-display text-4xl font-extrabold uppercase tracking-tight md:text-6xl">
          Ground to skyline
        </RevealHeading>
        <p className="mt-6 max-w-md pb-12 text-base leading-relaxed text-muted-foreground">
          Keep scrolling. Every finished facade starts as bent steel and mud.
        </p>
      </div>

      {reduce ? (
        staticFallback
      ) : (
        <Suspense fallback={staticFallback}>
          <ScrollDissolveReveal
            imageFront={beforeImg}
            imageBack={afterImg}
            containerClassName="h-[220vh]"
            className="h-[100dvh]"
          />
        </Suspense>
      )}
    </section>
  )
}
