'use client'

import { useState } from 'react'
import { Navigation, Map as MapIcon, Building2 } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { mapsDirectionsUrl, mapsEmbedUrl, mapsSearchUrl } from '@/lib/utils'

export function MapExplorer() {
  const { t } = useI18n()
  const [from, setFrom] = useState('Islamabad')
  const [to, setTo] = useState('Hunza')
  const [mode, setMode] = useState('driving')
  const [embedSrc, setEmbedSrc] = useState(mapsEmbedUrl('Pakistan', 5))
  const [error, setError] = useState('')

  const openDirections = () => {
    if (!from.trim() || !to.trim()) {
      setError(t.enterBothCities)
      return
    }
    setError('')
    window.open(mapsDirectionsUrl(from, to, mode), '_blank', 'noopener,noreferrer')
  }

  const preview = () => {
    setError('')
    setEmbedSrc(mapsEmbedUrl(to.trim() || 'Pakistan'))
  }

  const openCityMap = () => {
    setError('')
    window.open(mapsSearchUrl(to.trim() || 'Pakistan'), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="From city"
          aria-label="From city"
          className="flex-1"
        />
        <Input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="To city"
          aria-label="To city"
          className="flex-1"
        />
        <Select value={mode} onChange={(e) => setMode(e.target.value)} aria-label="Travel mode" className="sm:w-36">
          <option value="driving">{t.driving}</option>
          <option value="transit">{t.transit}</option>
          <option value="walking">{t.walking}</option>
        </Select>
        <Button onClick={openDirections}>
          <Navigation className="h-4 w-4" aria-hidden="true" />
          {t.openDirections}
        </Button>
      </div>

      {error && (
        <p className="rounded-lg bg-secondary px-4 py-3 text-sm text-secondary-foreground" role="alert">
          {error}
        </p>
      )}

      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        <div className="flex flex-col gap-3">
          <Button variant="outline" onClick={preview}>
            <MapIcon className="h-4 w-4" aria-hidden="true" />
            {t.previewMap}
          </Button>
          <Button variant="outline" onClick={openCityMap}>
            <Building2 className="h-4 w-4" aria-hidden="true" />
            {t.openCity}
          </Button>
          <p className="text-xs leading-relaxed text-muted-foreground">{t.mapHint}</p>
        </div>
        <iframe
          src={embedSrc}
          title="Map preview"
          className="h-[420px] w-full rounded-xl border border-border"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}
