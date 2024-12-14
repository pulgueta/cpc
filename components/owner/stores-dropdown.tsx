"use client";

import type { FC } from "react";
import { useEffect, useState } from "react";

import Link from "next/link";

import { ChevronsUpDown, Plus, Store } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import type { Organization } from "@/lib/auth.client";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface StoresDropdownProps {
  organizations?: Organization[] | null;
  isMobile?: boolean;
}

export const StoresDropdown: FC<StoresDropdownProps> = ({ organizations, isMobile }) => {
  const [activeOrg, setActiveOrg] = useState<Organization | undefined>(organizations?.[0]);

  useEffect(() => {
    setActiveOrg(organizations?.[0]);
  }, [organizations]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="border py-5 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Store size={14} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeOrg?.name ? activeOrg.name : <Skeleton className="h-6 w-full" />}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">Locales</DropdownMenuLabel>
            {organizations?.map((org, index) => (
              <DropdownMenuItem
                key={org.name}
                onClick={() => setActiveOrg(org)}
                asChild
                className="gap-2 p-2"
              >
                <Link href={`/${org.slug}/owner/sales`}>
                  {org.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2" asChild>
              <Button
                variant="ghost"
                className="w-full items-center justify-start text-muted-foreground text-xs"
                disabled
              >
                <Plus size={16} />
                Agregar local
                <Badge className="text-xs">Pronto</Badge>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
