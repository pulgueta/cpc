"use client";

import type { FC, PropsWithChildren } from "react";
import { createContext, useState } from "react";

import type { StoreApi } from "zustand";
import { createStore } from "zustand";

import type { Product } from "@/constants/db-types";

export { Product };

export interface Sale {
  products: (Product & { quantity: number })[];
  addProduct: (product: Product) => void;
  incrementProduct: (productId: string) => void;
  decrementProduct: (productId: string) => void;
  removeProduct: (productId: string) => void;
  clearProducts: () => void;
}

export const SalesContext = createContext<StoreApi<Sale> | undefined>(undefined);

interface SalesProviderProps extends PropsWithChildren {}

export const SalesProvider: FC<SalesProviderProps> = ({ children }) => {
  const [store] = useState<StoreApi<Sale>>(() =>
    createStore<Sale>((set) => ({
      products: [],
      addProduct: (product: Product) =>
        set((state) => {
          const existingProduct = state.products.find((p) => p.id === product.id);
          if (existingProduct) {
            return {
              products: state.products.map((p) =>
                p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
              ),
            };
          }
          return {
            products: [...state.products, { ...product, quantity: 1 }],
          };
        }),
      incrementProduct: (productId: string) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === productId ? { ...product, quantity: product.quantity + 1 } : product,
          ),
        })),
      decrementProduct: (productId: string) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === productId && product.quantity > 1
              ? { ...product, quantity: product.quantity - 1 }
              : product,
          ),
        })),
      removeProduct: (productId: string) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== productId),
        })),
      clearProducts: () => set(() => ({ products: [] })),
    })),
  );

  return <SalesContext.Provider value={store}>{children}</SalesContext.Provider>;
};
