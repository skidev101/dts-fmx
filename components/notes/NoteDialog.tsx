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
import { useDownloadLog } from "@/hooks/notes/useDownloadLog";
import { toast } from "sonner";
import { formatBytes } from "@/utils/formatBytes";

interface NoteDialogProps {
  note: Note | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NoteDialog = ({ note, open, onOpenChange }: NoteDialogProps) => {
  if (!note) return;
  console.log("note recieved as props:", note);
  const { mutate: logDownload } = useDownloadLog();
  const id = note.id;

  const handleFileDownload = async () => {
    console.log("now in note download with note:", note);
    if (!note.fileName || !note.fileUrl) return;

    logDownload(id, {
      onSuccess: (result) => {
        toast.success("Note download logged", { description: result.digest });
        console.log("note download logged");
      },
      onError: (error) => {
        toast.error("Failed to log download");
        console.log("error logging download", error);
      },
    });

    // const cleanFileName = note.fileName
    //   .replace(/\s+/g, "_")
    //   .replace(/[^\w.\-]/g, "");
    // const url = `${note.fileUrl}?fl_attachment=1&fn=${encodeURIComponent(
    //   cleanFileName
    // )}`;

    // const link = document.createElement("a");
    // link.href = url;
    // link.download = cleanFileName; // works if same-origin, safe to keep
    // document.body.appendChild(link);

    // link.click();
    // document.body.removeChild(link);

    try {
    // Clean the filename for safe download
    const cleanFileName = note.fileName
      .replace(/\s+/g, "_")
      .replace(/[^\w.\-]/g, "");

    // Create a temporary link
    const a = document.createElement("a");
    a.href = note.fileUrl;        // direct Cloudinary URL
    a.download = cleanFileName;   // force download with proper name
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (err) {
    console.error("Failed to download file", err);
    // Fallback: open in a new tab
    window.open(note.fileUrl, "_blank");
  }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined} className="w-full p-4 sm:p-6">
        <DialogHeader className="hidden">
          <DialogTitle>Note details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row gap-2 mt-2">
          <div className="flex justify-center items-center w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-accent rounded-md sm:rounded-2xl">
            {note.fileType?.toUpperCase()}
          </div>

          <div className="flex flex-col gap-3 mt-2 sm:mt-0 sm:ml-2">
            <h1 className="text-lg sm:text-2xl capitalize font-black text-card-foreground">
              {note.title}
            </h1>
            <p className="text-foreground/60 text-sm -mt-3 sm:mt-0">
              {formatDate(note.createdAt)} by {note.uploadedBy.username}
            </p>
          </div>
        </div>

        {note.description && (
          <p className="mt-2 text-card-foreground/90">
            {note.description ?? `This note was uploaded by`}
          </p>
        )}

        <span className="text-xs text-card-foreground/60">
          size: {formatBytes(note.fileSize)}
        </span>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => copy("hello world")}
            className="text-foreground/80 hover:cursor-pointer active:scale-98"
          >
            Copy link <Copy className="size-4" />
          </Button>

          {note.fileUrl && (
            <Button
              variant="outline"
              onClick={handleFileDownload}
              className="text-foreground/80 hover:cursor-pointer active:scale-98"
            >
              Download <DownloadCloud className="size-4" />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
