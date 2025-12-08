import { useMutation, useQueryClient } from "@tanstack/react-query";

interface createNoteProps {
  title: string;
  description: string;
  fileUrl: string;
  fileKey: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  resourceType: string;
  courseId: string;
}

export const useCreateNote = () => {
  const q = useQueryClient();

  return useMutation({
    mutationFn: async (data: createNoteProps) => {
      try {
        const res = await fetch("/api/admin/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.error("create note error:", errorData);
          throw new Error(errorData.error || "Failed to create note");
        }
        return res.json();
      } catch (error) {
        console.error("failed to create note");
        throw error;
      }
    },
    onSuccess: () => {
      q.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
