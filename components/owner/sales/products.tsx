"use client";

import { memo } from "react";

import { useSales } from "@/hooks/use-sale";
import { PaperReceipt } from "./paper-receipt";
import { Product } from "./product";

const MemoizedProduct = memo(Product);
const MemoizedPaperReceipt = memo(PaperReceipt);

export const Products = () => {
  const { products } = useSales((state) => state);

  const items = products.map((product) => ({
    name: product.productName,
    quantity: product.quantity,
    price: product.productPrice,
  }));

  return (
    <div className="space-y-4">
      <MemoizedPaperReceipt items={items} date={new Date().toLocaleDateString()} />

      {products.map((product) => (
        <MemoizedProduct key={product.id} {...product} />
      ))}
    </div>
  );
};
