'use client'

import { useState } from 'react'
import { Loader2, Plus, Ticket } from 'lucide-react'
import { createPass } from '@/app/actions/passes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const passTypes = ['Tourist', 'Student', 'Family', 'Emergency']

export function PassForm({ defaultName }: { defaultName: string }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [passType, setPassType] = useState('Tourist')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const fd = new FormData(e.currentTarget)
    const result = await createPass({
      passType,
      holderName: String(fd.get('holderName') || ''),
      cnic: String(fd.get('cnic') || ''),
      origin: String(fd.get('origin') || ''),
      destination: String(fd.get('destination') || ''),
      validFrom: String(fd.get('validFrom') || ''),
      validUntil: String(fd.get('validUntil') || ''),
    })
    setLoading(false)
    if (result.success) {
      setOpen(false)
    } else {
      setError(result.error || 'Could not create pass.')
    }
  }

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-1.5 h-4 w-4" /> New Pass
      </Button>
    )
  }

  const today = new Date().toISOString().slice(0, 10)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Ticket className="h-5 w-5 text-primary" /> Generate Travel Pass
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="holderName">Passenger Name</Label>
              <Input id="holderName" name="holderName" defaultValue={defaultName} required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="cnic">CNIC / Student ID</Label>
              <Input id="cnic" name="cnic" placeholder="Optional" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Pass Type</Label>
            <div className="flex flex-wrap gap-2">
              {passTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPassType(type)}
                  className={
                    'rounded-full border px-3 py-1 text-xs font-medium transition-colors ' +
                    (passType === type
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background text-muted-foreground hover:border-primary/50')
                  }
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="origin">From</Label>
              <Input id="origin" name="origin" placeholder="e.g. Islamabad" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="destination">To</Label>
              <Input id="destination" name="destination" placeholder="e.g. Hunza" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="validFrom">Valid From</Label>
              <Input id="validFrom" name="validFrom" type="date" defaultValue={today} required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="validUntil">Valid Until</Label>
              <Input id="validUntil" name="validUntil" type="date" required />
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                'Generate Pass'
              )}
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
