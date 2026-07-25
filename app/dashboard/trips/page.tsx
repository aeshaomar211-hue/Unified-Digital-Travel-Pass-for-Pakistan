import Link from 'next/link'
import { Sparkles, Calendar, Users, Wallet, ArrowRight } from 'lucide-react'
import { getTrips } from '@/app/actions/trips'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DeleteTripButton } from '@/components/dashboard/delete-trip-button'

export default async function TripsPage() {
  const trips = await getTrips()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Saved Trips</h1>
          <p className="text-muted-foreground">Your AI-generated itineraries.</p>
        </div>
        <Button asChild>
          <Link href="/planner">
            <Sparkles className="mr-1.5 h-4 w-4" /> New Trip
          </Link>
        </Button>
      </div>

      {trips.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">No saved trips yet</h3>
              <p className="text-sm text-muted-foreground">
                Generate an AI itinerary and save it to your account.
              </p>
            </div>
            <Button asChild>
              <Link href="/planner">Plan Your First Trip</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {trips.map((t) => (
            <Card key={t.id} className="flex flex-col">
              <CardContent className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold">{t.title}</h3>
                  <DeleteTripButton id={t.id} />
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {t.days} days
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> {t.travelers}
                  </span>
                  {t.budget ? (
                    <span className="flex items-center gap-1">
                      <Wallet className="h-3.5 w-3.5" /> PKR {t.budget.toLocaleString()}
                    </span>
                  ) : null}
                </div>
                {t.interests ? (
                  <p className="text-xs text-muted-foreground">{t.interests}</p>
                ) : null}
                <div className="mt-auto pt-2">
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={`/dashboard/trips/${t.id}`}>
                      View Itinerary <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
