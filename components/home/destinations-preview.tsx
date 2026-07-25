'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { destinationsData } from '@/lib/data/travel-data'
import { useI18n } from '@/lib/i18n/context'
import { cn } from '@/lib/utils'

export function DestinationsPreview() {
  const { t, lang } = useI18n()
  const featured = destinationsData.slice(0, 6)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {t.cultureSmall}
          </p>
          <h2 className={cn('mt-2 font-serif text-3xl font-semibold sm:text-4xl', lang === 'ur' && 'urdu-text')}>
            {t.destinationsTitle}
          </h2>
        </div>
        <Link
          href="/destinations"
          className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          {t.viewAll}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((dest, i) => (
          <motion.div
            key={dest.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Link
              href={`/destinations/${dest.slug}`}
              className="group relative block overflow-hidden rounded-xl"
            >
              <Image
                src={dest.image || "/placeholder.svg"}
                alt={dest.name}
                width={480}
                height={360}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-xs font-medium uppercase tracking-wider opacity-80">{dest.region}</p>
                <h3 className="mt-1 text-xl font-bold">{dest.name}</h3>
                <p className="mt-1 text-sm opacity-90">{dest.tagline}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
