"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Copy, DownloadCloud } from "lucide-react";
import { Note } from "@/types/note";
import formatDate from "@/utils/formatDate";
import { copy } from "@/utils/clipboard";

interface NoteDialogProps {
  note: Note | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NoteDialog = ({ note, open, onOpenChange }: NoteDialogProps) => {
  if (!note) return;
  console.log("note recieved as props:", note);

  const handleFileDownload = async () => {
    console.log("now in note download with filename:", note.fileName);
    if (!note.fileName || !note.fileUrl) return;
    console.log("now in note download test2 with filename:", note.fileName);
    console.log("file url:", note.fileUrl);
    console.log("file name:", note.fileName);

    await fetch("/api/users/me/notes/download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ noteId: note.id }),
    });

    const cleanFileName = note.fileName
      .replace(/\s+/g, "_")
      .replace(/[^\w.\-]/g, "");
    const extension = note.fileName.split(".").pop() || "txt";

    const link = document.createElement("a");
    link.href = `${note.fileUrl}?download=1`;
    link.download = `dts-note-${cleanFileName}.${extension}`;
    document.body.appendChild(link);

    try {
      link.click();
    } catch (err) {
      console.warn("direct download failed, opening in new tab:", err);
      window.open(note.fileUrl, "_blank");
    }

    document.body.removeChild(link);
  };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined} className="w-full p-4 sm:p-6">
        <DialogHeader className="hidden">
          <DialogTitle>Note details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row gap-2 mt-2">
          <div className="flex justify-center items-center w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-accent rounded-md sm:rounded-2xl">
            {note.fileName?.split(".").pop()?.toUpperCase() || "PDF"}
          </div>

          <div className="flex flex-col gap-3 mt-2 sm:ml-2">
            <h1 className="text-lg sm:text-2xl capitalize font-black text-card-foreground">
              {note.title} - introduction to data analytics
            </h1>
            <p className="text-foreground/60 text-sm">
              Uploaded {formatDate(note.createdAt)} by ski101
            </p>
          </div>
        </div>

        {note.description && (
          <p className="mt-2 text-card-foreground/90">
            {note.description ?? `This note was uploaded by`}
          </p>
        )}

        <span className="text-xs text-card-foreground/60">size: 12kb</span>

        <DialogFooter>
          <Button variant="outline" onClick={() => copy("hello world")}>
            Copy link <Copy className="size-4" />
          </Button>

          {note.fileUrl && (
            <Button variant="secondary" onClick={handleFileDownload}>
              Download <DownloadCloud className="size-4" />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
