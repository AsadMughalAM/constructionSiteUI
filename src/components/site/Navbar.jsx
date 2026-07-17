import { useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/site/ThemeToggle'

const EASE = [0.16, 1, 0.3, 1]

const LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()

  /* Hide on scroll down, reveal on scroll up. Never hide while the menu is open. */
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setHidden(!open && latest > previous && latest > 140)
  })

  return (
    <motion.header
      initial={reduce ? false : { y: -24, opacity: 0 }}
      animate={reduce ? { y: 0, opacity: 1 } : { y: hidden ? '-100%' : 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/55 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-8">
        <a
          href="#top"
          className="flex items-center gap-2.5"
          aria-label="Meridian Construction Group, home"
        >
          <span aria-hidden="true" className="size-3 bg-primary" />
          <span className="font-display text-lg font-extrabold uppercase tracking-tight">
            Meridian
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            render={<a href="#contact" />}
            nativeButton={false}
            className="hidden h-10 px-5 text-xs font-semibold uppercase tracking-wider md:inline-flex"
          >
            Start a project
          </Button>
          <Button
            variant="ghost"
            size="icon-lg"
            className="md:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <List />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: -12, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute inset-x-0 top-full border-b border-border bg-background/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-base text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <Button
                render={<a href="#contact" />}
            nativeButton={false}
                onClick={() => setOpen(false)}
                className="mt-3 h-11 w-full text-xs font-semibold uppercase tracking-wider"
              >
                Start a project
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
