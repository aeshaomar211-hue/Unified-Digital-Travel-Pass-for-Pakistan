'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { requestPasswordReset } from '@/app/actions/password-reset'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MapPin, ArrowLeft, Loader2 } from 'lucide-react'

export default function ForgotPasswordPage() {
  const { t } = useI18n()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { success, message } = await requestPasswordReset(email)

    setLoading(false)

    if (success) {
      setSent(true)
    } else {
      setError(message)
    }
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

            <h2 className="text-3xl font-bold">{t.forgotPasswordTitle}</h2>
            <p className="mt-2 text-muted-foreground">{t.forgotPasswordSubtitle}</p>
          </div>

          {sent ? (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
              <p className="font-medium text-green-900">{t.forgotPasswordSent}</p>
              <p className="mt-2 text-sm text-green-700">
                Check your spam folder if you don&apos;t see it within 5 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t.forgotPasswordBtn}
              </Button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link href="/sign-in" className="font-medium text-teal-600 hover:text-teal-700">
              {t.backToSignIn}
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
