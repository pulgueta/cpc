"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormComponent } from "@/components/ui/form";
import type { ProductSchema } from "@/schemas/product";
import { createProductSchema } from "@/schemas/product";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const CreateProduct = () => {
  const form = useForm<ProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      productCategory: "",
      productDescription: "",
      productImage: "",
      productName: "",
      productPrice: 0,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
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

        <FormComponent
          label="Categoría del producto"
          name="productCategory"
          render={({ field }) => <Input placeholder="Audífonos Alta Calidad MX20" {...field} />}
        />

        <FormComponent
          label="Precio del producto"
          name="productPrice"
          render={({ field }) => <Input placeholder="150000" type="number" {...field} />}
        />

        <Button loading={form.formState.isSubmitting}>Crear producto</Button>
      </form>
    </Form>
  );
};
