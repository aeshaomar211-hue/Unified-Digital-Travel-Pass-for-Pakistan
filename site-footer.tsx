'use client'

import Link from 'next/link'
import { MountainSnow } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { cn } from '@/lib/utils'

export function SiteFooter() {
  const { t, lang } = useI18n()

  const columns = [
    {
      title: 'Explore',
      links: [
        { href: '/destinations', label: 'Destinations' },
        { href: '/routes', label: 'Routes' },
        { href: '/hotels', label: 'Hotels' },
        { href: '/planner', label: 'AI Planner' },
      ],
    },
    {
      title: 'Travel Tools',
      links: [
        { href: '/passes', label: 'Travel Passes' },
        { href: '/map', label: 'Maps' },
        { href: '/safety', label: 'Safety & Alerts' },
        { href: '/dashboard', label: 'My Dashboard' },
      ],
    },
    {
      title: 'Company',
      links: [
        { href: '/about', label: 'About' },
        { href: '/blog', label: 'Blog' },
        { href: '/contact', label: 'Contact' },
        { href: '/faq', label: 'FAQ' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Service' },
        { href: '/careers', label: 'Careers' },
      ],
    },
  ]

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <MountainSnow className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-lg font-bold tracking-tight">SmartSafar</span>
            </div>
            <p className={cn('mt-3 text-sm leading-relaxed text-muted-foreground', lang === 'ur' && 'urdu-text')}>
              {t.footerTagline}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold">{col.title}</h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SmartSafar. Unified Digital Travel Pass for Pakistan.
          </p>
        </div>
      </div>
    </footer>
  )
}
