'use client'

import { useTransition } from 'react'
import { Check, CheckCheck, Loader2 } from 'lucide-react'
import { markNotificationRead, markAllNotificationsRead } from '@/app/actions/notifications'
import { Button } from '@/components/ui/button'

export function MarkReadButton({ id }: { id: number }) {
  const [pending, startTransition] = useTransition()
  return (
    <button
      aria-label="Mark as read"
      disabled={pending}
      onClick={() => startTransition(() => markNotificationRead(id))}
      className="text-muted-foreground transition-colors hover:text-primary"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
    </button>
  )
}

export function MarkAllReadButton() {
  const [pending, startTransition] = useTransition()
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={pending}
      onClick={() => startTransition(() => markAllNotificationsRead())}
    >
      {pending ? (
        <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
      ) : (
        <CheckCheck className="mr-1.5 h-4 w-4" />
      )}
      Mark all read
    </Button>
  )
}
