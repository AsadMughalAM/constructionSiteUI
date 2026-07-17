import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { LineHoverLink } from '@/components/ui/line-hover-link'
import Magnetic from '@/components/site/Magnetic'
import RevealHeading from '@/components/site/RevealHeading'

const EASE = [0.16, 1, 0.3, 1]

const FOOTER_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
]

export default function Closing() {
  const reduce = useReducedMotion()

  return (
    <footer id="contact" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center px-5 py-28 text-center md:px-8 md:py-44">
        <RevealHeading className="font-display text-[clamp(2.5rem,9.5vw,6rem)] font-extrabold uppercase tracking-tight md:text-8xl">
          Let&rsquo;s build.
        </RevealHeading>
        <motion.p
          initial={reduce ? false : { y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
          className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Tell us about your site, your budget and your deadline. We answer within
          two working days.
        </motion.p>
        <motion.div
          initial={reduce ? false : { y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
          className="mt-10"
        >
          <Magnetic>
            <Button
              render={<a href="mailto:projects@meridianbuild.com" />}
              nativeButton={false}
              className="btn-sweep h-14 px-9 text-sm font-semibold uppercase tracking-wider hover:bg-primary"
            >
              Start a project
              <ArrowUpRight data-icon="inline-end" />
            </Button>
          </Magnetic>
        </motion.div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto grid w-full max-w-[1400px] gap-12 px-5 py-14 md:grid-cols-3 md:px-8">
          <div>
            <a href="#top" className="flex items-center gap-2.5" aria-label="Back to top">
              <span aria-hidden="true" className="size-3 bg-primary" />
              <span className="font-display text-lg font-extrabold uppercase tracking-tight">
                Meridian
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              General contracting and structural engineering, delivered end to end.
            </p>
          </div>
          <nav className="flex flex-col items-start gap-3" aria-label="Footer">
            {FOOTER_LINKS.map((link) => (
              <LineHoverLink
                key={link.href}
                href={link.href}
                variant="slide"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </LineHoverLink>
            ))}
          </nav>
          <div className="flex flex-col items-start gap-3 text-sm text-muted-foreground">
            <LineHoverLink
              href="mailto:projects@meridianbuild.com"
              variant="slide"
              className="hover:text-foreground"
            >
              projects@meridianbuild.com
            </LineHoverLink>
            <LineHoverLink href="tel:+923018471928" variant="slide" className="hover:text-foreground">
              +92 301 847 1928
            </LineHoverLink>
            <span>Plot 14, Korangi Industrial Area, Karachi</span>
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-4 border-t border-border px-5 py-6 md:px-8">
          <span className="text-xs text-muted-foreground">
            © 2026 Meridian Construction Group
          </span>
          <div className="flex items-center gap-6">
            <LineHoverLink
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              variant="slide"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              LinkedIn
            </LineHoverLink>
            <LineHoverLink
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              variant="slide"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Instagram
            </LineHoverLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
