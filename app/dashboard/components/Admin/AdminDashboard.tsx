"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { FileStack, Loader2, NotebookTabs, ChevronRight } from "lucide-react";
import { useAnalytics } from "@/hooks/analytics/useAnalytics";
import { StorageUsageChart } from "@/app/dashboard/components/Admin/StorageUsage";
import { RadialGauge } from "@/app/dashboard/components/Admin/RadialGauge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TopCoursesBarChart } from "@/app/dashboard/components/Admin/TopCoursesBarChart";
import { StorageArc } from "@/app/dashboard/components/Admin/StorageArc";

const AdminDashboard = () => {
  const { data, isLoading, isError } = useAnalytics();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-2rem)]">
        <Loader2 className="size-18 animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>An error occured while fetching analytics.</p>
      </div>
    );
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
              <Card className="flex flex-col w-full bg-neutral-800 border-neutral-700 rounded-3xl p-6">
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
              <Card className="flex flex-col w-full bg-neutral-800 border-neutral-700 rounded-3xl p-6">
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

          <Card className="w-full h-[260px] rounded-3xl bg-card p-6">
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
          </Card>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          {/* <Skeleton className="w-full max-w-sm h-[430px] rounded-3xl bg-card" /> */}
          <StorageArc storage={80} />

          <Card className="w-full h-[430px] rounded-3xl bg-card p-6">
            <h1 className="text-2xl font-semibold">Recent notes</h1>

            {/* <div className="w-full h-full bg-neutral-800 border border-neutral-700 p-4 rounded-3xl  flex flex-col justify-center items-center mt-2">
              <div className="w-full flex justify-between items-center mt-10 px-8">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p>Used</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <p>Free</p>
                </div>
              </div>
            </div> */}

            <div className="flex w-full mt-4 py-4 gap-4">
              <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
              <div className="flex flex-col gap-2 w-full h-full py-1">
                <Skeleton className="w-[calc(100%-30px)] h-3 rounded-full" />
                <Skeleton className="w-[calc(100%-80px)] h-3 rounded-full" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
