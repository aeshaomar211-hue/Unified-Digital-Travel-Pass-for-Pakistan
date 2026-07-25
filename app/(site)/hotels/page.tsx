'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { HotelFinder } from '@/components/hotel-finder'
import { useI18n } from '@/lib/i18n/context'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

function HotelsContent() {
  const { t, lang } = useI18n()
  const searchParams = useSearchParams()
  const initialCity = searchParams.get('city') ?? ''

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">{t.hotelSmall}</p>
        <h1 className={cn('mt-2 font-serif text-3xl font-semibold sm:text-4xl', lang === 'ur' && 'urdu-text')}>
          {t.hotelTitle}
        </h1>
      </div>
      <HotelFinder initialCity={initialCity} />
    </div>
  )
}

export default function HotelsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6"><Skeleton className="h-96 w-full" /></div>}>
      <HotelsContent />
    </Suspense>
  )
}
