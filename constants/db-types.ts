import type { Session } from "@/lib/auth";
import { useSession } from "@/lib/auth.client";
import { getCategories } from "@/lib/database/category";
import { getProducts } from "@/lib/database/product";

export type UseSession = ReturnType<typeof useSession>;

export type Products = Awaited<ReturnType<typeof getProducts>>;
export type Product = Products[number];

export type Categories = Awaited<ReturnType<typeof getCategories>>;
export type Category = Categories[number];

export type CurrentSession = Session;
