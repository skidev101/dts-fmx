"use client"

import { Note } from "@/lib/types/note";
import { useQuery } from "@tanstack/react-query";

export const useNotes = () => {
  console.log("now in get courses hook")
  return useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/notes");
        const data = await res.json();
        return data;
      } catch (error) {
        console.error("failed to fetch courses");
        throw error;
      }
    },
  });
};
