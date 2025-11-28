"use client"

import { Course } from "@/lib/types/course";
import { useQuery } from "@tanstack/react-query";

export const useCourse = (id?: string) => {
  console.log("now in get courses hook")
  return useQuery<Course>({
    queryKey: ["course", id],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/courses/${id}`);
        const data = await res.json();
        return data ?? null;
      } catch (error) {
        console.error("failed to fetch course");
        throw error;
      }
    },
    enabled: !!id,
  });
};
