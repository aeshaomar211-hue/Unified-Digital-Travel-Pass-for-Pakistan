'use client'

import { useCallback, useEffect, useState } from 'react'
import { Star, ExternalLink, MapPin } from 'lucide-react'
import { hotelsData, type HotelOption } from '@/lib/data/travel-data'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn, formatPKR, googleHotelsUrl, bookingUrl, mapsSearchUrl } from '@/lib/utils'

function clean(value: string) {
  return value.trim().toLowerCase()
}

interface HotelFinderProps {
  initialCity?: string
}

export function HotelFinder({ initialCity = '' }: HotelFinderProps) {
  const { t, lang } = useI18n()
  const [city, setCity] = useState(initialCity)
  const [budget, setBudget] = useState('all')
  const [results, setResults] = useState<HotelOption[] | null>(null)
  const [error, setError] = useState('')

  const search = useCallback(
    (cityValue = city, budgetValue = budget) => {
      setError('')
      if (!cityValue.trim()) {
        setError(t.enterCity)
        setResults(null)
        return
      }
      const found = hotelsData
        .filter((h) => clean(h.city) === clean(cityValue) && (budgetValue === 'all' || h.budget === budgetValue))
        .sort((a, b) => a.price - b.price)
      setResults(found)
    },
    [city, budget, t.enterCity]
  )

  useEffect(() => {
    if (initialCity) search(initialCity, 'all')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCity])

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
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder={t.cityPlaceholder}
          aria-label="City"
          className="flex-1"
        />
        <Select value={budget} onChange={(e) => setBudget(e.target.value)} aria-label="Budget tier" className="sm:w-40">
          <option value="all">{t.allBudgets}</option>
          <option value="budget">{t.budget}</option>
          <option value="mid">{t.midRange}</option>
          <option value="premium">{t.premium}</option>
        </Select>
        <Button type="submit" className={cn(lang === 'ur' && 'urdu-text')}>
          {t.showHotels}
        </Button>
      </form>

      {error && (
        <p className="rounded-lg bg-secondary px-4 py-3 text-sm text-secondary-foreground" role="alert">
          {error}
        </p>
      )}

      {results && results.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map((h) => (
            <Card key={`${h.city}-${h.name}`} className="flex flex-col transition-shadow hover:shadow-md">
              <CardContent className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold leading-snug">{h.name}</h3>
                  <Badge
                    variant={h.budget === 'premium' ? 'accent' : 'secondary'}
                    className="shrink-0 capitalize"
                  >
                    {h.budget}
                  </Badge>
                </div>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {h.area}, {h.city}
                </p>
                <div className="flex items-baseline justify-between">
                  <p className="text-2xl font-bold text-primary">
                    {formatPKR(h.price)}
                    <span className="text-sm font-normal text-muted-foreground">{t.perNight}</span>
                  </p>
                  <p className="flex items-center gap-1 text-sm font-medium">
                    <Star className="h-4 w-4 fill-accent text-accent" aria-hidden="true" />
                    {h.rating}
                  </p>
                </div>
                <div className="mt-auto flex flex-wrap gap-2 pt-1">
                  <Button size="sm" variant="outline" className="flex-1">
                    <a
                      href={googleHotelsUrl(h.city)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5"
                    >
                      Google Hotels <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <a
                      href={bookingUrl(h.city)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5"
                    >
                      Booking.com <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <a
                      href={mapsSearchUrl(`${h.name} ${h.city}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5"
                    >
                      <MapPin className="h-3 w-3" aria-hidden="true" /> Map
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {results && results.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-start gap-3 p-6">
            <h3 className="font-semibold">{t.noHotelsFound}</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <a href={googleHotelsUrl(city)} target="_blank" rel="noopener noreferrer">
                  Google Hotels
                </a>
              </Button>
              <Button variant="outline" size="sm">
                <a href={bookingUrl(city)} target="_blank" rel="noopener noreferrer">
                  Booking.com
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
