"use client";

import type { FC } from "react";
import { useActionState, useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import Form from "next/form";

import {
  AlertCircle,
  Minus,
  Plus,
  Search,
  ShoppingCartIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSaleAction } from "@/actions/sales/create-sale";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { formatPrice } from "@/lib/utils";
import { useSales } from "@/hooks/use-sale";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/providers/sales-provider";
import { Paragraph } from "@/components/ui/typography";
import type { Products } from "@/constants/db-types";

interface CreateSalesProps {
  products: Products;
}

export const CreateSales: FC<CreateSalesProps> = ({ products: prods }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const [state, action, isPending] = useActionState(
    createSaleAction,
    undefined
  );

  const { products, addProduct } = useSales((state) => state);

  const filteredProducts = prods.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateQuantity = (productId: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + delta),
    }));
  };

  const handleAddToInvoice = (product: Product) => {
    const quantity = quantities[product.id] || 0;
    for (let i = 0; i < quantity; i++) {
      addProduct(product);
    }
    setQuantities((prev) => ({ ...prev, [product.id]: 0 }));
  };

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
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

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <ShoppingCartIcon className="mr-2" size={16} />
                Seleccionar productos
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 opacity-50" />
                  <Input
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Carousel>
                  <CarouselContent>
                    {filteredProducts.length < 0 ? (
                      filteredProducts.map((product) => (
                        <CarouselItem key={product.id}>
                          <Card>
                            <CardHeader>
                              <div className="aspect-square w-full relative overflow-hidden rounded-lg mb-2">
                                <Image
                                  src={product.productImageCdnUrl}
                                  alt={product.productName}
                                  layout="fill"
                                  objectFit="cover"
                                />
                              </div>
                              <CardTitle>{product.productName}</CardTitle>
                              <CardDescription>
                                {formatPrice(product.productPrice)}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center justify-between">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateQuantity(product.id, -1)}
                                  disabled={quantities[product.id] === 0}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="tabular-nums">
                                  {quantities[product.id] ?? 0}
                                </span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateQuantity(product.id, 1)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                                <Button
                                  disabled={quantities[product.id] === 0}
                                  onClick={() => handleAddToInvoice(product)}
                                >
                                  Agregar
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))
                    ) : (
                      <article className="flex items-center justify-center w-full">
                        <Paragraph muted>
                          No hay productos,{" "}
                          <Link
                            className="hover:underline hover:underline-offset-4"
                            href="/owner/products"
                          >
                            agregar aquí
                          </Link>
                        </Paragraph>
                      </article>
                    )}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
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
