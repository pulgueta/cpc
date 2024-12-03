import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const truncateNumber = (amount: number): string => {
  switch (true) {
    case amount >= 1_000_000_000_000:
      return (amount / 1_000_000_000_000).toFixed(1).replace(".", ",") + "B";

    case amount >= 1_000_000_000:
      return (amount / 1_000_000_000).toFixed(1).replace(".", ",") + "MM";

    case amount >= 1_000_000:
      return (amount / 1_000_000).toFixed(1).replace(".", ",") + "M";

    case amount >= 100_000:
      return (amount / 1_000).toFixed(1).replace(".", ",") + "K";

    default:
      return amount.toString();
  }
};

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
