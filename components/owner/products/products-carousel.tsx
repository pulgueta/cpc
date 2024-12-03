import type { FC } from "react";
import { useState } from "react";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Minus, Plus, Search, ShoppingCartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import type { Products } from "@/constants/db-types";
import { useInvoice } from "@/hooks/use-sale";
import { Paragraph } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";

interface ProductsCarouselProps {
  products: Products;
}

export const ProductsCarousel: FC<ProductsCarouselProps> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const store = usePathname().split("/")[1];

  const { handleAddToInvoice, updateQuantity, quantities } = useInvoice();

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
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
            <Search className="size-4 opacity-50" />
            <Input
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Carousel>
            <CarouselContent>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <CarouselItem key={product.id}>
                    <Card>
                      <CardHeader>
                        <div className="relative mb-2 aspect-square w-full overflow-hidden rounded-lg">
                          <Image
                            src={product.productImageUrl}
                            alt={product.productName}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <CardTitle>{product.productName}</CardTitle>
                        <CardDescription>{formatPrice(product.productPrice)}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(product.id, -1)}
                            disabled={quantities[product.id] === 0}
                          >
                            <Minus className="size-4" />
                          </Button>
                          <span className="tabular-nums">{quantities[product.id] ?? 0}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(product.id, 1)}
                            disabled={quantities[product.id] >= product.stock}
                          >
                            <Plus className="size-4" />
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
                <article className="flex w-full items-center justify-center">
                  <Paragraph muted>
                    No hay productos,{" "}
                    <Link
                      className="hover:underline hover:underline-offset-4"
                      href={`/${store}/owner/products`}
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
  );
};
