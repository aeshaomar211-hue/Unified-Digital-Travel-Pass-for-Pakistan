import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getTrip } from '@/app/actions/trips'
import { ItineraryDisplay } from '@/components/itinerary-display'
import { Button } from '@/components/ui/button'
import type { Itinerary } from '@/lib/ai/itinerary-schema'

export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const tripId = Number(id)
  if (Number.isNaN(tripId)) notFound()

  const trip = await getTrip(tripId)
  if (!trip) notFound()

  return (
    <div className="flex flex-col gap-6">
      <Button asChild variant="ghost" size="sm" className="w-fit">
        <Link href="/dashboard/trips">
          <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to trips
        </Link>
      </Button>
      <div>
        <h1 className="text-2xl font-bold">{trip.title}</h1>
        <p className="text-muted-foreground">
          {trip.days} days · {trip.travelers} traveler(s)
          {trip.budget ? ` · PKR ${trip.budget.toLocaleString()}` : ''}
        </p>
      </div>
      <ItineraryDisplay itinerary={trip.itinerary as Itinerary} />
    </div>
  )
}
