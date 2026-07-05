'use client'

import { Calendar, Clock, MapPin, Utensils, BedDouble, Backpack, Lightbulb, Wallet } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Itinerary } from '@/lib/ai/itinerary-schema'

function formatPKR(n: number) {
  return `PKR ${n.toLocaleString('en-PK')}`
}

export function ItineraryDisplay({ itinerary }: { itinerary: Itinerary }) {
  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-5">
          <p className="text-pretty leading-relaxed text-foreground">{itinerary.summary}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Badge variant="secondary" className="gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> {itinerary.days.length} days
            </Badge>
            <Badge variant="secondary" className="gap-1.5">
              <Clock className="h-3.5 w-3.5" /> Best time: {itinerary.bestTimeToVisit}
            </Badge>
            <Badge className="gap-1.5">
              <Wallet className="h-3.5 w-3.5" /> {formatPKR(itinerary.totalEstimatedCost)} / person
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {itinerary.days.map((day) => (
          <Card key={day.day}>
            <CardHeader className="border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                  {day.day}
                </div>
                <div>
                  <CardTitle className="text-lg">{day.title}</CardTitle>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {day.location}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-5">
              <ol className="space-y-3">
                {day.activities.map((a, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 w-20 shrink-0 text-sm font-medium text-accent-foreground">{a.time}</span>
                    <div className="flex-1 border-l border-border pl-3">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="font-medium">{a.title}</p>
                        {a.estimatedCost > 0 && (
                          <span className="shrink-0 text-xs text-muted-foreground">{formatPKR(a.estimatedCost)}</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{a.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-secondary p-3">
                  <p className="mb-1 flex items-center gap-1.5 text-sm font-medium">
                    <Utensils className="h-4 w-4 text-primary" /> Where to eat
                  </p>
                  <p className="text-sm text-muted-foreground">{day.meals.join(', ')}</p>
                </div>
                <div className="rounded-lg bg-secondary p-3">
                  <p className="mb-1 flex items-center gap-1.5 text-sm font-medium">
                    <BedDouble className="h-4 w-4 text-primary" /> Stay
                  </p>
                  <p className="text-sm text-muted-foreground">{day.accommodation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Backpack className="h-5 w-5 text-primary" /> Packing List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {itinerary.packingList.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Lightbulb className="h-5 w-5 text-primary" /> Travel Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {itinerary.travelTips.map((tip, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" /> {tip}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
