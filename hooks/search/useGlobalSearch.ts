import { useQuery } from "@tanstack/react-query";

export function useGlobalSearch(query: string) {
  return useQuery({
    queryKey: ["global-search", query],
    queryFn: async () => {
      const res = await fetch(`api/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Failed to search");
      return res.json();
    },
    enabled: query.length > 0,
    staleTime: 60 * 1000,
  });
}
