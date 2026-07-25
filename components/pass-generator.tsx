'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { Printer, Ticket } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface GeneratedPass {
  name: string
  cnic: string
  route: string
  type: string
  code: string
  createdAt: string
}

interface PassGeneratorProps {
  initialRoute?: string
  onGenerated?: (pass: GeneratedPass) => void
}

export function PassGenerator({ initialRoute = '', onGenerated }: PassGeneratorProps) {
  const { t, lang } = useI18n()
  const [name, setName] = useState('')
  const [cnic, setCnic] = useState('')
  const [route, setRoute] = useState(initialRoute)
  const [type, setType] = useState('Tourist')
  const [pass, setPass] = useState<GeneratedPass | null>(null)
  const [qrDataUrl, setQrDataUrl] = useState('')

  useEffect(() => {
    if (initialRoute) setRoute(initialRoute)
  }, [initialRoute])

  useEffect(() => {
    if (!pass) return
    QRCode.toDataURL(
      JSON.stringify({ code: pass.code, name: pass.name, route: pass.route, type: pass.type }),
      { width: 240, margin: 1, color: { dark: '#0F766E', light: '#FFFFFF' } }
    )
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(''))
  }, [pass])

  const generate = () => {
    const newPass: GeneratedPass = {
      name: name.trim() || 'Guest Passenger',
      cnic: cnic.trim() || 'N/A',
      route: route.trim() || 'Islamabad → Hunza',
      type,
      code: 'SSF-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' }),
    }
    setPass(newPass)
    onGenerated?.(newPass)
  }

  return (
    <div className="flex flex-col gap-6">
      <form
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        onSubmit={(e) => {
          e.preventDefault()
          generate()
        }}
      >
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.passengerName}
          aria-label="Passenger name"
        />
        <Input
          value={cnic}
          onChange={(e) => setCnic(e.target.value)}
          placeholder={t.cnicId}
          aria-label="CNIC or student ID"
        />
        <Input
          value={route}
          onChange={(e) => setRoute(e.target.value)}
          placeholder={t.routeExample}
          aria-label="Route"
        />
        <Select value={type} onChange={(e) => setType(e.target.value)} aria-label="Pass type">
          <option value="Student">{t.student}</option>
          <option value="Tourist">{t.tourist}</option>
          <option value="Family">{t.family}</option>
          <option value="Emergency">{t.emergencyType}</option>
        </Select>
        <Button type="submit" className={cn(lang === 'ur' && 'urdu-text')}>
          <Ticket className="h-4 w-4" aria-hidden="true" />
          {t.generatePassBtn}
        </Button>
      </form>

      {pass && (
        <Card className="print-area mx-auto w-full max-w-2xl overflow-hidden border-2 border-primary/30">
          <div className="flex items-center justify-between bg-primary px-6 py-4 text-primary-foreground">
            <div>
              <p className="text-xs uppercase tracking-widest opacity-80">SmartSafar</p>
              <h3 className="text-lg font-bold">Travel Pass</h3>
            </div>
            <p className="font-mono text-lg font-bold">{pass.code}</p>
          </div>
          <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
            <dl className="flex-1 space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-border pb-2">
                <dt className="text-muted-foreground">Name</dt>
                <dd className="font-semibold">{pass.name}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-border pb-2">
                <dt className="text-muted-foreground">ID</dt>
                <dd className="font-semibold">{pass.cnic}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-border pb-2">
                <dt className="text-muted-foreground">Route</dt>
                <dd className="font-semibold">{pass.route}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-border pb-2">
                <dt className="text-muted-foreground">Type</dt>
                <dd className="font-semibold">{pass.type}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Issued</dt>
                <dd className="font-semibold">{pass.createdAt}</dd>
              </div>
            </dl>
            <div className="flex flex-col items-center gap-3">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl || "/placeholder.svg"}
                  alt={`QR code for pass ${pass.code}`}
                  className="h-36 w-36 rounded-lg border border-border"
                />
              ) : (
                <div className="h-36 w-36 animate-pulse rounded-lg bg-muted" />
              )}
              <Button variant="outline" size="sm" onClick={() => window.print()} className="no-print">
                <Printer className="h-4 w-4" aria-hidden="true" />
                {t.printPass}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
