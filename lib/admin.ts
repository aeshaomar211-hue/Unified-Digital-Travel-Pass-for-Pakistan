'use server'

import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

export async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  if (session.user.role !== 'admin') throw new Error('Forbidden: admin access required')
  return session.user
}
