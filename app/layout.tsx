import type { Metadata } from 'next'
import { DM_Sans, Fraunces, Noto_Nastaliq_Urdu } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { I18nProvider } from '@/lib/i18n/context'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
})

const notoNastaliq = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-noto-nastaliq',
})

export const metadata: Metadata = {
  title: {
    default: 'SmartSafar — Unified Digital Travel Pass for Pakistan',
    template: '%s | SmartSafar',
  },
  description:
    'Discover Pakistan with one digital pass for transport, hotels, culture, routes, and tourism. Plan journeys across Hunza, Skardu, Lahore, Islamabad, Karachi and more with AI trip planning, digital passes, safety tools and maps.',
  keywords: ['Pakistan travel', 'Hunza', 'Skardu', 'travel pass', 'trip planner', 'Pakistan tourism'],
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0F766E' },
    { media: '(prefers-color-scheme: dark)', color: '#134E4A' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`bg-background ${dmSans.variable} ${fraunces.variable} ${notoNastaliq.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
