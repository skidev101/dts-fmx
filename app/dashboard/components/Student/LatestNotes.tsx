"use client";

import { Card, CardContent } from "@/components/ui/card";
import NoteCard from "./NoteCard";
import { Button } from "@/components/ui/button";
import { ChevronRight, Loader2 } from "lucide-react";
import { useNotes } from "@/hooks/notes/useNotes";

const LatestNotes = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useNotes();

  console.log("notes data:", data);

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

  const allNotes = data?.pages.flatMap((page: any) => page.notes) ?? [];
  console.log("all notes:", allNotes);

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl text-foreground/90 font-semibold ml-1">
          New notes
        </h1>
        <Button
          variant="link"
          className={`${
            !hasNextPage && "hidden"
          } hidden text-xs sm:flex justify-between hover:px-4 items-center hover:cursor-pointer origin-right`}
        >
          View more
          <ChevronRight className="size-4" />
        </Button>
      </div>

      {allNotes.length == 0 && <p className="opacity-60">No notes yet.</p>}

      <div className="grid md:grid-cols-2 gap-3 mt-4">
        {allNotes.slice(0, 2).map((item: any) => (
          <NoteCard key={item.id} note={item} downloadDate={item.createdAt} />
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

export default LatestNotes;
