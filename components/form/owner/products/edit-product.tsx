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
import type { Product } from "@/constants/db-types";
import { useCategories } from "@/hooks/use-categories";
import { createProductAction } from "@/actions/product/create-product";
import { Label } from "@/components/ui/label";
import { FormErros } from "../../form-alert-errors";
import { NoCategories } from "../categories/no-categories";

interface EditProductProps {
  product: Product;
}

export const EditProduct: FC<EditProductProps> = ({ product }) => {
  const [state, formAction, _pending] = useActionState(createProductAction, undefined);

  const { data: categories } = useCategories();

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
    }
  }, [state]);

  if (!product.category) {
    return <NoCategories />;
  }

  return (
    <Form action={formAction} className="flex w-full flex-col gap-4">
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
              {categories?.map((category) => (
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

      <input className="hidden" type="hidden" name="storeId" defaultValue={""} />
      <input className="hidden" type="hidden" name="storeOwnerId" defaultValue={""} />

      <Button className="w-full">Editar producto</Button>

      <div>
        <FormErros error={state?.error} />
      </div>
    </Form>
  );
};
