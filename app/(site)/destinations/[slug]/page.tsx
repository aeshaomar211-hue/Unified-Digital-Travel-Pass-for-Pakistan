import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, MapPin, ArrowLeft, Ticket, Hotel } from 'lucide-react'
import { destinationsData, hotelsData } from '@/lib/data/travel-data'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatPKR, mapsEmbedUrl } from '@/lib/utils'

export function generateStaticParams() {
  return destinationsData.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const dest = destinationsData.find((d) => d.slug === slug)
  if (!dest) return {}
  return {
    title: `${dest.name} — ${dest.tagline}`,
    description: dest.description,
  }
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const dest = destinationsData.find((d) => d.slug === slug)
  if (!dest) notFound()

  const cityHotels = hotelsData.filter(
    (h) => h.city.toLowerCase() === dest.name.split(' ')[0].toLowerCase()
  )

  return (
    <article>
      <div className="relative h-[50vh] min-h-[360px]">
        <Image src={dest.image || "/placeholder.svg"} alt={dest.name} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-6">
          <Badge variant="accent" className="mb-3">{dest.region}</Badge>
          <h1 className="font-serif text-4xl font-semibold text-white sm:text-5xl">{dest.name}</h1>
          <p className="mt-2 text-lg text-white/90">{dest.tagline}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Link
          href="/destinations"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All destinations
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-serif text-2xl font-semibold">About {dest.name}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{dest.description}</p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold">Highlights</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {dest.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 rounded-lg bg-muted px-4 py-3 text-sm">
                    <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {cityHotels.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl font-semibold">Where to stay</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {cityHotels.map((h) => (
                    <Card key={h.name}>
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold">{h.name}</h3>
                          <Badge variant="secondary" className="capitalize">{h.budget}</Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{h.area}</p>
                        <p className="mt-2 font-bold text-primary">{formatPKR(h.price)}<span className="text-sm font-normal text-muted-foreground">/night</span></p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-5">
            <Card>
              <CardContent className="flex flex-col gap-4 p-5">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Best season</p>
                    <p className="font-semibold">{dest.bestSeason}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="accent">
                    <Link href={`/planner?destination=${encodeURIComponent(dest.name)}`} className="flex items-center gap-2">
                      Plan a trip with AI
                    </Link>
                  </Button>
                  <Button variant="outline">
                    <Link href={`/passes?route=${encodeURIComponent(`Islamabad → ${dest.name}`)}`} className="flex items-center gap-2">
                      <Ticket className="h-4 w-4" aria-hidden="true" />
                      Generate travel pass
                    </Link>
                  </Button>
                  <Button variant="outline">
                    <Link href={`/hotels?city=${encodeURIComponent(dest.name.split(' ')[0])}`} className="flex items-center gap-2">
                      <Hotel className="h-4 w-4" aria-hidden="true" />
                      Find hotels
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <iframe
              src={mapsEmbedUrl(`${dest.name} Pakistan`)}
              title={`Map of ${dest.name}`}
              className="h-72 w-full rounded-xl border border-border"
              loading="lazy"
            />
          </aside>
        </div>
      </div>
    </article>
  )
}
