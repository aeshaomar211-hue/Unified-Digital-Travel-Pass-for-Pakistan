import { CalendarCheck, MapPin, Users } from 'lucide-react'
import { getBookings } from '@/app/actions/bookings'
import { Card, CardContent } from '@/components/ui/card'
import { CancelBookingButton } from '@/components/dashboard/cancel-booking-button'

const statusStyles: Record<string, string> = {
  confirmed: 'bg-primary/10 text-primary',
  cancelled: 'bg-destructive/10 text-destructive',
  completed: 'bg-secondary text-muted-foreground',
}

export default async function BookingsPage() {
  const bookings = await getBookings()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Bookings</h1>
        <p className="text-muted-foreground">Your hotel, transport, and package bookings.</p>
      </div>

      {bookings.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CalendarCheck className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">No bookings yet</h3>
              <p className="text-sm text-muted-foreground">
                Book hotels and packages to see them here.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {bookings.map((b) => (
            <Card key={b.id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium uppercase text-muted-foreground">
                      {b.type}
                    </span>
                    <h3 className="font-semibold">{b.itemName}</h3>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    {b.location ? (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> {b.location}
                      </span>
                    ) : null}
                    {b.checkIn ? (
                      <span>
                        {b.checkIn}
                        {b.checkOut ? ` → ${b.checkOut}` : ''}
                      </span>
                    ) : null}
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" /> {b.guests}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-primary">PKR {b.amount.toLocaleString()}</p>
                    <span
                      className={
                        'inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ' +
                        (statusStyles[b.status] ?? 'bg-secondary text-muted-foreground')
                      }
                    >
                      {b.status}
                    </span>
                  </div>
                  {b.status === 'confirmed' ? <CancelBookingButton id={b.id} /> : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
