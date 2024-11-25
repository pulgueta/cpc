import { Suspense } from "react";

import type { NextPage } from "next";

import { SearchParams } from "nuqs/server";

import { CreateProduct } from "@/components/form/owner/products/create-product";
import { getCurrentSession } from "@/lib/auth/session";
import { getCategories } from "@/lib/database/category";
import { getProducts } from "@/lib/database/product";
import { ProductsTable } from "@/components/owner/products/products-table";
import { searchParamsCache } from "@/lib/search-params";
import { OwnerHeader } from "@/components/owner-header";

interface ProductsProps {
  searchParams: Promise<SearchParams>;
}

const Products: NextPage<ProductsProps> = async ({ searchParams }) => {
  const owner = await getCurrentSession();

  const { q: page, maxResults } = searchParamsCache.parse(await searchParams);

  const [categories, products] = await Promise.all([
    getCategories(owner?.user.id ?? ""),
    getProducts(owner?.user.id ?? "", page, maxResults),
  ]);

  return (
    <>
      <OwnerHeader
        title="Productos"
        description="Aquí podrás administrar los productos de tu tienda."
      />

      <section className="flex w-full flex-col justify-between gap-4">
        <article className="w-full">
          <Suspense fallback={<></>}>
            <CreateProduct categories={categories} />
          </Suspense>
        </article>
        <article className="w-full md:mx-auto md:max-w-[480px] lg:max-w-full">
          <Suspense fallback={<></>}>
            <ProductsTable data={products} />
          </Suspense>
        </article>
      </section>
    </>
  );
};
export default Products;
