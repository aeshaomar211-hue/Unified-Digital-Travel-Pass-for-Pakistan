'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowRight, Ticket } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Hero() {
  const { t, lang } = useI18n()

  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0">
        <Image
          src="/images/hunza.png"
          alt=""
          fill
          priority
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/80 to-primary" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start gap-6"
        >
          <p
            className={cn(
              'rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest',
              lang === 'ur' && 'urdu-text normal-case tracking-normal'
            )}
          >
            {t.tagline}
          </p>
          <h1
            className={cn(
              'font-serif text-4xl font-semibold leading-tight text-balance sm:text-5xl lg:text-6xl',
              lang === 'ur' && 'urdu-text leading-loose'
            )}
          >
            {t.heroTitle}
          </h1>
          <p className={cn('max-w-xl text-lg leading-relaxed opacity-90', lang === 'ur' && 'urdu-text')}>
            {t.heroText}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" variant="accent" className={cn(lang === 'ur' && 'urdu-text')}>
              <Link href="/destinations" className="flex items-center gap-2">
                {t.startBtn}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={cn(
                'border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground',
                lang === 'ur' && 'urdu-text'
              )}
            >
              <Link href="/passes" className="flex items-center gap-2">
                <Ticket className="h-5 w-5" aria-hidden="true" />
                {t.passBtn}
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/images/pakistan_skyline_culture.png"
              alt="Pakistan skyline and culture"
              width={640}
              height={480}
              className="h-[420px] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-lg font-bold">SmartSafar</p>
              <p className={cn('text-sm opacity-90', lang === 'ur' && 'urdu-text')}>{t.photoText}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
