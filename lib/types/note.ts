import { User } from "./user";
import { Course } from "./course";


export interface Note {
  id: string;
  title: string;
  description?: string | null;
  fileUrl: string;
  uploadedById: string;
  courseId: string;
  downloads: number;
  createdAt: string;
  updatedAt: string;
};

export interface NoteWithRelations extends Note {
  uploadedBy: User;
  course: Course;
};
