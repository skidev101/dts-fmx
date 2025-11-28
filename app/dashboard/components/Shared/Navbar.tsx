"use client";

import { useState } from "react";
import {
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Searchbar from "./Searchbar";
import { Separator } from "@/components/ui/separator";
import NavbarUserMenu from "./NavbarMenu";
import { User } from "@/lib/types/user";
import { ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import NewItemDropdown from "./NewItemDropdown";

const Navbar = ({ user }: { user: User }) => {
  const sidebar = useSidebar();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all backdrop-blur-2xl border-b ${
        sidebar.open ? "md:left-(--sidebar-width)" : "md:left-12"
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
              <Badge
                variant="secondary"
                className="bg-blue-500 text-white dark:bg-blue-600"
              >
                <ShieldCheck />
                Admin
              </Badge>
            </div>
            {/* </div> */}
          </div>

          <div className="flex flex-1 items-center justify-end gap-4 min-w-0">
            <Searchbar onChange={() => console.log("inputting...")} />

            <NewItemDropdown />

            <NavbarUserMenu user={user} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
