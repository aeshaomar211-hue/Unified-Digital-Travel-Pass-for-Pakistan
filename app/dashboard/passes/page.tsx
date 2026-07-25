import { Ticket } from 'lucide-react'
import { getSession } from '@/lib/session'
import { getPasses } from '@/app/actions/passes'
import { PassForm } from '@/components/dashboard/pass-form'
import { PassCard } from '@/components/dashboard/pass-card'
import { Card, CardContent } from '@/components/ui/card'

export default async function PassesPage() {
  const session = await getSession()
  const passes = await getPasses()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Travel Passes</h1>
          <p className="text-muted-foreground">Generate and manage your digital travel passes.</p>
        </div>
        <PassForm defaultName={session?.user.name ?? ''} />
      </div>

      {passes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Ticket className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">No passes yet</h3>
              <p className="text-sm text-muted-foreground">
                Generate a digital travel pass with a scannable QR code.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {passes.map((p) => (
            <PassCard key={p.id} pass={p} />
          ))}
        </div>
      )}
    </div>
  )
}
