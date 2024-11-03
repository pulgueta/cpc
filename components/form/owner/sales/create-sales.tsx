"use client";

import { FC, useActionState, useEffect, useState } from "react";

import Form from "next/form";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSaleAction } from "@/actions/create-sale";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { AlertCircle, Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useSales } from "@/hooks/use-sale";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getProducts } from "@/lib/database/product";

interface CreateSalesProps {
  products: Awaited<ReturnType<typeof getProducts>>;
}

export const CreateSales: FC<CreateSalesProps> = ({ products: prods }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [state, action, isPending] = useActionState(createSaleAction, undefined);

  const { products, addProduct } = useSales((state) => state);

  const onAddProduct = (str: string) => {
    setValue(str === value ? "" : str);
    addProduct(prods.find((p) => p.productName === str)!);
    setOpen(false);
  };

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <>
      <Form className="flex h-max flex-col justify-between gap-4" action={action}>
        <div className="flex flex-col gap-2">
          <Label>Producto(s)</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {value
                  ? prods.find((p) => p.productName === value)?.productName
                  : "Escoge los productos de la venta"}
                <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0">
              <Command>
                <CommandInput placeholder="Buscar producto..." />
                <CommandList>
                  <CommandEmpty>No se encontró el producto</CommandEmpty>
                  <CommandGroup>
                    {prods.map((p) => (
                      <CommandItem key={p.id} value={p.productName} onSelect={onAddProduct}>
                        <Check
                          className={cn(
                            "mr-2 size-4",
                            value === p.productName ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {p.productName}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label>Nombre del comprador</Label>
            <Input placeholder="Juan Egea" name="buyerName" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Documento de identidad</Label>
            <RadioGroup defaultValue="CC" name="documentType">
              {["CC", "CE", "TI", "NIT"].map((document) => (
                <div className="flex items-center space-x-2" key={document}>
                  <RadioGroupItem value={document} id={document} />
                  <Label htmlFor={document}>{document}</Label>
                </div>
              ))}
            </RadioGroup>
            <Input placeholder="647281291" type="number" name="document" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Teléfono del comprador</Label>
          <Input placeholder="3013224540" type="tel" name="buyerPhone" />
        </div>

        <Button loading={isPending} disabled={products.length <= 0}>
          Generar venta
        </Button>
      </Form>

      {state?.error &&
        state.error.buyerEmail &&
        state.error.buyerEmail.map((error) => (
          <Alert variant="destructive" className="my-2" key={error}>
            <AlertCircle className="size-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error || "Error desconocido"}</AlertDescription>
          </Alert>
        ))}
      {state?.error &&
        state.error.buyerName &&
        state.error.buyerName.map((error) => (
          <Alert variant="destructive" className="my-2" key={error}>
            <AlertCircle className="size-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error || "Error desconocido"}</AlertDescription>
          </Alert>
        ))}
      {state?.error &&
        state.error.buyerPhone &&
        state.error.buyerPhone.map((error) => (
          <Alert variant="destructive" className="my-2" key={error}>
            <AlertCircle className="size-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error || "Error desconocido"}</AlertDescription>
          </Alert>
        ))}
      {state?.error &&
        state.error.document &&
        state.error.document.map((error) => (
          <Alert variant="destructive" className="my-2" key={error}>
            <AlertCircle className="size-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error || "Error desconocido"}</AlertDescription>
          </Alert>
        ))}
    </>
  );
};
