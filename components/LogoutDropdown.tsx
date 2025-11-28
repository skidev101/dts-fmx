"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useClerk } from "@clerk/nextjs";

export default function LogoutDropdownButton() {
  const { signOut } = useClerk();

  return (
    <DropdownMenuItem
      onSelect={() => signOut({ redirectUrl: "/" })}
      className="flex items-center gap-2"
    >
      <LogOut />
      Log out
    </DropdownMenuItem>
  );
}
