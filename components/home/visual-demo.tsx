'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

const items = [
  {
    image: '/images/qr_scan_gate.jpg',
    title: 'Scan once, travel easily',
    text: 'Passengers use a digital QR pass for transport, attractions and tourism access.',
    big: true,
  },
  {
    image: '/images/bus.jpg',
    title: 'Connected transport',
    text: 'Buses, trains, shuttles and city routes connected in one platform.',
    big: false,
  },
  {
    image: '/images/route_map.jpg',
    title: 'Smart route planning',
    text: 'Compare fares, times and safety across every mode of transport in Pakistan.',
    big: false,
  },
]

export function VisualDemo() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">How it works</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-balance sm:text-4xl">
          How SmartSafar feels in real travel
        </h2>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        {items.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={item.big ? 'lg:row-span-1 lg:col-span-1' : ''}
          >
            <div className="group overflow-hidden rounded-xl border border-border bg-card">
              <div className="overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={480}
                  height={320}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
