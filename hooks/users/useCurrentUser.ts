import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const res = await fetch("/api/users/me");
      if (!res.ok) throw new Error("Not authenticated");
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });
};
