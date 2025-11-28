import { User } from "./user";
import { Note } from "./note";

export interface NoteDownloadLog {
  id: string;
  noteId: string;
  userId: string;
  createdAt: string;
};

export type NoteDownloadLogWithRelations = NoteDownloadLog & {
  note: Note;
  user: User;
};
