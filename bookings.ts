'use server'

import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { and, desc, eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { booking, notification } from '@/lib/db/schema'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export type BookingInput = {
  type: string
  itemName: string
  location?: string
  checkIn?: string
  checkOut?: string
  guests?: number
  amount: number
}

export async function createBooking(
  input: BookingInput,
): Promise<{ success: boolean; error?: string }> {
  try {
    const userId = await getUserId()
    await db.insert(booking).values({
      userId,
      type: input.type,
      itemName: input.itemName,
      location: input.location || null,
      checkIn: input.checkIn || null,
      checkOut: input.checkOut || null,
      guests: input.guests ?? 1,
      amount: input.amount,
    })
    await db.insert(notification).values({
      userId,
      title: 'Booking confirmed',
      message: `Your booking for ${input.itemName} is confirmed.`,
      type: 'success',
    })
    revalidatePath('/dashboard/bookings')
    return { success: true }
  } catch (error) {
    console.log('[v0] createBooking error:', error instanceof Error ? error.message : error)
    return { success: false, error: 'Could not create booking.' }
  }
}

export async function getBookings() {
  const userId = await getUserId()
  return db.select().from(booking).where(eq(booking.userId, userId)).orderBy(desc(booking.createdAt))
}

export async function cancelBooking(id: number) {
  const userId = await getUserId()
  await db
    .update(booking)
    .set({ status: 'cancelled' })
    .where(and(eq(booking.id, id), eq(booking.userId, userId)))
  revalidatePath('/dashboard/bookings')
}
