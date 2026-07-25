'use client'

import { useEffect, useState, useTransition } from 'react'
import QRCode from 'qrcode'
import { MountainSnow, Trash2, Loader2 } from 'lucide-react'
import { deletePass } from '@/app/actions/passes'

type Pass = {
  id: number
  passCode: string
  passType: string
  holderName: string
  cnic: string | null
  origin: string | null
  destination: string | null
  validFrom: string
  validUntil: string
  status: string
}

export function PassCard({ pass }: { pass: Pass }) {
  const [qr, setQr] = useState('')
  const [pending, startTransition] = useTransition()

  useEffect(() => {
    const payload = JSON.stringify({
      code: pass.passCode,
      name: pass.holderName,
      type: pass.passType,
      valid: pass.validUntil,
    })
    QRCode.toDataURL(payload, { width: 200, margin: 1 }).then(setQr).catch(() => {})
  }, [pass])

  const expired = new Date(pass.validUntil) < new Date()

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between bg-primary px-5 py-3 text-primary-foreground">
        <div className="flex items-center gap-2">
          <MountainSnow className="h-5 w-5" />
          <span className="font-bold">SmartSafar Pass</span>
        </div>
        <span className="rounded-full bg-primary-foreground/20 px-2.5 py-0.5 text-xs font-semibold uppercase">
          {pass.passType}
        </span>
      </div>
      <div className="flex gap-5 p-5">
        <div className="flex-1 space-y-2 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Passenger</p>
            <p className="font-semibold">{pass.holderName}</p>
          </div>
          {pass.origin && pass.destination ? (
            <div>
              <p className="text-xs text-muted-foreground">Route</p>
              <p className="font-medium">
                {pass.origin} → {pass.destination}
              </p>
            </div>
          ) : null}
          <div className="flex gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Valid Until</p>
              <p className="font-medium">{pass.validUntil}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <p
                className={
                  'font-semibold ' + (expired ? 'text-destructive' : 'text-primary')
                }
              >
                {expired ? 'Expired' : 'Active'}
              </p>
            </div>
          </div>
          <p className="pt-1 font-mono text-xs text-muted-foreground">{pass.passCode}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          {qr ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={qr || '/placeholder.svg'} alt={`QR code for pass ${pass.passCode}`} className="h-24 w-24 rounded-md border border-border" />
          ) : (
            <div className="h-24 w-24 animate-pulse rounded-md bg-secondary" />
          )}
          <button
            aria-label="Delete pass"
            disabled={pending}
            onClick={() => {
              if (confirm('Delete this pass?')) startTransition(() => deletePass(pass.id))
            }}
            className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-destructive"
          >
            {pending ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
