'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { PassGenerator } from '@/components/pass-generator'
import { useI18n } from '@/lib/i18n/context'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

function PassesContent() {
  const { t, lang } = useI18n()
  const searchParams = useSearchParams()
  const initialRoute = searchParams.get('route') ?? ''

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">{t.passSmall}</p>
        <h1 className={cn('mt-2 font-serif text-3xl font-semibold sm:text-4xl', lang === 'ur' && 'urdu-text')}>
          {t.passTitle}
        </h1>
      </div>
      <PassGenerator initialRoute={initialRoute} />
    </div>
  )
}

export default function PassesPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6"><Skeleton className="h-96 w-full" /></div>}>
      <PassesContent />
    </Suspense>
  )
}
