"use client";

import { Note } from "@/types/note";
import { useInfiniteQuery } from "@tanstack/react-query";

interface NotesResponse {
  notes: Note[];
  nextCursor: string | null;
}

export const useNotes = () => {
  console.log("now in get courses hook");
  return useInfiniteQuery<NotesResponse>({
    queryKey: ["notes"],

    initialPageParam: undefined,

    queryFn: async ({ pageParam }) => {
      const cursor = pageParam as string;

      const params = new URLSearchParams();
      params.set("limit", "10");

      if (pageParam) params.set("cursor", cursor);
      const res = await fetch(`/api/notes?${params}`);
      console.log("response from notes api:", res);
      if (!res.ok) throw new Error("failed to fetch notes");
      console.error("failed to fetch notes:");
      return res.json();
    },

    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
};
