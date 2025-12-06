"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  DownloadLogItem,
  useRecentDownloads,
} from "@/hooks/notes/useRecentDownloads";
import NoteCard from "../components/Student/NoteCard";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import { useNotes } from "@/hooks/notes/useNotes";

const Downloads = () => {
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
    return <Loader2 className="size-14 mt-14 animate-spin" />;
  }

  const items = data?.pages.flatMap((page: any) => page.items) ?? [];
  console.log("allItems:", items);

  return (
    <div className="w-full flex justify-center ">

    <div className="w-full mt-10 max-w-5xl">
      <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl text-foreground/90 font-semibold ml-1">Recent downloads</h1>
        {/* <Button variant="ghost" className="hidden text-xs sm:flex justify-between hover:px-4 items-center hover:cursor-pointer origin-right">
          View more 
          <ChevronRight className="size-4" />
        </Button> */}
      </div>

      {items.length == 0 && <p className="opacity-60">No downloads yet.</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
        {items.map((item: any) => (
          <NoteCard key={item.note.id} note={item.note} downloadDate={item.createdAt} />
        ))}
      </div>

      {hasNextPage && (
        <div className="w-full text-center mt-10">

        <Button variant="ghost" onClick={() => fetchNextPage()} disabled={isFetchingNextPage} className="hover:cursor-pointer">
          {isFetchingNextPage ? (<Loader2 className="size-4 animate-spin" />) : "Load more"}
          {!isFetchingNextPage && (<ChevronDown className="size-4" />)}
        </Button>
        </div>
      )}
    </div>
    </div>
  );
};

export default Downloads;
