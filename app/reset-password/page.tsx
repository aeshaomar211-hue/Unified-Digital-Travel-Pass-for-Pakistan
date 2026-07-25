'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { resetPassword } from '@/app/actions/password-reset'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MapPin, ArrowLeft, Loader2 } from 'lucide-react'

export default function ResetPasswordPage() {
  const { t } = useI18n()
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!token) {
      setError(t.invalidResetLink)
    }
  }, [token, t])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError(t.passwordsDoNotMatch)
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    setLoading(true)
    const { success: didSucceed, message } = await resetPassword(token!, password)
    setLoading(false)

    if (didSucceed) {
      setSuccess(true)
      setTimeout(() => router.push('/sign-in'), 3000)
    } else {
      setError(message)
    }
  }

  if (!token) {
    return (
      <main className="grid min-h-svh lg:grid-cols-2">
        <div className="relative hidden lg:block">
          <Image
            src="/images/hunza.png"
            alt="Hunza Valley, Pakistan"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
        </div>

        <div className="flex flex-col items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-md">
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-center">
              <p className="font-medium text-destructive">{t.invalidResetLink}</p>
            </div>
            <Link href="/forgot-password" className="mt-4 inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700">
              <ArrowLeft className="h-4 w-4" />
              Request a new link
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image
          src="/images/hunza.png"
          alt="Hunza Valley, Pakistan"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
      </div>

      <div className="flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <Link href="/sign-in" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            {t.backToSignIn}
          </Link>

          <div className="mb-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-600">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold">SmartSafar</h1>
            </div>

            <h2 className="text-3xl font-bold">{t.resetPasswordTitle}</h2>
            <p className="mt-2 text-muted-foreground">{t.resetPasswordSubtitle}</p>
          </div>

          {success ? (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
              <p className="font-medium text-green-900">{t.resetPasswordSuccess}</p>
              <p className="mt-2 text-sm text-muted-foreground">Redirecting to sign in...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div>
                <Label htmlFor="password">{t.newPassword}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={8}
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={8}
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t.resetPasswordBtn}
              </Button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
