import { useQuery } from "@tanstack/react-query";

export const useAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/analytics");
        const data = await res.json();
        return data;
      } catch (error) {
        console.error("error fetching analytics:", error);
        throw error;
      }
    },
  });
};
