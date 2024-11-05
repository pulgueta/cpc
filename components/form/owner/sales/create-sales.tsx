"use client";

import type { FC } from "react";
import { useActionState, useEffect } from "react";

import Form from "next/form";

import { AlertCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSaleAction } from "@/actions/sales/create-sale";
import { useSales } from "@/hooks/use-sale";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Products } from "@/constants/db-types";
import { ProductsCarousel } from "@/components/owner/products/products-carousel";

interface CreateSalesProps {
  products: Products;
}

export const CreateSales: FC<CreateSalesProps> = ({ products: prods }) => {
  const [state, action, isPending] = useActionState(createSaleAction, undefined);

  const { products, clearProducts } = useSales((state) => state);

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
      clearProducts();
    }
  }, [state]);

  return (
    <>
      <Form className="flex h-max flex-col justify-between gap-4" action={action}>
        <div className="flex flex-col gap-2">
          <Label>Producto(s)</Label>
          <ProductsCarousel products={prods} />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-2">
            <Label>Nombre del comprador</Label>
            <Input placeholder="Juan Egea" name="buyerName" required />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Correo electrónico del comprador (opcional)</Label>
            <Input placeholder="correo@default.com" name="buyerEmail" type="email" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Documento de identidad</Label>
            <RadioGroup defaultValue="CC" name="documentType" className="my-1 flex gap-4" required>
              {["CC", "CE", "TI", "NIT"].map((document) => (
                <div className="flex flex-row items-center space-x-2" key={document}>
                  <RadioGroupItem value={document} id={document} />
                  <Label htmlFor={document}>{document}</Label>
                </div>
              ))}
            </RadioGroup>
            <Input placeholder="647281291" type="number" name="document" required />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Teléfono del comprador</Label>
          <Input placeholder="3013224540" type="tel" name="buyerPhone" required />
        </div>

        <Button loading={isPending} disabled={products.length <= 0}>
          Generar venta
        </Button>
      </Form>

      {state?.error &&
        Array.isArray(state.error) &&
        state.error.map((error) => (
          <Alert variant="destructive" className="my-2" key={error}>
            <AlertCircle className="size-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error || "Error desconocido"}</AlertDescription>
          </Alert>
        ))}

      {/* {state?.error &&
        state.error.buyerEmail &&
        state.error.buyerEmail.map((error) => (
          <Alert variant="destructive" className="my-2" key={error}>
            <AlertCircle className="size-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error || "Error desconocido"}</AlertDescription>
          </Alert>
        ))}
      */}
    </>
  );
};
