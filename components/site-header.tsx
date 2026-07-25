'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Moon, Sun, Languages, MountainSnow, LayoutDashboard } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useI18n } from '@/lib/i18n/context'
import { useSession } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { t, lang, toggleLang } = useI18n()
  const { data: sessionData, isPending } = useSession()
  const isAuthed = !!sessionData?.user

  const links = [
    { href: '/destinations', label: t.navDestinations },
    { href: '/routes', label: t.navRoutes },
    { href: '/hotels', label: t.navHotels },
    { href: '/planner', label: t.navPlanner },
    { href: '/passes', label: t.navPasses },
    { href: '/map', label: t.navMaps },
    { href: '/safety', label: t.navSafety },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <MountainSnow className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className={cn('text-lg font-bold tracking-tight', lang === 'ur' && 'urdu-text')}>
            SmartSafar
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-secondary-foreground',
                pathname?.startsWith(link.href) ? 'text-primary' : 'text-muted-foreground',
                lang === 'ur' && 'urdu-text'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLang}
            aria-label={lang === 'en' ? 'Switch to Urdu' : 'Switch to English'}
            className="text-muted-foreground"
          >
            <Languages className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle dark mode"
            className="text-muted-foreground"
          >
            <Sun className="h-5 w-5 dark:hidden" />
            <Moon className="hidden h-5 w-5 dark:block" />
          </Button>
          <div className="hidden items-center gap-2 lg:flex">
            {isPending ? (
              <div className="h-8 w-24 animate-pulse rounded-md bg-secondary" />
            ) : isAuthed ? (
              <Button size="sm" asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-1.5 h-4 w-4" />
                  {t.navDashboard}
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/sign-in">{t.navLogin}</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/sign-up">{t.navSignup}</Link>
                </Button>
              </>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-4 lg:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary',
                  pathname?.startsWith(link.href) ? 'text-primary' : 'text-muted-foreground',
                  lang === 'ur' && 'urdu-text'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 border-t border-border pt-3">
              {isAuthed ? (
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-md bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground"
                >
                  {t.navDashboard}
                </Link>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-md border border-border px-3 py-2 text-center text-sm font-medium"
                  >
                    {t.navLogin}
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-md bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground"
                  >
                    {t.navSignup}
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
