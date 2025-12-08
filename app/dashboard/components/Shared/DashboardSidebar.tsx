import { NavUser } from "@/components/nav-user";
import { SideNav } from "@/components/SideNav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
// import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { user } from "@/app/dashboard/layout";

export async function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  // const user = await getCurrentUser();
  // if (!user) redirect("/login");

  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        iconKey: "HomeIcon",
        isCollapsible: false,
      },
      {
        title: "Resources",
        url: "/resources",
        iconKey: "NotebookTabs",
        isCollapsible: true,
                isActive: true,

        items: [
          {
            title: "100 lvl",
            url: "/resources/courses?level=100",
          },
          {
            title: "200 lvl",
            url: "/resources/courses?level=200",
          },
          {
            title: "300 lvl",
            url: "/resources/courses?level=300",
          },
          {
            title: "400 lvl",
            url: "/resources/courses?level=400",
          },
          {
            title: "500 lvl",
            url: "/resources/courses?level=500",
          },
        ],
      },
      {
        title: "Room",
        url: "/room",
        iconKey: "Rocket",
        isCollapsible: false,
      },
    ],
    user: {
      name: user.username || "User",
      email: user.email,
      avatar: user.avatarUrl || "",
    },
  };

  return (
    <Sidebar className="fixed" collapsible="icon" {...props}>
      <SidebarHeader className="flex-row! justify-between items-center">
        <Image
          src="/logo.png"
          alt="logo"
          width={21}
          height={21}
          className="dark:invert object-contain my-4 ml-2"
        />

        <SidebarTrigger className="sm:hidden" />
      </SidebarHeader>
      <SidebarContent className="mt-2">
        <SideNav items={data.navMain} />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
