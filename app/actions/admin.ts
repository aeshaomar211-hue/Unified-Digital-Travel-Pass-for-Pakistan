'use server'

import { and, count, eq, gte, lte } from 'drizzle-orm'
import { requireAdmin } from '@/lib/admin'
import { db } from '@/lib/db'
import { user, booking, trip } from '@/lib/db/schema'
import { revalidatePath } from 'next/cache'

export async function getAdminStats() {
  await requireAdmin()
  const [totalUsers] = await db.select({ value: count() }).from(user)
  const [totalBookings] = await db.select({ value: count() }).from(booking)
  const [totalTrips] = await db.select({ value: count() }).from(trip)
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const [todayUsers] = await db
    .select({ value: count() })
    .from(user)
    .where(gte(user.createdAt, today))
  
  return {
    totalUsers: totalUsers.value,
    totalBookings: totalBookings.value,
    totalTrips: totalTrips.value,
    todayUsers: todayUsers.value,
  }
}

export async function getAllUsers() {
  await requireAdmin()
  return db.select().from(user).orderBy(user.createdAt)
}

export async function getAdminBookings() {
  await requireAdmin()
  return db.select().from(booking).orderBy(booking.createdAt)
}

export async function getRevenueData() {
  await requireAdmin()
  const bookings = await db.select().from(booking)
  
  const revenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0)
  const confirmed = bookings.filter((b) => b.status === 'confirmed').length
  const cancelled = bookings.filter((b) => b.status === 'cancelled').length
  
  return {
    totalRevenue: revenue,
    confirmedBookings: confirmed,
    cancelledBookings: cancelled,
    averageOrderValue: confirmed > 0 ? Math.round(revenue / confirmed) : 0,
  }
}

export async function updateBookingStatus(id: number, status: string) {
  await requireAdmin()
  await db.update(booking).set({ status }).where(eq(booking.id, id))
  revalidatePath('/admin/bookings')
}

export async function updateUserRole(userId: string, role: string) {
  await requireAdmin()
  await db.update(user).set({ role }).where(eq(user.id, userId))
  revalidatePath('/admin/users')
}
