"use client"

import { useQuery } from "@tanstack/react-query";

export const useLatestNotes = () => {
  return useQuery({
    queryKey: ["latestNotes"],
    queryFn: async () => {
      const res = await fetch("/api/notes");
      if (!res.ok) throw new Error("error fetching latest notes");
      const data = await res.json();
      return data;
    },
  });
};
