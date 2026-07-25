'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Hero } from '@/components/home/hero'
import { DestinationsPreview } from '@/components/home/destinations-preview'
import { CultureSection } from '@/components/home/culture-section'
import { VisualDemo } from '@/components/home/visual-demo'
import { RouteFinder } from '@/components/route-finder'
import { SafetyPanel } from '@/components/safety-panel'
import { useI18n } from '@/lib/i18n/context'
import { cn } from '@/lib/utils'

export default function HomePage() {
  const { t, lang } = useI18n()

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6" id="routes">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">{t.routeFinder}</p>
            <h2 className={cn('mt-2 font-serif text-3xl font-semibold sm:text-4xl', lang === 'ur' && 'urdu-text')}>
              {t.routeTitle}
            </h2>
          </div>
          <Link href="/routes" className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            {t.viewAll}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <RouteFinder compact />
      </section>

      <DestinationsPreview />
      <CultureSection />
      <VisualDemo />

      <section className="bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <SafetyPanel />
        </div>
      </section>
    </>
  )
}
