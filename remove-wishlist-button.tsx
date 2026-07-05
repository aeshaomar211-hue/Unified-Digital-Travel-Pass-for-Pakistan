'use client'

import { useTransition } from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import { removeWishlist } from '@/app/actions/wishlist'

export function RemoveWishlistButton({ id }: { id: number }) {
  const [pending, startTransition] = useTransition()
  return (
    <button
      aria-label="Remove from wishlist"
      disabled={pending}
      onClick={() => startTransition(() => removeWishlist(id))}
      className="text-muted-foreground transition-colors hover:text-destructive"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </button>
  )
}
