"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

interface Props {
  links: { href: string; text: string }[];
  user?: any;
}

const MobileNav = ({ links, user }: Props) => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label="Toggle menu">
            <Menu size={26} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40 space-y-1">
          {links.map((link, i) => {
            const active = pathname === link.href;
            return (
              <DropdownMenuItem key={i} asChild>
                <Link
                  href={link.href}
                  className={`px-2 py-1 rounded-md ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                >
                  {link.text}
                </Link>
              </DropdownMenuItem>
            );
          })}

          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="font-medium">
              Dashboard
            </Link>
            {/* {user ? (
              <Link href="/dashboard" className="font-medium">
                Dashboard
              </Link>
            ) : (
              <Link href="/login" className="font-medium">
                Sign In
              </Link>
            )} */}
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Button
              variant="ghost"
              className="w-full mt-2"
              onClick={() => setTheme(isDark ? "light" : "dark")}
            >
              {isDark ? "Light Mode" : "Dark Mode"}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileNav;
