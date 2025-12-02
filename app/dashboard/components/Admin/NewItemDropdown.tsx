"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";


const NewItemDropdown = () => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="sm:rounded-xl flex items-center sm:gap-1 hover:cursor-pointer">
          <span className="hidden sm:block">Create</span>
          <PlusIcon className="size-4 text-black/60" />
          
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30 rounded-xl " align="center">
        <DropdownMenuGroup>
          <DropdownMenuItem className="rounded-lg hover:cursor-pointer" onClick={() => router.push("/dashboard/notes")}>
            Note
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-lg hover:cursor-pointer" onClick={() => router.push("/dashboard/course")}>
            Course
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-lg hover:cursor-pointer" onClick={() => router.push("/dashboard/room")}>
            Room
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-lg hover:cursor-pointer" onClick={() => router.push("/dashboard/attendance")}>
            Attendance
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>  
    </DropdownMenu>
  );
};

export default NewItemDropdown;
