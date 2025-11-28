"use client"

import { Note } from "@/lib/types/note";
import { useQuery } from "@tanstack/react-query";

export const useNote = (id?: string) => {
  console.log("now in get note hook")
  return useQuery<Note>({
    queryKey: ["note", id],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/notes/${id}`);
        const data = await res.json();
        return data.course;
      } catch (error) {
        console.error("failed to fetch course");
        throw error;
      }
    },
    enabled: !!id,
  });
};
