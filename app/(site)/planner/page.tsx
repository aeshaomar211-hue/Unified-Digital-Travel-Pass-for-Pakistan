import type { Metadata } from 'next'
import { TripPlanner } from '@/components/trip-planner'
import { PlannerHeader } from '@/components/planner-header'
import { getSession } from '@/lib/session'

export const metadata: Metadata = {
  title: 'AI Trip Planner | SmartSafar',
  description:
    'Generate a personalized day-by-day Pakistan travel itinerary with AI. Get budgets, hotels, food recommendations and packing lists instantly.',
}

export default async function PlannerPage() {
  const session = await getSession()
  const isAuthed = !!session?.user

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PlannerHeader />
      <TripPlanner isAuthed={isAuthed} />
    </div>
  )
}
