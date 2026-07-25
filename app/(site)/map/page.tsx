'use client'

import { MapExplorer } from '@/components/map-explorer'
import { useI18n } from '@/lib/i18n/context'
import { cn } from '@/lib/utils'

export default function MapPage() {
  const { t, lang } = useI18n()

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">{t.mapSmall}</p>
        <h1 className={cn('mt-2 font-serif text-3xl font-semibold sm:text-4xl', lang === 'ur' && 'urdu-text')}>
          {t.mapTitle}
        </h1>
      </div>
      <MapExplorer />
    </div>
  )
}
