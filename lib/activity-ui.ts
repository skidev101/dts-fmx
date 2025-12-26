import {
  NotebookTabs,
  FileStack,
  User,
  Activity as ActivityIcon,
} from "lucide-react";

export const ACTIVITY_UI = {
  CREATE_NOTE: {
    icon: NotebookTabs,
    color: "text-blue-500 bg-blue-500/10",
  },
  DELETE_NOTE: {
    icon: FileStack,
    color: "text-red-500 bg-red-500/10",
  },
  CREATE_USER: {
    icon: User,
    color: "text-green-500 bg-green-500/10",
  },
  DEFAULT: {
    icon: ActivityIcon,
    color: "text-muted-foreground bg-muted",
  },
} as const;
