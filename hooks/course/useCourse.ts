"use client";

import { Course } from "@/types/course";
import { useQuery } from "@tanstack/react-query";

export const useCourse = (slug?: string) => {
  console.log("now in get courses hook");
  return useQuery<Course>({
    queryKey: ["course", slug],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/courses/${slug}`);
        if (!res.ok) {
          throw new Error("An unknown error occured")
        }
        const data = await res.json();
        return data ?? null;
      } catch (error) {
        console.error("failed to fetch course");
        throw error;
      }
    },
    enabled: !!slug,
  });
};
