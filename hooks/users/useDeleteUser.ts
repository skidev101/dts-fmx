import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteUser = () => {
  // if (!id) return;
  const q = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
      });
      console.log("response from delete user api:", res);
      if (!res.ok) {
        throw new Error("An unknown error occured");
      }
      return res.json();
    },
    onSuccess: () => {
      q.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
