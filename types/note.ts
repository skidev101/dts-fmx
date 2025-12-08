import { User } from "./user";
import { Course } from "./course";

export interface Note {
  id: string;
  title: string;
  description?: string | null;
  fileUrl: string;
  fileName?: string | null;
  fileType?: string | null;
  fileKey: string;
  fileSize: number;
  mimeType: string;
  uploadedBy: User;
  course: Course;
  uploadedById: string;
  courseId: string;
  downloads: number;
  createdAt: string;
  updatedAt: string;
}

export interface NoteWithRelations extends Note {
  uploadedBy: User;
  course: Course;
}
