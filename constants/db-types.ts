import { getCategories } from "@/lib/database/category";
import { getProducts } from "@/lib/database/product";

export type Products = Awaited<ReturnType<typeof getProducts>>;
export type Product = Products[number];

export type Categories = Awaited<ReturnType<typeof getCategories>>;
export type Category = Categories[number];
