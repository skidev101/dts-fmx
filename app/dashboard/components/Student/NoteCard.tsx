"use client"

import { NoteDialog } from "@/components/notes/NoteDialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Note } from "@/lib/types/note";
import formatDate from "@/utils/formatDate";
import { ChartBarStacked } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface NoteCardProps {
  note: Note;
}

const NoteCard = ({ note }: NoteCardProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  return (
    <>
      <Card
        key={note.id}
        onClick={() => {
          setDialogOpen(true);
          setSelectedNote(note);
        }}
        className="relative p-4 rounded-3xl hover:cursor-pointer hover:bg-card/50 hover:scale-101 active:scale-99 transition-all duration-200"
      >
        <CardContent className="flex px-0">
          <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 dark:bg-neutral-800 border">
            {/* <Image width={28} height={28} src="/file.svg" alt="file" /> */}
            <ChartBarStacked className="size-8 text-neutral-400" />
          </div>
          <div className="flex justify-center flex-col ml-3">
            <h3 className="font-medium capitalize text-lg">{note.title}</h3>

            <p className="text-card-foreground/80 text-xs">
              {formatDate(note.createdAt)}
            </p>
          </div>
        </CardContent>
      </Card>

      <NoteDialog
        open={dialogOpen}
        note={selectedNote}
        onOpenChange={setDialogOpen}
      />
    </>
  );
};

export default NoteCard;
