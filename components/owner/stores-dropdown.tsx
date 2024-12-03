"use client";

import { useState } from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { usePathname, useRouter } from "next/navigation";

import { useListOrganizations } from "@/lib/auth.client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

export const StoresDropdown = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const { push } = useRouter();
  const pathname = usePathname();

  const currentStore = pathname.split("/")[1];

  const { data: orgz } = useListOrganizations();

  const { state } = useSidebar();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", {
            "text-xs": state === "collapsed",
          })}
        >
          {value
            ? orgz?.find((org) => org.id === value)?.name
            : currentStore.charAt(0).toUpperCase() + currentStore.slice(1)}
          <ChevronsUpDown size={16} className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar tienda..." />
          <CommandList>
            <CommandEmpty>No se encontraron tiendas.</CommandEmpty>
            <CommandGroup>
              {orgz?.map((org) => (
                <CommandItem
                  key={org.id}
                  value={org.name}
                  disabled={org.slug === currentStore}
                  onSelect={(curr) => {
                    setValue(curr === value ? "" : curr);
                    setOpen(false);
                    push(`/${org.slug}/owner/sales`);
                  }}
                >
                  {org.name}
                  <Check
                    size={16}
                    className={cn("ml-auto", value === org.id ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
