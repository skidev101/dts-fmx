import { useMutation, useQueryClient } from "@tanstack/react-query";


interface createCourseProps {
  title: string;
  description: string;
  code: string;
  level: string;
}

export const useCreateCourse = () => {
  const q = useQueryClient();

  return useMutation({
    mutationFn: async (data: createCourseProps) => {
      console.log("data sent to api:", JSON.stringify(data))
      try {
        const res = await fetch("/api/admin/courses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data),
        });
        console.log("response from create course api:", res);
        if (!res.ok) {
          if (res.status === 409) {
            throw new Error("Course already exists")
          }
          throw new Error("An unkn3own error occured")
        }
        return res.json();
      } catch (error) {
        console.error("failed to create course");
        throw error;
      }
    },
    onSuccess: () => {
      q.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};
