import { Suspense } from "react";

import type { NextPage } from "next";
import { redirect } from "next/navigation";

import { SearchParams } from "nuqs/server";

import { CreateProduct } from "@/components/form/owner/products/create-product";
import { Heading, Paragraph } from "@/components/ui/typography";
import { getCurrentSession } from "@/lib/auth/session";
import { getCategories } from "@/lib/database/category";
import { getProducts } from "@/lib/database/product";
import { ProductsTable } from "@/components/owner/products/products-table";
import { searchParamsCache } from "@/lib/search-params";

interface ProductsProps {
  searchParams: Promise<SearchParams>;
}

const Products: NextPage<ProductsProps> = async ({ searchParams }) => {
  const owner = await getCurrentSession();

  if (!owner?.user.id) {
    return redirect("/login");
  }

  const { q: page, maxResults } = searchParamsCache.parse(await searchParams);

  const [categories, products] = await Promise.all([
    getCategories(owner?.user.id),
    getProducts(page, maxResults),
  ]);

  return (
    <>
      <header className="my-3.5">
        <Heading>Productos</Heading>
        <Paragraph muted>
          Aquí podrás administrar los productos de tu tienda.
        </Paragraph>
      </header>
      <section className="flex w-full flex-col justify-between gap-4">
        <article className="w-full">
          <Suspense fallback={<></>}>
            <CreateProduct categories={categories} />
          </Suspense>
        </article>
        <article className="w-full">
          <Suspense fallback={<></>}>
            <ProductsTable data={products} />
          </Suspense>
        </article>
      </section>
    </>
  );
};
export default Products;
