'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '@/lib/auth-client'
import { authClient } from '@/lib/auth-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LogOut, Mail, User } from 'lucide-react'

export default function ProfilePage() {
  const { data: sessionData, isPending } = useSession()
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (sessionData?.user) {
      setName(sessionData.user.name)
      setEmail(sessionData.user.email)
    }
  }, [sessionData])

  if (isPending) {
    return <div className="animate-pulse rounded-lg bg-secondary h-48" />
  }

  if (!sessionData?.user) {
    router.push('/sign-in')
    return null
  }

  async function handleSignOut() {
    setLoading(true)
    try {
      await authClient.signOut()
      router.push('/')
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your SmartSafar account</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" /> Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" /> Full Name
            </Label>
            <Input id="name" value={name} disabled />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> Email
            </Label>
            <Input id="email" value={email} disabled type="email" />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border bg-card/50 p-4">
            <div>
              <p className="font-medium">Account Status</p>
              <p className="text-sm text-muted-foreground">Active since {new Date(sessionData.user.createdAt || Date.now()).toLocaleDateString()}</p>
            </div>
            <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-700 dark:text-green-400">
              Active
            </span>
          </div>

          <div className="border-t border-border pt-4">
            <Button onClick={handleSignOut} disabled={loading} variant="destructive" className="w-full">
              <LogOut className="mr-2 h-4 w-4" /> {loading ? 'Signing out...' : 'Sign Out'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
