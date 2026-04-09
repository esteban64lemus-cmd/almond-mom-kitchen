import { useEffect } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { Bell, CheckCircle, AlertCircle, Info } from "lucide-react";

export function NotificationToast() {
  const { data: notifications } = trpc.notifications.list.useQuery({ limit: 5 });
  const markAsReadMutation = trpc.notifications.markAsRead.useMutation();

  useEffect(() => {
    if (!notifications) return;

    notifications.forEach((notification) => {
      if (notification.read === 0) {
        const icon = getIconForType(notification.type);
        
        toast.custom(
          (t) => (
            <div className="bg-card border border-border rounded-lg p-4 shadow-lg flex items-start gap-3 max-w-sm">
              <div className="flex-shrink-0 mt-0.5">
                {icon}
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-sm">{notification.title}</h3>
                {notification.message && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification.message}
                  </p>
                )}
              </div>
              <button
                onClick={() => {
                  markAsReadMutation.mutate({ notificationId: notification.id });
                  toast.dismiss(t);
                }}
                className="flex-shrink-0 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
          ),
          {
            duration: 5000,
          }
        );

        markAsReadMutation.mutate({ notificationId: notification.id });
      }
    });
  }, [notifications, markAsReadMutation]);

  return null;
}

function getIconForType(type: string) {
  switch (type) {
    case "draft_approved":
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    case "draft_rejected":
      return <AlertCircle className="h-5 w-5 text-red-600" />;
    case "recipe_published":
      return <CheckCircle className="h-5 w-5 text-blue-600" />;
    case "recipe_submitted":
      return <Bell className="h-5 w-5 text-primary" />;
    case "error":
      return <AlertCircle className="h-5 w-5 text-red-600" />;
    default:
      return <Info className="h-5 w-5 text-blue-600" />;
  }
}
