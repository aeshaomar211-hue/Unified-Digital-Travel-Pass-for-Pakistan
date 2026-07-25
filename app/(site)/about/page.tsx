import { Sparkles, Target, Users, Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AboutPage() {
  const values = [
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'Cutting-edge AI technology meets authentic travel experiences',
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'Personalized itineraries tailored to every traveler\'s unique preferences',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connecting travelers with Pakistan\'s rich culture and local guides',
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Making premium travel planning available to everyone in Pakistan',
    },
  ]

  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl md:text-5xl font-bold">About SmartSafar</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Reimagining travel planning for Pakistan with AI-powered intelligence and local expertise.
          </p>
        </div>
        <p className="text-muted-foreground max-w-3xl leading-relaxed">
          SmartSafar is Pakistan&apos;s premier AI-assisted travel companion, designed to transform how travelers discover, plan, and experience the country&apos;s most stunning destinations. By combining advanced artificial intelligence with deep knowledge of Pakistan&apos;s geography, culture, and hospitality, we create hyper-personalized itineraries that bring your travel dreams to life.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To democratize travel planning by leveraging AI technology to deliver bespoke experiences that celebrate Pakistan&apos;s natural beauty, cultural heritage, and warm hospitality while ensuring safety, value, and unforgettable memories.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To become the most trusted travel companion for Pakistanis and international visitors, setting new standards for intelligent, ethical, and culturally-sensitive travel planning across South Asia.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Our Values</h2>
          <p className="text-muted-foreground">What drives us every day</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="flex flex-col items-center text-center">
              <CardContent className="pt-6 flex flex-col items-center gap-3">
                <Icon className="h-8 w-8 text-primary" />
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-gradient-to-br from-primary/10 to-amber-500/10 border border-primary/20 p-12 text-center flex flex-col gap-4">
        <h2 className="text-3xl font-bold">Ready to Explore Pakistan?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Start planning your perfect journey today with our AI-powered trip planner.
        </p>
      </section>
    </div>
  )
}
