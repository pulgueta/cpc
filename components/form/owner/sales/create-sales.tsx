"use client";

import type { FC } from "react";
import { useActionState, useEffect } from "react";

import Form from "next/form";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSaleAction } from "@/actions/sales/create-sale";
import { useInvoice, useSales } from "@/hooks/use-sale";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Products } from "@/constants/db-types";
import { ProductsCarousel } from "@/components/owner/products/products-carousel";
import { FormErros } from "../../form-alert-errors";

interface CreateSalesProps {
  products: Products;
  storeId: string | undefined;
  storeOwnerId: string | undefined;
}

export const CreateSales: FC<CreateSalesProps> = ({
  products: prods,
  storeId,
  storeOwnerId,
}) => {
  const [state, action, isPending] = useActionState(
    createSaleAction,
    undefined
  );

  const { products, clearProducts } = useSales((state) => state);
  const { total } = useInvoice();

  const parsedProducts = products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: product.productPrice,
  }));

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
      clearProducts();
    }
  }, [state]);

  return (
    <>
      <Form
        className="flex h-max flex-col justify-between gap-4"
        action={action}
      >
        <div className="flex flex-col gap-2">
          <Label>Producto(s)</Label>
          <ProductsCarousel products={prods} />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-2">
            <Label>Nombre del comprador</Label>
            <Input
              placeholder="Juan Egea"
              name="buyerName"
              defaultValue={state?.defaultValues?.buyerName}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Correo electrónico del comprador (opcional)</Label>
            <Input
              placeholder="correo@default.com"
              name="buyerEmail"
              type="email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Documento de identidad</Label>
            <RadioGroup
              defaultValue={state?.defaultValues?.documentType ?? "CC"}
              name="documentType"
              className="my-1 flex gap-4"
            >
              {["CC", "CE", "TI", "NIT"].map((document) => (
                <div
                  className="flex flex-row items-center space-x-2"
                  key={document}
                >
                  <RadioGroupItem value={document} id={document} />
                  <Label htmlFor={document}>{document}</Label>
                </div>
              ))}
            </RadioGroup>
            <Input
              placeholder="647281291"
              type="number"
              name="document"
              defaultValue={state?.defaultValues?.document}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Teléfono del comprador</Label>
          <Input
            placeholder="3013224540"
            type="tel"
            name="buyerPhone"
            defaultValue={state?.defaultValues?.buyerPhone}
          />
        </div>

        <input
          name="ownerId"
          defaultValue={storeOwnerId}
          type="hidden"
          className="hidden"
        />
        <input
          name="storeId"
          defaultValue={storeId}
          type="hidden"
          className="hidden"
        />

        <input
          name="products"
          defaultValue={JSON.stringify(parsedProducts)}
          type="hidden"
          className="hidden"
        />

        <input
          name="total"
          defaultValue={total}
          type="hidden"
          className="hidden"
        />

        <Button loading={isPending}>Generar venta</Button>
      </Form>

      <FormErros error={state?.error} />
    </>
  );
};
