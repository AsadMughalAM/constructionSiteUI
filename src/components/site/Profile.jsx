import { motion, useReducedMotion } from 'framer-motion'
import InteractiveBook from '@/components/ui/interactive-book'
import RevealHeading from '@/components/site/RevealHeading'
import bookCover from '@/assets/book.jpg'

/* Sample capability-statement copy for the demo brand. */
const PAGES = [
  {
    pageNumber: 1,
    title: 'Who we are',
    content: (
      <p className="text-sm leading-relaxed">
        Meridian is a general contracting and structural engineering firm.
        We self-perform the trades that decide a schedule and manage the rest
        with the same discipline.
      </p>
    ),
    backContent: (
      <p className="text-sm leading-relaxed">
        Founded in Karachi, working nationwide. Commercial, civil, industrial
        and restoration work, delivered end to end under one contract.
      </p>
    ),
  },
  {
    pageNumber: 2,
    title: 'How we work',
    content: (
      <p className="text-sm leading-relaxed">
        One estimate, honestly priced. One schedule, published to the client.
        Weekly cost reports with nothing hidden in provisional sums.
      </p>
    ),
    backContent: (
      <p className="text-sm leading-relaxed">
        Safety is a precondition, not a KPI. Every site runs audited HSE
        protocols with stop-work authority for any crew member.
      </p>
    ),
  },
  {
    pageNumber: 3,
    title: 'Start a conversation',
    content: (
      <p className="text-sm leading-relaxed">
        Bring us a site, a sketch or a full tender package.
        Write to projects@meridianbuild.com and we respond within two
        working days.
      </p>
    ),
    backContent: (
      <p className="text-sm leading-relaxed">
        Meridian Construction Group, Plot 14, Korangi Industrial Area,
        Karachi.
      </p>
    ),
  },
]

/* Table of contents mirrors the flippable pages. */
const CONTENTS = [
  { label: 'Who we are', page: 'P. 01' },
  { label: 'How we work', page: 'P. 03' },
  { label: 'Start a conversation', page: 'P. 05' },
]

export default function Profile() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden border-t border-border bg-card py-24 md:py-36">
      {/* Spotlight behind the book */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_45%,color-mix(in_oklch,var(--primary)_9%,transparent),transparent_60%)]"
      />

      <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-14 px-5 md:grid-cols-2 md:px-8">
        <div>
          <RevealHeading className="font-display text-4xl font-extrabold uppercase tracking-tight md:text-6xl">
            On paper
          </RevealHeading>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            The capability statement we hand to clients, bound exactly as it
            arrives on your desk. Open it.
          </p>

          <ul className="mt-12 max-w-md">
            {CONTENTS.map((row, i) => (
              <motion.li
                key={row.label}
                initial={reduce ? false : { y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-baseline justify-between gap-6 border-t border-border py-4 last:border-b"
              >
                <span className="font-display text-base font-bold uppercase tracking-tight md:text-lg">
                  {row.label}
                </span>
                <span className="shrink-0 font-mono text-xs text-muted-foreground">
                  {row.page}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/*
          The book's layout box (width x 2.2 for the open spread) is wider than
          small viewports. It lives on an absolute layer so it never widens the
          page; the visual size is controlled with scale per breakpoint.
        */}
        <div className="relative h-[400px] w-full sm:h-[560px] lg:h-[640px] xl:h-[700px]">
          {/* Floor shadow */}
          <div
            aria-hidden="true"
            className="absolute bottom-10 left-1/2 h-12 w-80 max-w-[80%] -translate-x-1/2 rounded-full bg-black/30 blur-2xl sm:bottom-6 lg:bottom-4"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={reduce ? false : { y: 48, rotate: -3, opacity: 0 }}
              whileInView={{ y: 0, rotate: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="origin-center scale-[0.45] sm:scale-90 lg:scale-100 xl:scale-110"
            >
              <InteractiveBook
                coverImage={bookCover}
                bookTitle="Meridian"
                bookAuthor="Capability Statement"
                pages={PAGES}
                width={360}
                height={500}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
