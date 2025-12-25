import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useDeleteCourse = () => {
  const q = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const res = await fetch(`/api/admin/courses/${id}`, {
          method: "DELETE",
        });
        console.log("response from create course api:", res);
        if (!res.ok) {
          throw new Error("An unknown error occured")
        }
        return res.json();
      } catch (error) {
        console.error("failed to delete course");
        throw error;
      }
    },
    onSuccess: () => {
      q.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};
 