import type { Session } from "@/lib/auth";
import { useSession } from "@/lib/auth.client";
import { getCategories } from "@/lib/database/category";
import { getProducts } from "@/lib/database/product";
import { getSalesWithItems, getStoreSales } from "@/lib/database/sale";
import { getUserByEmail } from "@/lib/database/user";

export type UseSession = ReturnType<typeof useSession>;

export type Products = Awaited<ReturnType<typeof getProducts>>;
export type Product = Products[number];

export type User = Awaited<ReturnType<typeof getUserByEmail>>;

export type SalesWithItems = Awaited<ReturnType<typeof getSalesWithItems>>;

export type Categories = Awaited<ReturnType<typeof getCategories>>;
export type Category = Categories[number];

export type Sales = Awaited<ReturnType<typeof getStoreSales>>;

export type CurrentSession = Session;
