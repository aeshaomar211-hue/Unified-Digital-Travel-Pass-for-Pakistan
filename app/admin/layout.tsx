import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutGrid, Users, CreditCard, LogOut } from 'lucide-react'
import { requireAdmin } from '@/lib/admin'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/admin', label: 'Overview', icon: LayoutGrid },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/bookings', label: 'Bookings', icon: CreditCard },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  try {
    await requireAdmin()
  } catch {
    redirect('/sign-in')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside className="w-64 border-r border-border bg-card">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-border">
            <h1 className="text-xl font-bold text-primary">SmartSafar</h1>
            <p className="text-xs text-muted-foreground mt-1">Admin Panel</p>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-border">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/dashboard">
                <LogOut className="mr-2 h-4 w-4" /> Exit Admin
              </Link>
            </Button>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
