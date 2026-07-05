'use client'

import { useState } from 'react'
import { AlertTriangle, Phone, Shield } from 'lucide-react'
import { alertsEn, alertsUr, emergencyContacts } from '@/lib/data/travel-data'
import { useI18n } from '@/lib/i18n/context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function SafetyPanel() {
  const { t, lang } = useI18n()
  const [selected, setSelected] = useState<string | null>(null)
  const alerts = lang === 'ur' ? alertsUr : alertsEn

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">{t.alertsSmall}</p>
          <CardTitle className={cn('text-xl', lang === 'ur' && 'urdu-text')}>{t.alertsTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-3">
            {alerts.map((alert, i) => (
              <li
                key={i}
                className={cn(
                  'flex items-start gap-3 rounded-lg bg-muted p-3 text-sm leading-relaxed',
                  lang === 'ur' && 'urdu-text'
                )}
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {alert}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">{t.emergencySmall}</p>
          <CardTitle className={cn('text-xl', lang === 'ur' && 'urdu-text')}>{t.emergencyTitle}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
            {emergencyContacts.map((contact) => (
              <Button
                key={contact.key}
                variant={selected === contact.key ? 'default' : 'outline'}
                onClick={() => setSelected(contact.key)}
                className="justify-start"
              >
                <Shield className="h-4 w-4" aria-hidden="true" />
                {contact.label}
              </Button>
            ))}
          </div>
          <div className="rounded-lg bg-muted p-4" role="status" aria-live="polite">
            {selected ? (
              (() => {
                const contact = emergencyContacts.find((c) => c.key === selected)
                return contact ? (
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">{contact.label}</p>
                    <a
                      href={`tel:${contact.number}`}
                      className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {contact.number}
                    </a>
                  </div>
                ) : null
              })()
            ) : (
              <p className="text-sm text-muted-foreground">Select a helpline to see its number.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
