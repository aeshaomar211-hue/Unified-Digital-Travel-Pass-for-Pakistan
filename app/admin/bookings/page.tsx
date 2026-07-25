import { getAdminBookings } from '@/app/actions/admin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function AdminBookingsPage() {
  const bookings = await getAdminBookings()

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Booking Management</h1>
        <p className="text-muted-foreground">All reservations and bookings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bookings ({bookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium">Item</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Amount</th>
                  <th className="text-left p-3 font-medium">Guests</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Dates</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-border hover:bg-secondary/50">
                    <td className="p-3 font-medium">{b.itemName}</td>
                    <td className="p-3 text-muted-foreground capitalize">{b.type}</td>
                    <td className="p-3 font-semibold">PKR {b.amount.toLocaleString()}</td>
                    <td className="p-3">{b.guests} person(s)</td>
                    <td className="p-3">
                      <Badge
                        variant={b.status === 'confirmed' ? 'default' : b.status === 'cancelled' ? 'destructive' : 'secondary'}
                      >
                        {b.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm">
                      {b.checkIn && b.checkOut
                        ? `${new Date(b.checkIn).toLocaleDateString()} - ${new Date(b.checkOut).toLocaleDateString()}`
                        : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
