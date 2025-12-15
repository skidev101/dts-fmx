import { filters } from "@/app/dashboard/users/page";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

interface UsersResponse {
  users: User[];
  page: number;
  totalPages: number;
  totalUsers: number;
}

export const useUsers = (page: number, roleFilter: filters = "ALL") => {
  return useQuery<UsersResponse>({
    queryKey: ["users", page, roleFilter],

    queryFn: async () => {
      const res = await fetch(`/api/admin/users?page=${page}&limit=10&role=${roleFilter}`);

      if (!res.ok) {
        console.error("failed to fetch users");
        throw new Error("failed to fetch users");
      }
      const data = await res.json();

      return data;
    },
  });
};
