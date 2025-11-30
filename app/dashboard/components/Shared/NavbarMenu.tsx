"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import {
  BadgeCheck,
  Bell,
  CreditCard,
  LogOut,
} from "lucide-react";
import { User } from "@/lib/types/user";
import { useClerk } from "@clerk/nextjs";

interface NavbarUserMenuProps {
  user: User;
};

export default function NavbarUserMenu({ user }: NavbarUserMenuProps) {
  const { isMobile } = useSidebar();
  // const { signOut } = useClerk();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon-lg" className="rounded-full">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={user.avatarUrl ?? "/default-avatar.jpg"}
              alt={user.fullname ?? "user"}
            />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={user.avatarUrl ?? "/default-avatar.jpg"}
                alt={user.fullname ?? "user"}
              />
              <AvatarFallback className="rounded-lg">A</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.username}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* <DropdownMenuGroup>
          <DropdownMenuItem>
            <Sparkles />
            Upgrade to Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator /> */}

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/account">
              <BadgeCheck />
              Account
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <CreditCard />
            Billing
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
      // onSelect={() => signOut({ redirectUrl: "/" })}
      className="flex items-center gap-2"
    >
      <LogOut />
      Log out
    </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
