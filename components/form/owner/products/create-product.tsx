"use client";

import type { FC } from "react";
import { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Form, FormComponent } from "@/components/ui/form";
import type { ProductSchema } from "@/schemas/product";
import { createProductSchema } from "@/schemas/product";
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
import { Dropzone } from "./dropzone";
import { useSession } from "@/lib/auth.client";
import { Skeleton } from "@/components/ui/skeleton";
import { Paragraph } from "@/components/ui/typography";
import { useFormDropzone } from "./use-dropzone";
import type { Categories } from "@/constants/db-types";

interface CreateProductProps {
  categories: Categories;
}

export const CreateProduct: FC<CreateProductProps> = ({ categories }) => {
  if (categories.length === 0) {
    return (
      <div className="flex w-full items-center justify-center py-4">
        <Paragraph>Debes crear al menos una categoría para poder crear productos</Paragraph>
      </div>
    );
  }

  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { refresh } = useRouter();

  const form = useForm<ProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      productDescription: "",
      productImageUrl: "",
      productName: "",
      productPrice: 0,
      stock: 0,
    },
  });

  const owner = useSession();

  const { getInputProps, getRootProps } = useFormDropzone({ form, owner });

  const onSubmit = form.handleSubmit(async (data) => {
    const req = await fetch("/api/owner/products", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const { message } = await req.json();

    if (!req.ok) {
      return toast.error(message);
    }

    setIsSuccess(true);

    form.reset();

    refresh();

    return toast.success(message);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex w-full flex-col gap-12">
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="grid w-full grid-cols-1 gap-4">
            <Input
              className="hidden"
              {...form.register("storeOwnerId")}
              defaultValue={owner.data?.user.id}
              hidden
            />
            <FormComponent
              label="Nombre del producto"
              name="productName"
              render={({ field }) => <Input placeholder="Audífonos Alta Calidad MX20" {...field} />}
            />

            <FormComponent
              label="Descripción del producto"
              name="productDescription"
              render={({ field }) => (
                <Textarea
                  placeholder="Lo mejor en tecnología al alcance de tu mano"
                  className="min-h-32"
                  {...field}
                />
              )}
            />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <FormComponent
                label="Categoría del producto"
                name="productCategory"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue="">
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
                )}
              />
              <FormComponent
                label="Precio del producto"
                name="productPrice"
                render={({ field }) => <Input placeholder="150000" type="number" {...field} />}
              />
              <FormComponent
                label="Disponibilidad del producto"
                name="stock"
                render={({ field }) => <Input placeholder="40" type="number" {...field} />}
              />
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-start gap-4 lg:flex-row lg:items-start">
            <div className="w-full lg:max-w-md">
              <FormComponent
                label="Imagen del producto"
                name="productImageUrl"
                render={({ field }) => (
                  <Input
                    placeholder="https://some-cdn.s3.us-east-2.amazonaws.com/uploads/product.jpg"
                    disabled
                    {...field}
                  />
                )}
              />

              <Dropzone
                getInputProps={getInputProps}
                getRootProps={getRootProps}
                isPending={form.formState.isSubmitting}
                isSuccess={isSuccess}
              />
            </div>
            <div className="space-y-2">
              <Paragraph muted>Previsualización de la imagen</Paragraph>
              {form.watch("productImageUrl") ? (
                <Image
                  src={form.getValues("productImageUrl")}
                  alt={form.getValues("productName")}
                  width={600}
                  height={600}
                  className="aspect-square h-full w-full max-w-64 rounded object-cover shadow"
                />
              ) : (
                <Skeleton className="aspect-square h-full w-full max-w-64 rounded object-cover shadow" />
              )}
            </div>
          </div>
        </div>

        <Button loading={form.formState.isSubmitting} className="w-full lg:mx-auto lg:max-w-xs">
          Crear producto
        </Button>
      </form>
    </Form>
  );
};
