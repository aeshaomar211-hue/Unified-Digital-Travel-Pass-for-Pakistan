'use client'

import { useCallback, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Bus, Car, Plane, TrainFront, MapPin, Ticket, Hotel } from 'lucide-react'
import { routesData, type RouteOption } from '@/lib/data/travel-data'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn, formatPKR, mapsDirectionsUrl } from '@/lib/utils'

const modeIcons = {
  bus: Bus,
  train: TrainFront,
  flight: Plane,
  car: Car,
}

const quickRoutes: Array<[string, string]> = [
  ['Islamabad', 'Hunza'],
  ['Islamabad', 'Skardu'],
  ['Lahore', 'Islamabad'],
  ['Lahore', 'Karachi'],
  ['Islamabad', 'Murree'],
  ['Islamabad', 'Swat'],
]

function clean(value: string) {
  return value.trim().toLowerCase()
}

interface RouteFinderProps {
  compact?: boolean
  initialFrom?: string
  initialTo?: string
}

export function RouteFinder({ compact = false, initialFrom = '', initialTo = '' }: RouteFinderProps) {
  const { t, lang } = useI18n()
  const [from, setFrom] = useState(initialFrom)
  const [to, setTo] = useState(initialTo)
  const [mode, setMode] = useState('all')
  const [results, setResults] = useState<RouteOption[] | null>(null)
  const [error, setError] = useState('')

  const search = useCallback(
    (fromValue = from, toValue = to, modeValue = mode) => {
      setError('')
      if (!fromValue.trim() || !toValue.trim()) {
        setError(t.enterBothCities)
        setResults(null)
        return
      }
      let found = routesData.filter(
        (r) =>
          clean(r.from) === clean(fromValue) &&
          clean(r.to) === clean(toValue) &&
          (modeValue === 'all' || r.mode === modeValue)
      )
      if (found.length === 0 && modeValue !== 'all') {
        found = [
          {
            from: fromValue,
            to: toValue,
            mode: modeValue as RouteOption['mode'],
            provider: `${modeValue} fallback suggestion`,
            time: 'Check live map',
            fare: 0,
            safety: 'Check',
            note: `No exact ${modeValue} route found, but you can still open Google Maps or use mixed transport.`,
            fallback: true,
          },
        ]
      }
      found.sort((a, b) => (a.fare || 999999) - (b.fare || 999999))
      setResults(found)
    },
    [from, to, mode, t.enterBothCities]
  )

  const quickSearch = (a: string, b: string) => {
    setFrom(a)
    setTo(b)
    setMode('all')
    search(a, b, 'all')
  }

  return (
    <div className="flex flex-col gap-4">
      <form
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault()
          search()
        }}
      >
        <Input
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder={t.fromPlaceholder}
          aria-label="From city"
          className="flex-1"
        />
        <Input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder={t.toPlaceholder}
          aria-label="To city"
          className="flex-1"
        />
        <Select value={mode} onChange={(e) => setMode(e.target.value)} aria-label="Transport mode" className="sm:w-36">
          <option value="all">{t.allModes}</option>
          <option value="bus">{t.bus}</option>
          <option value="train">{t.train}</option>
          <option value="flight">{t.flight}</option>
          <option value="car">{t.car}</option>
        </Select>
        <Button type="submit" className={cn(lang === 'ur' && 'urdu-text')}>
          {t.searchBtn}
        </Button>
      </form>

      <div className="flex flex-wrap gap-2">
        {quickRoutes.map(([a, b]) => (
          <button
            key={`${a}-${b}`}
            type="button"
            onClick={() => quickSearch(a, b)}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {a} → {b}
          </button>
        ))}
      </div>

      {error && (
        <p className="rounded-lg bg-secondary px-4 py-3 text-sm text-secondary-foreground" role="alert">
          {error}
        </p>
      )}

      {results && results.length > 0 && (
        <div className={cn('grid gap-4', compact ? 'md:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-3')}>
          {results.map((r, i) => {
            const Icon = modeIcons[r.mode] ?? Bus
            return (
              <Card key={`${r.from}-${r.to}-${r.mode}-${i}`} className="flex flex-col transition-shadow hover:shadow-md">
                <CardContent className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="flex items-center gap-1.5 font-semibold">
                      {r.from} <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" /> {r.to}
                    </h3>
                    <Badge variant="secondary" className="gap-1">
                      <Icon className="h-3 w-3" aria-hidden="true" />
                      {r.mode}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{r.provider}</p>
                  <p className="text-2xl font-bold text-primary">
                    {r.fare > 0 ? formatPKR(r.fare) : 'Estimated'}
                  </p>
                  <dl className="grid grid-cols-3 gap-2 rounded-lg bg-muted p-3 text-center text-xs">
                    <div>
                      <dt className="font-semibold">{t.time}</dt>
                      <dd className="mt-0.5 text-muted-foreground">{r.time}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">{t.safety}</dt>
                      <dd className="mt-0.5 text-muted-foreground">{r.safety}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">{t.rank}</dt>
                      <dd className="mt-0.5 text-muted-foreground">
                        {i === 0 && !r.fallback ? t.bestOption : t.option}
                      </dd>
                    </div>
                  </dl>
                  <p className="text-xs leading-relaxed text-muted-foreground">{r.note}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-1">
                    <Button size="sm" variant="accent" className="flex-1">
                      <Link href={`/passes?route=${encodeURIComponent(`${r.from} → ${r.to}`)}`} className="flex items-center gap-1.5">
                        <Ticket className="h-4 w-4" aria-hidden="true" />
                        {t.generatePassBtn}
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <a
                        href={mapsDirectionsUrl(r.from, r.to)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5"
                      >
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                        {t.googleDirections}
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Link href={`/hotels?city=${encodeURIComponent(r.to)}`} className="flex items-center gap-1.5">
                        <Hotel className="h-4 w-4" aria-hidden="true" />
                        {t.hotelsBtn}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {results && results.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-start gap-3 p-6">
            <h3 className="font-semibold">{t.noRouteFound}</h3>
            <p className="text-sm text-muted-foreground">{t.useGoogleMaps}</p>
            <Button variant="outline" size="sm">
              <a href={mapsDirectionsUrl(from, to)} target="_blank" rel="noopener noreferrer">
                {t.openGoogleMaps}
              </a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
