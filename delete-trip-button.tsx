'use client'

import { useTransition } from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import { deleteTrip } from '@/app/actions/trips'

export function DeleteTripButton({ id }: { id: number }) {
  const [pending, startTransition] = useTransition()

  return (
    <button
      aria-label="Delete trip"
      disabled={pending}
      onClick={() => {
        if (confirm('Delete this trip?')) {
          startTransition(() => deleteTrip(id))
        }
      }}
      className="text-muted-foreground transition-colors hover:text-destructive"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </button>
  )
}
