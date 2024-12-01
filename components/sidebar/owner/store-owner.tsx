"use client";

import type { ForwardRefExoticComponent, RefAttributes } from "react";

import Link from "next/link";

import type { LucideProps } from "lucide-react";
import { ChevronRight, DollarSign, Store } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ThemeSwitcher } from "@/components/theme-switch";
import { StoresDropdown } from "@/components/owner/stores-dropdown";
import { usePathname } from "next/navigation";

interface Nav {
  title: string;
  url: string;
  isActive?: boolean;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  items: {
    title: string;
    url: string;
  }[];
}

const data = {
  navMain: [
    {
      title: "Contabilidad",
      url: "#",
      icon: DollarSign,
      isActive: true,
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
      icon: Store,
      items: [
        {
          title: "Productos",
          url: "/owner/products",
        },
        {
          title: "Categorías",
          url: "/owner/categories",
        },
      ],
    },
  ] as Nav[],
};

export const StoreOwnerSidebar = () => {
  const currentStore = usePathname().split("/")[1];

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <StoresDropdown />

            {data.navMain.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible mt-2"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={`/${currentStore}${subItem.url}`}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
            <div>
              <ThemeSwitcher />
            </div>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};
