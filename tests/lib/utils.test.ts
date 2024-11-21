import { describe, test } from "vitest";

import { cn, formatPrice } from "@/lib/utils";

describe("utils.ts", () => {
  test("formatPrice", ({ expect }) => {
    const basePrice = 1000000;

    const truncatedPrice = formatPrice(basePrice, true);
    const fullPrice = formatPrice(basePrice);

    expect(truncatedPrice).toBe("$1,0M");
    expect(fullPrice).toBe("$ 1.000.000");
  });

  test("cn", ({ expect }) => {
    const unsortedClasses = "items-center justify-center flex lg:hidden md:block";

    const sortedClasses = cn("flex", "items-center", "justify-center", "md:block", "lg:hidden");

    const expectedSortedClasses = "flex items-center justify-center md:block lg:hidden";

    expect(unsortedClasses).not.toBe(sortedClasses);
    expect(sortedClasses).toBe(expectedSortedClasses);
  });
});
