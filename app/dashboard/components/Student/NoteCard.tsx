"use client";

import { NoteDialog } from "@/components/notes/NoteDialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Note } from "@/types/note";
import { detectFileType } from "@/utils/detectFileType";
import formatDate from "@/utils/formatDate";
import { ChartBarStacked, FileSpreadsheet, FileText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface NoteCardProps {
  note: Note;
  downloadDate: string;
}

const NoteCard = ({ note, downloadDate }: NoteCardProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  console.log("note recieved as props:", note);
  const detectedType = detectFileType(note.mimeType);

  return (
    <>
      <Card
        key={note.id}
        onClick={() => {
          setDialogOpen(true);
          setSelectedNote(note);
        }}
        className="relative min-w-[230px] p-4 rounded-3xl hover:cursor-pointer hover:bg-card/50 hover:scale-101 active:scale-99 transition-all duration-200"
      >
        <CardContent className="flex flex-col px-0">
          <div className="shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-200 dark:bg-neutral-800 border">
            {/* <Image width={28} height={28} src="/file.svg" alt="file" /> */}
            <p className="text-neutral-400 font-semibold">{detectFileType(note.mimeType)}</p>
            {/* {detectedType ? (
              <p className="text-neutral-400">{detectedType}</p>
            ) : (
              <p className="text-neutral-400">PDF</p>
            )} */}
          </div>
          <div className="flex justify-center flex-col mt-4 ml-1">
            <h3 className="font-semibold text-foreground/90 capitalize text-lg">
              {note.title}
            </h3>

            <p className="text-card-foreground/80 text-xs">
              {formatDate(downloadDate)}
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
