"use client";

import type { FC } from "react";
import { useActionState, useEffect } from "react";

import Form from "next/form";

import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Categories } from "@/constants/db-types";
import { Label } from "@/components/ui/label";
import { ProductPreview } from "./product-preview";
import { createProductAction } from "@/actions/product/create-product";
import { FormErros } from "../../form-alert-errors";
import { NoCategories } from "../categories/no-categories";

interface CreateProductProps {
  categories: Categories;
  storeOwnerId: string | undefined;
  storeId: string | undefined;
}

export const CreateProduct: FC<CreateProductProps> = ({ categories, storeId, storeOwnerId }) => {
  const [state, formAction, _pending] = useActionState(createProductAction, undefined);

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
    }
  }, [state]);

  if (categories.length === 0) {
    return <NoCategories />;
  }

  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row">
      <Form
        className="relative flex w-full flex-col gap-4 rounded border p-4 lg:w-1/2"
        action={formAction}
      >
        <div>
          <Label className="flex flex-col gap-2">
            Nombre del producto
            <Input
              placeholder="Audífonos Alta Calidad MX20"
              name="productName"
              defaultValue={state?.defaultValues?.productName}
            />
          </Label>
        </div>
        <div>
          <Label className="flex flex-col gap-2">
            Descripción del producto
            <Textarea
              placeholder="Lo mejor en tecnología al alcance de tu mano"
              name="productDescription"
              defaultValue={state?.defaultValues?.productDescription ?? ""}
            />
          </Label>
        </div>
        <div>
          <Label className="flex flex-col gap-2">
            Categoría del producto
            <Select name="productCategory" defaultValue={state?.defaultValues?.productCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.categoryName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Label>
        </div>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
          <div>
            <Label className="flex flex-col gap-2">
              Precio del producto
              <Input
                placeholder="150000"
                type="number"
                defaultValue={state?.defaultValues?.productPrice}
                name="productPrice"
              />
            </Label>
          </div>
          <div>
            <Label className="flex flex-col gap-2">
              Disponibilidad
              <Input
                placeholder="40"
                type="number"
                defaultValue={state?.defaultValues?.stock}
                name="stock"
              />
            </Label>
          </div>
        </div>

        <div>
          <Label className="flex flex-col gap-2">
            Imagen del producto
            <Input type="file" accept="image/*" name="productImageUrl" className="cursor-pointer" />
          </Label>
        </div>

        <input className="hidden" type="hidden" name="storeId" defaultValue={storeId} />
        <input className="hidden" type="hidden" name="storeOwnerId" defaultValue={storeOwnerId} />

        <Button className="w-full">Crear producto</Button>

        <div>
          <FormErros error={state?.error} />
        </div>
      </Form>

      <ProductPreview />
    </div>
  );
};
