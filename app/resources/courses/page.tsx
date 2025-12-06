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
        <h1 className="text-3xl font-semibold">All courses</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mt-10">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex w-full mt-4 py-4 gap-4">
              <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
              <div className="flex flex-col gap-2 w-full h-full py-1">
                <Skeleton className="w-[calc(100%-30px)] h-3 rounded-full" />
                <Skeleton className="w-[calc(100%-80px)] h-3 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!filteredCourses) {
    return (
      <div className="w-full flex justify-center items-center">
        <h1>No results for search</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col m-auto max-w-5xl mt-10 px-2">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline-last">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold ml-1">All courses</h1>
          <p className="text-foreground/80 mt-2">
            Click on a course to view notes under it
          </p>
        </div>

        <div className=" relative flex max-w-68 flex-1 min-w-0 mt-4 sm:mt-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />

          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search course, level.."
            className="pl-10"
          />
        </div>
      </div>

      <Separator className="mt-6" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mt-10">
        {filteredCourses?.map((course: Course) => (
          <ResourceCard
            key={course.id}
            id={course.id}
            title={course.title}
            code={course.code}
            level={course.level}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
