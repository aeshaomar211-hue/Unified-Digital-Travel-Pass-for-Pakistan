'use server'

import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { and, desc, eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { notification } from '@/lib/db/schema'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getNotifications() {
  const userId = await getUserId()
  return db
    .select()
    .from(notification)
    .where(eq(notification.userId, userId))
    .orderBy(desc(notification.createdAt))
}

export async function markNotificationRead(id: number) {
  const userId = await getUserId()
  await db
    .update(notification)
    .set({ read: true })
    .where(and(eq(notification.id, id), eq(notification.userId, userId)))
  revalidatePath('/dashboard/notifications')
}

export async function markAllNotificationsRead() {
  const userId = await getUserId()
  await db.update(notification).set({ read: true }).where(eq(notification.userId, userId))
  revalidatePath('/dashboard/notifications')
}
