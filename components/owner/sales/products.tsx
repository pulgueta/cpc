"use client";

import { useSales } from "@/hooks/use-sale";
import { Product } from "./product";
import { Paragraph } from "@/components/ui/typography";

export const Products = () => {
  const { products } = useSales((state) => state);

  const totalPrice = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  })
    .format(totalPrice)
    .replace(",00", " COP");

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}

      {products.length > 0 ? (
        <div className="flex items-center justify-between">
          <Paragraph variant="body">Total</Paragraph>
          <Paragraph>{formattedPrice}</Paragraph>
        </div>
      ) : (
        <Paragraph muted center>
          No hay productos en la factura
        </Paragraph>
      )}
    </div>
  );
};
