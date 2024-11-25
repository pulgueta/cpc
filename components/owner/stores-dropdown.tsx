"use client";

import { useState } from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { useRouter } from "next/navigation";

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

export const StoresDropdown = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const { push } = useRouter();

  const { data: orgz } = useListOrganizations();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? orgz?.find((org) => org.name === value)?.name : "Selecciona una tienda..."}
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
                  value={org.id}
                  onSelect={(curr) => {
                    setValue(curr === value ? "" : curr);
                    setOpen(false);
                    push(`${org.id}/owner/sales`);
                  }}
                >
                  {org.name}
                  <Check
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
