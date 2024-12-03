import type { ComponentProps, FC } from "react";

import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ThemeSwitcher } from "@/components/theme-switch";

const data = {
  navMain: [
    {
      title: "Inicio",
      url: "/dashboard",
      items: [
        {
          title: "Mis compras",
          url: "/dashboard/purchases",
        },
        {
          title: "Mis datos",
          url: "/settings",
        },
      ],
    },
  ],
};

export const UserSidebar: FC<ComponentProps<typeof Sidebar>> = (props) => {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <div className="ml-4">
          <ThemeSwitcher />
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};
