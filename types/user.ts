// lib/types/auth.ts
export type Role = "STUDENT" | "ADMIN";

export interface User {
  id: string;
  clerkId: string;
  fullname: string | null;
  email: string;
  username: string;
  role: string;           // remember to change to role later
  avatarUrl?: string | null;
  createdAt: string;      // remember to change to date later
  updatedAt: string;      // remember to change to date later
};
