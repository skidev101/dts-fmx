"use client";

import { Note } from "@/lib/types/note";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export interface DownloadLogItem {
  id: string;
  createdAt: string;
  note: Note;
}

interface DownloadLogsResponse {
  items: DownloadLogItem[];
  nextCursor: string | null;
}

export const useRecentDownloads = () => {
  return useInfiniteQuery<DownloadLogsResponse>({
    queryKey: ["downloadLogs"],

    initialPageParam: undefined,

    queryFn: async ({ pageParam }) => {
      const cursor = pageParam as string;

      const params = new URLSearchParams(); 
      params.set("limit", "10");

      if (pageParam) params.set("cursor", cursor);
      const res = await fetch(`/api/users/me/notes/download?${params}`);
      if (!res.ok) throw new Error("failed to fetch downloads");
      return res.json();
    },

    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined
  })
};
