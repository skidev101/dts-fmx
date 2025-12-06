"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  DownloadLogItem,
  useRecentDownloads,
} from "@/hooks/notes/useRecentDownloads";
import NoteCard from "./NoteCard";
import { Button } from "@/components/ui/button";
import { ChevronRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const RecentDownloads = () => {
  const router = useRouter();
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
  console.log("allItems:", allItems);

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl text-foreground/90 font-semibold ml-1">
          Recent downloads
        </h1>
        <Button
          variant="link"
          onClick={() => router.push("/dashboard/downloads")}
          className="hidden text-xs sm:flex justify-between hover:px-4 items-center hover:cursor-pointer origin-right"
        >
          View more
          <ChevronRight className="size-4" />
        </Button>
      </div>

      {allItems.length == 0 && <p className="opacity-60">No downloads yet.</p>}

      <div className="grid md:grid-cols-2 gap-3 mt-4">
        {allItems.slice(0, 2).map((item: any) => (
          <NoteCard
            key={item.note.id}
            note={item.note}
            downloadDate={item.createdAt}
          />
        ))}
      </div>

      {/* {hasNextPage && (
        <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </Button>
      )} */}
    </div>
  );
};

export default RecentDownloads;
