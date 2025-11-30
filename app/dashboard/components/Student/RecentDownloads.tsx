"use client"

import { Card, CardContent } from "@/components/ui/card";
import {
  DownloadLogItem,
  useRecentDownloads,
} from "@/hooks/notes/useRecentDownloads";
import NoteCard from "./NoteCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const RecentDownloads = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useRecentDownloads();

  console.log("download data:", data);

  if (isError) {
    console.log("error in recent downloads page:", error.message);
    return (
      <div className="mt10">
        <p>An error occured: {error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return <Loader2 className="size-14 mt-14" />;
  }

  const allItems = data?.pages.flatMap((page: any) => page.items) ?? [];

  return (
    <div className="flex flex-col p-6 ml-2">
      <h1 className="text-2xl font-semibold">Recent downloads</h1>

      {allItems.length == 0 && <p className="opacity-60">No downloads yet.</p>}

      {allItems.map((item: any) => (
        <NoteCard key={item.note.id} note={item.note} />
      ))}

      {hasNextPage && (
        <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </Button>
      )}
    </div>
  );
};

export default RecentDownloads;
