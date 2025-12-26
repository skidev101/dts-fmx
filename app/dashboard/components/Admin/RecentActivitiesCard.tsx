// components/admin/RecentActivitiesCard.tsx
"use client";

import { Card } from "@/components/ui/card";
import { ACTIVITY_UI } from "@/lib/activity-ui";
import { ActivityWithUser } from "@/types/activity";
import { cn } from "@/lib/utils";
import formatDate from "@/utils/formatDate";

interface Props {
  activities: Record<string, ActivityWithUser[]>;
  isLoading: boolean;
};

export const RecentActivitiesCard = ({
  activities,
  isLoading,
}: Props) => {
  if (isLoading) {
    return (
      <Card className="w-full h-[430px] rounded-3xl bg-card p-6">
        <h1 className="text-2xl font-semibold">Recent activities</h1>
        <div className="mt-4 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="size-10 rounded-lg bg-muted animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-3/4 rounded bg-muted animate-pulse" />
                <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (!activities) {
    return (
    <div>An error occured</div>
    )
  }

  return (
    <Card className="w-full h-[430px] rounded-3xl bg-card p-6">
      <h1 className="text-2xl font-semibold">Recent activities</h1>

      <div className="mt-4 flex flex-col gap-4 overflow-y-auto max-h-[340px] pr-1">
        {Object.entries(activities).map(([date, items]) => (
          <div key={date} className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {formatDate(date)}
            </p>

            {items.map((activity) => {
              const ui =
                ACTIVITY_UI[
                  activity.type as keyof typeof ACTIVITY_UI
                ] ?? ACTIVITY_UI.DEFAULT;

              const Icon = ui.icon;

              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 rounded-xl border dark:border-neutral-700 p-3 hover:bg-muted/40 transition"
                >
                  <div
                    className={cn(
                      "mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg",
                      ui.color
                    )}
                  >
                    <Icon className="size-4" />
                  </div>

                  <div className="flex flex-col gap-1 w-full">
                    <p className="text-sm leading-snug">
                      <span className="font-medium text-foreground/80">
                        {activity.user.username}
                      </span>{" "}
                      {/* <span className="text-muted-foreground">
                        {activity.type.toLowerCase()}
                      </span>{" "} */}
                      <span>created a </span>
                      <span className="font-medium">
                        {activity.entity}
                      </span>
                    </p>

                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{activity.user.email}</span>
                      <span>
                        {new Date(activity.createdAt).toLocaleTimeString(
                          undefined,
                          {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Card>
  );
};
