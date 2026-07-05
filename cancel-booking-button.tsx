'use client'

import { useTransition } from 'react'
import { Loader2 } from 'lucide-react'
import { cancelBooking } from '@/app/actions/bookings'
import { Button } from '@/components/ui/button'

export function CancelBookingButton({ id }: { id: number }) {
  const [pending, startTransition] = useTransition()
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (confirm('Cancel this booking?')) startTransition(() => cancelBooking(id))
      }}
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Cancel'}
    </Button>
  )
}
