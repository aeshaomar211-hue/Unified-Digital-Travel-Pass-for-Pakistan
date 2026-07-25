'use client'

import { motion } from 'motion/react'
import { Truck, Sparkles, Palette, UtensilsCrossed } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { cn } from '@/lib/utils'

const icons = {
  truckArt: Truck,
  sufi: Sparkles,
  crafts: Palette,
  food: UtensilsCrossed,
}

export function CultureSection() {
  const { t, lang } = useI18n()

  const cards = [
    { key: 'truckArt' as const, title: t.truckArt, desc: t.truckArtDesc },
    { key: 'sufi' as const, title: t.sufiHeritage, desc: t.sufiDesc },
    { key: 'crafts' as const, title: t.handicrafts, desc: t.craftsDesc },
    { key: 'food' as const, title: t.foodStreets, desc: t.foodDesc },
  ]

  return (
    <section className="bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">{t.cultureSmall}</p>
          <h2
            className={cn(
              'mt-2 font-serif text-3xl font-semibold text-balance sm:text-4xl',
              lang === 'ur' && 'urdu-text'
            )}
          >
            {t.cultureTitle}
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => {
            const Icon = icons[card.key]
            return (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className={cn('mt-4 text-lg font-bold', lang === 'ur' && 'urdu-text')}>{card.title}</h3>
                <p className={cn('mt-2 text-sm leading-relaxed text-muted-foreground', lang === 'ur' && 'urdu-text')}>
                  {card.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
