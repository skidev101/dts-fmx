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
import { Note } from "@/lib/types/note";
import formatDate from "@/utils/formatDate";

interface NoteDialogProps {
  note: Note | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NoteDialog = ({ note, open, onOpenChange }: NoteDialogProps) => {
  if (!note) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent aria-describedby={undefined} className="w-full p-4 sm:p-6">
        <DialogHeader className="hidden">
          <DialogTitle>Note details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row gap-2 mt-2">
          <div className="flex justify-center items-center w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-accent rounded-md sm:rounded-2xl">PDF</div>

          <div className="flex flex-col gap-3 sm:ml-2">
            <h1 className="text-lg sm:text-2xl capitalize font-black text-card-foreground">{note.title} - introduction to data analytics</h1>
            <p className="text-foreground/60 text-sm">Uploaded {formatDate(note.createdAt)} by ski101</p>
          </div>
        </div>

        {note.description && <p className="mt-2 text-card-foreground/90">{note.description ?? `This note was uploaded by`}</p>}

        <span className="text-xs text-card-foreground/60">size: 12kb</span>

        <DialogFooter>
          <Button variant="outline">
            Copy link <Copy className="size-4" />
          </Button>

          {note.fileUrl && (
            <Button variant="secondary">
              Download <DownloadCloud className="size-4" />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
