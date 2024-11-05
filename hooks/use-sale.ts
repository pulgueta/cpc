import { useContext, useState } from "react";

import { useStore } from "zustand";

import type { Sale, Product } from "@/providers/sales-provider";
import { SalesContext } from "@/providers/sales-provider";

export const useSales = <const T>(selector: (state: Sale) => T) => {
  const ctx = useContext(SalesContext);

  if (!ctx) {
    throw new Error("useSales must be used within a <SalesProvider />");
  }

  return useStore(ctx, selector);
};

export const useInvoice = () => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const { addProduct } = useSales((state) => state);

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

  return { quantities, updateQuantity, handleAddToInvoice };
};
