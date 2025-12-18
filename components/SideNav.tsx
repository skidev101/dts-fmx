"use client";

import {
  ChevronRight,
  HomeIcon,
  NotebookTabs,
  Rocket,
  Settings,
  Settings2,
  User,
  type LucideIcon,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const ICONS: Record<string, LucideIcon> = {
  HomeIcon,
  NotebookTabs,
  Rocket,
  User,
  Settings,
  Settings2
};

export function SideNav({
  items,
}: {
  items: {
    title: string;
    url: string;
    iconKey?: string;
    isActive?: boolean;
    isCollapsible: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map((item) => {
          const Icon = item.iconKey ? ICONS[item.iconKey] : null;
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                {item.isCollapsible ? (
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      className="hover:cursor-pointer"
                      tooltip={item.title}
                    >
                      {Icon && <Icon />}
                      <span className="text-md">{item.title}</span>
                      {item.isCollapsible && (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                ) : (
                  <Link href={item.url}>
                    <SidebarMenuButton
                      className="hover:cursor-pointer"
                      tooltip={item.title}
                    >
                      {Icon && <Icon />}
                      <span className="text-md">{item.title}</span>
                      {item.isCollapsible && (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </SidebarMenuButton>
                  </Link>
                )}
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            <span className="text-md">{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
