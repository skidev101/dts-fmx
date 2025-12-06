"use client";

import { useEffect, useMemo, useState } from "react";
import {
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Searchbar from "./Searchbar";
import { Separator } from "@/components/ui/separator";
import NavbarUserMenu from "./NavbarMenu";
import { User } from "@/types/user";
import { Search, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import NewItemDropdown from "../Admin/NewItemDropdown";
import { Input } from "@/components/ui/input";
import { useCourses } from "@/hooks/course/useCourses";
import { Course } from "@/types/course";
import { useGlobalSearch } from "@/hooks/search/useGlobalSearch";
import { useRouter } from "next/navigation";

const Navbar = ({ user }: { user: User }) => {
  const router = useRouter();
  const sidebar = useSidebar();
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGlobalSearch(search);
  const role: string = "STUDENT";

  const notes = data.notes ?? [];
  const courses = data.courses ?? [];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all backdrop-blur-2xl border-b ${
        sidebar.open ? "md:left-(--sidebar-width)" : "md:left-13"
      }`}
    >
      {/* <div className={`w-full h-full backdrop-blur-2xl ${sidebar.open ? "md:w-(--sidebar-width)" : "md:w-[41px]"}`}>

      </div> */}
      <nav className="flex items-center py-6 px-2 sm:px-4 ">
        <div className="flex items-center justify-between w-full">
          <div
            className={`flex items-center gap-2 transition-all duration-300`}
            // style={{
            //   marginLeft: sidebar.open ? "var(--sidebar-width)" : "50px",
            // }}
          >
            {/* <div className={`flex items-center ${sidebar.open ? "ml-(--sidebar-width)" : "ml-10 transition-transform duration-500"}`}> */}

            <SidebarTrigger />
            <Separator
              className="sm:mr-2 data-[orientation=vertical]:h-4 data-[orienta`tion=vertical]:w-0.5"
              data-orientation="vertical"
            />
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
              {role === "ADMIN" && (
                <Badge
                  variant="secondary"
                  className="bg-blue-500 text-white dark:bg-blue-600"
                >
                  <ShieldCheck />
                  Admin
                </Badge>
              )}
            </div>
            {/* </div> */}
          </div>

          <div className="flex flex-1 items-center justify-end gap-4 min-w-0">
            {/* <Searchbar onChange={() => console.log("inputting...")} /> */}
            <div className=" relative flex max-w-68 flex-1 min-w-0 mt-4 sm:mt-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />

              <Input
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search course, notes, level.."
                className="pl-10"
              />

              {search && (
                <div className="absolute top-full left-0 w-full bg-white border rounded shadow-md mt-2 z-50 max-h-80 overflow-y-auto">
                  {/* Loading */}
                  {isLoading && (
                    <div className="p-4 text-sm text-neutral-500">
                      Searching...
                    </div>
                  )}

                  {/* Courses */}
                  {courses.map((c: any) => (
                    <button
                      key={c.id}
                      onClick={() => router.push(`/courses/${c.id}`)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      <div className="font-medium">{c.title}</div>
                      <div className="text-xs text-neutral-500">
                        {c.code} • {c.level}
                      </div>
                    </button>
                  ))}

                  {/* Notes */}
                  {notes.map((n: any) => (
                    <button
                      key={n.id}
                      onClick={() => router.push(`/notes/${n.id}`)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      <div className="font-medium">{n.title}</div>
                      {n.description && (
                        <div className="text-xs text-neutral-500 line-clamp-1">
                          {n.description}
                        </div>
                      )}
                    </button>
                  ))}

                  {/* No results */}
                  {!isLoading && courses.length === 0 && notes.length === 0 && (
                    <div className="px-4 py-3 text-sm text-neutral-500">
                      No results found.
                    </div>
                  )}
                </div>
              )}
            </div>

            {role === "ADMIN" && <NewItemDropdown />}

            <NavbarUserMenu user={user} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
