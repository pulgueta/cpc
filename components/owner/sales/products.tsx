"use client";

import { useSales } from "@/hooks/use-sale";
import { Product } from "./product";
import { Paragraph } from "@/components/ui/typography";
import { formatPrice } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export const Products = () => {
  const { products } = useSales((state) => state);

  const totalPrice = products.reduce((acc, product) => {
    return acc + product.productPrice * product.quantity;
  }, 0);

  const priceWithTax = totalPrice * 0.19;

  return (
    <div className="space-y-8">
      {products.map((product, idx) => (
        <>
          <Product key={product.id} {...product} />
          {idx < products.length - 1 && <Separator key={`sep-${product.id}`} />}
        </>
      ))}

      {products.length > 0 ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Paragraph variant="body">Valor total:</Paragraph>
            <Paragraph>{formatPrice(totalPrice)}</Paragraph>
          </div>
          <div className="flex items-center justify-between">
            <Paragraph>IVA (19%):</Paragraph>
            <Paragraph>{formatPrice(priceWithTax)}</Paragraph>
          </div>
        </div>
      ) : (
        <Paragraph muted center>
          No hay productos en la factura
        </Paragraph>
      )}
    </div>
  );
};
