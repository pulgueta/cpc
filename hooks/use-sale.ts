import { useContext } from "react";

import { useStore } from "zustand";

import type { Sale } from "@/providers/sales-provider";
import { SalesContext } from "@/providers/sales-provider";

export const useSales = <const T>(selector: (state: Sale) => T) => {
  const ctx = useContext(SalesContext);

  if (!ctx) {
    throw new Error("useSales must be used within a <SalesProvider />");
  }

  return useStore(ctx, selector);
};
