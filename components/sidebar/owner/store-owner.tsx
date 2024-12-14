"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { StoresDropdown } from "@/components/owner/stores-dropdown";
import { ThemeSwitcher } from "@/components/theme-switch";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { useListOrganizations } from "@/lib/auth.client";

const data = {
  navMain: [
    {
      title: "Contabilidad",
      url: "#",
      items: [
        {
          title: "Ventas",
          url: "/owner/sales",
        },
        {
          title: "Crear venta",
          url: "/owner/sales/create",
        },
        {
          title: "Ingresos",
          url: "/owner/sales/income",
        },
      ],
    },
    {
      title: "Mi tienda",
      url: "#",
      items: [
        {
          title: "Productos",
          url: "/owner/products",
        },
        {
          title: "Categorías",
          url: "/owner/categories",
        },
        // {
        //   title: "Ajustes",
        //   url: "/owner/settings",
        // },
      ],
    },
  ],
};

export const StoreOwnerSidebar = () => {
  const currentStore = usePathname().split("/")[1];

  const { data: orgz } = useListOrganizations();
  const { isMobile } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        <StoresDropdown organizations={orgz} isMobile={isMobile} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url} className="font-medium">
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={`/${currentStore}${item.url}`}>{item.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ThemeSwitcher />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
