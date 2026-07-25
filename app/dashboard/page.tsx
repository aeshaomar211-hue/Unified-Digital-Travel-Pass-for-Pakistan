import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, Ticket, CalendarCheck, Heart, ArrowRight, MapPin } from 'lucide-react'
import { getSession } from '@/lib/session'
import { getTrips } from '@/app/actions/trips'
import { getPasses } from '@/app/actions/passes'
import { getBookings } from '@/app/actions/bookings'
import { getWishlist } from '@/app/actions/wishlist'
import { StatCard } from '@/components/dashboard/stat-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
  const session = await getSession()
  const [trips, passes, bookings, wishlist] = await Promise.all([
    getTrips(),
    getPasses(),
    getBookings(),
    getWishlist(),
  ])

  const activeBookings = bookings.filter((b) => b.status === 'confirmed')

  return (
    <div className="flex flex-col gap-8">
      <div className="relative -mx-6 -mt-6 mb-2 h-48 overflow-hidden rounded-b-2xl bg-gradient-to-br from-teal-500/10 to-amber-500/10 p-8 md:h-56">
        <Image
          src="/images/dashboard-hero.png"
          alt="Dashboard hero"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="relative flex flex-col justify-between h-full">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Welcome back, {session?.user.name.split(' ')[0]}</h1>
            <p className="text-muted-foreground text-lg mt-2">Your travel companion awaits</p>
          </div>
          <Button asChild className="w-fit">
            <Link href="/planner">
              <Sparkles className="mr-2 h-4 w-4" /> Plan Your Next Adventure
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Saved Trips" value={trips.length} icon={Sparkles} href="/dashboard/trips" />
        <StatCard label="Travel Passes" value={passes.length} icon={Ticket} href="/dashboard/passes" />
        <StatCard
          label="Active Bookings"
          value={activeBookings.length}
          icon={CalendarCheck}
          href="/dashboard/bookings"
        />
        <StatCard label="Wishlist" value={wishlist.length} icon={Heart} href="/dashboard/wishlist" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Trips</CardTitle>
            <Link
              href="/dashboard/trips"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {trips.length === 0 ? (
              <div className="flex flex-col items-start gap-3 py-4">
                <p className="text-sm text-muted-foreground">
                  You have not saved any AI trips yet.
                </p>
                <Button asChild size="sm">
                  <Link href="/planner">
                    <Sparkles className="mr-1.5 h-4 w-4" /> Plan a Trip
                  </Link>
                </Button>
              </div>
            ) : (
              trips.slice(0, 4).map((t) => (
                <Link
                  key={t.id}
                  href={`/dashboard/trips/${t.id}`}
                  className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:border-primary/50"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium">{t.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.days} days · {t.travelers} traveler(s)
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Bookings</CardTitle>
            <Link
              href="/dashboard/bookings"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {bookings.length === 0 ? (
              <p className="py-4 text-sm text-muted-foreground">No bookings yet.</p>
            ) : (
              bookings.slice(0, 4).map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{b.itemName}</p>
                    <p className="text-xs text-muted-foreground">{b.location}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    PKR {b.amount.toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
