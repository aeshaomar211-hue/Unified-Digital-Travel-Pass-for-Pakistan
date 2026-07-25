'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { destinationsData } from '@/lib/data/travel-data'
import { useI18n } from '@/lib/i18n/context'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const regions = ['All', ...Array.from(new Set(destinationsData.map((d) => d.region)))]

export default function DestinationsPage() {
  const { t, lang } = useI18n()
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('All')

  const filtered = destinationsData.filter((d) => {
    const matchesQuery =
      !query.trim() ||
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.tagline.toLowerCase().includes(query.toLowerCase())
    const matchesRegion = region === 'All' || d.region === region
    return matchesQuery && matchesRegion
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">{t.cultureSmall}</p>
        <h1 className={cn('mt-2 font-serif text-3xl font-semibold sm:text-4xl', lang === 'ur' && 'urdu-text')}>
          {t.destinationsTitle}
        </h1>
      </div>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations..."
            aria-label="Search destinations"
            className="pl-9"
          />
        </div>
        <Select value={region} onChange={(e) => setRegion(e.target.value)} aria-label="Filter by region" className="sm:w-56">
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </Select>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg bg-muted p-8 text-center text-muted-foreground">
          No destinations match your search.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((dest) => (
            <Link
              key={dest.slug}
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
                <Badge variant="accent" className="mb-2">{dest.region}</Badge>
                <h2 className="text-xl font-bold">{dest.name}</h2>
                <p className="mt-1 text-sm opacity-90">{dest.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
