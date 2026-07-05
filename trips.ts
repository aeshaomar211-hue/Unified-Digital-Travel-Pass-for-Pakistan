'use server'

import { generateObject } from 'ai'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { and, desc, eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { trip } from '@/lib/db/schema'
import { itinerarySchema, type Itinerary } from '@/lib/ai/itinerary-schema'

export type PlannerInput = {
  destination: string
  days: number
  budget?: number
  travelers: number
  interests: string[]
}

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function generateItinerary(
  input: PlannerInput,
): Promise<{ success: true; itinerary: Itinerary } | { success: false; error: string }> {
  try {
    const budgetLine = input.budget
      ? `The total budget per person is approximately PKR ${input.budget.toLocaleString()}. Keep recommendations within this budget.`
      : 'The traveler has a flexible mid-range budget.'
    const interestsLine =
      input.interests.length > 0
        ? input.interests.join(', ')
        : 'general sightseeing, nature, culture, and food'

    const { object } = await generateObject({
      model: 'openai/gpt-5-mini',
      schema: itinerarySchema,
      prompt: `You are an expert Pakistani travel guide. Create a detailed, realistic ${input.days}-day travel itinerary for a trip to ${input.destination} in Pakistan.

Travelers: ${input.travelers} person(s).
${budgetLine}
Interests and preferences: ${interestsLine}.

Requirements:
- Produce exactly ${input.days} day(s) in the "days" array.
- Use real, well-known places, roads, and local dishes in and around ${input.destination}.
- Prices must be realistic for Pakistan in Pakistani Rupees (PKR).
- Account for realistic travel/driving times between locations.
- Include safety and connectivity tips relevant to the northern areas or the specific region.
- Be specific and practical, not generic.`,
    })

    return { success: true, itinerary: object }
  } catch (error) {
    console.log('[v0] generateItinerary error:', error instanceof Error ? error.message : error)
    return { success: false, error: 'Could not generate the itinerary. Please try again.' }
  }
}

export async function saveTrip(
  input: PlannerInput & { itinerary: Itinerary },
): Promise<{ success: boolean; error?: string }> {
  try {
    const userId = await getUserId()
    await db.insert(trip).values({
      userId,
      title: `${input.days}-Day ${input.destination} Trip`,
      destination: input.destination,
      days: input.days,
      budget: input.budget ?? null,
      travelers: input.travelers,
      interests: input.interests.join(', '),
      itinerary: input.itinerary,
    })
    revalidatePath('/dashboard/trips')
    return { success: true }
  } catch (error) {
    console.log('[v0] saveTrip error:', error instanceof Error ? error.message : error)
    return { success: false, error: 'Could not save trip.' }
  }
}

export async function getTrips() {
  const userId = await getUserId()
  return db.select().from(trip).where(eq(trip.userId, userId)).orderBy(desc(trip.createdAt))
}

export async function getTrip(id: number) {
  const userId = await getUserId()
  const [row] = await db
    .select()
    .from(trip)
    .where(and(eq(trip.id, id), eq(trip.userId, userId)))
  return row ?? null
}

export async function deleteTrip(id: number) {
  const userId = await getUserId()
  await db.delete(trip).where(and(eq(trip.id, id), eq(trip.userId, userId)))
  revalidatePath('/dashboard/trips')
}
