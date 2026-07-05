'use server'

import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { and, desc, eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { pass } from '@/lib/db/schema'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

function makePassCode() {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase()
  const year = new Date().getFullYear()
  return `SS-${year}-${rand}`
}

export type PassInput = {
  passType: string
  holderName: string
  cnic?: string
  origin?: string
  destination?: string
  validFrom: string
  validUntil: string
}

export async function createPass(
  input: PassInput,
): Promise<{ success: boolean; passCode?: string; error?: string }> {
  try {
    const userId = await getUserId()
    const passCode = makePassCode()
    await db.insert(pass).values({
      userId,
      passCode,
      passType: input.passType,
      holderName: input.holderName,
      cnic: input.cnic || null,
      origin: input.origin || null,
      destination: input.destination || null,
      validFrom: input.validFrom,
      validUntil: input.validUntil,
    })
    revalidatePath('/dashboard/passes')
    return { success: true, passCode }
  } catch (error) {
    console.log('[v0] createPass error:', error instanceof Error ? error.message : error)
    return { success: false, error: 'Could not create pass.' }
  }
}

export async function getPasses() {
  const userId = await getUserId()
  return db.select().from(pass).where(eq(pass.userId, userId)).orderBy(desc(pass.createdAt))
}

export async function deletePass(id: number) {
  const userId = await getUserId()
  await db.delete(pass).where(and(eq(pass.id, id), eq(pass.userId, userId)))
  revalidatePath('/dashboard/passes')
}
