import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const truncateNumber = (amount: number): string =>
  Intl.NumberFormat("es-CO", {
    notation: "compact",
  }).format(amount);

export const formatPrice = (price: number, truncate: boolean = false): string => {
  if (truncate) {
    const truncated = truncateNumber(price);
    return `$${truncated}`;
  }

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  })
    .format(price)
    .replace(",00", "")
    .replace(/\u00A0/g, " ");
};
