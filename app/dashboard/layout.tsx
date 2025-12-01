import React from "react";
import { DashboardSidebar } from "@/app/dashboard/components/Shared/DashboardSidebar";
// import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Role } from "@/types/user";
import Navbar from "./components/Shared/Navbar";

export const user = {
  id: "cmi28zbfl0000thyt1cbqqtnl",
  clerkId: "user_35Zu0UUQbWUTnaJNKGjhY2K9hKn",
  fullname: "",
  email: "skidev101@gmail.com",
  username: "skidev101646",
  role: "ADMIN",
  avatarUrl: "",
  createdAt: "16/11/2025",
  updatedAt: "22/11/2025",
};
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await getCurrentUser();
  // if (!user) redirect("/login");

  return (
    <div className="flex flex-col min-h-screen">
      <SidebarProvider>
        <Navbar user={user} />
        <DashboardSidebar />
        <SidebarInset>
          <div className="flex flex-col flex-1 pt-16">
            <main className="p-3 sm:p-6 flex-1 overflow-auto">{children}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
