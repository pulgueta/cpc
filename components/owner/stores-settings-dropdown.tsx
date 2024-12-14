"use client";

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
import { useListOrganizations } from "@/lib/auth.client";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export const StoresSettingsDropdown = () => {
  const { data: orgz } = useListOrganizations();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full py-5">
          <div className="mr-2 flex aspect-square size-6 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Store size={14} />
          </div>
          <div className="grid text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {orgz?.[0]?.name ? orgz[0].name : <Skeleton className="h-6 w-full" />}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto" size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="start"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-muted-foreground text-xs">Locales</DropdownMenuLabel>
        {orgz?.map((org, index) => (
          <DropdownMenuItem key={org.name} asChild className="gap-2 p-2">
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
  );
};
