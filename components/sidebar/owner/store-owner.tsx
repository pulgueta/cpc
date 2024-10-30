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
import { useSession } from "@/lib/auth.client";
import { Footer } from "./footer";
import { cn } from "@/lib/utils";

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
      ],
    },
  ] as Nav[],
};

export const StoreOwnerSidebar = () => {
  const sessionData = useSession();

  const freeTier = sessionData.data?.user.plan === "free";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
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
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem
                          key={subItem.title}
                          className={cn({
                            "pointer-events-none": freeTier,
                          })}
                        >
                          <SidebarMenuSubButton asChild>
                            <Link href={`${subItem.url}`}>
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
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <Footer user={sessionData} />
      <SidebarRail />
    </Sidebar>
  );
};
