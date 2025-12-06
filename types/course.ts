import { Note } from "./note";

type Level = "L100" | "L200" | "L300" | "L400" | "L500";

export interface Course {
  id: string;
  title: string;
  code: string;
  level: Level;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string;

  notes: Note[];
};
