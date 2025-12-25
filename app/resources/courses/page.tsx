"use client";

import { useMemo, useState } from "react";
import Searchbar from "@/app/dashboard/components/Shared/Searchbar";
import ResourceCard from "@/components/ResourceCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useCourses } from "@/hooks/course/useCourses";
import { Course } from "@/types/course";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const page = () => {
  const searchParams = useSearchParams();
  const levelParam = searchParams.get("level") || "";
  const { data: courses, isError, isLoading } = useCourses();
  const [search, setSearch] = useState(levelParam);
  console.log("courses fetched:", courses);

  const filteredCourses = useMemo(() => {
    // if (!courses) return [];

    return courses?.filter((course: Course) => {
      const term = search.toLowerCase();
      return (
        course.title.toLowerCase().includes(term) ||
        course.code.toLowerCase().includes(term) ||
        course.level.toLowerCase().includes(term)
      );
    });
  }, [search, courses]);

  if (isLoading) {
    return (
      <div className="flex flex-col m-auto max-w-5xl mt-10 px-3">
        <h1 className="text-2xl sm:text-3xl font-semibold">All courses</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mt-10">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex w-full mt-4 py-4 gap-4">
              <Skeleton className="w-10 h-10 rounded-lg shrink-0 bg-card border" />
              <div className="flex flex-col gap-2 w-full h-full py-1">
                <Skeleton className="w-[calc(100%-30px)] h-3 rounded-full bg-card border" />
                <Skeleton className="w-[calc(100%-80px)] h-3 rounded-full bg-card border" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col m-auto max-w-5xl mt-8 sm:mt-10 px-3 pb-4">
      {/* Header + Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">All courses</h1>
          <p className="text-sm sm:text-base text-foreground/70 mt-1">
            Tap a course to view notes
          </p>
        </div>

        <div className="relative w-full sm:max-w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses"
            className="pl-9 h-10"
          />
        </div>
      </div>

      {/* Desktop-only separator */}
      <Separator className="hidden sm:block mt-6" />

      {/* Results */}
      {filteredCourses?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-10">
          {filteredCourses.map((course: Course) => (
            <ResourceCard
              key={course.id}
              title={course.title}
              slug={course.slug}
              code={course.code}
              level={course.level}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col m-auto max-w-5xl mt-10 px-4 text-center">
          <p className="text-sm text-foreground/70 mt-3">No courses found</p>
          <p className="text-xs text-foreground/50 mt-1">
            Try a different keyword or level
          </p>
        </div>
      )}
    </div>
  );
};

export default page;
