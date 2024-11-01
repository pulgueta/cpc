"use client";

import type { FC } from "react";
import { useState } from "react";

import Image from "next/image";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { getCategories } from "@/lib/database/category";
import { Dropzone } from "./dropzone";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { uploadToS3 } from "@/lib/aws/s3";
import { useSession } from "@/lib/auth.client";
import { Skeleton } from "@/components/ui/skeleton";
import { Paragraph } from "@/components/ui/typography";
import { useRouter } from "next/navigation";

interface CreateProductProps {
  categories: Readonly<Awaited<ReturnType<typeof getCategories>>>;
}

const PHOTO_UPLOAD_MAX_SIZE = 2000000;

export const CreateProduct: FC<CreateProductProps> = ({ categories }) => {
  if (categories.length === 0) {
    return (
      <div className="flex items-center justify-center w-full py-4">
        <Paragraph>
          Debes crear al menos una categoría para poder crear productos
        </Paragraph>
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
      productImageCdnUrl: "",
      productName: "",
      productPrice: 0,
    },
  });

  const owner = useSession();

  const { getInputProps, getRootProps } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: PHOTO_UPLOAD_MAX_SIZE,
    validator: (upload) => {
      if (!upload.type.includes("image/")) {
        return {
          code: "file-invalid-type",
          message: "El archivo no es una imagen",
        };
      }

      if (upload.size > PHOTO_UPLOAD_MAX_SIZE) {
        return {
          code: "file-too-large",
          message: "La imagen debe ser inferior a 2MB",
        };
      }

      return null;
    },
    onDropRejected: (fileRejections) => {
      toast.error(fileRejections[0].errors[1].message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onDropAccepted: (upload) => {
      toast.promise(
        async () => {
          const res = await uploadToS3(
            upload[0],
            `stores/${owner.data?.user.id}/products`
          );

          if (!res.key || !res.name) {
            toast.error("Error al subir la imagen");
          }

          form.setValue("productImageUrl", res.url.imageUrl);
          form.setValue("productImageCdnUrl", res.url.cdnUrl);
        },
        {
          loading: "Subiendo tu foto...",
          success: "Imagen subida con éxito",
          error: "Error al subir la imagen",
        }
      );
    },
  });

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
      <form onSubmit={onSubmit} className="space-y-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
          <div className="grid grid-cols-1 gap-4 w-full">
            <FormComponent
              label="Nombre del producto"
              name="productName"
              render={({ field }) => (
                <Input placeholder="Audífonos Alta Calidad MX20" {...field} />
              )}
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                render={({ field }) => (
                  <Input placeholder="150000" type="number" {...field} />
                )}
              />
            </div>
          </div>

          <div className="flex gap-4 flex-col lg:flex-row items-center lg:items-start justify-start w-full">
            <div className="w-full lg:max-w-md">
              <Dropzone
                getInputProps={getInputProps}
                getRootProps={getRootProps}
                isPending={form.formState.isSubmitting}
                isSuccess={isSuccess}
              />
              <FormComponent
                label="Imagen del producto"
                name="productImage"
                render={({ field }) => (
                  <Input
                    placeholder="https://some-cdn.s3.us-east-2.amazonaws.com/uploads/product.jpg"
                    disabled
                    {...field}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <Paragraph muted>Previsualización de la imagen</Paragraph>
              {form.watch("productImageUrl") ? (
                <Image
                  src={form.getValues("productImageCdnUrl")}
                  alt={form.getValues("productName")}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover rounded max-w-64 aspect-square shadow"
                />
              ) : (
                <Skeleton className="w-full h-full object-cover rounded max-w-64 aspect-square shadow" />
              )}
            </div>
          </div>
        </div>

        <Button loading={form.formState.isSubmitting}>Crear producto</Button>
      </form>
    </Form>
  );
};
