import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUserProfile = () => {
  const q = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<{
      fullName: string;
      username: string;
      avatarUrl: string;
    }>) => {
      const res = await fetch("/api/users/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        if (res.status === 409) {
          throw new Error("Username already taken")
        }
        throw new Error("Update failed")
      };
      return res.json();
    },

    onSuccess: (data) => {
      q.invalidateQueries({ queryKey: ["current-user"] });
      q.setQueryData(["current-user"], data);
    },
  });
};
