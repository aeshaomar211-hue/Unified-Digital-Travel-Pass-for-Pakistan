'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sparkles, Loader2, Save, Check, MapPin, Calendar, Wallet, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ItineraryDisplay } from '@/components/itinerary-display'
import { generateItinerary, saveTrip } from '@/app/actions/trips'
import type { Itinerary } from '@/lib/ai/itinerary-schema'
import { destinationsData as destinations } from '@/lib/data/travel-data'
import { useI18n } from '@/lib/i18n/context'

const interestOptions = [
  'Mountains',
  'History',
  'Food',
  'Adventure',
  'Culture',
  'Photography',
  'Shopping',
  'Nature',
  'Religious Sites',
  'Wildlife',
]

export function TripPlanner({ isAuthed }: { isAuthed: boolean }) {
  const { t } = useI18n()
  const [destination, setDestination] = useState('')
  const [days, setDays] = useState(5)
  const [budget, setBudget] = useState(50000)
  const [travelers, setTravelers] = useState(2)
  const [interests, setInterests] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [itinerary, setItinerary] = useState<Itinerary | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  function toggleInterest(interest: string) {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest],
    )
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    if (!destination.trim()) {
      setError('Please enter a destination')
      return
    }
    setLoading(true)
    setError('')
    setItinerary(null)
    setSaved(false)
    try {
      const result = await generateItinerary({
        destination,
        days,
        budget,
        travelers,
        interests,
      })
      if (result.success && result.itinerary) {
        setItinerary(result.itinerary)
      } else {
        setError(result.error || 'Failed to generate itinerary. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    if (!itinerary) return
    setSaving(true)
    try {
      const result = await saveTrip({
        destination,
        days,
        budget,
        travelers,
        interests,
        itinerary,
      })
      if (result.success) setSaved(true)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      <Card className="h-fit lg:sticky lg:top-24">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {t.plannerTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerate} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="destination" className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {t.plannerDestination}
              </Label>
              <Input
                id="destination"
                list="destinations-list"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Hunza Valley"
              />
              <datalist id="destinations-list">
                {destinations.map((d) => (
                  <option key={d.slug} value={d.name} />
                ))}
              </datalist>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="days" className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> {t.plannerDays}
                </Label>
                <Input
                  id="days"
                  type="number"
                  min={1}
                  max={21}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="travelers" className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" /> {t.plannerTravelers}
                </Label>
                <Input
                  id="travelers"
                  type="number"
                  min={1}
                  max={20}
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="budget" className="flex items-center gap-1.5">
                <Wallet className="h-3.5 w-3.5" /> {t.plannerBudget} (PKR)
              </Label>
              <Input
                id="budget"
                type="number"
                min={5000}
                step={5000}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>{t.plannerInterests}</Label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((interest) => {
                  const active = interests.includes(interest)
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={
                        'rounded-full border px-3 py-1 text-xs font-medium transition-colors ' +
                        (active
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-background text-muted-foreground hover:border-primary/50')
                      }
                    >
                      {interest}
                    </button>
                  )
                })}
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.plannerGenerating}
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  {t.plannerGenerate}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div>
        {loading && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-12 text-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-lg font-medium">{t.plannerGenerating}</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              {t.plannerGeneratingHint}
            </p>
          </div>
        )}

        {!loading && !itinerary && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">{t.plannerEmptyTitle}</h3>
            <p className="max-w-md text-sm text-muted-foreground">{t.plannerEmptyHint}</p>
          </div>
        )}

        {!loading && itinerary && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-bold">{t.plannerYourTrip}</h2>
              {isAuthed ? (
                <Button onClick={handleSave} disabled={saving || saved} variant={saved ? 'outline' : 'default'}>
                  {saved ? (
                    <>
                      <Check className="mr-2 h-4 w-4" /> {t.plannerSaved}
                    </>
                  ) : saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t.plannerSaving}
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" /> {t.plannerSave}
                    </>
                  )}
                </Button>
              ) : (
                <Button asChild variant="outline">
                  <Link href="/sign-in">{t.plannerSignInToSave}</Link>
                </Button>
              )}
            </div>
            <ItineraryDisplay itinerary={itinerary} />
          </div>
        )}
      </div>
    </div>
  )
}
