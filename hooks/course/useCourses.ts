"use client";

import { Course } from "@/types/course";
import { useQuery } from "@tanstack/react-query";

export const useCourses = () => {
  console.log("now in get courses hook");
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();
        return data;
      } catch (error) {
        console.error("failed to fetch courses");
        throw error;
      }
    },
  });
};
