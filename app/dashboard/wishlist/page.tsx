import Link from 'next/link'
import { Heart, ArrowRight } from 'lucide-react'
import { getWishlist } from '@/app/actions/wishlist'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RemoveWishlistButton } from '@/components/dashboard/remove-wishlist-button'

export default async function WishlistPage() {
  const items = await getWishlist()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Wishlist</h1>
        <p className="text-muted-foreground">Destinations you want to visit.</p>
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Your wishlist is empty</h3>
              <p className="text-sm text-muted-foreground">
                Save destinations from the explore page to find them here.
              </p>
            </div>
            <Button asChild>
              <Link href="/destinations">Explore Destinations</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative aspect-video bg-secondary">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image || '/placeholder.svg?height=200&width=320&query=pakistan destination'}
                  alt={item.destinationName}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="flex items-center justify-between gap-2 p-4">
                <div>
                  <h3 className="font-semibold">{item.destinationName}</h3>
                  <Link
                    href={`/destinations/${item.destinationSlug}`}
                    className="flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    View <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <RemoveWishlistButton id={item.id} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
