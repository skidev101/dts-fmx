"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { FileStack, Loader2, NotebookTabs, ChevronRight } from "lucide-react";
import { useAnalytics } from "@/hooks/analytics/useAnalytics";
import { useRecentActivities } from "@/hooks/analytics/useRecentActivities";
import { TopCoursesBarChart } from "@/app/dashboard/components/Admin/TopCoursesBarChart";
import { StorageArc } from "@/app/dashboard/components/Admin/StorageArc";
import { LoadingOrError } from "@/components/LoadingOrError";
import { RecentActivitiesCard } from "./RecentActivitiesCard";

const AdminDashboard = () => {
  const { data, isLoading, isError } = useAnalytics();
  const {
    data: recentActivities,
    isLoading: activitiesLoading,
    isError: activitesError,
  } = useRecentActivities();

  const isReady = !isLoading && !isError && data;
  if (!isReady) {
    return <LoadingOrError isLoading={isLoading} isError={isError} />;
  }

  const { totals: analytics, usage, topCoursesByNotes } = data;
  const storage = usage?.storage?.percent ?? 0;

  return (
    <section className="sm:p-4 overflow-auto mt-6 sm:mt-2">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-2">
          {/* <Skeleton className="w-full h-[260px] rounded-3xl bg-card" /> */}
          {/* <Skeleton className="w-full h-[200px] rounded-3xl bg-card" /> */}
          <Card className="w-full rounded-3xl bg-card p-4 sm:p-6">
            <h1 className="text-2xl font-semibold text-card-foreground">
              Overview
            </h1>

            <div className="flex flex-col md:flex-row justify-between w-full h-full gap-3">
              <Card className="flex flex-col w-full dark:border-neutral-700 rounded-3xl p-6">
                <div className="flex items-center gap-3">
                  <NotebookTabs className="size-4 text-card-foreground/90" />
                  <p className="text-card-foreground/80">Total courses</p>
                </div>
                <div>
                  <h1 className="text-4xl font-semibold">
                    {analytics?.totalCourses}
                  </h1>
                </div>
              </Card>
              <Card className="flex flex-col w-full  dark:border-neutral-700 rounded-3xl p-6">
                <div className="flex items-center gap-3">
                  <FileStack className="size-4 text-card-foreground/90" />
                  <p className="text-card-foreground/80">Total notes</p>
                </div>
                <div>
                  <h1 className="text-4xl font-semibold">
                    {analytics?.totalNotes}
                  </h1>
                </div>
              </Card>
              {/* <Card className="flex flex-col w-full bg-neutral-800 border-neutral-700 rounded-3xl p-6">
                <div className="flex items-center gap-3">
                  <FileStack className="size-4" />
                  <p>Total users</p>
                </div>
                <div>
                  <h1 className="text-4xl font-semibold">{analytics?.totalUsers}</h1>
                </div>
              </Card> */}
            </div>
          </Card>
          <TopCoursesBarChart data={topCoursesByNotes} />

          {/* <Card className="w-full h-[260px] rounded-3xl bg-card p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl text-card-foreground">
                Trending courses
              </h1>
              <Button
                variant="secondary"
                className="text-xs text-card-foreground/90 hover:cursor-pointer hover:border transition-all duration-300"
                asChild
              >
                <Link href="/resources/courses">
                  View all
                  <ChevronRight className="size-4" />
                </Link>
              </Button>
            </div>
          </Card> */}
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <StorageArc storage={80} />

          
            <RecentActivitiesCard
              activities={recentActivities?.groupedActivities ?? {}}
              isLoading={activitiesLoading}
            />
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
