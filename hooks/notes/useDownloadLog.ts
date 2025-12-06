import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDownloadLog = () => {
  const q = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const res = await fetch("/api/users/me/notes/download", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ noteId: id }),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.error("download log error:", errorData);
          throw new Error(errorData.error || "Failed to log download");
        }
        return res.json();
      } catch (error) {
        console.error("failed to log note download");
        throw error;
      }
    },
    onSuccess: () => {
      q.invalidateQueries({ queryKey: ["downloadLogs"] });
    },
  });
};
