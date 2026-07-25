import { Bell, CheckCheck, Info, CheckCircle2, AlertTriangle } from 'lucide-react'
import { getNotifications } from '@/app/actions/notifications'
import { Card, CardContent } from '@/components/ui/card'
import { MarkAllReadButton, MarkReadButton } from '@/components/dashboard/notification-buttons'

const typeIcon = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
} as const

export default async function NotificationsPage() {
  const notifications = await getNotifications()
  const hasUnread = notifications.some((n) => !n.read)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Updates about your trips and bookings.</p>
        </div>
        {hasUnread ? <MarkAllReadButton /> : null}
      </div>

      {notifications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Bell className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">No notifications</h3>
              <p className="text-sm text-muted-foreground">You are all caught up.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-2">
          {notifications.map((n) => {
            const Icon = typeIcon[n.type as keyof typeof typeIcon] ?? Info
            return (
              <Card key={n.id} className={n.read ? 'opacity-70' : 'border-primary/30'}>
                <CardContent className="flex items-start gap-4 p-4">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{n.title}</p>
                      {!n.read ? (
                        <span className="h-2 w-2 rounded-full bg-primary" aria-label="Unread" />
                      ) : null}
                    </div>
                    <p className="text-sm text-muted-foreground">{n.message}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {!n.read ? <MarkReadButton id={n.id} /> : <CheckCheck className="h-4 w-4 text-muted-foreground" />}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
