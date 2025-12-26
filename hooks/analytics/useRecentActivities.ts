import { useQuery } from "@tanstack/react-query";

export const useRecentActivities = () => {
  return useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/admin/recent-activities");
        if (!res.ok) {
          throw new Error("failed to fetch recent activities");
        }

        return res.json();
      } catch (error) {
        console.error("error fetching analytics:", error);
      }
    },
  });
};
