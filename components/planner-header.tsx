'use client'

import { Sparkles } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'

export function PlannerHeader() {
  const { t } = useI18n()
  return (
    <div className="mb-8 flex flex-col gap-3">
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
        <Sparkles className="h-3.5 w-3.5" />
        {t.plannerSmall}
      </span>
      <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
        {t.plannerPageTitle}
      </h1>
      <p className="max-w-2xl text-pretty text-muted-foreground">{t.plannerPageSubtitle}</p>
    </div>
  )
}
