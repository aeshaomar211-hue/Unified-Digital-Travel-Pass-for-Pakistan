'use server'

import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { and, desc, eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { review } from '@/lib/db/schema'

async function getSessionUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user
}

export async function createReview(input: {
  destinationSlug: string
  rating: number
  comment: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    const u = await getSessionUser()
    await db.insert(review).values({
      userId: u.id,
      authorName: u.name,
      destinationSlug: input.destinationSlug,
      rating: input.rating,
      comment: input.comment,
    })
    revalidatePath(`/destinations/${input.destinationSlug}`)
    return { success: true }
  } catch (error) {
    console.log('[v0] createReview error:', error instanceof Error ? error.message : error)
    return { success: false, error: 'Please sign in to leave a review.' }
  }
}

export async function getReviewsForDestination(slug: string) {
  return db
    .select()
    .from(review)
    .where(and(eq(review.destinationSlug, slug), eq(review.status, 'approved')))
    .orderBy(desc(review.createdAt))
}

export async function getMyReviews() {
  const u = await getSessionUser()
  return db.select().from(review).where(eq(review.userId, u.id)).orderBy(desc(review.createdAt))
}
