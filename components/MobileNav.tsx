"use client";

import Link from "next/link";
import { Menu, Moon, ScissorsSquareDashedBottom, SquareActivity, Sun } from "lucide-react";
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
  links: { href: string; text: string; icon: React.ReactNode }[];
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

        <DropdownMenuContent align="end" className="w-45 space-y-2 py-2 rounded-xl">
          {links.map((link, i) => {
            const active = pathname === link.href;
            return (
              <DropdownMenuItem key={i} asChild>
                <Link
                  href={link.href}
                  className={`flex items-center gap-2 px-2 py-1 rounded-md ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                >
                  {link.icon}
                  {link.text}
                </Link>
              </DropdownMenuItem>
            );
          })}


          <DropdownMenuItem className="w-full flex justify-start text-left items-center gap-2 mt-2"
              onClick={() => setTheme(isDark ? "light" : "dark")}>
          
              {isDark ? (<Sun />) : (<Moon />)}
              {isDark ? "Light Mode" : "Dark Mode"}
          </DropdownMenuItem>



          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="font-medium">
            <SquareActivity />
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileNav;
