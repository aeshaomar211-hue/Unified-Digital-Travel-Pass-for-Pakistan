'use server'

import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { and, desc, eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { wishlist } from '@/lib/db/schema'

async function getUserIdOrNull() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user?.id ?? null
}

async function requireUserId() {
  const id = await getUserIdOrNull()
  if (!id) throw new Error('Unauthorized')
  return id
}

export async function toggleWishlist(input: {
  destinationSlug: string
  destinationName: string
  image?: string
}): Promise<{ success: boolean; added: boolean; error?: string }> {
  try {
    const userId = await requireUserId()
    const existing = await db
      .select()
      .from(wishlist)
      .where(and(eq(wishlist.userId, userId), eq(wishlist.destinationSlug, input.destinationSlug)))
    if (existing.length > 0) {
      await db
        .delete(wishlist)
        .where(and(eq(wishlist.userId, userId), eq(wishlist.destinationSlug, input.destinationSlug)))
      revalidatePath('/dashboard/wishlist')
      return { success: true, added: false }
    }
    await db.insert(wishlist).values({
      userId,
      destinationSlug: input.destinationSlug,
      destinationName: input.destinationName,
      image: input.image || null,
    })
    revalidatePath('/dashboard/wishlist')
    return { success: true, added: true }
  } catch (error) {
    console.log('[v0] toggleWishlist error:', error instanceof Error ? error.message : error)
    return { success: false, added: false, error: 'Please sign in to save destinations.' }
  }
}

export async function getWishlist() {
  const userId = await requireUserId()
  return db.select().from(wishlist).where(eq(wishlist.userId, userId)).orderBy(desc(wishlist.createdAt))
}

export async function getWishlistSlugs(): Promise<string[]> {
  const userId = await getUserIdOrNull()
  if (!userId) return []
  const rows = await db
    .select({ slug: wishlist.destinationSlug })
    .from(wishlist)
    .where(eq(wishlist.userId, userId))
  return rows.map((r) => r.slug)
}

export async function removeWishlist(id: number) {
  const userId = await requireUserId()
  await db.delete(wishlist).where(and(eq(wishlist.id, id), eq(wishlist.userId, userId)))
  revalidatePath('/dashboard/wishlist')
}
