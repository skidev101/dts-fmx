"use client"

import { useState } from "react";
import UsersTable from "../components/Admin/UsersTable";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export type filters = "ALL" | "STUDENTS" | "ADMINS";

const page = () => {
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<filters>("ALL");

  return (
    <div className="flex flex-col">
      <div className="flex flex-1 justify-end mt-8 sm:mt-4">
        <div>
          {/* <Button>Add new</Button> */}
        </div>
        <Select
          value={filter}
          onValueChange={(val: string) => setFilter(val as filters)}
        >
          <SelectTrigger className="w-[100px] hover:cursor-pointer">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent className="w-[100px]">
            <SelectItem value="ALL" className="hover:cursor-pointer">All</SelectItem>
            <SelectItem value="STUDENT" className="hover:cursor-pointer">Student</SelectItem>
            <SelectItem value="ADMIN" className="hover:cursor-pointer">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <UsersTable page={page} setPage={setPage} roleFilter={filter} />
    </div>
  );
};

export default page;
